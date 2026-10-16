import type { Language } from "./translations";

export const cvUrl = "https://drive.google.com/file/d/13rzTXpfzJfs4zx0fRzNYkKztfdVv0XIr/view?usp=sharing";

export const sectionKeys = ["experience", "projects", "side-projects", "skills", "certificates", "education", "about", "contact"] as const;
export type SectionKey = (typeof sectionKeys)[number];
export function isSection(value: string): value is SectionKey {
  return sectionKeys.some((section) => section === value);
}

type Copy = { en: string; id: string };
export const text = (copy: Copy, lang: Language) => copy[lang];
export const sections: Record<SectionKey, { label: Copy; title: Copy; description: Copy; action: Copy; color: string; accent: string; illustration: string }> = {
  experience: {
    label: { en: "Experience", id: "Pengalaman" }, title: { en: "Work that matters.", id: "Karya yang berarti." },
    description: { en: "Enterprise systems, real teams, and lessons from production.", id: "Sistem enterprise, kolaborasi tim, dan pengalaman di produksi." },
    action: { en: "My experience", id: "Lihat pengalaman" }, color: "#FFE8D6", accent: "#986034", illustration: "Bento2.png",
  },
  projects: {
    label: { en: "Selected work", id: "Proyek pilihan" }, title: { en: "A closer look.", id: "Lihat lebih dekat." },
    description: { en: "What I built, the decisions behind it, and why it helped.", id: "Apa yang saya bangun, keputusan di baliknya, dan manfaatnya." },
    action: { en: "Explore projects", id: "Jelajahi proyek" }, color: "#D6EEFF", accent: "#34628F", illustration: "Bento4.png",
  },
  "side-projects": {
    label: { en: "Side projects", id: "Proyek sampingan" }, title: { en: "Built on my own time.", id: "Dibangun di waktu luang." },
    description: { en: "Personal projects and experiments, starting with my Cardio series.", id: "Proyek pribadi dan eksperimen, dimulai dari seri Cardio saya." },
    action: { en: "View side projects", id: "Lihat proyek sampingan" }, color: "#FFE0D0", accent: "#9B4B34", illustration: "cardio.png",
  },
  skills: {
    label: { en: "Skills & tools", id: "Keahlian & alat" }, title: { en: "Across the stack.", id: "Di seluruh stack." },
    description: { en: "Frontend, backend, CI/CD, and production systems.", id: "Frontend, backend, CI/CD, dan sistem produksi." },
    action: { en: "My toolbox", id: "Lihat keahlian" }, color: "#EDE8FF", accent: "#66509D", illustration: "toolbox.png",
  },
  certificates: {
    label: { en: "Certifications", id: "Sertifikasi" }, title: { en: "Always learning.", id: "Selalu belajar." },
    description: { en: "Four GitLab certifications and Anthropic MCP training.", id: "Empat sertifikasi GitLab dan pelatihan Anthropic MCP." },
    action: { en: "View certificates", id: "Lihat sertifikat" }, color: "#D8F5E8", accent: "#2E6A4A", illustration: "Bento6.png",
  },
  education: {
    label: { en: "Education", id: "Pendidikan" }, title: { en: "Where it started.", id: "Awal perjalanan." },
    description: { en: "Information systems, computer engineering, and a curious mind.", id: "Sistem informasi, teknik komputer, dan rasa ingin tahu." },
    action: { en: "My background", id: "Latar belakang" }, color: "#FFFBE0", accent: "#8A6A1F", illustration: "Bento5.png",
  },
  about: {
    label: { en: "About me", id: "Tentang saya" }, title: { en: "Hi, I’m Fathul.", id: "Halo, saya Fathul." },
    description: { en: "A software engineer who likes understanding how things work.", id: "Software engineer yang senang memahami cara kerja sesuatu." },
    action: { en: "A little about me", id: "Kenali saya" }, color: "#FFF9D2", accent: "#8A6A1F", illustration: "Bento7.png",
  },
  contact: {
    label: { en: "Let’s connect", id: "Mari terhubung" }, title: { en: "Say hello.", id: "Mari menyapa." },
    description: { en: "Have an opportunity or an interesting problem? Let’s talk.", id: "Ada peluang atau masalah menarik? Mari berbincang." },
    action: { en: "Get in touch", id: "Hubungi saya" }, color: "#FFE8EC", accent: "#944B63", illustration: "Bento9.png",
  },
};

