"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const SystemCore = dynamic(
  () => import("@/components/ui/system-core"),
  { ssr: false },
);

const PipelineFlow = dynamic(
  () => import("@/components/ui/pipeline-flow"),
  { ssr: false },
);
import useMobileLayout from "@/hooks/useMobileLayout";
import { useLanguage } from "@/contexts/language-context";
import { useLenis } from "@/contexts/lenis-context";

gsap.registerPlugin(ScrollTrigger);

const skillCardMeta = [
  { number: "01", color: "#7C9EFF", rgb: "124,158,255" },
  { number: "02", color: "#A78BFA", rgb: "167,139,250" },
  { number: "03", color: "#38BDF8", rgb: "56,189,248" },
  { number: "04", color: "#F97316", rgb: "249,115,22" },
  { number: "05", color: "#22C55E", rgb: "34,197,94" },
  { number: "06", color: "#EAB308", rgb: "234,179,8" },
  { number: "07", color: "#EC4899", rgb: "236,72,153" },
  { number: "08", color: "#14B8A6", rgb: "20,184,166" },
];

const workCardMeta = [
  {
    title: "Bank Indonesia Internal Platform",
    period: "Apr 2026 — Present",
    tag: "Platform · Security",
    color: "#38BDF8",
    rgb: "56,189,248",
  },
  {
    title: "Telkomsel Deployment Platform",
    period: "Jan 2026 — Jun 2026",
    tag: "Platform · DevOps",
    color: "#7C9EFF",
    rgb: "124,158,255",
  },
  {
    title: "CIMB DevOps Pipeline (PoC)",
    period: "Dec 2025 — Jan 2026",
    tag: "DevOps · CI/CD",
    color: "#F97316",
    rgb: "249,115,22",
  },
  {
    title: "Bank DKI Recruitment System",
    period: "Jul 2025 — Dec 2025",
    tag: "Dashboard · Internal System",
    color: "#A78BFA",
    rgb: "167,139,250",
  },
  {
    title: "Kredit Plus Mobile Support",
    period: "Jun 2025 — Jul 2025",
    tag: "Mobile · Support",
    color: "#7C9EFF",
    rgb: "124,158,255",
  },
  {
    title: "Indosat PMIS Platform",
    period: "Nov 2022 — Jun 2025",
    tag: "Enterprise · System",
    color: "#F97316",
    rgb: "249,115,22",
  },
  {
    title: "Astra CMS & Website",
    period: "Aug 2023 — Oct 2024",
    tag: "CMS · Web",
    color: "#A78BFA",
    rgb: "167,139,250",
  },
  {
    title: "Dexa Medica DevOps Platform",
    period: "Nov 2021 — Nov 2022",
    tag: "DevOps · Platform",
    color: "#7C9EFF",
    rgb: "124,158,255",
  },
];

const SECTION_BASE =
  "relative overflow-hidden flex flex-col justify-center px-6 md:px-20";
const HEADING = "font-black leading-[0.9] tracking-tight";
const LABEL = "text-sm font-mono tracking-[0.3em] uppercase mb-6 md:mb-8";
const SG = { fontFamily: "'Space Grotesk', sans-serif" } as const;

function SectionLabel({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: string;
}) {
  return (
    <p className={LABEL} style={{ color }}>
      {number} — {label}
    </p>
  );
}

