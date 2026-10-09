"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Github } from "./brand-icons";
import { useLanguage } from "@/contexts/language-context";
import { cvFolderUrl, ui } from "@/lib/portfolio";

export function SiteHeader() {
  const { lang, toggleLang } = useLanguage();
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Fathul Bilad — Home">
        <span className="brand-mark">fb.</span>
        <span>Fathul Bilad<span className="brand-caption">Full Stack Software Engineer</span></span>
      </Link>
      <nav className="header-actions" aria-label={lang === "en" ? "Main navigation" : "Navigasi utama"}>
        <button type="button" className="language-toggle" onClick={toggleLang} aria-label={lang === "en" ? "Switch to Indonesian" : "Ganti ke bahasa Inggris"}>
          <span className={lang === "en" ? "active" : ""}>EN</span><span aria-hidden="true">/</span><span className={lang === "id" ? "active" : ""}>ID</span>
        </button>
        <a href="https://github.com/fathulbilad" target="_blank" rel="noopener noreferrer" className="icon-button github-link" aria-label="GitHub"><Github size={19} /></a>
        <a className="button header-cv" href={cvFolderUrl} target="_blank" rel="noopener noreferrer" aria-label={ui[lang].openCV}><FileText size={16} /><span>{ui[lang].openCV}</span></a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { lang } = useLanguage();
  return (
    <footer className="site-footer">
      <span>© {new Date().getUTCFullYear()} Fathul Bilad</span>
      <span>{ui[lang].footer}</span>
      <a href="mailto:fathulbilad@gmail.com">fathulbilad@gmail.com</a>
    </footer>
  );
}
