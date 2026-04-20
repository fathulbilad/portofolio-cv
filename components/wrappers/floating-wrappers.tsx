"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Briefcase, Cpu, Mail } from "lucide-react";
import { gsap } from "gsap";

export function FloatingDockWrapper() {
  const [isDark, setIsDark] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTheme = () => {
      const theme = localStorage.getItem("theme");
      setIsDark(theme === "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dockRef.current || !isDark) return;

    const el = dockRef.current;

    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      // 🚨 start BELOW viewport
      gsap.set(el, {
        y: window.innerHeight,
        opacity: 0,
        scale: 0.96,
      });

      // 🔥 ENTER (smooth + slight overshoot)
      tl.to(el, {
        y: -8,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
      })

        // ✨ settle back (important for premium feel)
        .to(el, {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });

      // 🌊 ORGANIC FLOAT (NOT robotic yoyo)
      gsap.to(el, {
        y: "+=6",
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.8,
      });

      // 🫧 micro scale breathing (this is subtle but BIG impact)
      gsap.to(el, {
        scale: 1.015,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    });
  }, [isDark]);

  if (!isDark) return null;

  return (
    <div
      ref={dockRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 mb-1"
    >
      <FloatingDock
        items={[
          {
            title: "Home",
            icon: <Home className="w-5 h-5" />,
            onClick: () => {
              const lenis = (window as any).__lenis;
              lenis?.scrollTo("#hero", { duration: 1.6 });
            },
          },
          {
            title: "Work",
            icon: <Briefcase className="w-5 h-5" />,
            onClick: () => {
              const lenis = (window as any).__lenis;
              lenis?.scrollTo("#work", { duration: 1.6 });
            },
          },
          {
            title: "Videos",
            video: "/videos/icon-video.mp4",
          },
          {
            title: "Stack",
            icon: <Cpu className="w-5 h-5" />,
            onClick: () => {
              const lenis = (window as any).__lenis;
              // ScrollTrigger may be pinning — use native scrollTo as fallback
              const el = document.querySelector("#stack");
              if (el) lenis?.scrollTo(el, { duration: 1.6, offset: 0 });
            },
          },
          {
            title: "Contact",
            icon: <Mail className="w-5 h-5" />,
            onClick: () => {
              const lenis = (window as any).__lenis;
              lenis?.scrollTo("#contact", { duration: 1.6 });
            },
          },
        ]}
      />
    </div>
  );
}
