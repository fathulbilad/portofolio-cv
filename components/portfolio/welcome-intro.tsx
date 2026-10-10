"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { welcomeDurationMs, welcomeRevealAtMs } from "@/lib/welcome-intro";

const colors = ["#d6eeff", "#fff1b8", "#d8f5e8", "#e6ddf4"];

// Pixel Swap's cover-and-reveal idea, adapted to a single overlay. The CV is
// never cloned into hundreds of tiles, so its state, links and IDs stay intact.
function makePixels(container: HTMLDivElement) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size = Math.max(48, Math.ceil(Math.sqrt(width * height / 180)));
  const columns = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const fragment = document.createDocumentFragment();
  const pixels: { element: HTMLSpanElement; order: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const index = row * columns + column;
      const noise = Math.sin((index + 1) * 127.1 + 311.7) * 43758.5453;
      const order = noise - Math.floor(noise);
      const element = document.createElement("span");
      element.className = "welcome-pixel";
      Object.assign(element.style, {
        left: `${column * size}px`, top: `${row * size}px`,
        width: `${size + 1}px`, height: `${size + 1}px`,
        backgroundColor: colors[index % colors.length],
      });
      pixels.push({ element, order });
      fragment.appendChild(element);
    }
  }
  container.replaceChildren(fragment);
  return pixels;
}

export function WelcomeIntro({ children }: { children: ReactNode }) {
  const site = useRef<HTMLDivElement>(null);
  const welcome = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const dismiss = useRef<() => void>(() => {});
  const enter = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.cvWelcome !== "pending" || !site.current || !welcome.current || !grid.current) return;
    const page = site.current;
    const intro = welcome.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopped = false;
    let swapping = false;
    let restoreFocus = false;
    let animations: Animation[] = [];
    let timer: ReturnType<typeof setTimeout>;
    page.inert = true;
    page.setAttribute("aria-hidden", "true");
    intro.focus({ preventScroll: true });

    function finish() {
      if (stopped) return;
      stopped = true;
      clearTimeout(timer);
      animations.forEach(animation => animation.cancel());
      grid.current?.replaceChildren();
      root.dataset.cvWelcome = "done";
      page.inert = false;
      page.removeAttribute("aria-hidden");
      if (restoreFocus || intro.contains(document.activeElement)) {
        const heading = page.querySelector<HTMLElement>("h1");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
      }
    }
    dismiss.current = finish;

    async function swap() {
      if (stopped || swapping || !grid.current) return;
      swapping = true;
      clearTimeout(timer);
      restoreFocus = intro.contains(document.activeElement);
      // Avoid an awkward cut if the visitor rotates or resizes during the intro.
      const pixels = makePixels(grid.current);
      try {
        animations = pixels.map(({ element, order }) => element.animate(
          [{ transform: "scale(0.15)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }],
          { duration: 240, delay: order * 160, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }));
        await Promise.all(animations.map(animation => animation.finished));
        if (stopped) return;
        root.dataset.cvWelcome = "revealing";
        animations.forEach(animation => animation.cancel());
        animations = pixels.map(({ element, order }) => element.animate(
          [{ transform: "scale(1)", opacity: 1 }, { transform: "scale(0.15)", opacity: 0 }],
          { duration: 240, delay: order * 160, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }));
        await Promise.all(animations.map(animation => animation.finished));
      } catch {
        // Cancellation, unsupported animation APIs, and failures all open the CV.
      }
      finish();
    }
    enter.current = () => { void swap(); };

    const elapsed = Date.now() - Number(root.dataset.cvWelcomeStarted ?? Date.now());
    if (motion.matches || elapsed >= welcomeDurationMs) finish();
    else timer = setTimeout(swap, Math.max(0, welcomeRevealAtMs - elapsed));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (!stopped && event.key === "Tab") {
        event.preventDefault();
        intro.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    motion.addEventListener("change", finish);
    window.addEventListener("resize", finish);
    window.addEventListener("pagehide", finish);
    window.addEventListener("cv:welcome-deadline", finish);
    return () => {
      finish();
      dismiss.current = () => {};
      enter.current = () => {};
      document.removeEventListener("keydown", onKey);
      motion.removeEventListener("change", finish);
      window.removeEventListener("resize", finish);
      window.removeEventListener("pagehide", finish);
      window.removeEventListener("cv:welcome-deadline", finish);
    };
  }, []);

  return <>
    <div id="cv-site" ref={site}>{children}</div>
    <div className="welcome-intro" ref={welcome} role="dialog" aria-modal="true" aria-labelledby="welcome-name" aria-describedby="welcome-role" tabIndex={-1}>
      <div className="welcome-content">
        <div className="welcome-badge" aria-hidden="true">
          <span className="welcome-strap" /><span className="welcome-clip" />
          <div className="welcome-badge-card"><Image src="/lanyard/badge-artwork.webp" alt="" width={800} height={770} sizes="440px" loading="lazy" onError={() => dismiss.current()} /></div>
        </div>
        <p className="welcome-eyebrow">A little corner of my work.</p>
        <h1 id="welcome-name">Fathul Bilad.</h1>
        <p id="welcome-role">Full Stack Software Engineer</p>
        <button type="button" className="button button-blue welcome-enter" onClick={() => enter.current()}>View my CV<ArrowRight size={17} /></button>
      </div>
      <div className="welcome-pixels" ref={grid} aria-hidden="true" />
    </div>
  </>;
}