// Indices refer to the existing bilingual case studies in translations.ts.
export const work = [
  { slug: "bank-indonesia", company: "Bank Indonesia", title: "Internal platforms & delivery", period: "Apr 2026 — Present", index: 0, color: "#D6EEFF", initials: "BI" },
  { slug: "telkomsel", company: "Telkomsel", title: "Internal Developer Platform", period: "Jan 2026 — Jun 2026", index: 1, color: "#FFE8D6", initials: "T" },
  { slug: "cimb", company: "Bank CIMB", title: "DevOps pipeline (PoC)", period: "Dec 2025 — Jan 2026", index: 2, color: "#EDE8FF", initials: "C" },
  { slug: "bank-dki", company: "Bank DKI (BPBUMD)", title: "Executive recruitment platform", period: "Jul 2025 — Dec 2025", index: 3, color: "#D8F5E8", initials: "DKI" },
  { slug: "kredit-plus", company: "Kredit Plus", title: "Mobile team support", period: "Jun 2025 — Jul 2025", index: 4, color: "#FFF9D2", initials: "K+" },
  { slug: "indosat", company: "Indosat Ooredoo Hutchison", title: "Project Management Information System", period: "Nov 2022 — Jun 2025", index: 5, color: "#FFE0D0", initials: "IOH" },
  { slug: "astra", company: "Astra International · AUTO2000", title: "Public website & internal CMS", period: "Aug 2023 — Oct 2024", index: 6, color: "#D6EEFF", initials: "A" },
  { slug: "dexa-medica", company: "Dexa Medica", title: "Supplier portal, billing & CI/CD", period: "Nov 2021 — Nov 2022", index: 7, color: "#EDE8FF", initials: "D" },
];

export const sideProjects = [
  {
    slug: "cardio-series", name: "Cardio Series", number: "01", color: "#FFE8D6", tags: ["Practice projects", "Growing series"], repository: null,
    description: { en: "A growing collection of hands-on software engineering practice tracks.", id: "Kumpulan latihan praktik software engineering yang terus berkembang." },
    details: { en: "Each Cardio track focuses on one topic through exercises, checks, and notes. I’ll add new tracks here as they’re ready.", id: "Setiap track Cardio berfokus pada satu topik melalui latihan, pengujian, dan catatan. Track baru akan ditambahkan di sini saat siap." },
    topics: { en: ["Application development and testing", "Data, cloud, and Kubernetes", "System design and architecture"], id: ["Pengembangan aplikasi dan pengujian", "Data, cloud, dan Kubernetes", "Desain sistem dan arsitektur"] },
    projects: [
      { name: "Dev Cardio", description: { en: "Programming fundamentals, async patterns, and React with tests and Git-based progress.", id: "Dasar pemrograman, pola async, dan React dengan pengujian serta progres berbasis Git." }, tags: ["TypeScript", "React", "Vitest"], repository: "https://github.com/fathulbilad/cardio-dev" },
      { name: "Database Cardio", description: { en: "Order and inventory exercises covering transactions, concurrency, and recovery.", id: "Latihan pesanan dan inventori seputar transaksi, konkurensi, dan pemulihan." }, tags: ["PostgreSQL", "Go", "sqlc"], repository: null },
      { name: "Cloud Cardio", description: { en: "Terraform labs for AWS-shaped services running locally with Floci.", id: "Lab Terraform untuk layanan serupa AWS yang berjalan lokal dengan Floci." }, tags: ["Terraform", "AWS", "Floci"], repository: "https://github.com/fathulbilad/cloud-cardio" },
      { name: "Kubernetes Cardio", description: { en: "Deploy, debug, and operate an application in a local cluster.", id: "Melakukan deployment, debugging, dan mengoperasikan aplikasi di cluster lokal." }, tags: ["Kubernetes", "Docker", "kind"], repository: "https://github.com/fathulbilad/kubernetes-cardio" },
      { name: "System Design Cardio", description: { en: "A local-first workspace for architecture diagrams and decision notes.", id: "Workspace local-first untuk diagram arsitektur dan catatan keputusan." }, tags: ["Diagramming", "Local-first", "Git"], repository: "https://github.com/fathulbilad/system-design-cardio" },
      { name: "System Architecture Cardio", description: { en: "CLI exercises for architectural decisions, tests, and changing requirements.", id: "Latihan CLI untuk keputusan arsitektur, pengujian, dan kebutuhan yang berubah." }, tags: ["TypeScript", "CLI", "Architecture"], repository: "https://github.com/fathulbilad/system-architecture-cardio" },
    ],
  },
];

export type Certificate = {
  name: string;
  issuer: string;
  year: string;
  image: string | null;
  pdf?: string;
  width?: number;
  height?: number;
};

export const certificates: Certificate[] = [
  { name: "Agile Portfolio Management Associate", issuer: "GitLab", year: "2026", image: "/certificates/gitlab-certified-agile-portfolio-management-associa.png" },
  { name: "CI/CD Associate", issuer: "GitLab", year: "2026", image: "/certificates/gitlab-certified-ci-cd-associate.2.png" },
  { name: "Fundamentals Associate", issuer: "GitLab", year: "2026", image: "/certificates/gitlab-certified-fundamentals-associate (1).png" },
  { name: "Certified Security Associate", issuer: "GitLab", year: "2026", image: "/certificates/gitlab-certified-security-associate.png" },
  { name: "Introduction to Model Context Protocol", issuer: "Anthropic", year: "2025", image: "/certificates/anthropic-introduction-to-mcp.png", pdf: "/certificates/anthropic-introduction-to-mcp.pdf", width: 1800, height: 1391 },
];

