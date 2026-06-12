"use client";

import { useEffect, useRef } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Briefcase, Cpu, Mail } from "lucide-react";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/language-context";
import { useLenis } from "@/contexts/lenis-context";

export function FloatingDockWrapper() {
  const { t } = useLanguage();
  const { scrollTo } = useLenis();
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dockRef.current;
    if (!el) return;

    const rafId = requestAnimationFrame(() => {
      const tl = gsap.timeline();

      gsap.set(el, {
        y: window.innerHeight,
        opacity: 0,
        scale: 0.96,
      });

      tl.to(el, {
        y: -8,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
      })
        .to(el, {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });

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

    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={dockRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 mb-1"
    >
      <FloatingDock
        items={[
          {
            title: t.dock[0],
            icon: <Home className="w-5 h-5" />,
            onClick: () => {
              scrollTo("#hero", { duration: 1.6 });
            },
          },
          {
            title: t.dock[1],
            icon: <Briefcase className="w-5 h-5" />,
            onClick: () => {
              scrollTo("#work", { duration: 1.6 });
            },
          },
          {
            title: t.dock[2],
            video: "/videos/icon-video.mp4",
          },
          {
            title: t.dock[3],
            icon: <Cpu className="w-5 h-5" />,
            onClick: () => {
              const el = document.querySelector<HTMLElement>("#stack");
              if (el) scrollTo(el, { duration: 1.6, offset: 0 });
            },
          },
          {
            title: t.dock[4],
            icon: <Mail className="w-5 h-5" />,
            onClick: () => {
              scrollTo("#contact", { duration: 1.6 });
            },
          },
        ]}
      />
    </div>
  );
}
