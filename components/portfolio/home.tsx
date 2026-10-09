"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, ChartNoAxesColumnIncreasing, FileText, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { sideProjects, certificates, cvFolderUrl, sections, text, ui, work, type SectionKey } from "@/lib/portfolio";
import { SectionLink } from "./section-link";
import { sectionIcons } from "./icons";
import { LanyardDialog } from "./lanyard";

const homeSections: SectionKey[] = ["experience", "projects", "side-projects", "skills", "certificates", "education"];

function ExploreCard({ section }: { section: SectionKey }) {
  const { lang } = useLanguage();
  const item = sections[section];
  const Icon = sectionIcons[section];
  return (
    <SectionLink href={`/${section}`} className="bento-card explore-card" style={{ backgroundColor: item.color, "--card-accent": item.accent } as React.CSSProperties}>
      <div className="card-label"><Icon size={21} strokeWidth={1.7} /><span>{text(item.label, lang)}</span></div>
      <h2>{text(item.title, lang)}</h2>
      <p>{text(item.description, lang)}</p>
      <span className="card-action">{text(item.action, lang)}<ArrowRight size={15} /></span>
      <Image src={`/illustrations/${item.illustration}`} alt="" width={180} height={180} sizes="150px" className="card-illustration" />
    </SectionLink>
  );
}

export function PortfolioHome() {
  const { lang } = useLanguage();
  const copy = ui[lang];
  const statistics = [
    { count: work.length, label: copy.clients, color: "#4A90D9" },
    { count: sideProjects.length, label: copy.practices, color: "#D57550" },
    { count: certificates.length, label: copy.certifications, color: "#629C78" },
  ];
  return (
    <main id="main-content" className="portfolio-home">
      <div className="home-intro"><p>{copy.portfolio}</p><span><MapPin size={14} />Jakarta, Indonesia</span></div>
      <div className="hero-grid">
        <section className="bento-card hero-card">
          <div className="card-label"><span className="status-dot" /><span>Full Stack · DevOps · Enterprise</span></div>
          <div className="hero-copy">
            <h1>{copy.greeting}<br /><span>Fathul Bilad.</span></h1>
            <p>{copy.heroBody}</p>
            <div className="hero-actions"><SectionLink href="/about" className="button button-blue">{copy.intro}<ArrowRight size={17} /></SectionLink><LanyardDialog /></div>
          </div>
          <Image src="/illustrations/Bento1.png" alt="" width={330} height={260} sizes="(max-width: 560px) 130px, 250px" className="hero-illustration" priority />
        </section>
        <section className="bento-card overview-card" aria-label={copy.overview}>
          <div className="card-label"><ChartNoAxesColumnIncreasing size={21} strokeWidth={1.7} /><span>{copy.overview}</span></div>
          <div className="overview-body">
            <div className="experience-ring"><div><strong>4<span>+</span></strong><span>{copy.years}</span></div></div>
            <dl className="overview-stats">{statistics.map((stat) => <div key={stat.label}><dt><i style={{ background: stat.color }} />{stat.label}</dt><dd>{stat.count}</dd></div>)}</dl>
          </div>
          <div className="overview-note"><BookOpen size={19} strokeWidth={1.7} /><div><strong>{copy.overviewNote}</strong><span>{copy.overviewSub}</span></div></div>
        </section>
      </div>
      <div className="explore-grid">
        {homeSections.map((section) => <ExploreCard key={section} section={section} />)}
        <a href={cvFolderUrl} target="_blank" rel="noopener noreferrer" className="bento-card explore-card" style={{ backgroundColor: "#E8F3FF", "--card-accent": "#34628F" } as React.CSSProperties}>
          <div className="card-label"><FileText size={21} strokeWidth={1.7} /><span>{copy.resume}</span></div>
          <h2>{copy.resumeTitle}</h2><p>{copy.resumeDescription}</p>
          <span className="card-action">{copy.openCV}<ArrowRight size={15} /></span>
          <Image src="/illustrations/Bento8.png" alt="" width={180} height={180} sizes="150px" className="card-illustration" />
        </a>
        <ExploreCard section="contact" />
      </div>
    </main>
  );
}
