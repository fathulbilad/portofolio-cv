"use client";

import { Music2 } from "lucide-react";
import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { labMusicTiming } from "./use-lab-music";

export function MusicIndicator({ playing, animated, readPosition }: { playing: boolean; animated: boolean; readPosition: () => number | null }) {
  const left = useMotionValue(8);
  const middle = useMotionValue(3);
  const right = useMotionValue(6);

  useEffect(() => {
    if (!playing || !animated) return;
    let frame = 0;
    const update = () => {
      const position = readPosition();
      if (position !== null) {
        const beat = (position / labMusicTiming.beat) % 1;
        left.set(12 - 9 * Math.exp(-beat * 5));
        middle.set(12 - 11 * Math.exp(-((beat + 0.08) % 1) * 4));
        right.set(12 - 7 * Math.exp(-((beat + 0.16) % 1) * 5));
      }
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [playing, animated, readPosition, left, middle, right]);

  if (!playing || !animated) return <Music2 size={16} aria-hidden="true" />;
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <motion.line x1="3" x2="3" y1={left} y2="14" />
    <motion.line x1="8" x2="8" y1={middle} y2="14" />
    <motion.line x1="13" x2="13" y1={right} y2="14" />
  </svg>;
}
