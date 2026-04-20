"use client";

import useMobileLayout from "@/hooks/useMobileLayout";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

export default function PipelineFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: Particle[] = [];

  const isMobile = useMobileLayout();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    const colors = [
      "rgba(165,216,255,0.15)", // blue
      "rgba(157,134,255,0.15)", // purple
      "rgba(255,140,66,0.12)", // orange
      "rgba(255,255,255,0.08)", // neutral
    ];

    function spawnParticle() {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (width * 0.6);

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // direction toward center (with slight curve)
      const dx = centerX - x;
      const dy = centerY - y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      const speed = 0.2 + Math.random() * 0.6;

      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;

      particles.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        maxLife: 200 + Math.random() * 200,
        size: Math.random() * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // spawn rate
      if (particles.length < 120) {
        spawnParticle();
      }

      particles.forEach((p, i) => {
        p.life++;

        // subtle curve motion
        const curve = 0.0008;
        const dx = p.x - centerX;
        const dy = p.y - centerY;

        p.vx += -dy * curve;
        p.vy += dx * curve;

        p.x += p.vx;
        p.y += p.vy;

        const alpha = 1 - p.life / p.maxLife;

        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = alpha * 0.8;
        ctx.lineWidth = p.size;

        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 4, p.y - p.vy * 4);
        ctx.stroke();

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
        }
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) return <div></div>;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
