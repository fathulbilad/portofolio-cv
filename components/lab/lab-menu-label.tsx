"use client";

import type { CSSProperties } from "react";
import AnimatedContent from "./vendor/AnimatedContent";
import styles from "./lab.module.css";

export type MenuHighlight = { version: number; shapes: string[] };

// Generate only on deliberate hover/focus, never during render or pointer moves.
// Separate slots guarantee visible gaps, even at the widest random settings.
export function createMenuHighlight(version: number): MenuHighlight {
  const between = (low: number, high: number) => low + Math.random() * (high - low);
  const point = (x: number, y: number) => `${x.toFixed(1)}% ${y.toFixed(1)}%`;
  const shapes = [0, 59].map(slot => {
    const left = slot + between(0, 6);
    const right = Math.min(100, left + between(33, 40));
    const top = between(0, 7);
    const bottom = between(94, 100);
    return `polygon(${[
      point(left + 1, top + 4), point(left + 9, top),
      point(right - 2, top + between(-3, 3)), point(right, top + 7),
      point(right - 1, bottom - 4), point(right - 9, bottom),
      point(left + 2, bottom - between(0, 5)), point(left, bottom - 9),
    ].join(", ")})`;
  });
  return { version, shapes };
}

export function LabMenuLabel({ text, active, color, ink, highlight }: {
  text: string;
  active: boolean;
  color: string;
  ink: string;
  highlight?: MenuHighlight;
}) {
  return <div className={styles.type} data-menu-label>
    <span>{text}</span>
    <div className={styles.menuHighlight} aria-hidden="true" data-visible={active && !!highlight}
      data-menu-highlight={highlight?.version}
      style={{ "--menu-mark": color, "--menu-ink": ink } as CSSProperties}>
      {highlight?.shapes.map((shape, index) => <AnimatedContent key={`${highlight.version}-${index}`}
        trigger="mount" distance={0} duration={0.38} delay={index * 0.035}
        animateOpacity={false} wipe="right" ease="power3.out"
        className={styles.menuPatch} style={{ clipPath: shape }}>
        <span>{text}</span>
      </AnimatedContent>)}
    </div>
  </div>;
}
