"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface StarfieldBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  /** Number of stars */
  count?: number;
  /** Travel speed */
  speed?: number;
  /** Star color */
  starColor?: string;
  /** Enable twinkling */
  twinkle?: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export function StarfieldBackground({
  className,
  children,
  count = 400,
  speed = 0.5,
  starColor = "#ffffff",
  twinkle = true,
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for perf

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let animationId: number;
    let tick = 0;

    const maxDepth = 1500;

    const createStar = (initialZ?: number): Star => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: initialZ ?? Math.random() * maxDepth,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    });

    const stars: Star[] = Array.from({ length: count }, () => createStar());

    // precompute sin values (huge win for Safari)
    const sinCache = new Float32Array(1000);
    for (let i = 0; i < 1000; i++) {
      sinCache[i] = Math.sin(i * 0.01);
    }

    const animate = () => {
      tick++;

      // Safari prefers clearRect over alpha fill
      ctx.fillStyle = "#0a0a0f";
      ctx.globalAlpha = 0.25;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = starColor;
      ctx.strokeStyle = starColor;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.z -= speed * 2;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = maxDepth;
        }

        const scale = 400 / star.z;
        const x = cx + star.x * scale;
        const y = cy + star.y * scale;

        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

        const depthRatio = 1 - star.z / maxDepth;

        const size = Math.max(0.5, depthRatio * 3);

        let opacity = depthRatio * 0.9 + 0.1;

        // 🔥 cheaper twinkle (no Math.sin per frame)
        if (twinkle && star.twinkleSpeed > 0.015) {
          const idx = (tick + i) % 1000;
          opacity *= 0.7 + 0.3 * sinCache[idx];
        }

        ctx.globalAlpha = opacity;

        // ⚡ faster than arc()
        ctx.fillRect(x, y, size, size);

        // streak
        if (star.z < maxDepth * 0.3 && speed > 0.3) {
          const streakLength = depthRatio * speed * 8;
          const angle = Math.atan2(star.y, star.x);

          ctx.globalAlpha = opacity * 0.3;
          ctx.lineWidth = size * 0.5;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - Math.cos(angle) * streakLength,
            y - Math.sin(angle) * streakLength,
          );
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, width, height);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [count, speed, starColor, twinkle]);

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden bg-[#0a0a0f]", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Subtle blue nebula glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(56, 100, 180, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(100, 60, 150, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5,5,10,0.9) 100%)",
        }}
      />

      {/* Content layer */}
      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  );
}
