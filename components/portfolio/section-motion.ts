"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";

export function useSectionMotion(container: RefObject<HTMLDivElement | null>, route: string, open: boolean) {
  useLayoutEffect(() => {
    if (!open || !container.current) return;
    const media = gsap.matchMedia(container.current);
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const select = gsap.utils.selector(container.current);
      // Original rise-in, BubbleMenu back easing, and StaggeredMenu label motion.
      gsap.fromTo(select(".section-intro, .project-detail > h1, .project-detail > .intro-text"),
        { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out" });
      gsap.fromTo(select(".project-row, .cardio-row, .skill-group"),
        { scale: 0, opacity: 0, y: 24, transformOrigin: "50% 50%" },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "back.out(1.5)" });
      gsap.fromTo(select(".experience-entry, .education-list > article, .story-block"),
        { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" });
      gsap.fromTo(select(".contact-list > a > div"),
        { yPercent: 140, rotation: 10, opacity: 0 },
        { yPercent: 0, rotation: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" });
    });
    return () => media.revert();
  }, [container, route, open]);
}
