"use client";

import dynamic from "next/dynamic";

const StarfieldBackground = dynamic(
  () =>
    import("@/components/shaders/starfield").then(
      (mod) => mod.StarfieldBackground,
    ),
  { ssr: false },
);

export function StarfieldWrapper({ className }: { className?: string }) {
  return <StarfieldBackground className={className} />;
}
