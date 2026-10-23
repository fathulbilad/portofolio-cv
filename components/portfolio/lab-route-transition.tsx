"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Handoff = { target: string; phase: "cover" | "waiting" | "reveal"; reduced: boolean };
const HandoffContext = createContext<((href: string) => boolean) | null>(null);

export function LabRouteTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  const busy = useRef(false);
  const arrival = useRef<string | null>(null);
  const scheduled = useRef<ReturnType<typeof setTimeout>[]>([]);
  const target = handoff?.target ?? null;

  const navigate = useCallback((href: string) => {
    if (busy.current) return true;
    if (location.pathname === href) return false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    busy.current = true;
    scheduled.current.forEach(clearTimeout);
    scheduled.current.length = 0;
    setHandoff({ target: href, phase: "cover", reduced });
    router.prefetch(href);
    scheduled.current.push(setTimeout(() => {
      setHandoff(current => current ? { ...current, phase: "waiting" } : null);
      router.push(href);
    }, reduced ? 180 : 330));
    // A failed route request must never strand the visitor behind the cover.
    scheduled.current.push(setTimeout(() => { busy.current = false; setHandoff(null); }, 8000));
    return true;
  }, [router]);

  useEffect(() => {
    if (!target || pathname !== target) return;
    let alive = true;
    const reveal = async () => {
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      await Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 1500))]);
      if (!alive) return;
      setHandoff(current => current ? { ...current, phase: "reveal" } : null);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scheduled.current.push(setTimeout(() => {
        busy.current = false;
        arrival.current = target;
        setHandoff(null);
      }, reduced ? 220 : 520));
    };
    void reveal();
    return () => { alive = false; };
  }, [pathname, target]);

  useEffect(() => {
    // Focus only after React has removed inert from the destination wrapper.
    if (handoff || !arrival.current) return;
    const destination = arrival.current;
    arrival.current = null;
    const heading = document.querySelector<HTMLElement>(destination === "/lab" ? "#lab-content h1" : ".portfolio-home h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.setAttribute("data-lab-arrival-focus", "");
      heading.focus({ preventScroll: true });
      heading.addEventListener("blur", () => { heading.removeAttribute("tabindex"); heading.removeAttribute("data-lab-arrival-focus"); }, { once: true });
    }
  }, [handoff]);

  useEffect(() => {
    const timers = scheduled.current;
    return () => { timers.forEach(clearTimeout); };
  }, []);

  return <HandoffContext.Provider value={navigate}>
    <div inert={handoff !== null}>{children}</div>
    {handoff && <div className="lab-route-transition" data-route-phase={handoff.phase} data-reduced={handoff.reduced} aria-hidden="true">
      <div className="lab-route-color" /><div className="lab-route-ink" />
      <span>{handoff.target === "/lab" ? "off duty." : "back to work."}</span>
    </div>}
  </HandoffContext.Provider>;
}

export function LabRouteLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const navigate = useContext(HandoffContext);
  const router = useRouter();
  return <Link href={href} className={className} prefetch={false}
    onPointerEnter={() => router.prefetch(href)} onFocus={() => router.prefetch(href)}
    onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      if (navigate?.(href)) event.preventDefault();
    }}>{children}</Link>;
}
