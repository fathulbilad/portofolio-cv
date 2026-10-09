"use client";

import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { parseSectionPath, type SectionRoute } from "@/lib/portfolio-paths";
import { PortfolioDrawer } from "./drawer";
import { NavigationContext, type DrawerSide } from "./navigation-context";

const historyKey = "portfolioDrawer";
const drawerEvent = "portfolio:drawer";
type DrawerEntry = SectionRoute & { id: string; side: DrawerSide };

function subscribeHistory(notify: () => void) {
  window.addEventListener("popstate", notify);
  window.addEventListener(drawerEvent, notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener(drawerEvent, notify);
  };
}

function subscribeDesktop(notify: () => void) {
  const media = window.matchMedia("(min-width: 900px)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
const isDesktop = () => window.matchMedia("(min-width: 900px)").matches;
const serverDesktop = () => null;
const serverHistory = () => null;

function readEntry(snapshot: string | null): DrawerEntry | null {
  return snapshot ? JSON.parse(snapshot.slice(snapshot.indexOf(":") + 1)) : null;
}

export function PortfolioNavigation({ children }: { children: ReactNode }) {
  // A fresh document intentionally ignores a previous drawer's history state:
  // refreshing or sharing its URL must render the standalone page.
  const session = useRef<string | null>(null);
  const openers = useRef(new Map<string, HTMLElement>());
  const getSnapshot = useCallback(() => {
    const saved = window.history.state?.[historyKey];
    return session.current && typeof saved === "string" && saved.startsWith(`${session.current}:`) ? saved : null;
  }, []);
  const snapshot = useSyncExternalStore(subscribeHistory, getSnapshot, serverHistory);
  const entry = useMemo(() => readEntry(snapshot), [snapshot]);
  const desktop = useSyncExternalStore<boolean | null>(subscribeDesktop, isDesktop, serverDesktop);

  const openDrawer = useCallback((href: string, opener: HTMLElement | null, replace: boolean) => {
    const route = parseSectionPath(href);
    if (!route || !isDesktop()) return false;
    session.current ??= crypto.randomUUID();
    const previous = replace ? readEntry(getSnapshot()) : null;
    const card = opener?.closest(".bento-card") ?? opener;
    const bounds = card?.getBoundingClientRect();
    const side = previous?.side ?? (bounds && bounds.left + bounds.width / 2 < window.innerWidth / 2 ? "left" : "right");
    const next: DrawerEntry = { ...route, id: previous?.id ?? crypto.randomUUID(), side };
    if (!previous && opener) openers.current.set(next.id, opener);

    // All CV text is local. Update the shareable URL without a route request.
    const state = { [historyKey]: `${session.current}:${JSON.stringify(next)}` };
    if (previous) window.history.replaceState(state, "", href);
    else window.history.pushState(state, "", href);
    window.dispatchEvent(new Event(drawerEvent));
    return true;
  }, [getSnapshot]);

  useEffect(() => {
    if (entry && desktop === false) window.location.replace(`/${entry.section}${entry.slug ? `/${entry.slug}` : ""}`);
  }, [entry, desktop]);

  const navigation = useMemo(() => ({ desktop, openDrawer }), [desktop, openDrawer]);
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
      {entry && desktop && <PortfolioDrawer section={entry.section} slug={entry.slug} side={entry.side}
        onClose={() => window.history.back()}
        onRestoreFocus={() => openers.current.get(entry.id)?.focus({ preventScroll: true })} />}
    </NavigationContext.Provider>
  );
}
