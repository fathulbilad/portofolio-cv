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
  const particlesRef = useRef<Particle[]>([]);

  const isMobile = useMobileLayout();

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d")!;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let frameId = 0;
    let isVisible = true;

    canvas.width = width;
    canvas.height = height;
    const particles = particlesRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (!isVisible) {
            cancelAnimationFrame(frameId);
          } else if (!frameId) {
            frameId = requestAnimationFrame(draw);
          }
        });
      },
      { rootMargin: "300px" },
    );
    io.observe(parent);

    const colors = [
      "rgba(165,216,255,0.15)",
      "rgba(157,134,255,0.15)",
      "rgba(255,140,66,0.12)",
      "rgba(255,255,255,0.08)",
    ];

    function spawnParticle() {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (width * 0.6);
      const centerX = width / 2;
      const centerY = height / 2;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

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
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      if (particles.length < 120) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.life++;

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
      }

      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
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
      cancelAnimationFrame(frameId);
      io.disconnect();
      particles.length = 0;
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  if (isMobile) return <div></div>;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
