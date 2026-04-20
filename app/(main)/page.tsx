"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SystemCore from "@/components/ui/system-core";
import PipelineFlow from "@/components/ui/pipeline-flow";
import useMobileLayout from "@/hooks/useMobileLayout";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "hero", label: "01 — Intro", accent: "#7C9EFF" },
  { id: "work", label: "02 — Work", accent: "#F97316" },
  { id: "stack", label: "03 — Stack", accent: "#A78BFA" },
  { id: "contact", label: "04 — Contact", accent: "#A78BFA" },
];

const skillCards = [
  {
    number: "01",
    title: "Frontend",
    subtitle: "Framework · Rendering · UI",
    items: [
      "Next.js",
      "React",
      "Vue",
      "TypeScript",
      "Tailwind",
      "GSAP",
      "SSR / CSR",
      "Performance Optimization",
    ],
    color: "#7C9EFF",
    rgb: "124,158,255",
  },
  {
    number: "02",
    title: "Backend & APIs",
    subtitle: "Runtime · Service · Auth",
    items: [
      "Node.js",
      "Express",
      "REST API",
      "Service Design",
      "Authentication",
      "Integration",
      "Performance Tuning",
    ],
    color: "#A78BFA",
    rgb: "167,139,250",
  },
  {
    number: "03",
    title: "Databases",
    subtitle: "Relational · Modeling · Query",
    items: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Schema Design",
      "Query Optimization",
      "Data Modeling",
    ],
    color: "#38BDF8",
    rgb: "56,189,248",
  },
  {
    number: "04",
    title: "DevOps",
    subtitle: "Pipeline · Container · Deploy",
    items: [
      "Docker",
      "Kubernetes",
      "GitLab CI",
      "Jenkins",
      "Harbor",
      "CI/CD Design",
      "Automation",
      "Environment Management",
    ],
    color: "#F97316",
    rgb: "249,115,22",
  },
  {
    number: "05",
    title: "Cloud",
    subtitle: "Infra · Storage · Deployment",
    items: ["GCP", "Azure", "Cloud Deployment", "Storage", "Cloud Integration"],
    color: "#22C55E",
    rgb: "34,197,94",
  },
  {
    number: "06",
    title: "Architecture",
    subtitle: "System · Flow · Design",
    items: [
      "System Design",
      "Microservices",
      "CI/CD Platform Architecture",
      "Data Flow Design",
      "Scalable Systems",
    ],
    color: "#EAB308",
    rgb: "234,179,8",
  },
  {
    number: "07",
    title: "Tools",
    subtitle: "Workflow · Quality · Delivery",
    items: [
      "GitHub",
      "GitLab",
      "Azure DevOps",
      "NGINX",
      "SonarQube",
      "Versioning",
      "Code Quality",
    ],
    color: "#EC4899",
    rgb: "236,72,153",
  },
  {
    number: "08",
    title: "Methodologies",
    subtitle: "Process · Structure · Delivery",
    items: [
      "Agile",
      "Scrum",
      "Kanban",
      "Atomic Design",
      "Iterative Delivery",
      "Scalable Frontend Architecture",
    ],
    color: "#14B8A6",
    rgb: "20,184,166",
  },
];

