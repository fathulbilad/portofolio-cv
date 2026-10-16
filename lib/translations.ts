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
          problem: "Three internal platforms needed consistent releases across SIT, UAT, and production.",
          architecture: ["Forgejo Actions", "OpenShift", "Docker", "Helm", "OpenResty / NGINX", "Bitbucket Mirroring"],
          decisions: [
            "Built CI/CD and promoted the same tested image across environments",
            "Improved onboarding and approvals; fixed post-release login failures caused by stale frontend files",
          ],
          impact: ["Consistent releases across environments", "Reliable sign-in after release"],
        },
        {
          problem: "Teams needed a simpler way to configure repositories, applications, and deployment pipelines.",
          architecture: ["Next.js", "GitLab CI", "Amazon Bedrock", "Authentication", "API Integrations"],
          decisions: [
            "Created reusable Next.js templates with authentication, API integrations, and Bedrock connectivity",
            "Added self-service repository setup and GitLab CI/CD templates",
          ],
          impact: ["Reduced manual setup for internal application delivery"],
        },
        {
          problem: "API platform releases needed automated build, quality, and rollback checks.",
          architecture: ["Jenkins", "SonarQube", "OpenShift", "Container Registry", "Image Signing"],
          decisions: [
            "Automated builds, code-quality checks, and OpenShift deployments with Jenkins and SonarQube",
            "Added image signing, verification, and rollback",
          ],
          impact: ["Repeatable release checks and a recovery path for failed deployments"],
        },
        {
          problem: "DKI regional enterprises needed one platform for executive recruitment and staged selection.",
          architecture: ["React", "Supabase Auth", "Row-Level Security", "Backend API"],
          decisions: [
            "Built vacancy administration, candidate review, and multi-stage selection workflows",
            "Used Supabase Auth and Row-Level Security to limit access to candidate and evaluation data",
          ],
          impact: ["Centralized candidate review with access controls"],
        },
        {
          problem: "Mobile teams needed clearer issue tracking and coordination across stakeholders.",
          architecture: ["Issue Tracking", "Team Communication", "Mobile Support"],
          decisions: [
            "Standardized issue tracking and collaboration",
            "Improved communication between engineering and stakeholder teams",
          ],
          impact: ["Clearer issue follow-up and team coordination"],
        },
        {
          problem: "Infrastructure teams needed shared workflows for approvals, changes, issues, and documents.",
          architecture: ["PMIS", "Approval Workflows", "Document Management", "Azure", "Google Cloud Storage"],
          decisions: [
            "Built approval, change-request, issue-tracking, and document workflows",
            "Moved project documents from Azure to Google Cloud Storage with signed URLs",
          ],
          impact: ["Improved workflow visibility and controlled access to project files"],
        },
        {
          problem: "AUTO2000 needed customer-facing product pages and a CMS for its content team.",
          architecture: ["Next.js", "Internal CMS", "Monorepo", "Server-Side Rendering"],
          decisions: [
            "Built product and promotional pages with CMS publishing workflows",
            "Shared frontend components in a monorepo and rendered metadata server-side for SEO",
          ],
          impact: ["Made product content indexable and reduced duplicated UI work"],
        },
        {
          problem: "Supplier and billing teams needed application updates and more consistent releases.",
          architecture: ["Vue.js", "Node.js", "Jenkins", "Bitbucket", "Harbor", "NGINX"],
          decisions: [
            "Developed supplier and billing features and helped modernize Angular applications to Vue.js",
            "Automated delivery with Jenkins, Bitbucket, Harbor, and NGINX",
          ],
          impact: ["Improved release consistency and frontend maintainability"],
        },
      ],
    },
    stack: {
      heading1: "My",
      heading2: "Techstack",
      body: "Selected tools I use to build applications, internal platforms, and production delivery workflows.",
      cards: [
        {
          title: "Frontend",
          subtitle: "Applications \u00b7 Frameworks \u00b7 Rendering",
          items: ["Next.js", "React", "TypeScript", "Vue.js", "Server-Side Rendering"],
        },
        {
          title: "Backend & Access",
          subtitle: "Runtime \u00b7 Authentication \u00b7 Integration",
          items: ["Node.js", "API Integrations", "Authentication", "Supabase Auth", "Row-Level Security", "Amazon Bedrock"],
        },
        {
          title: "CI/CD & Platforms",
          subtitle: "Pipelines \u00b7 Containers \u00b7 Releases",
          items: ["OpenShift", "Docker", "Helm", "Forgejo Actions", "GitLab CI/CD", "Jenkins", "Bitbucket", "Harbor", "SonarQube"],
        },
        {
          title: "Production & Storage",
          subtitle: "Routing \u00b7 Delivery \u00b7 Documents",
          items: ["OpenResty", "NGINX", "Azure", "Google Cloud Storage", "Artifact Promotion", "Container Image Signing"],
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
        "Introduction to Model Context Protocol — Anthropic, 2025",
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
          problem: "Tiga platform internal membutuhkan rilis konsisten di lingkungan SIT, UAT, dan produksi.",
          architecture: ["Forgejo Actions", "OpenShift", "Docker", "Helm", "OpenResty / NGINX", "Bitbucket Mirroring"],
          decisions: [
            "Membangun CI/CD dan mempromosikan image teruji yang sama antar lingkungan",
            "Meningkatkan onboarding dan approval; memperbaiki masalah login pascarilis akibat file frontend lama",
          ],
          impact: ["Rilis konsisten di berbagai lingkungan", "Login kembali andal setelah rilis"],
        },
        {
          problem: "Tim membutuhkan cara yang lebih mudah untuk menyiapkan repositori, aplikasi, dan pipeline rilis.",
          architecture: ["Next.js", "GitLab CI", "Amazon Bedrock", "Autentikasi", "Integrasi API"],
          decisions: [
            "Membuat template Next.js reusable dengan autentikasi, integrasi API, dan konektivitas Bedrock",
            "Menambahkan setup repositori mandiri dan template GitLab CI/CD",
          ],
          impact: ["Mengurangi setup manual untuk pengiriman aplikasi internal"],
        },
        {
          problem: "Rilis platform API membutuhkan pemeriksaan build, kualitas, dan rollback otomatis.",
          architecture: ["Jenkins", "SonarQube", "OpenShift", "Container Registry", "Image Signing"],
          decisions: [
            "Mengotomatiskan build, pemeriksaan kualitas kode, dan deployment OpenShift dengan Jenkins dan SonarQube",
            "Menambahkan image signing, verifikasi, dan rollback",
          ],
          impact: ["Pemeriksaan rilis yang konsisten dan jalur pemulihan saat deployment gagal"],
        },
        {
          problem: "BUMD DKI membutuhkan satu platform untuk rekrutmen eksekutif dan seleksi bertahap.",
          architecture: ["React", "Supabase Auth", "Row-Level Security", "Backend API"],
          decisions: [
            "Membangun alur administrasi lowongan, review kandidat, dan seleksi bertahap",
            "Menggunakan Supabase Auth dan Row-Level Security untuk membatasi akses data kandidat dan evaluasi",
          ],
          impact: ["Review kandidat terpusat dengan kontrol akses"],
        },
        {
          problem: "Tim mobile membutuhkan pelacakan masalah dan koordinasi stakeholder yang lebih jelas.",
          architecture: ["Issue Tracking", "Komunikasi Tim", "Dukungan Mobile"],
          decisions: [
            "Membakukan pelacakan masalah dan kolaborasi",
            "Meningkatkan komunikasi antara tim engineering dan stakeholder",
          ],
          impact: ["Tindak lanjut masalah dan koordinasi tim lebih jelas"],
        },
        {
          problem: "Tim infrastruktur membutuhkan alur kerja bersama untuk persetujuan, perubahan, isu, dan dokumen.",
          architecture: ["PMIS", "Approval Workflow", "Manajemen Dokumen", "Azure", "Google Cloud Storage"],
          decisions: [
            "Membangun alur persetujuan, change request, issue tracking, dan dokumen",
            "Memindahkan dokumen proyek dari Azure ke Google Cloud Storage dengan signed URL",
          ],
          impact: ["Visibilitas alur kerja lebih baik dan akses file proyek terkontrol"],
        },
        {
          problem: "AUTO2000 membutuhkan halaman produk publik dan CMS untuk tim konten.",
          architecture: ["Next.js", "CMS Internal", "Monorepo", "Server-Side Rendering"],
          decisions: [
            "Membangun halaman produk dan promosi beserta alur penerbitan CMS",
            "Menggunakan komponen frontend bersama dalam monorepo dan merender metadata di server untuk SEO",
          ],
          impact: ["Konten produk dapat diindeks dan duplikasi UI berkurang"],
        },
        {
          problem: "Tim supplier dan billing membutuhkan pembaruan aplikasi dan rilis yang lebih konsisten.",
          architecture: ["Vue.js", "Node.js", "Jenkins", "Bitbucket", "Harbor", "NGINX"],
          decisions: [
            "Mengembangkan fitur supplier dan billing serta membantu memodernisasi Angular ke Vue.js",
            "Mengotomatiskan delivery dengan Jenkins, Bitbucket, Harbor, dan NGINX",
          ],
          impact: ["Konsistensi rilis dan maintainabilitas frontend meningkat"],
        },
      ]
    },
    stack: {
      heading1: "Stack",
      heading2: "Teknologi Saya",
      body: "Pilihan teknologi yang saya gunakan untuk membangun aplikasi, platform internal, dan alur delivery produksi.",
      cards: [
        {
          title: "Frontend",
          subtitle: "Aplikasi \u00b7 Framework \u00b7 Rendering",
          items: ["Next.js", "React", "TypeScript", "Vue.js", "Server-Side Rendering"],
        },
        {
          title: "Backend & Akses",
          subtitle: "Runtime \u00b7 Autentikasi \u00b7 Integrasi",
          items: ["Node.js", "Integrasi API", "Autentikasi", "Supabase Auth", "Row-Level Security", "Amazon Bedrock"],
        },
        {
          title: "CI/CD & Platform",
          subtitle: "Pipeline \u00b7 Container \u00b7 Rilis",
          items: ["OpenShift", "Docker", "Helm", "Forgejo Actions", "GitLab CI/CD", "Jenkins", "Bitbucket", "Harbor", "SonarQube"],
        },
        {
          title: "Produksi & Penyimpanan",
          subtitle: "Routing \u00b7 Delivery \u00b7 Dokumen",
          items: ["OpenResty", "NGINX", "Azure", "Google Cloud Storage", "Promosi Artefak", "Image Signing Container"],
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
        "Introduction to Model Context Protocol — Anthropic, 2025",
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
