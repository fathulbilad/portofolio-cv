"use client";

import { createContext } from "react";

export type DrawerSide = "left" | "right";
export const DrawerContext = createContext(false);
export const NavigationContext = createContext<{
  desktop: boolean | null;
  openDrawer: (href: string, opener: HTMLElement | null, replace: boolean) => boolean;
} | null>(null);
