"use client";

import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import type { LabSection } from "@/lib/lab";
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

const musicContour = "M540-150C620 50 635 170 550 300 460 440 570 480 555 640 530 780 615 880 600 1030L1660 1030 1660-150Z";
// An independent, slow contour cycle, activated by Spotify playback state only.
// The same path drives the solid fill and halftone edge; no audio is analyzed.
const musicContours = [
  musicContour,
  "M540-150C595 40 660 175 565 305 485 430 535 500 570 640 555 790 590 880 615 1030L1660 1030 1660-150Z",
  "M540-150C645 60 610 160 535 295 440 450 600 465 540 640 510 770 640 895 585 1030L1660 1030 1660-150Z",
  musicContour,
];
const subscribeVisibility = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};
const readVisible = () => !document.hidden;
const serverVisible = () => true;

export function LabInk({ section, mood, animated, musicPlaying = false }: { section: LabSection | null; mood: LabSection; animated: boolean; musicPlaying?: boolean }) {
  const visible = useSyncExternalStore(subscribeVisibility, readVisible, serverVisible);
  const moving = section === "music" && musicPlaying && animated && visible;
  const roomContour = section === "games" ? "M-100-150H1660V1040H-100Z" : section === "life"
    ? "M465-180C600-30 785 130 1015 5L1445-150 1660-140 1650 1020C1420 1020 1310 985 1205 830 1095 690 820 795 724 650 632 513 440 570 485 385 527 216 685 230 628 95 578-25 390-110 465-180Z"
    : musicContour;

  return <svg className={`${styles.ink} ${section === "life" ? styles.lifeInk : ""}`} data-ink-shape={section ? `room-${section}` : mood} data-ink-motion={moving ? "playing" : "resting"} viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      {section === "music" ? <motion.path key="music-room" id="lab-ink-path" initial={false}
        animate={{ d: moving ? musicContours : musicContour }}
        transition={moving ? { duration: 8, ease: "easeInOut", repeat: Infinity } : { duration: animated && visible ? 0.85 : 0, ease: [0.22, 1, 0.36, 1] }} /> : section ? <path id="lab-ink-path" d={roomContour} /> : <motion.path id="lab-ink-path"
        initial={false} animate={{ d: menuContours[mood] }}
        transition={{ duration: animated ? 0.65 : 0, ease: [0.45, 0, 0.25, 1] }} />}
      <pattern id="lab-ink-dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><circle cx="4" cy="4" r="2.7" fill="#111011" /></pattern>
      <filter id="lab-ink-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="18" /></filter>
      <mask id="lab-ink-edge"><use href="#lab-ink-path" fill="white" stroke="white" strokeWidth="67" filter="url(#lab-ink-blur)" /></mask>
    </defs>
    <rect x="0" y="0" width="1440" height="900" fill="url(#lab-ink-dots)" mask="url(#lab-ink-edge)" />
    <use href="#lab-ink-path" fill="#111011" />
  </svg>;
}
