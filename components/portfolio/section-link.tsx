"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useRef, type CSSProperties, type ReactNode } from "react";
import { DrawerContext, NavigationContext } from "./navigation-context";

export function SectionLink({ href, children, className, style, ariaLabel }: {
  href: string; children: ReactNode; className?: string; style?: CSSProperties; ariaLabel?: string;
}) {
  const pathname = usePathname();
  const inDrawer = useContext(DrawerContext);
  const navigation = useContext(NavigationContext);
  const link = useRef<HTMLAnchorElement>(null);
  const useDrawer = navigation?.desktop === true && (pathname === "/" || inDrawer);

  return (
    <Link href={href} ref={link} className={className} style={style} aria-label={ariaLabel}
      prefetch={navigation?.desktop === null || useDrawer ? false : true} scroll={!useDrawer}
      onNavigate={(event) => {
        if (useDrawer && navigation.openDrawer(href, link.current, inDrawer)) event.preventDefault();
      }}>
      {children}
    </Link>
  );
}
