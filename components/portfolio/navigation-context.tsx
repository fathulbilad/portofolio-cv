"use client";

import { createContext } from "react";
import type { SectionRoute } from "@/lib/portfolio-paths";

export type DrawerSide = "left" | "right" | "bottom";
export type DrawerEntry = SectionRoute & { id: string; side: DrawerSide };
export const DrawerContext = createContext(false);
export const NavigationContext = createContext<{
  desktop: boolean | null;
  openDrawer: (href: string, opener: HTMLElement | null, replace: boolean) => boolean;
} | null>(null);
