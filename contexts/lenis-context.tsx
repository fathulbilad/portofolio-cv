"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionProfile } from "@/contexts/motion-context";

gsap.registerPlugin(ScrollTrigger);

type LenisContextType = {
  scrollTo: (
    target: Parameters<Lenis["scrollTo"]>[0],
    options?: Parameters<Lenis["scrollTo"]>[1],
  ) => void;
};

const LenisContext = createContext<LenisContextType | null>(null);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { resolved, smoothScroll } = useMotionProfile();

  useEffect(() => {
    if (!resolved || !smoothScroll) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const tickerFn = (time: number) => {
      if (!document.hidden) lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [resolved, smoothScroll]);

  const scrollTo = useCallback<
    LenisContextType["scrollTo"]
  >((target, options) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
      return;
    }

    let top: number | undefined;

    if (typeof target === "number") {
      top = target;
    } else if (typeof target === "string") {
      const element = document.querySelector<HTMLElement>(target);
      if (element) top = window.scrollY + element.getBoundingClientRect().top;
    } else if (target instanceof HTMLElement) {
      top = window.scrollY + target.getBoundingClientRect().top;
    }

    if (top === undefined) return;

    window.scrollTo({
      top: top + (options?.offset ?? 0),
      behavior: smoothScroll ? "smooth" : "auto",
    });
  }, [smoothScroll]);

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenis must be used within LenisProvider");
  return ctx;
}
