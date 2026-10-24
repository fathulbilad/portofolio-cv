"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";
import type { LabSection } from "@/lib/lab";
import { musicInkContours, projectInkContours, roomInkContours } from "@/lib/lab-ink-contours";
import styles from "./lab.module.css";

// Matching cubic segments let every contour morph directly into every other one.
// The shared right edge keeps the menu on solid ink throughout the animation.
const menuContours: Record<LabSection, string> = {
  life: "M570-100C620-30 700 0 690 80C680 150 595 160 545 230C485 310 465 350 500 390C535 445 690 445 700 510C710 575 635 600 630 650C625 710 670 730 660 790C650 850 615 865 655 910C700 965 720 1000 720 1040L1660 1040L1660-100Z",
  games: "M650-100C630-30 600 30 570 90C600 110 630 130 660 150C600 210 540 270 480 330C530 355 580 380 630 405C590 450 550 495 510 540C560 565 610 590 660 615C620 675 580 735 540 795C600 875 660 955 720 1040L1660 1040L1660-100Z",
  music: "M560-100C530-40 500 20 480 80C455 150 490 200 570 250C635 290 690 315 695 380C705 440 620 480 565 520C500 570 470 620 500 680C520 730 610 745 660 800C705 840 700 885 670 930C645 970 640 1000 640 1040L1660 1040L1660-100Z",
  projects: "M590-100C620-40 650 20 680 80C680 130 680 180 680 230C620 290 560 350 500 410C550 430 600 450 650 470C650 530 650 590 650 650C600 700 550 750 500 800C550 820 600 840 650 860C680 920 710 980 740 1040L1660 1040L1660-100Z",
  odds: "M630-100C670-30 685 20 650 80C620 140 525 145 515 220C500 300 470 325 520 390C560 440 655 435 660 500C665 555 580 570 585 630C590 685 670 675 680 740C690 800 625 815 650 880C675 940 725 975 730 1040L1660 1040L1660-100Z",
};

const subscribeVisibility = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};
const readVisible = () => !document.hidden;
const serverVisible = () => true;

export function LabInk({ section, mood, animated, musicPlaying = false }: { section: LabSection | null; mood: LabSection; animated: boolean; musicPlaying?: boolean }) {
  const visible = useSyncExternalStore(subscribeVisibility, readVisible, serverVisible);
  const moving = animated && visible && (section === "projects" || (section === "music" && musicPlaying));
  const contour = section ? roomInkContours[section] : menuContours[mood];
  const path = useMotionValue(contour);

  useEffect(() => {
    let active = true;
    let cycle: ReturnType<typeof animate> | undefined;
    const cycleOptions = { duration: 8, ease: "easeInOut" as const, repeat: Infinity };
    const entry = moving && section === "music"
      ? animate(path, musicInkContours, cycleOptions)
      : animate(path, contour, { duration: animated && visible ? (section === "music" || section === "projects" ? 0.85 : 0.65) : 0, ease: [0.45, 0, 0.25, 1] });
    if (moving && section === "projects") {
      // Finish turning into the full-width sweep before starting its idle cycle.
      // Cancelling both phases prevents an old loop from restarting after exit.
      void entry.then(() => {
        if (active) cycle = animate(path, projectInkContours, cycleOptions);
      });
    }
    return () => { active = false; entry.stop(); cycle?.stop(); };
  }, [animated, contour, moving, path, section, visible]);

  return <svg className={`${styles.ink} ${section === "life" ? styles.lifeInk : ""}`} data-ink-shape={section ? `room-${section}` : mood} data-ink-motion={moving ? (section === "projects" ? "sweeping" : "playing") : "resting"} viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <motion.path id="lab-ink-path" d={path} />
      <pattern id="lab-ink-dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><circle cx="4" cy="4" r="2.7" fill="#111011" /></pattern>
      <filter id="lab-ink-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="18" /></filter>
      <mask id="lab-ink-edge"><use href="#lab-ink-path" fill="white" stroke="white" strokeWidth="67" filter="url(#lab-ink-blur)" /></mask>
      <clipPath id="lab-record-clip"><use href="#lab-ink-path" /></clipPath>
    </defs>
    <rect x="0" y="0" width="1440" height="900" fill="url(#lab-ink-dots)" mask="url(#lab-ink-edge)" />
    <use href="#lab-ink-path" fill="#111011" />
    {section === "music" && <motion.g className={styles.musicGrooves} clipPath="url(#lab-record-clip)" fill="none" stroke="#a7e5ff" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 0.035 }} transition={{ duration: animated ? 0.65 : 0 }}>
      {[100, 170, 240, 310, 380, 450].map(radius => <ellipse key={radius} cx="890" cy="530" rx={radius} ry={radius * 0.71} transform="rotate(-8 890 530)" />)}
    </motion.g>}
  </svg>;
}
