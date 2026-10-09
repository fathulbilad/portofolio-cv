"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Mail, MapPin, MessageCircle } from "lucide-react";
import { Github, Linkedin } from "./brand-icons";
import { useLanguage } from "@/contexts/language-context";
import { sideProjects, cvFolderUrl, sections, text, ui, work, type SectionKey } from "@/lib/portfolio";
import { SectionLink } from "./section-link";
import { CertificateGallery } from "./certificates";
import { sectionIcons, sideProjectIcons, skillIcons } from "./icons";
import { LanyardView } from "./lanyard";

export function SectionContent({ section, slug }: { section: SectionKey; slug?: string }) {
  const { lang, t } = useLanguage();
  const copy = ui[lang];
  const item = sections[section];
  const SectionIcon = sectionIcons[section];
  const project = slug && section === "projects" ? work.find((entry) => entry.slug === slug) : null;
  const practice = slug && section === "side-projects" ? sideProjects.find((entry) => entry.slug === slug) : null;

  if (project) {
    const story = t.work.cards[project.index];
    return (
      <article className="section-content project-detail">
        <SectionLink href="/projects" className="text-link detail-back"><ArrowLeft size={16} />{copy.projectBack}</SectionLink>
        <p className="eyebrow">{project.company} · {project.period}</p>
        <h1>{project.title}</h1>
        <p className="intro-text">{story.problem}</p>
        <div className="tags">{story.architecture.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <section className="story-block"><h2>{t.work.cardLabels.decisions}</h2><ul className="readable-list">{story.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></section>
        <section className="story-block"><h2>{t.work.cardLabels.impact}</h2><ul className="impact-list">{story.impact.map((impact) => <li key={impact}>{impact}</li>)}</ul></section>
        <p className="project-credit">{t.work.employer}</p>
      </article>
    );
  }

  if (practice) {
    return (
      <article className="section-content project-detail">
        <SectionLink href="/side-projects" className="text-link detail-back"><ArrowLeft size={16} />{copy.sideProjectsBack}</SectionLink>
        <p className="eyebrow">{text(sections["side-projects"].label, lang)} / {practice.number} · {copy.practiceLabel}</p>
        <h1>{practice.name}</h1>
        <p className="intro-text">{text(practice.description, lang)}</p>
        <div className="tags">{practice.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <p className="body-text">{text(practice.details, lang)}</p>
        <section className="story-block"><h2>{copy.topics}</h2><ul className="readable-list">{practice.topics[lang].map((topic) => <li key={topic}>{topic}</li>)}</ul></section>
        {practice.repository ? <a href={practice.repository} target="_blank" rel="noopener noreferrer" className="button"><Github size={17} />{copy.repository}<ArrowUpRight size={16} /></a> : <p className="muted">{copy.localProject}</p>}
      </article>
    );
  }

  return (
    <div className="section-content">
      <div className="section-intro">
        <p className="eyebrow section-eyebrow"><SectionIcon size={17} strokeWidth={1.7} />{text(item.label, lang)}</p><h1>{text(item.title, lang)}</h1>
        <p className="intro-text">{text(item.description, lang)}</p>
      </div>

      {section === "experience" && <>
        <div className="employer-block"><div className="company-monogram">MII</div><div><h2>PT Mitra Integrasi Informatika</h2><p>{copy.employer}</p><span>{copy.employerPeriod}</span></div></div>
        <h2 className="subheading">{copy.engagements}</h2>
        <div className="experience-list">{work.map((entry) => <article key={entry.slug} className="experience-entry">
          <div className="timeline-dot" /><div className="entry-heading"><h3>{entry.company}</h3><span>{entry.period}</span></div>
          <p>{entry.title}</p><p className="entry-description">{t.work.cards[entry.index].decisions[0]}</p>
          <SectionLink href={`/projects/${entry.slug}`} className="text-link">{copy.readProject}<ArrowRight size={15} /></SectionLink>
        </article>)}</div>
      </>}

      {section === "projects" && <div className="project-list">{work.map((entry) => <SectionLink href={`/projects/${entry.slug}`} key={entry.slug} className="project-row">
        <span className="company-monogram" style={{ backgroundColor: entry.color }}>{entry.initials}</span>
        <div><p className="project-company">{entry.company}</p><h2>{entry.title}</h2><p className="project-summary">{t.work.cards[entry.index].problem}</p><span className="project-period">{entry.period}</span></div>
        <ArrowUpRight size={21} className="row-arrow" />
      </SectionLink>)}</div>}

      {section === "side-projects" && <>
        <div className="cardio-note"><BookOpen size={22} strokeWidth={1.6} /><div><h2>{copy.whyCardio}</h2><p>{copy.cardioStory}</p></div></div>
        <div className="cardio-list">{sideProjects.map((entry) => {
          const ProjectIcon = sideProjectIcons[entry.slug] ?? sectionIcons["side-projects"];
          return <SectionLink href={`/side-projects/${entry.slug}`} key={entry.slug} className="cardio-row">
          <span className="practice-number" style={{ backgroundColor: entry.color }}><ProjectIcon size={21} strokeWidth={1.7} /></span>
          <div><h2>{entry.name}</h2><p>{text(entry.description, lang)}</p><div className="tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          <ArrowUpRight size={21} className="row-arrow" />
        </SectionLink>;
        })}</div><p className="small-note">{copy.practiceNote}</p>
      </>}

      {section === "skills" && <div className="skills-grid">{t.stack.cards.map((group, index) => {
        const SkillIcon = skillIcons[index] ?? sectionIcons.skills;
        return <section key={group.title} className="skill-group"><SkillIcon className="skill-icon" size={24} strokeWidth={1.7} /><h2>{group.title}</h2><p>{group.subtitle}</p><div className="tags">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></section>;
      })}</div>}

      {section === "certificates" && <CertificateGallery />}

      {section === "education" && <>
        <div className="education-list">{t.credentials.schools.map((school) => <article key={school.institution}><span className="eyebrow">{school.graduation}</span><h2>{school.institution}</h2><p>{school.program}</p><span className="muted">{school.location}</span></article>)}</div>
        <section className="story-block"><h2>{copy.languages}</h2><ul className="readable-list">{t.credentials.languageItems.map((language) => <li key={language}>{language}</li>)}</ul></section>
      </>}

      {section === "about" && <>
        <div className="about-layout"><div><p className="body-text">{copy.aboutBody}</p><p className="body-text">{copy.aboutSecond}</p><p className="body-text">{copy.aboutThird}</p></div><LanyardView compact /></div>
        <div className="about-links"><SectionLink href="/experience" className="button">{text(sections.experience.label, lang)}<ArrowRight size={16} /></SectionLink><SectionLink href="/side-projects" className="button">{text(sections["side-projects"].label, lang)}<ArrowRight size={16} /></SectionLink></div>
      </>}

      {section === "contact" && <>
        <p className="contact-location"><MapPin size={17} />{copy.location}</p>
        <div className="contact-list">
          <a href="mailto:fathulbilad@gmail.com"><Mail size={21} /><div><h2>{copy.email}</h2><p>fathulbilad@gmail.com</p></div><ArrowUpRight size={20} /></a>
          <a href="https://www.linkedin.com/in/fathul-bilad/" target="_blank" rel="noopener noreferrer"><Linkedin size={21} /><div><h2>LinkedIn</h2><p>Fathul Bilad</p></div><ArrowUpRight size={20} /></a>
          <a href="https://github.com/fathulbilad" target="_blank" rel="noopener noreferrer"><Github size={21} /><div><h2>GitHub</h2><p>@fathulbilad</p></div><ArrowUpRight size={20} /></a>
          <a href="https://wa.me/6282129237828" target="_blank" rel="noopener noreferrer"><MessageCircle size={21} /><div><h2>{copy.phone}</h2><p>+62 821-2923-7828</p></div><ArrowUpRight size={20} /></a>
        </div><a href={cvFolderUrl} target="_blank" rel="noopener noreferrer" className="button button-blue"><ArrowUpRight size={17} />{copy.openCV}</a>
      </>}
    </div>
  );
}

export function SectionPage({ section, slug }: { section: SectionKey; slug?: string }) {
  const { lang } = useLanguage();
  return (
    <main id="main-content" className="section-page" style={{ "--section-color": sections[section].color } as React.CSSProperties}>
      <SectionLink href="/" className="text-link page-back"><ArrowLeft size={17} />{ui[lang].back}</SectionLink>
      <div className="page-paper"><SectionContent section={section} slug={slug} /></div>
    </main>
  );
}
