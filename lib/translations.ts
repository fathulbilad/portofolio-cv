export type Language = "en" | "id";

export const translations = {
  en: {
    sections: [
      { id: "hero", label: "01 — Intro", accent: "#7C9EFF" },
      { id: "work", label: "02 — Work", accent: "#F97316" },
      { id: "stack", label: "03 — Stack", accent: "#A78BFA" },
      { id: "credentials", label: "04 — Credentials", accent: "#38BDF8" },
      { id: "contact", label: "05 — Resume", accent: "#A78BFA" },
    ],
    sectionLabels: ["Intro", "Selected Work", "Tech Stack", "Credentials", "Resume"],
    hero: {
      heading1: "Enterprise Applications",
      heading2: "Built for Production",
      sublabel: "FULLSTACK \u00b7 DEVOPS \u00b7 BANKING \u00b7 TELECOM",
      body: "Fullstack Software Engineer with 4+ years delivering enterprise applications and internal platforms across banking, telecommunications, healthcare, automotive, and public-sector organizations. I build scalable workflow-driven systems, developer platforms, and CI/CD-enabled applications.",
      cta: "See Work \u2192",
      resume: "View Resume \u2192",
      status: "Open for work",
      focusTitle: "Current Focus",
      focusDesc:
        "Internal developer platforms & enterprise system architecture",
      marquee:
        "FULLSTACK ENGINEER \u00b7 DEVOPS \u00b7 BANKING \u00b7 TELECOM \u00b7 HEALTHCARE \u00b7 AUTOMOTIVE \u00b7 ENTERPRISE SYSTEMS \u00b7",
    },
    work: {
      heading1: "Real Systems",
      heading2: "Built for Production",
      employer: "Fullstack Software Engineer \u00b7 via PT Mitra Integrasi Informatika (MII) \u00b7 Jakarta",
      cardLabels: {
        problem: "PROBLEM",
        architecture: "ARCHITECTURE",
        decisions: "DECISIONS",
        impact: "IMPACT",
      },
      cards: [
        {
          problem:
            "Three internal platforms—IDSP, PSP, and OTP—needed reliable SIT/UAT delivery, consistent releases, and modernized deployment infrastructure.",
          architecture: [
            "Forgejo Actions",
            "OpenShift",
            "Helm",
            "OpenResty",
            "Bitbucket Mirroring",
          ],
          decisions: [
            "Built a self-hosted CI/CD platform and artifact promotion from SIT to UAT",
            "Modernized Dockerfiles, Helm charts, routing, caching, and environment configuration",
            "Enhanced onboarding, approvals, governance, SMTP notifications, and release operations",
          ],
          impact: [
            "\u2191 release consistency",
            "\u2191 login reliability",
            "\u2193 deployment risk",
          ],
        },
        {
          problem:
            "Developer onboarding, repository management, and CI/CD workflows were fragmented across teams with no centralized platform.",
          architecture: [
            "Next.js Portal",
            "GitLab CI Pipelines",
            "Pipeline Templates",
            "Variable Management",
            "Amazon Bedrock Integration",
          ],
          decisions: [
            "Built self-service pipeline template management",
            "Developed GitLab integrations for repo configuration",
            "Created reusable app boilerplates with Bedrock connectivity",
          ],
          impact: [
            "\u2191 CI/CD adoption across teams",
            "\u2191 deployment consistency",
            "\u2191 internal AI app development speed",
          ],
        },
        {
          problem:
            "API management platform deployment and OpenShift-based delivery lacked automation, code quality validation, and reliable rollback mechanisms.",
          architecture: [
            "Jenkins Pipelines",
            "SonarQube",
            "OpenShift",
            "Container Registry",
            "Image Signing",
          ],
          decisions: [
            "Integrated Jenkins + SonarQube for automated build and quality validation",
            "Optimized OpenShift deployment with alternative build strategies",
            "Implemented container image signing and rollback mechanisms",
          ],
          impact: [
            "\u2191 deployment reliability",
            "\u2191 delivery governance",
            "\u2193 deployment overhead",
          ],
        },
        {
          problem:
            "Executive recruitment across regional enterprises relied on manual processes with no centralized digital platform for multi-stage selection.",
          architecture: [
            "React Dashboard",
            "Supabase Auth",
            "Row-Level Security",
            "Backend API",
          ],
          decisions: [
            "Built end-to-end recruitment platform covering admin, vacancies, and candidate reviews",
            "Implemented multi-stage evaluation: screening, tests, psychological assessments, interviews",
            "Applied Supabase RLS for granular recruitment data protection",
          ],
          impact: [
            "\u2193 manual recruitment overhead",
            "\u2191 data security",
            "\u2191 process transparency",
          ],
        },
        {
          problem:
            "Mobile development workflows needed stabilization and faster issue resolution across distributed teams.",
          architecture: ["Issue Tracking", "Dev Communication", "Mobile Support"],
          decisions: [
            "Standardized issue tracking and collaboration processes",
            "Improved communication workflows between technical and stakeholder teams",
          ],
          impact: ["\u2191 dev efficiency", "\u2193 issue resolution time"],
        },
        {
          problem:
            "Telecommunications infrastructure project management lacked a centralized system for approvals, documentation, and operational workflow tracking.",
          architecture: [
            "Fullstack PMIS Platform",
            "Approval Engine",
            "Document Management",
            "Notification System",
            "GCS Integration",
          ],
          decisions: [
            "Built ATP and milestone endorsement workflows with approval-chain visibility",
            "Implemented change requests, issue ticketing, and baseline management",
            "Migrated document storage from Azure to GCS with signed URL access",
          ],
          impact: [
            "\u2191 approval process visibility",
            "\u2191 operational efficiency",
            "\u2191 document delivery speed",
          ],
        },
        {
          problem:
            "AUTO2000\u2019s public digital platform and internal CMS lacked performance, SEO optimization, and scalable content management workflows.",
          architecture: [
            "Next.js Public Site",
            "Internal CMS",
            "Monorepo",
            "SSR",
            "Content Scheduling",
          ],
          decisions: [
            "Transitioned metadata generation to SSR for proper SEO indexing",
            "Built reusable frontend components in a monorepo architecture",
            "Developed CMS content publishing, scheduling, and rich-text editing workflows",
          ],
          impact: [
            "\u2191 SEO visibility",
            "\u2191 content management efficiency",
            "\u2191 development velocity via shared components",
          ],
        },
        {
          problem:
            "Supplier and billing processes relied on legacy applications with manual workflows, slow deployments, and outdated Angular frontends.",
          architecture: [
            "Vue.js Frontend",
            "Node.js Backend",
            "Jenkins CI/CD",
            "Bitbucket",
            "Harbor Registry",
          ],
          decisions: [
            "Migrated legacy Angular applications to Vue.js for maintainability",
            "Automated deployment pipelines with Jenkins, Bitbucket, and Harbor",
            "Built supplier management and billing features aligned with operational needs",
          ],
          impact: [
            "\u2193 deployment time",
            "\u2191 application maintainability",
            "\u2191 operational alignment",
          ],
        },
      ],
    },
    stack: {
      heading1: "My",
      heading2: "Techstack",
      body: "I design and engineer production-grade systems — spanning frontend, backend, and infrastructure — built to scale, perform, and endure real-world usage.",
      cards: [
        {
          title: "Frontend",
          subtitle: "Framework \u00b7 Rendering \u00b7 UI",
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
        },
        {
          title: "Backend & APIs",
          subtitle: "Runtime \u00b7 Service \u00b7 Auth",
          items: [
            "Node.js",
            "Express",
            "Hono",
            "Golang",
            "REST API",
            "Service Design",
            "Authentication",
            "Integration",
            "Performance Tuning",
          ],
        },
        {
          title: "Databases",
          subtitle: "Relational \u00b7 Modeling \u00b7 Query",
          items: [
            "PostgreSQL",
            "MySQL",
            "Oracle",
            "Supabase",
            "Redis",
            "Schema Design",
            "Query Optimization",
            "Data Modeling",
          ],
        },
        {
          title: "DevOps",
          subtitle: "Pipeline \u00b7 Container \u00b7 Deploy",
          items: [
            "OpenShift",
            "Docker",
            "Kubernetes",
            "Helm",
            "Forgejo Actions",
            "GitLab CI",
            "Jenkins",
            "Harbor",
            "CI/CD Design",
            "Automation",
            "Environment Management",
          ],
        },
        {
          title: "Cloud",
          subtitle: "Infra \u00b7 Storage \u00b7 Deployment",
          items: [
            "GCP",
            "Azure",
            "Cloud Deployment",
            "Storage",
            "Cloud Integration",
          ],
        },
        {
          title: "Architecture",
          subtitle: "System \u00b7 Flow \u00b7 Design",
          items: [
            "System Design",
            "Microservices",
            "CI/CD Platform Architecture",
            "Data Flow Design",
            "Scalable Systems",
          ],
        },
        {
          title: "Tools",
          subtitle: "Workflow \u00b7 Quality \u00b7 Delivery",
          items: [
            "GitHub",
            "GitLab",
            "Azure DevOps",
            "OpenResty",
            "NGINX",
            "Linux",
            "Mise",
            "SonarQube",
            "Versioning",
            "Code Quality",
          ],
        },
        {
          title: "Methodologies",
          subtitle: "Process \u00b7 Structure \u00b7 Delivery",
          items: [
            "Agile",
            "Scrum",
            "Kanban",
            "Atomic Design",
            "Iterative Delivery",
            "Scalable Frontend Architecture",
          ],
        },
      ],
    },
    credentials: {
      heading1: "Education &",
      heading2: "Credentials",
      education: "Education",
      languages: "Languages",
      certificates: "Certificates",
      schools: [
        {
          institution: "Widyatama University",
          program: "Bachelor’s Degree in Information Systems",
          location: "Bandung, Indonesia",
          graduation: "Graduated June 2025",
        },
        {
          institution: "Telkom University",
          program: "Diploma’s Degree in Computer Engineering",
          location: "Bandung, Indonesia",
          graduation: "Graduated March 2020",
        },
      ],
      languageItems: [
        "Indonesian — Native",
        "English — Professional Working Proficiency",
      ],
      certificateItems: [
        "Agile Portfolio Management Associate — GitLab, 2026",
        "CI/CD Associate — GitLab, 2026",
        "Fundamentals Associate — GitLab, 2026",
        "Certified Security Associate — GitLab, 2026",
        "Anthropic MCP (Model Context Protocol) — Anthropic, 2025",
      ],
    },
    contact: {
      heading1: "Let\u2019s",
      heading2: "Build",
      body: "Building systems that scale, perform, and actually survive production.",
      cta: "Say Hello \u2192",
      resume: "View Resume \u2192",
      marquee:
        "AVAILABLE FOR WORK \u00b7 JAKARTA \u00b7 REMOTE \u00b7 FULLSTACK \u00b7 DEVOPS \u00b7 ENTERPRISE SYSTEMS \u00b7 LET\u2019S BUILD \u00b7",
    },
    dock: ["Home", "Work", "Videos", "Stack", "Contact"],
  },
  id: {
    sections: [
      { id: "hero", label: "01 — Intro", accent: "#7C9EFF" },
      { id: "work", label: "02 — Pengalaman", accent: "#F97316" },
      { id: "stack", label: "03 — Stack", accent: "#A78BFA" },
      { id: "credentials", label: "04 — Kredensial", accent: "#38BDF8" },
      { id: "contact", label: "05 — Resume", accent: "#A78BFA" },
    ],
    sectionLabels: ["Intro", "Pengalaman Kerja", "Tech Stack", "Kredensial", "Resume"],
    hero: {
      heading1: "Aplikasi Enterprise",
      heading2: "Dibangun untuk Produksi",
      sublabel: "FULLSTACK \u00b7 DEVOPS \u00b7 PERBANKAN \u00b7 TELKOM",
      body: "Fullstack Software Engineer dengan pengalaman 4+ tahun membangun aplikasi enterprise dan platform internal di bidang perbankan, telekomunikasi, kesehatan, otomotif, dan sektor publik. Saya membangun sistem berbasis alur kerja, platform developer, dan aplikasi berkemampuan CI/CD yang skalabel.",
      cta: "Lihat Karya \u2192",
      resume: "Lihat Resume \u2192",
      status: "Terbuka untuk kerja",
      focusTitle: "Fokus Saat Ini",
      focusDesc:
        "Platform developer internal & arsitektur sistem enterprise",
      marquee:
        "FULLSTACK ENGINEER \u00b7 DEVOPS \u00b7 PERBANKAN \u00b7 TELKOM \u00b7 KESEHATAN \u00b7 OTOMOTIF \u00b7 SISTEM ENTERPRISE \u00b7",
    },
    work: {
      heading1: "Sistem Nyata",
      heading2: "Dibangun untuk Produksi",
      employer: "Fullstack Software Engineer \u00b7 via PT Mitra Integrasi Informatika (MII) \u00b7 Jakarta",
      cardLabels: {
        problem: "MASALAH",
        architecture: "ARSITEKTUR",
        decisions: "KEPUTUSAN",
        impact: "DAMPAK",
      },
            cards: [
        {
          problem:
            "Tiga platform internal—IDSP, PSP, dan OTP—membutuhkan delivery SIT/UAT yang andal, rilis konsisten, dan infrastruktur deployment yang dimodernisasi.",
          architecture: [
            "Forgejo Actions",
            "OpenShift",
            "Helm",
            "OpenResty",
            "Bitbucket Mirroring",
          ],
          decisions: [
            "Membangun platform CI/CD mandiri dan promosi artefak dari SIT ke UAT",
            "Memodernisasi Dockerfile, Helm chart, routing, caching, dan konfigurasi environment",
            "Meningkatkan onboarding, approval, governance, notifikasi SMTP, dan operasi rilis",
          ],
          impact: [
            "\u2191 konsistensi rilis",
            "\u2191 keandalan login",
            "\u2193 risiko deployment",
          ],
        },
        {
          problem:
            "Onboarding developer, manajemen repositori, dan alur kerja CI/CD tersebar di berbagai tim tanpa platform terpusat.",
          architecture: [
            "Portal Next.js",
            "Pipeline GitLab CI",
            "Template Pipeline",
            "Manajemen Variabel",
            "Integrasi Amazon Bedrock",
          ],
          decisions: [
            "Membangun manajemen template pipeline self-service",
            "Mengembangkan integrasi GitLab untuk konfigurasi repositori",
            "Membuat boilerplate aplikasi reusable dengan konektivitas Bedrock",
          ],
          impact: [
            "\u2191 adopsi CI/CD antar tim",
            "\u2191 konsistensi deployment",
            "\u2191 kecepatan pengembangan aplikasi AI internal",
          ],
        },
        {
          problem:
            "Deployment platform API management dan pengiriman berbasis OpenShift kurang otomatisasi, validasi kualitas kode, dan mekanisme rollback yang andal.",
          architecture: [
            "Pipeline Jenkins",
            "SonarQube",
            "OpenShift",
            "Container Registry",
            "Image Signing",
          ],
          decisions: [
            "Mengintegrasikan Jenkins + SonarQube untuk build dan validasi kualitas otomatis",
            "Mengoptimalkan deployment OpenShift dengan strategi build alternatif",
            "Menerapkan image signing container dan mekanisme rollback",
          ],
          impact: [
            "\u2191 keandalan deployment",
            "\u2191 tata kelola pengiriman",
            "\u2193 overhead deployment",
          ],
        },
        {
          problem:
            "Rekrutmen eksekutif di seluruh BUMD DKI Jakarta mengandalkan proses manual tanpa platform digital terpusat untuk seleksi multi-tahap.",
          architecture: [
            "Dashboard React",
            "Supabase Auth",
            "Row-Level Security",
            "Backend API",
          ],
          decisions: [
            "Membangun platform rekrutmen end-to-end: admin, lowongan, dan review kandidat",
            "Menerapkan evaluasi multi-tahap: screening, tes, psikotes, wawancara",
            "Menggunakan Supabase RLS untuk perlindungan data rekrutmen granular",
          ],
          impact: [
            "\u2193 overhead rekrutmen manual",
            "\u2191 keamanan data",
            "\u2191 transparansi proses",
          ],
        },
        {
          problem:
            "Alur kerja pengembangan mobile perlu stabilisasi dan resolusi masalah yang lebih cepat di tim yang tersebar.",
          architecture: ["Issue Tracking", "Komunikasi Dev", "Dukungan Mobile"],
          decisions: [
            "Membakukan proses issue tracking dan kolaborasi",
            "Meningkatkan alur komunikasi antara tim teknis dan stakeholder",
          ],
          impact: ["\u2191 efisiensi dev", "\u2193 waktu resolusi masalah"],
        },
        {
          problem:
            "Manajemen proyek infrastruktur telekomunikasi tidak memiliki sistem terpusat untuk persetujuan, dokumentasi, dan pelacakan alur kerja operasional.",
          architecture: [
            "Platform PMIS Fullstack",
            "Mesin Persetujuan",
            "Manajemen Dokumen",
            "Sistem Notifikasi",
            "Integrasi GCS",
          ],
          decisions: [
            "Membangun alur kerja endorsement ATP dan milestone dengan visibilitas rantai persetujuan",
            "Menerapkan change request, issue ticketing, dan baseline management",
            "Migrasi penyimpanan dokumen dari Azure ke GCS dengan akses signed URL",
          ],
          impact: [
            "\u2191 visibilitas proses persetujuan",
            "\u2191 efisiensi operasional",
            "\u2191 kecepatan pengiriman dokumen",
          ],
        },
        {
          problem:
            "Platform digital publik AUTO2000 dan CMS internal kurang performa, optimasi SEO, dan alur kerja manajemen konten yang skalabel.",
          architecture: [
            "Situs Publik Next.js",
            "CMS Internal",
            "Monorepo",
            "SSR",
            "Penjadwalan Konten",
          ],
          decisions: [
            "Mengalihkan generasi metadata ke SSR untuk indexing SEO yang tepat",
            "Membangun komponen frontend reusable dalam arsitektur monorepo",
            "Mengembangkan alur kerja penerbitan konten, penjadwalan, dan rich-text editing",
          ],
          impact: [
            "\u2191 visibilitas SEO",
            "\u2191 efisiensi manajemen konten",
            "\u2191 kecepatan pengembangan via komponen bersama",
          ],
        },
        {
          problem:
            "Proses supplier dan billing bergantung pada aplikasi lawas dengan alur kerja manual, deployment lambat, dan frontend Angular yang usang.",
          architecture: [
            "Frontend Vue.js",
            "Backend Node.js",
            "CI/CD Jenkins",
            "Bitbucket",
            "Harbor Registry",
          ],
          decisions: [
            "Migrasi aplikasi Angular lawas ke Vue.js untuk maintainabilitas",
            "Mengotomatiskan pipeline deployment dengan Jenkins, Bitbucket, dan Harbor",
            "Membangun fitur manajemen supplier dan billing sesuai kebutuhan operasional",
          ],
          impact: [
            "\u2193 waktu deployment",
            "\u2191 maintainabilitas aplikasi",
            "\u2191 keselarasan operasional",
          ],
        },
      ]
    },
    stack: {
      heading1: "Stack",
      heading2: "Teknologi Saya",
      body: "Saya merancang dan merekayasa sistem tingkat produksi — mencakup frontend, backend, dan infrastruktur — dibangun untuk skalabilitas, performa, dan ketahanan di penggunaan nyata.",
      cards: [
        {
          title: "Frontend",
          subtitle: "Framework \u00b7 Rendering \u00b7 UI",
          items: [
            "Next.js",
            "React",
            "Vue",
            "TypeScript",
            "Tailwind",
            "GSAP",
            "SSR / CSR",
            "Optimasi Performa",
          ],
        },
        {
          title: "Backend & API",
          subtitle: "Runtime \u00b7 Service \u00b7 Auth",
          items: [
            "Node.js",
            "Express",
            "Hono",
            "Golang",
            "REST API",
            "Desain Service",
            "Autentikasi",
            "Integrasi",
            "Penyesuaian Performa",
          ],
        },
        {
          title: "Database",
          subtitle: "Relasional \u00b7 Pemodelan \u00b7 Query",
          items: [
            "PostgreSQL",
            "MySQL",
            "Oracle",
            "Supabase",
            "Redis",
            "Desain Skema",
            "Optimasi Query",
            "Pemodelan Data",
          ],
        },
        {
          title: "DevOps",
          subtitle: "Pipeline \u00b7 Container \u00b7 Deploy",
          items: [
            "OpenShift",
            "Docker",
            "Kubernetes",
            "Helm",
            "Forgejo Actions",
            "GitLab CI",
            "Jenkins",
            "Harbor",
            "Desain CI/CD",
            "Otomatisasi",
            "Manajemen Environment",
          ],
        },
        {
          title: "Cloud",
          subtitle: "Infra \u00b7 Penyimpanan \u00b7 Deployment",
          items: [
            "GCP",
            "Azure",
            "Cloud Deployment",
            "Penyimpanan",
            "Integrasi Cloud",
          ],
        },
        {
          title: "Arsitektur",
          subtitle: "Sistem \u00b7 Alur \u00b7 Desain",
          items: [
            "Desain Sistem",
            "Microservices",
            "Arsitektur Platform CI/CD",
            "Desain Alur Data",
            "Sistem Skalabel",
          ],
        },
        {
          title: "Tools",
          subtitle: "Alur Kerja \u00b7 Kualitas \u00b7 Pengiriman",
          items: [
            "GitHub",
            "GitLab",
            "Azure DevOps",
            "OpenResty",
            "NGINX",
            "Linux",
            "Mise",
            "SonarQube",
            "Versioning",
            "Kualitas Kode",
          ],
        },
        {
          title: "Metodologi",
          subtitle: "Proses \u00b7 Struktur \u00b7 Pengiriman",
          items: [
            "Agile",
            "Scrum",
            "Kanban",
            "Atomic Design",
            "Pengiriman Iteratif",
            "Arsitektur Frontend Skalabel",
          ],
        },
      ],
    },
    credentials: {
      heading1: "Pendidikan &",
      heading2: "Kredensial",
      education: "Pendidikan",
      languages: "Bahasa",
      certificates: "Sertifikat",
      schools: [
        {
          institution: "Universitas Widyatama",
          program: "Sarjana Sistem Informasi",
          location: "Bandung, Indonesia",
          graduation: "Lulus Juni 2025",
        },
        {
          institution: "Universitas Telkom",
          program: "Diploma Teknik Komputer",
          location: "Bandung, Indonesia",
          graduation: "Lulus Maret 2020",
        },
      ],
      languageItems: [
        "Bahasa Indonesia — Penutur Asli",
        "Bahasa Inggris — Kemahiran Kerja Profesional",
      ],
      certificateItems: [
        "Agile Portfolio Management Associate — GitLab, 2026",
        "CI/CD Associate — GitLab, 2026",
        "Fundamentals Associate — GitLab, 2026",
        "Certified Security Associate — GitLab, 2026",
        "Anthropic MCP (Model Context Protocol) — Anthropic, 2025",
      ],
    },
    contact: {
      heading1: "Mari",
      heading2: "Bangun",
      body: "Membangun sistem yang skalabel, berperforma, dan benar-benar bertahan di produksi.",
      cta: "Sapa Saya \u2192",
      resume: "Lihat Resume \u2192",
      marquee:
        "TERSEDIA UNTUK PROYEK \u00b7 JAKARTA \u00b7 REMOTE \u00b7 FULLSTACK \u00b7 DEVOPS \u00b7 SISTEM ENTERPRISE \u00b7 MARI BANGUN \u00b7",
    },
    dock: ["Beranda", "Karya", "Video", "Stack", "Kontak"],
  },
};

export type TranslationSet = (typeof translations)["en"];

export function getTranslation(lang: Language): TranslationSet {
  return translations[lang];
}