export const ui = {
  en: {
    portfolio: "A little corner of my work.", greeting: "Hi, I’m", heroBody: "I build enterprise web applications and internal platforms, from the interface to the release pipeline.", intro: "A little about me", overview: "At a glance", years: "years of experience", clients: "client engagements", practices: "side projects", certifications: "certifications", overviewNote: "Always building. Always learning.", overviewSub: "One project, one lesson at a time.", openCV: "View CV", resume: "Resume / CV", resumeTitle: "My latest CV.", resumeDescription: "Read my latest CV on Google Drive.", back: "Back to overview", close: "Close", projectBack: "Back to projects", sideProjectsBack: "Back to side projects", openPage: "Open full page", employer: "Full Stack Software Engineer", employerPeriod: "Nov 2021 — Present · Jakarta", engagements: "Selected client engagements", readProject: "Read the project", technologies: "Tools & technologies", learnMore: "Explore this project", practiceLabel: "Personal project", practiceNote: "The Cardio Series is growing; more practice tracks will be added here.", whyCardio: "The Cardio Series", cardioStory: "A growing set of focused engineering exercises, checks, and notes.", cardioTracks: "Tracks in the series", repository: "View repository", localProject: "Local practice project", topics: "What it covers", preview: "Preview certificate", certificateUnavailable: "Listed in my CV. A certificate image is not available here yet.", zoom: "Zoom in", zoomOut: "Zoom out", original: "Open original image", email: "Email", phone: "WhatsApp", location: "Based in Jakarta, Indonesia", footer: "Built with curiosity. Kept simple.", aboutBody: "Full Stack Software Engineer with 4+ years delivering enterprise web applications and internal platforms. I work across frontend, Node.js backend development, authentication, access control, CI/CD, and production releases.", aboutSecond: "Since November 2021, I’ve worked at PT Mitra Integrasi Informatika (MII), delivering systems for clients in banking, telecommunications, healthcare, automotive, and the public sector.", aboutThird: "I like understanding the whole path: what a user needs, how the application works, and what happens when it reaches production. Outside client work, I build the Cardio Series to keep practicing.", languages: "Languages", source: "Latest CV",
  },
  id: {
    portfolio: "Sedikit cerita tentang karya saya.", greeting: "Halo, saya", heroBody: "Saya membangun aplikasi web enterprise dan platform internal, dari antarmuka hingga pipeline rilis.", intro: "Kenali saya", overview: "Sekilas", years: "tahun pengalaman", clients: "proyek klien", practices: "proyek sampingan", certifications: "sertifikasi", overviewNote: "Terus membangun. Terus belajar.", overviewSub: "Satu proyek, satu pelajaran setiap saat.", openCV: "Buka CV", resume: "Resume / CV", resumeTitle: "CV terbaru saya.", resumeDescription: "Baca CV terbaru saya di Google Drive.", back: "Kembali ke beranda", close: "Tutup", projectBack: "Kembali ke proyek", sideProjectsBack: "Kembali ke proyek sampingan", openPage: "Buka halaman penuh", employer: "Full Stack Software Engineer", employerPeriod: "Nov 2021 — Sekarang · Jakarta", engagements: "Pilihan proyek klien", readProject: "Lihat proyek", technologies: "Alat & teknologi", learnMore: "Jelajahi proyek", practiceLabel: "Proyek pribadi", practiceNote: "Seri Cardio terus berkembang; track latihan baru akan ditambahkan di sini.", whyCardio: "Seri Cardio", cardioStory: "Kumpulan latihan engineering yang terus berkembang, dengan pengujian dan catatan.", cardioTracks: "Track dalam seri ini", repository: "Lihat repository", localProject: "Proyek latihan lokal", topics: "Cakupan latihan", preview: "Lihat sertifikat", certificateUnavailable: "Tercantum dalam CV saya. Gambar sertifikat belum tersedia di sini.", zoom: "Perbesar", zoomOut: "Perkecil", original: "Buka gambar asli", email: "Email", phone: "WhatsApp", location: "Berbasis di Jakarta, Indonesia", footer: "Dibangun dengan rasa ingin tahu. Dibuat sederhana.", aboutBody: "Full Stack Software Engineer dengan pengalaman 4+ tahun membangun aplikasi web enterprise dan platform internal. Saya bekerja di frontend, backend Node.js, autentikasi, kontrol akses, CI/CD, dan rilis produksi.", aboutSecond: "Sejak November 2021, saya bekerja di PT Mitra Integrasi Informatika (MII), membangun sistem untuk klien di sektor perbankan, telekomunikasi, kesehatan, otomotif, dan sektor publik.", aboutThird: "Saya senang memahami alur secara menyeluruh: kebutuhan pengguna, cara kerja aplikasi, dan perilakunya di produksi. Di luar pekerjaan klien, saya membangun Seri Cardio untuk terus berlatih.", languages: "Bahasa", source: "CV terbaru",
  },
};
