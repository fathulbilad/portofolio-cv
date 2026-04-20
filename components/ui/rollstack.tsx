"use client";

import { useEffect, useRef } from "react";

export function NewScrollStack({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const update = () => {
      const cards = cardsRef.current;
      if (!cards.length) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const offsetTop = rect.top + scrollY;

        const start = offsetTop - vh * 0.2 - i * 30;
        const end = offsetTop - vh * 0.1;

        let progress = (scrollY - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));

        const baseScale = 0.85 + i * 0.03;
        const scale = 1 - progress * (1 - baseScale);

        let y = 0;
        if (scrollY >= start) {
          y = scrollY - offsetTop + vh * 0.2 + i * 30;
        }

        card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
        card.style.zIndex = `${100 - i}`;
      });
    };

    const raf = () => {
      update();
      requestAnimationFrame(raf);
    };

    raf();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="pt-[20vh] pb-[50rem]">
        {React.Children.map(children, (child, i) => (
          <div
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="scroll-stack-card relative w-full h-[420px] my-8 rounded-2xl"
          >
            {child}
          </div>
        ))}
        <div className="h-px" />
      </div>
    </div>
  );
}
