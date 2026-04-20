"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useMobileLayout from "@/hooks/useMobileLayout";

export default function SystemCore() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMobileLayout();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nodes = el.querySelectorAll(".node");
    const lines = el.querySelectorAll(".line");

    // subtle floating motion
    gsap.to(nodes, {
      y: "random(-10, 10)",
      x: "random(-10, 10)",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    // line pulse
    gsap.to(lines, {
      opacity: 0.6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.3,
      ease: "power1.inOut",
    });

    // slow rotation
    gsap.to(el, {
      rotate: 360,
      duration: 60,
      repeat: -1,
      ease: "none",
    });
  }, []);

  if (isMobile) {
    return <div></div>;
  }

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
    >
      {/* core glow */}
      <div className="absolute w-[120px] h-[120px] rounded-full bg-[#7C9EFF]/10 blur-3xl" />

      {/* nodes */}
      <div className="node absolute w-2 h-2 bg-[#7C9EFF]/60 rounded-full top-[40%] left-[50%]" />
      <div className="node absolute w-2 h-2 bg-[#A78BFA]/60 rounded-full top-[55%] left-[60%]" />
      <div className="node absolute w-2 h-2 bg-[#F97316]/60 rounded-full top-[50%] left-[40%]" />
      <div className="node absolute w-2 h-2 bg-white/50 rounded-full top-[60%] left-[50%]" />

      {/* connection lines */}
      <svg className="absolute w-[300px] h-[300px] opacity-20">
        <line
          className="line"
          x1="150"
          y1="150"
          x2="220"
          y2="120"
          stroke="white"
          strokeWidth="1"
        />
        <line
          className="line"
          x1="150"
          y1="150"
          x2="80"
          y2="170"
          stroke="white"
          strokeWidth="1"
        />
        <line
          className="line"
          x1="150"
          y1="150"
          x2="150"
          y2="220"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