function Blob({ className, color }: { className: string; color: string }) {
  return (
    <div
      className={`blob rounded-full pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
function Marquee({
  children,
  dim,
}: {
  children: React.ReactNode;
  dim?: boolean;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 py-3 md:py-4">
      <div className="marquee-inner flex whitespace-nowrap gap-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm font-mono tracking-[0.25em] uppercase flex-shrink-0 ${dim ? "text-white/15" : "text-white/20"}`}
          >
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function AboutPage() {
  const { t, lang, toggleLang } = useLanguage();
  const { scrollTo } = useLenis();
  const pageRef = useRef<HTMLDivElement>(null);
  const navDotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const stackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileLayout();
  const marqueeAnimations = useRef<gsap.core.Tween[]>([]);

  const sections = t.sections;
  const skillCards = t.stack.cards.map((card, i) => ({
    ...card,
    number: skillCardMeta[i].number,
    color: skillCardMeta[i].color,
    rgb: skillCardMeta[i].rgb,
  }));
  const workCards = t.work.cards.map((card, i) => ({
    ...card,
    title: workCardMeta[i].title,
    period: workCardMeta[i].period,
    tag: workCardMeta[i].tag,
    color: workCardMeta[i].color,
    rgb: workCardMeta[i].rgb,
  }));

  const activateDot = (active: number) => {
    navDotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.width = i === active ? "24px" : "8px";
      dot.style.borderRadius = i === active ? "4px" : "50%";
      dot.style.opacity = i === active ? "1" : "0.3";
    });
  };

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const heroSection = page.querySelector<HTMLElement>("#hero");
      const scText = heroSection?.querySelector<HTMLElement>(".sc-text");
      const heroLabel = scText?.querySelector<HTMLElement>(":scope > p");
      const heroHeading = scText?.querySelector<HTMLElement>(".split-heading");
      const heroStats = scText?.querySelector<HTMLElement>(
        ":scope > div:nth-child(3)",
      );
      const heroBody = scText?.querySelector<HTMLElement>(
        ":scope > p:last-of-type",
      );
      const heroBadge = scText?.querySelector<HTMLElement>(
        ":scope > div:last-child",
      );

      if (heroLabel) gsap.set(heroLabel, { opacity: 0, y: 16 });
      if (heroHeading) gsap.set(heroHeading, { opacity: 0 });
      if (heroStats) gsap.set(heroStats, { opacity: 0, y: 20 });
      if (heroBody) gsap.set(heroBody, { opacity: 0, y: 20 });
      if (heroBadge) gsap.set(heroBadge, { opacity: 0, y: 12 });

      gsap.utils.toArray<HTMLElement>(".sc-text").forEach((el) => {
        if (el.closest("#hero")) return;
        gsap.set(el, { opacity: 0, y: 40 });
      });
      gsap.utils.toArray<HTMLElement>(".split-heading").forEach((el) => {
        if (el.closest("#hero")) return;
        gsap.set(el, { opacity: 0 });
      });

      gsap.set(page, { visibility: "visible" });

      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: initScrollAnimations,
      });

      if (heroLabel) {
        tl.to(
          heroLabel,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0,
        );
      }
      tl.add(() => {
        if (!heroHeading) return;

        if (isMobile) {
          gsap.set(heroHeading, { opacity: 1 });
          return;
        }

        if (heroHeading.dataset.split === "true") return;
        heroHeading.dataset.split = "true";

        const lines = Array.from(heroHeading.children);
        heroHeading.innerHTML = "";
        lines.forEach((line) => {
          const lineWrapper = document.createElement("div");
          lineWrapper.style.display = "block";
          (line.textContent || "").split("").forEach((ch) => {
            const span = document.createElement("span");
            span.innerHTML = ch === " " ? "&nbsp;" : ch;
            span.style.display = "inline-block";
            lineWrapper.appendChild(span);
          });
          heroHeading.appendChild(lineWrapper);
        });
        gsap.set(heroHeading, { opacity: 1 });
        gsap.fromTo(
          heroHeading.querySelectorAll("span"),
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.022,
            duration: 0.6,
            ease: "power4.out",
          },
        );
      }, 0.15);
      if (heroStats) {
        tl.to(
          heroStats,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.5,
        );
      }

      if (heroBody) {
        tl.to(
          heroBody,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.62,
        );
      }

      if (heroBadge) {
        tl.to(
          heroBadge,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.74,
        );
      }
    }, pageRef);

    function initScrollAnimations() {
      sections.forEach((s, i) => {
        ScrollTrigger.create({
          trigger: `#${s.id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => activateDot(i),
          onEnterBack: () => activateDot(i),
        });
      });

      gsap.utils.toArray<HTMLElement>(".sc-text").forEach((el) => {
        if (el.closest("#hero")) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      marqueeAnimations.current.forEach((t) => t.kill());
      marqueeAnimations.current = [];

      gsap.utils.toArray<HTMLElement>(".marquee-inner").forEach((el) => {
        const tween = gsap.to(el, {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
        marqueeAnimations.current.push(tween);
      });

      gsap.utils.toArray<HTMLElement>(".split-heading").forEach((el) => {
        if (el.closest("#hero")) return;

        if (el.dataset.split === "true") return;
        el.dataset.split = "true";

        const text = el.innerText;
        const lines = text.split("\n");

        el.innerHTML = "";

        lines.forEach((line) => {
          const lineWrapper = document.createElement("div");
          lineWrapper.style.display = "block";

          line.split("").forEach((ch) => {
            const span = document.createElement("span");
            span.innerHTML = ch === " " ? "&nbsp;" : ch;
            span.style.display = "inline-block";
            lineWrapper.appendChild(span);
          });

          el.appendChild(lineWrapper);
        });

        gsap.set(el, { opacity: 1 });

        gsap.fromTo(
          el.querySelectorAll("span"),
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.7,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      if (!isMobile) {
        gsap.utils.toArray<HTMLElement>(".blob").forEach((el) => {
          gsap.to(el, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      ScrollTrigger.refresh();
    }

    return () => {
      ctx.revert();
      marqueeAnimations.current.forEach((tween) => tween.kill());
      marqueeAnimations.current = [];
    };
  }, [isMobile, lang, sections]);

  return (
    <div
      ref={pageRef}
      data-gsap-root
      className="relative text-white font-sans overflow-x-hidden"
    >
      {/* LANGUAGE TOGGLE */}
      <button
        onClick={toggleLang}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 px-3 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase border transition-all duration-300 hover:scale-105"
        style={{
          borderColor: "rgba(167,139,250,0.4)",
          background: "rgba(167,139,250,0.1)",
          color: "#A78BFA",
        }}
      >
        {lang === "en" ? "ID" : "EN"}
      </button>

      <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-end">
        {sections.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              navDotsRef.current[i] = el;
            }}
            onClick={() => {
              scrollTo(`#${s.id}`, { duration: 1.2 });
            }}
            title={s.label}
            style={{
              width: i === 0 ? "24px" : "8px",
              height: "8px",
              borderRadius: i === 0 ? "4px" : "50%",
              backgroundColor: s.accent,
              opacity: i === 0 ? 1 : 0.3,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </nav>

      {/* ── SECTION 1 — HERO ── */}
      <section
        id="hero"
        className="relative h-screen overflow-hidden px-6 md:px-20 flex items-end pb-20 md:pb-24"
      >
        <SystemCore />

        <Blob
          className="absolute top-1/4 -right-1/4 md:-right-[10%] size-[300px] md:size-[500px]"
          color="rgba(124,158,255,0.15)"
        />

        <div className="sc-text max-w-4xl md:max-w-6xl relative z-10">
          <SectionLabel number="01" label={t.sectionLabels[0]} color="#7C9EFF" />

          {/* 🔥 FIXED HEADING */}
          <h3
            key={lang}
            className={`
              split-heading ${HEADING}
              text-[clamp(2.2rem,9vw,5.5rem)]
              leading-[1.05] md:leading-[0.9]
              mb-6
              max-w-[90%] md:max-w-none
            `}
            style={{
              ...SG,
              textShadow: "0 0 60px rgba(124,158,255,0.15)",
              textWrap: "balance",
            }}
          >
            <span className="block text-white/30">{t.hero.heading1}</span>
            <span className="block text-white">{t.hero.heading2}</span>
          </h3>

          {/* 🔧 LABEL */}
          <p className="text-[12px] md:text-[14px] font-mono tracking-[0.25em] md:tracking-[0.3em] uppercase text-white/30 mb-5 md:mb-6">
            {t.hero.sublabel}
          </p>

          <p className="text-base md:text-3xl text-white/60 leading-relaxed max-w-[90%] md:max-w-lg">
            {t.hero.body}
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={() => {
                scrollTo("#work", { duration: 1.6 });
              }}
              className="
                group relative px-6 py-3 rounded-full
                font-mono text-sm tracking-widest uppercase
                transition-all duration-300
                text-black
              "
              style={{
                background: "#A5D8FF",
                boxShadow: "0 0 20px rgba(165,216,255,0.25)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.cta}
              </span>

              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                  background: "linear-gradient(120deg, #A5D8FF, #9D86FF)",
                  filter: "blur(12px)",
                }}
              />
            </button>

            {/* SECONDARY CTA */}
            <a
              href="/Fathul_Bilad_CV_Cert.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-6 py-3 rounded-full
                font-mono text-sm tracking-widest uppercase
                transition-all duration-300
                text-white/80 hover:text-white
                border
              "
              style={{
                borderColor: "rgba(157,134,255,0.4)",
                background: "rgba(157,134,255,0.08)",
              }}
            >
              {t.hero.resume}
            </a>
          </div>

          {/* STATUS */}
          <div className="mt-6 md:mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#7C9EFF]/30 bg-[#7C9EFF]/05">
            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/60">
              {t.hero.status}
            </span>
          </div>
        </div>

        {/* DESKTOP SIDE PANEL */}
        <div className="absolute right-10 md:right-20 bottom-24 hidden md:block z-10">
          <div className="system-panel backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 w-56">
            <p className="text-xl text-white/40 mb-2">{t.hero.focusTitle}</p>
            <p className="text-lg font-semibold leading-snug text-white">
              {t.hero.focusDesc}
            </p>
          </div>
        </div>

        <Marquee>
          {t.hero.marquee}&nbsp;
        </Marquee>
      </section>

      {/* ── SECTION 2 — WORK (ScrollStack) ── */}
      <section id="work" className="relative py-32">
        <PipelineFlow />
        <div className="px-6 md:px-20 mb-20">
          <SectionLabel number="02" label={t.sectionLabels[1]} color="#F97316" />

          <h4
            key={lang}
            className={`split-heading ${HEADING} text-[clamp(2.4rem,7vw,5.2rem)]`}
            style={SG}
          >
            <span className="block">{t.work.heading1}</span>
            <span className="block" style={{ color: "#F97316" }}>
              {t.work.heading2}
            </span>
          </h4>
          <p className="text-xs md:text-sm font-mono tracking-wider text-white/30 mt-4">
            {t.work.employer}
          </p>
        </div>

        <div ref={stackRef} className="relative">
          <div className="scroll-stack-inner pt-[0vh] pb-[10vh] flex flex-col items-center">
            {workCards.map((card, i) => (
              <WorkStackCard key={card.title} card={card} index={i} totalCards={workCards.length} />
            ))}

            <div className="scroll-stack-end h-[1px]" />
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — STACK ── */}
      <section
        id="stack"
        className={`${SECTION_BASE} min-h-screen py-24 md:py-32`}
      >
        <Blob
          className="absolute bottom-1/4 -left-1/4 md:-left-[15%] size-[300px] md:size-[600px]"
          color="rgba(167,139,250,0.12)"
        />

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[80%]"
            style={{
              background:
                "radial-gradient(circle at 70% 50%, rgba(167,139,250,0.08), transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full">
          {/* HEADER */}
          <div className="sc-text mb-16 md:mb-24 max-w-3xl">
            <SectionLabel number="03" label={t.sectionLabels[2]} color="#A78BFA" />

            <h2
              key={lang}
              className={`split-heading ${HEADING} text-[clamp(3rem,10vw,8rem)]`}
              style={SG}
            >
              {t.stack.heading1}
              <br />
              <span style={{ color: "#A78BFA" }}>{t.stack.heading2}</span>
            </h2>

            <p className="text-white/40 text-xl md:text-2xl leading-relaxed mt-6 max-w-md">
              {t.stack.body}
            </p>
          </div>

          {/* GRID */}
          <div className="sc-text grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {skillCards.map((card) => (
              <div
                key={card.title}
                className="
                  group relative
                  p-6 md:p-8
                  border border-white/[0.06]
                  rounded-2xl
                  transition-all duration-300
                  hover:border-white/20
                  hover:scale-[1.015]
                  overflow-hidden
                "
                style={{
                  background: "rgba(10,12,20,0.75)",
                  transform: "translateZ(0)",
                }}
              >
                {/* GLOW */}
                <div
                  className="
                    absolute inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                    pointer-events-none
                    will-change-transform
                  "
                  style={{
                    background: `radial-gradient(600px circle at 20% 20%, ${card.color}18, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <p
                    className="text-[11px] font-mono tracking-widest uppercase mb-3"
                    style={{ color: `${card.color}CC` }}
                  >
                    {card.subtitle}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                    {card.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <span
                        key={item}
                        className="
                          px-3 py-1
                          rounded-full
                          text-[14px]
                          font-mono
                          border
                          transition-all duration-200
                        "
                        style={{
                          color: `${card.color}CC`,
                          borderColor: `${card.color}25`,
                          background: `rgba(${card.rgb},0.08)`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CREDENTIALS ── */}
      <section
        id="credentials"
        className={`${SECTION_BASE} min-h-screen py-24 md:py-32`}
      >
        <Blob
          className="absolute top-1/4 -right-1/4 md:-right-[10%] size-[320px] md:size-[620px]"
          color="rgba(56,189,248,0.1)"
        />

        <div className="sc-text relative z-10 w-full max-w-6xl mx-auto">
          <SectionLabel number="04" label={t.sectionLabels[3]} color="#38BDF8" />
          <h2
            key={lang}
            className={`split-heading ${HEADING} text-[clamp(3rem,9vw,7rem)] mb-12 md:mb-16`}
            style={SG}
          >
            <span className="block">{t.credentials.heading1}</span>
            <span className="block" style={{ color: "#38BDF8" }}>
              {t.credentials.heading2}
            </span>
          </h2>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#38BDF8] mb-6">
                {t.credentials.education}
              </p>
              <div className="space-y-7">
                {t.credentials.schools.map((school) => (
                  <div key={school.institution}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                      <h3 className="text-xl md:text-2xl font-semibold">{school.institution}</h3>
                      <span className="text-sm text-white/40">{school.location}</span>
                    </div>
                    <p className="text-white/70 mt-1">{school.program}</p>
                    <p className="text-sm text-white/40 mt-1">{school.graduation}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#38BDF8] mt-10 mb-4">
                {t.credentials.languages}
              </p>
              <div className="flex flex-wrap gap-3">
                {t.credentials.languageItems.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#38BDF8] mb-6">
                {t.credentials.certificates}
              </p>
              <ul className="space-y-4">
                {t.credentials.certificateItems.map((item, index) => (
                  <li key={item} className="flex gap-4 text-white/75">
                    <span className="font-mono text-[#38BDF8]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — CONTACT ── */}
      <section
        id="contact"
        className={`${SECTION_BASE} min-h-screen md:h-screen`}
      >
        {/* BACKGROUND BLOB */}
        <Blob
          className="absolute top-1/3 -right-1/4 md:-right-[5%] size-[300px] md:size-[700px]"
          color="rgba(167,139,250,0.1)"
        />

        {/* ── CENTER HERO ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
          <div className="sc-text max-w-3xl">
            <SectionLabel number="05" label={t.sectionLabels[4]} color="#A78BFA" />

            <h2
              key={lang}
              className={`split-heading ${HEADING} text-[clamp(4rem,14vw,10rem)] mb-6`}
              style={SG}
            >
              {t.contact.heading1}
              <br />
              <span style={{ color: "#A78BFA" }}>{t.contact.heading2}</span>
            </h2>

            <p className="text-white/50 text-lg md:text-xl max-w-sm mx-auto mb-8">
              {t.contact.body}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:fathulbilad@gmail.com"
                className="group px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase transition-all duration-300"
                style={{ background: "#A78BFA", color: "#05070D" }}
              >
                {t.contact.cta}
              </a>

              <a
                href="/Fathul_Bilad_CV_Cert.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase border border-white/10 text-white/60 hover:border-white/40 hover:text-white transition"
              >
                {t.contact.resume}
              </a>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <Marquee dim>
          {t.contact.marquee}&nbsp;
        </Marquee>
      </section>
    </div>
  );
}

const WorkStackCard = React.memo(function WorkStackCard({
  card,
  index,
  totalCards,
}: {
  card: {
    title: string;
    period: string;
    tag: string;
    color: string;
    rgb: string;
    problem: string;
    architecture: string[];
    decisions: string[];
    impact: string[];
  };
  index: number;
  totalCards: number;
}) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.innerWidth < 768) {
      gsap.set(el, {
        y: 0,
        scale: 1,
      });
      return;
    }

    const compressedScale = 0.80 + (index / totalCards) * 0.10;

    gsap.set(el, {
      scale: compressedScale,
      y: index * 5,
      zIndex: 10 + index,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,

      onUpdate: (self) => {
        const progress = self.progress;
        const eased = 1 - Math.pow(1 - progress, 3);

        const scale = compressedScale + eased * (1 - compressedScale);
        const y = index * 5 - eased * index * 5;

        el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
      },
    });

    return () => trigger.kill();
  }, [index, totalCards]);

  return (
    <div
      ref={ref}
      className="
        relative
        w-[94vw] md:w-[88vw]
        max-w-[1600px]
        min-h-[38vh] md:min-h-[58vh]
        my-2 md:my-6
        p-6 sm:p-8 md:p-16 lg:p-24
        rounded-2xl md:rounded-[32px]
        border
      "
      style={{
        background: `rgba(${card.rgb},0.08)`,
        borderColor: `rgba(${card.rgb},0.25)`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-0 mb-6 md:mb-12">
        {/* LEFT */}
        <div className="max-w-full md:max-w-4xl">
          <p
            className="text-[10px] sm:text-xs md:text-base font-mono uppercase mb-2 md:mb-4 tracking-[0.2em]"
            style={{ color: card.color }}
          >
            {card.tag}
          </p>

          <h3
            className="
            text-2xl sm:text-3xl
            md:text-6xl lg:text-8xl
            font-black leading-[1.1]
          "
          >
            {card.title}
          </h3>

          <p className="text-sm sm:text-sm md:text-lg text-white/50 mt-3 md:mt-6 font-mono tracking-wider">
            {card.period}
          </p>
        </div>

        {/* RIGHT NUMBER */}
        <span
          className="
          absolute right-4 top-4
          md:static
          text-4xl sm:text-5xl
          md:text-[120px] lg:text-[220px]
          font-black text-white/10 md:text-white/5
          leading-none
        "
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col gap-4 md:gap-10">
        {/* PROBLEM */}
        <div>
          <p className="text-[15px] sm:text-xl md:text-2xl font-mono text-white/40 mb-2 md:mb-4 tracking-[0.2em]">
            {t.work.cardLabels.problem}
          </p>

          <p
            className="
            text-lg sm:text-base
            md:text-2xl
            text-white/75 leading-relaxed
            max-w-full md:max-w-4xl
          "
          >
            {card.problem}
          </p>
        </div>

        {/* GRID */}
        <div
          className="
          grid grid-cols-1
          sm:grid-cols-1
          md:grid-cols-3
          gap-4 sm:gap-4 md:gap-10
        "
        >
          {/* ARCH */}
          <div>
            <p className="text-[15px] sm:text-lg md:text-lg text-white/40 mb-2 md:mb-5 tracking-[0.2em]">
              {t.work.cardLabels.architecture}
            </p>
            {card.architecture.map((i) => (
              <p
                key={i}
                className="text-lg sm:text-base md:text-2xl text-white/70 leading-relaxed"
              >
                {i}
              </p>
            ))}
          </div>

          {/* DECISIONS */}
          <div>
            <p className="text-[15px] sm:text-lg md:text-lg text-white/40 mb-2 md:mb-5 tracking-[0.2em]">
              {t.work.cardLabels.decisions}
            </p>
            {card.decisions.map((i) => (
              <p
                key={i}
                className="text-lg sm:text-base md:text-2xl text-white/70 leading-relaxed"
              >
                {i}
              </p>
            ))}
          </div>

          {/* IMPACT */}
          <div>
            <p className="text-[15px] sm:text-lg md:text-xl text-white/40 mb-2 md:mb-5 tracking-[0.2em]">
              {t.work.cardLabels.impact}
            </p>
            {card.impact.map((i) => (
              <p
                key={i}
                className="text-lg sm:text-base md:text-2xl text-white/70 leading-relaxed"
              >
                {i}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
