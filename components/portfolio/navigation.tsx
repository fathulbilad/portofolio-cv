"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";

const OpenerContext = createContext<RefObject<HTMLElement | null> | null>(null);
export const DrawerContext = createContext(false);

export function PortfolioNavigation({ children }: { children: ReactNode }) {
  const opener = useRef<HTMLElement | null>(null);
  return <OpenerContext.Provider value={opener}>{children}</OpenerContext.Provider>;
}

export function useDrawerOpener() {
  return useContext(OpenerContext);
}

export function SectionLink({ href, children, className, style, ariaLabel }: {
  href: string; children: ReactNode; className?: string; style?: React.CSSProperties; ariaLabel?: string;
}) {
  const pathname = usePathname();
  const inDrawer = useContext(DrawerContext);
  const openerRef = useDrawerOpener();
  const link = useRef<HTMLAnchorElement>(null);

  return (
    <Link href={href} ref={link} className={className} style={style} aria-label={ariaLabel}
      scroll={!inDrawer && pathname !== "/"} replace={inDrawer}
      onNavigate={(event) => {
        // Small screens and direct section pages use normal document navigation.
        // Desktop overview links are intercepted into the persistent drawer slot.
        if (window.matchMedia("(max-width: 899px)").matches || (!inDrawer && pathname !== "/")) {
          event.preventDefault();
          window.location.assign(href);
        } else if (!inDrawer && openerRef) {
          openerRef.current = link.current;
        }
      }}>
      {children}
    </Link>
  );
}