const workCards = [
  {
    title: "Telkomsel Deployment Platform",
    period: "Jan 2026 — Present",
    tag: "Platform · DevOps",
    color: "#7C9EFF",
    rgb: "124,158,255",

    problem:
      "Manual deployments created inconsistency, delays, and high operational risk across engineering teams.",

    architecture: [
      "Next.js Dashboard",
      "Internal API Gateway",
      "GitLab CI Pipelines",
      "Docker",
      "RBAC System",
    ],

    decisions: [
      "Abstracted CI/CD into UI-driven workflows",
      "Standardized deployment configs",
      "Designed scalable service integration layer",
    ],

    impact: [
      "↓ manual deployment steps",
      "↑ consistency across teams",
      "↑ engineering efficiency",
    ],
  },

  {
    title: "CIMB DevOps Pipeline (PoC)",
    period: "Dec 2025 — Jan 2026",
    tag: "DevOps · CI/CD",
    color: "#F97316",
    rgb: "249,115,22",

    problem:
      "Software delivery relied heavily on manual processes with limited automation and validation.",

    architecture: [
      "CI/CD Pipelines",
      "Automated Testing",
      "Environment Provisioning",
      "Build Automation",
    ],

    decisions: [
      "Introduced automated pipelines for validation",
      "Separated environments for safe testing",
      "Focused on reproducible deployments",
    ],

    impact: [
      "↓ manual workload",
      "↑ deployment reliability",
      "↑ delivery speed",
    ],
  },

  {
    title: "Bank DKI Recruitment System",
    period: "Jul 2025 — Dec 2025",
    tag: "Dashboard · Internal System",
    color: "#A78BFA",
    rgb: "167,139,250",

    problem:
      "Recruitment tracking was manual, inefficient, and lacked real-time visibility.",

    architecture: [
      "React Dashboard",
      "Auth System",
      "Backend API",
      "Real-time Monitoring",
    ],

    decisions: [
      "Built centralized admin dashboard",
      "Integrated authentication + role handling",
      "Optimized frontend performance",
    ],

    impact: [
      "↓ 80% manual tracking",
      "↑ visibility",
      "↑ operational efficiency",
    ],
  },

  {
    title: "Kredit Plus Mobile Support",
    period: "Jun 2025 — Jul 2025",
    tag: "Mobile · Support",
    color: "#7C9EFF",
    rgb: "124,158,255",

    problem:
      "Mobile development workflows needed stabilization and faster issue resolution.",

    architecture: ["Mobile App Support", "Dev Workflow Optimization"],

    decisions: ["Improved debugging flow", "Assisted development lifecycle"],

    impact: ["↑ dev efficiency", "↓ issue resolution time"],
  },

  {
    title: "Indosat Billing System (Lead Phase)",
    period: "Oct 2024 — Jun 2025",
    tag: "Fintech · System",
    color: "#F97316",
    rgb: "249,115,22",

    problem:
      "Supplier and billing systems suffered from slow queries and instability.",

    architecture: [
      "Node.js Backend",
      "React Frontend",
      "PostgreSQL",
      "API Services",
    ],

    decisions: [
      "Optimized database queries",
      "Improved service structure",
      "Focused on performance tuning",
    ],

    impact: ["↑ system performance", "↓ error rate", "↑ stability"],
  },

  {
    title: "Astra CMS & Website",
    period: "Aug 2023 — Oct 2024",
    tag: "CMS · Web",
    color: "#A78BFA",
    rgb: "167,139,250",

    problem:
      "CMS and website lacked performance and scalability for enterprise usage.",

    architecture: ["CMS System", "Public Website", "Content Tools"],

    decisions: [
      "Rebuilt CMS architecture",
      "Optimized frontend delivery",
      "Improved SEO structure",
    ],

    impact: ["↑ performance", "↑ SEO visibility", "↑ maintainability"],
  },

  {
    title: "Indosat Billing System (Initial Phase)",
    period: "Nov 2022 — Aug 2023",
    tag: "Fintech · System",
    color: "#F97316",
    rgb: "249,115,22",

    problem:
      "Initial system required reliable architecture for internal operations.",

    architecture: [
      "Fullstack System",
      "Database Optimization",
      "Deployment Flow",
    ],

    decisions: [
      "Built core system features",
      "Improved reliability early",
      "Supported production rollout",
    ],

    impact: ["↑ system reliability", "↑ internal operations efficiency"],
  },

  {
    title: "Dexa Medica DevOps Platform",
    period: "Nov 2021 — Nov 2022",
    tag: "DevOps · Platform",
    color: "#7C9EFF",
    rgb: "124,158,255",

    problem:
      "Deployment processes were slow, manual, and inconsistent across environments.",

    architecture: [
      "CI/CD Pipelines",
      "Docker",
      "System Integration",
      "Web Platform",
    ],

    decisions: [
      "Automated deployment pipelines",
      "Standardized environments",
      "Integrated services securely",
    ],

    impact: ["↓ 50% deployment time", "↑ deployment consistency"],
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
  const pageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const navDotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const stackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileLayout();

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

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

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

      tl.to(
        heroLabel,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0,
      );
      tl.add(() => {
        if (!heroHeading) return;

        if (isMobile) {
          gsap.set(heroHeading, { opacity: 1 });
          return;
        }

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
      tl.to(
        heroStats,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.5,
      );
      tl.to(
        heroBody,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.62,
      );
      tl.to(
        heroBadge,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.74,
      );
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

      gsap.utils.toArray<HTMLElement>(".marquee-inner").forEach((el) => {
        gsap.to(el, { xPercent: -50, duration: 20, ease: "none", repeat: -1 });
      });

      gsap.utils.toArray<HTMLElement>(".split-heading").forEach((el) => {
        if (el.closest("#hero")) return;

        // ✅ MOBILE: just show it (no animation)
        if (isMobile) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }

        // 💻 DESKTOP: full animation
        const lines = (el as HTMLElement).innerText.split("\n");

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
            scrollTrigger: { trigger: el, start: "top 90%" },
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
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
      (window as any).__lenis = null;
    };
  }, [isMobile]);

  return (
    <div
      ref={pageRef}
      data-gsap-root
      className="relative text-white font-sans overflow-x-hidden"
    >
      <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-end">
        {sections.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              navDotsRef.current[i] = el;
            }}
            onClick={() => scrollTo(s.id)}
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
          <SectionLabel number="01" label="Intro" color="#7C9EFF" />

          {/* 🔥 FIXED HEADING */}
          <h3
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
            <span className="block text-white/30">Systems That Actually</span>
            <span className="block text-white">Hold Up in Production</span>
          </h3>

          {/* 🔧 LABEL */}
          <p className="text-[12px] md:text-[14px] font-mono tracking-[0.25em] md:tracking-[0.3em] uppercase text-white/30 mb-5 md:mb-6">
            DEPLOYMENTS · PIPELINES · ARCHITECTURE
          </p>

          {/* 🔥 FIXED PARAGRAPH */}
          <p className="text-base md:text-3xl text-white/60 leading-relaxed max-w-[90%] md:max-w-lg">
            I build and scale systems used in real production — helping teams
            ship faster, reduce failures, and keep things running as they grow.
          </p>

          {/* 🔥 FIXED CTA SPACING */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
            {/* PRIMARY CTA */}
            <button
              onClick={() => {
                const lenis = (window as any).__lenis;
                lenis?.scrollTo("#work", { duration: 1.6 });
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
                See Work →
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
              href="https://drive.google.com/file/d/1JXA9puiGzrHeR6RucJd02MDnu8Krq7Oq/view?usp=sharing"
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
              View Resume →
            </a>
          </div>

          {/* STATUS */}
          <div className="mt-6 md:mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#7C9EFF]/30 bg-[#7C9EFF]/05">
            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/60">
              Open for high-impact work
            </span>
          </div>
        </div>

        {/* DESKTOP SIDE PANEL */}
        <div className="absolute right-10 md:right-20 bottom-24 hidden md:block z-10">
          <div className="system-panel backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 w-56">
            <p className="text-xl text-white/40 mb-2">Current Focus</p>
            <p className="text-lg font-semibold leading-snug text-white">
              Designing high-performance web systems <br />& scalable DevOps
              infrastructure
            </p>
          </div>
        </div>

        <Marquee>
          TECHNICAL CONSULTANT · FULLSTACK ENGINEER · NEXT.JS · NODE.JS · DEVOPS
          · ENTERPRISE SYSTEMS ·&nbsp;
        </Marquee>
      </section>

      {/* ── SECTION 2 — WORK (ScrollStack) ── */}
      <section id="work" className="relative py-32">
        <PipelineFlow />
        <div className="px-6 md:px-20 mb-20">
          <SectionLabel number="02" label="Selected Work" color="#F97316" />

          <h4
            className={`split-heading ${HEADING} text-[clamp(2.4rem,7vw,5.2rem)]`}
            style={SG}
          >
            <span className="block">Real Systems</span>
            <span className="block" style={{ color: "#F97316" }}>
              Built for Production
            </span>
          </h4>
        </div>

        <div ref={stackRef} className="relative">
          <div className="scroll-stack-inner pt-[20vh] pb-[60vh] flex flex-col items-center">
            {workCards.map((card, i) => (
              <WorkStackCard key={card.title} card={card} index={i} />
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
            <SectionLabel number="03" label="Tech Stack" color="#A78BFA" />

            <h2
              className={`split-heading ${HEADING} text-[clamp(3rem,10vw,8rem)]`}
              style={SG}
            >
              My
              <br />
              <span style={{ color: "#A78BFA" }}>Techstack</span>
            </h2>

            <p className="text-white/40 text-xl md:text-2xl leading-relaxed mt-6 max-w-md">
              I design and engineer production-grade systems — spanning
              frontend, backend, and infrastructure — built to scale, perform,
              and endure real-world usage.
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

      {/* ── SECTION 4 — CONTACT ── */}
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
            <SectionLabel number="04" label="Contact" color="#A78BFA" />

            <h2
              className={`split-heading ${HEADING} text-[clamp(4rem,14vw,10rem)] mb-6`}
              style={SG}
            >
              Let's
              <br />
              <span style={{ color: "#A78BFA" }}>Build</span>
            </h2>

            <p className="text-white/50 text-lg md:text-xl max-w-sm mx-auto mb-8">
              Building systems that scale, perform, and actually survive
              production.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:fathulbilad@gmail.com"
                className="group px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase transition-all duration-300"
                style={{ background: "#A78BFA", color: "#05070D" }}
              >
                Say Hello
                <span className="ml-2 group-hover:translate-x-1 inline-block transition">
                  →
                </span>
              </a>

              <a
                href="https://drive.google.com/file/d/1JXA9puiGzrHeR6RucJd02MDnu8Krq7Oq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-mono text-sm tracking-widest uppercase border border-white/10 text-white/60 hover:border-white/40 hover:text-white transition"
              >
                View Resume →
              </a>
            </div>
          </div>
        </div>

        {/* ── LEFT INFO (HR SAFE ZONE) ── */}
        <div className="absolute left-6 md:left-20 bottom-24 z-10">
          <div className="flex flex-col gap-2">
            {[
              {
                label: "Email",
                value: "fathulbilad@gmail.com",
                href: "mailto:fathulbilad@gmail.com",
              },
              {
                label: "Phone",
                value: "+62 821 2923 7828",
                href: "https://wa.me/6282129237828",
              },
              {
                label: "Location",
                value: "Depok, Indonesia",
                href: null,
              },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/25 w-14">
                  {c.label}
                </span>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-sm text-white/60 hover:text-white font-mono transition"
                  >
                    {c.value}
                  </a>
                ) : (
                  <span className="text-sm text-white/60 font-mono">
                    {c.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT BOTTOM (GLOBE SLOT) ── */}
        <div className="absolute right-10 md:right-20 bottom-24 z-0 pointer-events-none">
          <div className="w-[180px] h-[180px] rounded-full border border-white/5 opacity-20">
            {/* placeholder for globe */}
          </div>
        </div>

        {/* MARQUEE */}
        <Marquee dim>
          AVAILABLE FOR WORK · JAKARTA · REMOTE · FULLSTACK · DEVOPS ·
          ENTERPRISE SYSTEMS · LET'S BUILD ·&nbsp;
        </Marquee>
      </section>
    </div>
  );
}

function WorkStackCard({
  card,
  index,
}: {
  card: (typeof workCards)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const totalCards = workCards.length;

    gsap.set(el, {
      scale: 0.92 + index * 0.015,
      y: index * 60,
      zIndex: 10 + index,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,

      onUpdate: () => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        const center = rect.top + rect.height / 2;
        const progress = 1 - Math.min(Math.max(center / vh, 0), 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        const baseScale = 1 - (totalCards - index - 1) * 0.03;

        const scale = baseScale + eased * (1 - baseScale);
        const y = index * 60 - eased * index * 60;

        const blur = index < totalCards - 1 ? (1 - eased) * 2 : 0;

        el.style.transform = `
          translate3d(0, ${y}px, 0)
          scale(${scale})
        `;
        el.style.filter = `blur(${blur}px)`;
        el.style.zIndex = `${Math.round(200 + eased * 200 - index)}`;
      },
    });

    return () => trigger.kill();
  }, [index]);

  return (
    <div
      ref={ref}
      className="
        relative
        w-[92vw] md:w-[95vw]
        max-w-[1600px]
        min-h-[65vh] md:min-h-[75vh]
        my-16 md:my-32
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
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-0 mb-8 md:mb-12">
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
      <div className="flex flex-col gap-8 md:gap-16">
        {/* PROBLEM */}
        <div>
          <p className="text-[15px] sm:text-xl md:text-2xl font-mono text-white/40 mb-2 md:mb-4 tracking-[0.2em]">
            PROBLEM
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
          gap-6 sm:gap-8 md:gap-20
        "
        >
          {/* ARCH */}
          <div>
            <p className="text-[15px] sm:text-lg md:text-lg text-white/40 mb-2 md:mb-5 tracking-[0.2em]">
              ARCHITECTURE
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
              DECISIONS
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
              IMPACT
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
}
