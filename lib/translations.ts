export type Language = "en" | "id";

export const translations = {
  en: {
    sections: [
      { id: "hero", label: "01 — Intro", accent: "#7C9EFF" },
      { id: "work", label: "02 — Work", accent: "#F97316" },
      { id: "stack", label: "03 — Stack", accent: "#A78BFA" },
      { id: "contact", label: "04 — Contact", accent: "#A78BFA" },
    ],
    sectionLabels: ["Intro", "Selected Work", "Tech Stack", "Contact"],
    hero: {
      heading1: "Systems That Actually",
      heading2: "Hold Up in Production",
      sublabel: "DEPLOYMENTS · PIPELINES · ARCHITECTURE",
      body: "I build and scale systems used in real production — helping teams ship faster, reduce failures, and keep things running as they grow.",
      cta: "See Work \u2192",
      resume: "View Resume \u2192",
      status: "Open for high-impact work",
      focusTitle: "Current Focus",
      focusDesc:
        "Designing high-performance web systems & scalable DevOps infrastructure",
      marquee:
        "TECHNICAL CONSULTANT \u00b7 FULLSTACK ENGINEER \u00b7 NEXT.JS \u00b7 NODE.JS \u00b7 DEVOPS \u00b7 ENTERPRISE SYSTEMS \u00b7",
    },
    work: {
      heading1: "Real Systems",
      heading2: "Built for Production",
      cardLabels: {
        problem: "PROBLEM",
        architecture: "ARCHITECTURE",
        decisions: "DECISIONS",
        impact: "IMPACT",
      },
      cards: [
        {
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
            "\u2193 manual deployment steps",
            "\u2191 consistency across teams",
            "\u2191 engineering efficiency",
          ],
        },
        {
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
            "\u2193 manual workload",
            "\u2191 deployment reliability",
            "\u2191 delivery speed",
          ],
        },
        {
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
            "\u2193 80% manual tracking",
            "\u2191 visibility",
            "\u2191 operational efficiency",
          ],
        },
        {
          problem:
            "Mobile development workflows needed stabilization and faster issue resolution.",
          architecture: ["Mobile App Support", "Dev Workflow Optimization"],
          decisions: ["Improved debugging flow", "Assisted development lifecycle"],
          impact: ["\u2191 dev efficiency", "\u2193 issue resolution time"],
        },
        {
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
          impact: ["\u2191 system performance", "\u2193 error rate", "\u2191 stability"],
        },
        {
          problem:
            "CMS and website lacked performance and scalability for enterprise usage.",
          architecture: ["CMS System", "Public Website", "Content Tools"],
          decisions: [
            "Rebuilt CMS architecture",
            "Optimized frontend delivery",
            "Improved SEO structure",
          ],
          impact: ["\u2191 performance", "\u2191 SEO visibility", "\u2191 maintainability"],
        },
        {
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
          impact: ["\u2191 system reliability", "\u2191 internal operations efficiency"],
        },
        {
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
          impact: ["\u2193 50% deployment time", "\u2191 deployment consistency"],
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
            "Supabase",
            "Schema Design",
            "Query Optimization",
            "Data Modeling",
          ],
        },
        {
          title: "DevOps",
          subtitle: "Pipeline \u00b7 Container \u00b7 Deploy",
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
            "NGINX",
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
      { id: "contact", label: "04 — Kontak", accent: "#A78BFA" },
    ],
    sectionLabels: ["Intro", "Pengalaman Kerja", "Tech Stack", "Kontak"],
    hero: {
      heading1: "Sistem yang Benar-Benar",
      heading2: "Andal di Produksi",
      sublabel: "DEPLOYMENTS \u00b7 PIPELINES \u00b7 ARSITEKTUR",
      body: "Saya membangun dan menskalakan sistem yang digunakan di produksi nyata — membantu tim mengirim lebih cepat, mengurangi kegagalan, dan menjaga semuanya berjalan saat berkembang.",
      cta: "Lihat Karya \u2192",
      resume: "Lihat Resume \u2192",
      status: "Terbuka untuk proyek berdampak tinggi",
      focusTitle: "Fokus Saat Ini",
      focusDesc:
        "Merancang sistem web berkinerja tinggi & infrastruktur DevOps yang skalabel",
      marquee:
        "KONSULTAN TEKNIS \u00b7 FULLSTACK ENGINEER \u00b7 NEXT.JS \u00b7 NODE.JS \u00b7 DEVOPS \u00b7 SISTEM ENTERPRISE \u00b7",
    },
    work: {
      heading1: "Sistem Nyata",
      heading2: "Dibangun untuk Produksi",
      cardLabels: {
        problem: "MASALAH",
        architecture: "ARSITEKTUR",
        decisions: "KEPUTUSAN",
        impact: "DAMPAK",
      },
      cards: [
        {
          problem:
            "Deploy manual menyebabkan inkonsistensi, keterlambatan, dan risiko operasional tinggi di seluruh tim engineering.",
          architecture: [
            "Dashboard Next.js",
            "Internal API Gateway",
            "Pipeline GitLab CI",
            "Docker",
            "Sistem RBAC",
          ],
          decisions: [
            "Mengabstraksi CI/CD ke dalam alur kerja berbasis UI",
            "Membakukan konfigurasi deploy",
            "Merancang lapisan integrasi layanan yang skalabel",
          ],
          impact: [
            "\u2193 langkah deploy manual",
            "\u2191 konsistensi antar tim",
            "\u2191 efisiensi engineering",
          ],
        },
        {
          problem:
            "Pengiriman perangkat lunak sangat bergantung pada proses manual dengan otomatisasi dan validasi terbatas.",
          architecture: [
            "Pipeline CI/CD",
            "Pengujian Otomatis",
            "Provisioning Environment",
            "Otomatisasi Build",
          ],
          decisions: [
            "Memperkenalkan pipeline otomatis untuk validasi",
            "Memisahkan environment untuk pengujian yang aman",
            "Fokus pada deployment yang reproducible",
          ],
          impact: [
            "\u2193 beban kerja manual",
            "\u2191 keandalan deployment",
            "\u2191 kecepatan pengiriman",
          ],
        },
        {
          problem:
            "Pelacakan rekrutmen dilakukan secara manual, tidak efisien, dan kurang visibilitas real-time.",
          architecture: [
            "Dashboard React",
            "Sistem Auth",
            "Backend API",
            "Monitoring Real-time",
          ],
          decisions: [
            "Membangun dashboard admin terpusat",
            "Mengintegrasikan autentikasi + penanganan peran",
            "Mengoptimalkan performa frontend",
          ],
          impact: [
            "\u2193 80% pelacakan manual",
            "\u2191 visibilitas",
            "\u2191 efisiensi operasional",
          ],
        },
        {
          problem:
            "Alur kerja pengembangan mobile perlu stabilisasi dan resolusi masalah yang lebih cepat.",
          architecture: ["Dukungan Aplikasi Mobile", "Optimasi Alur Kerja Dev"],
          decisions: [
            "Meningkatkan alur debugging",
            "Membantu siklus pengembangan",
          ],
          impact: ["\u2191 efisiensi dev", "\u2193 waktu resolusi masalah"],
        },
        {
          problem:
            "Sistem supplier dan billing mengalami query lambat dan ketidakstabilan.",
          architecture: [
            "Backend Node.js",
            "Frontend React",
            "PostgreSQL",
            "Layanan API",
          ],
          decisions: [
            "Mengoptimalkan query database",
            "Meningkatkan struktur layanan",
            "Fokus pada tuning performa",
          ],
          impact: [
            "\u2191 performa sistem",
            "\u2193 tingkat error",
            "\u2191 stabilitas",
          ],
        },
        {
          problem:
            "CMS dan website kurang performa dan skalabilitas untuk penggunaan enterprise.",
          architecture: ["Sistem CMS", "Website Publik", "Alat Konten"],
          decisions: [
            "Membangun ulang arsitektur CMS",
            "Mengoptimalkan pengiriman frontend",
            "Meningkatkan struktur SEO",
          ],
          impact: [
            "\u2191 performa",
            "\u2191 visibilitas SEO",
            "\u2191 maintainabilitas",
          ],
        },
        {
          problem:
            "Sistem awal membutuhkan arsitektur yang andal untuk operasi internal.",
          architecture: [
            "Sistem Fullstack",
            "Optimasi Database",
            "Alur Deployment",
          ],
          decisions: [
            "Membangun fitur inti sistem",
            "Meningkatkan keandalan sejak awal",
            "Mendukung peluncuran produksi",
          ],
          impact: [
            "\u2191 keandalan sistem",
            "\u2191 efisiensi operasi internal",
          ],
        },
        {
          problem:
            "Proses deployment lambat, manual, dan tidak konsisten antar environment.",
          architecture: [
            "Pipeline CI/CD",
            "Docker",
            "Integrasi Sistem",
            "Platform Web",
          ],
          decisions: [
            "Mengotomatiskan pipeline deployment",
            "Membakukan environment",
            "Mengintegrasikan layanan secara aman",
          ],
          impact: [
            "\u2193 50% waktu deployment",
            "\u2191 konsistensi deployment",
          ],
        },
      ],
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
            "Supabase",
            "Desain Skema",
            "Optimasi Query",
            "Pemodelan Data",
          ],
        },
        {
          title: "DevOps",
          subtitle: "Pipeline \u00b7 Container \u00b7 Deploy",
          items: [
            "Docker",
            "Kubernetes",
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
            "NGINX",
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
