"use client";

import { Dialog } from "radix-ui";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { sections, text, ui } from "@/lib/portfolio";
import { SectionContent } from "./content";
import { DrawerContext, type DrawerEntry } from "./navigation-context";
import { sectionIcons } from "./icons";
import { useSectionMotion } from "./section-motion";

export function PortfolioDrawer({ entry, onClose, onRestoreFocus }: {
  entry: DrawerEntry | null; onClose: () => void; onRestoreFocus: (id: string) => void;
}) {
  const { lang } = useLanguage();
  // Preserve content and direction while Radix plays the closing animation.
  const [lastEntry, setLastEntry] = useState(entry);
  if (entry && entry !== lastEntry) setLastEntry(entry);
  const displayed = entry ?? lastEntry;
  const title = useRef<HTMLHeadingElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const path = displayed ? `/${displayed.section}${displayed.slug ? `/${displayed.slug}` : ""}` : "";
  useSectionMotion(scroller, path, !!entry);
  useEffect(() => {
    if (entry) {
      scroller.current?.scrollTo({ top: 0 });
      title.current?.focus();
    }
  }, [entry]);
  if (!displayed) return null;
  const { section, slug, side } = displayed;
  const Icon = sectionIcons[section];
  return (
    <Dialog.Root open={!!entry} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-overlay">
          <div className="drawer-prelayers" data-side={side} aria-hidden="true"><span className="drawer-prelayer" /><span className="drawer-prelayer" /></div>
        </Dialog.Overlay>
        <Dialog.Content className="route-drawer" data-side={side} aria-describedby={undefined} style={{ "--section-color": sections[section].color } as React.CSSProperties}
          onOpenAutoFocus={(event) => { event.preventDefault(); title.current?.focus(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); onRestoreFocus(displayed.id); }}>
          <header className="drawer-header"><Dialog.Title asChild><h2 ref={title} tabIndex={-1}><Icon size={19} strokeWidth={1.7} />{text(sections[section].label, lang)}</h2></Dialog.Title>
            <div><a href={path} className="drawer-page-link" target="_blank" rel="noopener noreferrer">{ui[lang].openPage}<ArrowUpRight size={15} /></a><Dialog.Close className="icon-button" aria-label={ui[lang].close}><X size={22} /></Dialog.Close></div>
          </header>
          <div className="drawer-scroll" ref={scroller}><DrawerContext.Provider value><SectionContent section={section} slug={slug} /></DrawerContext.Provider></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
