"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

type DockItem = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  video?: string;
  emoji?: string;
  onClick?: () => void;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

//
// ─── MOBILE ────────────────────────────────────────────────
//
const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 md:hidden",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#05070D]/90 backdrop-blur-xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {items.map((item) => {
          const isVideo = !!item.video;

          return (
            <div
              key={item.title}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                } else if (item.href) {
                  window.location.href = item.href;
                }
              }}
              className="cursor-pointer active:scale-95 transition-transform"
            >
              <div
                className={cn(
                  "relative flex items-center justify-center overflow-hidden",
                  isVideo
                    ? "w-14 h-14 rounded-xl bg-black border border-white/10"
                    : "w-11 h-11 rounded-lg bg-[#0B0F1A] border border-white/5",
                )}
              >
                {item.video && (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                )}

                {!isVideo &&
                  (item.emoji ? (
                    <span className="text-lg z-10">{item.emoji}</span>
                  ) : item.icon ? (
                    <div className="w-5 h-5 text-[#A78BFA]">{item.icon}</div>
                  ) : null)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//
// ─── DESKTOP ───────────────────────────────────────────────
//
const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        `mx-auto hidden h-20 items-end gap-6 rounded-3xl px-6 pb-4 md:flex
        bg-[#05070D]/80 backdrop-blur-xl
        border border-white/5
        shadow-[0_12px_40px_rgba(0,0,0,0.5)]`,
        className,
      )}
    >
      {items.map((item) => (
        <div className="dock-item" key={item.title}>
          <IconContainer mouseX={mouseX} {...item} />
        </div>
      ))}
    </motion.div>
  );
};

//
// ─── ICON CONTAINER (FIXED) ────────────────────────────────
//
function IconContainer({
  mouseX,
  title,
  icon,
  href,
  video,
  emoji,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  href?: string;
  icon?: React.ReactNode;
  video?: string;
  emoji?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);

  const isVideo = !!video;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(
      distance,
      [-150, 0, 150],
      isVideo ? [70, 120, 70] : [48, 90, 48],
    ),
    { stiffness: 150, damping: 12 },
  );

  const height = width;

  const iconSize = useSpring(
    useTransform(distance, [-150, 0, 150], [22, 44, 22]),
    { stiffness: 150, damping: 12 },
  );

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        } else if (href) {
          window.location.href = href;
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "cursor-pointer active:scale-95 transition-transform relative flex items-center justify-center overflow-hidden border border-white/5",
        isVideo
          ? "rounded-2xl bg-black shadow-[0_0_40px_rgba(124,158,255,0.25)] -translate-y-1.5"
          : "rounded-xl bg-[#05070D]",
      )}
    >
      {video && (
        <motion.video
          ref={videoRef}
          src={video}
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            setReady(true);
            videoRef.current?.play().catch(() => {});
          }}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 0.6 : 0 }}
        />
      )}

      {!isVideo &&
        (emoji ? (
          <motion.div style={{ fontSize: iconSize }} className="z-10">
            {emoji}
          </motion.div>
        ) : icon ? (
          <motion.div
            style={{ width: iconSize, height: iconSize }}
            className="z-10 flex items-center justify-center text-[#A78BFA] hover:text-[#7C9EFF]"
          >
            {icon}
          </motion.div>
        ) : null)}

      <AnimatePresence>
        {hovered && !isVideo && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-10 left-1/2 px-2 py-1 text-xs rounded-md bg-[#0B0F1A] border border-white/5 text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
