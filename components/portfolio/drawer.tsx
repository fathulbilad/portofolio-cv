"use client";

import { Dialog } from "radix-ui";
import { ArrowUpRight, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { sections, text, ui, type SectionKey } from "@/lib/portfolio";
import { SectionContent } from "./content";
import { DrawerContext, useDrawerOpener } from "./navigation";
import { sectionIcons } from "./icons";

export function RouteDrawer({ section, slug }: { section: SectionKey; slug?: string }) {
  const { lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const opener = useDrawerOpener();
  const title = useRef<HTMLHeadingElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const Icon = sectionIcons[section];
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    title.current?.focus();
  }, [pathname]);
  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) router.back(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-overlay" />
        <Dialog.Content className="route-drawer" aria-describedby={undefined} style={{ "--section-color": sections[section].color } as React.CSSProperties}
          onOpenAutoFocus={(event) => { event.preventDefault(); title.current?.focus(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); opener?.current?.focus({ preventScroll: true }); }}>
          <header className="drawer-header"><Dialog.Title asChild><h2 ref={title} tabIndex={-1}><Icon size={19} strokeWidth={1.7} />{text(sections[section].label, lang)}</h2></Dialog.Title>
            <div><a href={pathname} className="drawer-page-link" target="_blank" rel="noopener noreferrer">{ui[lang].openPage}<ArrowUpRight size={15} /></a><Dialog.Close className="icon-button" aria-label={ui[lang].close}><X size={22} /></Dialog.Close></div>
          </header>
          <div className="drawer-scroll" ref={scroller}><DrawerContext.Provider value><SectionContent section={section} slug={slug} /></DrawerContext.Provider></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
