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
    sectionLabels: ["Intro", "Selected Work", "Core Stack", "Credentials", "Resume"],
    hero: {
      heading1: "Enterprise Applications",
      heading2: "Built for Production",
      sublabel: "FULLSTACK \u00b7 DEVOPS \u00b7 BANKING \u00b7 TELECOM",
      body: "Full Stack Software Engineer building responsive web applications with React, Next.js, TypeScript, JavaScript, HTML, and CSS. My work supports recruitment, product content, and internal application workflows.",
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
          problem: "Internal users needed reliable onboarding and consistent platform releases across test and production.",
          architecture: ["Forgejo Actions", "OpenShift", "Docker", "Helm", "OpenResty / NGINX", "Bitbucket Mirroring"],
          decisions: [
            "Built registration and onboarding workflows with approval steps and notifications",
            "Led platform delivery with OpenShift, Docker, and Helm, standardizing releases across environments",
            "Automated CI/CD and fixed post-release sign-in failures caused by stale frontend files",
          ],
          impact: ["Helped administrators manage organization and participant access", "Made releases consistent and sign-in reliable after deployment"],
        },
        {
          problem: "Teams needed a simpler way to configure repositories, applications, and deployment pipelines.",
          architecture: ["React", "Next.js", "GitLab CI", "Amazon Bedrock", "Authentication", "API Integrations"],
          decisions: [
            "Built reusable React and Next.js templates with authentication, API integrations, and Amazon Bedrock to help teams launch internal AI apps with less setup",
            "Added self-service repository setup and GitLab CI/CD templates",
          ],
          impact: ["Reduced manual setup for internal application delivery"],
        },
        {
          problem: "API platform releases needed automated build, quality, and rollback checks.",
          architecture: ["Jenkins", "SonarQube", "OpenShift", "Container Registry", "Image Signing"],
          decisions: [
            "Automated API platform builds and quality checks with Jenkins, SonarQube, and OpenShift for repeatable releases",
            "Added image signing, verification, and rollback",
          ],
          impact: ["Repeatable release checks and a recovery path for failed deployments"],
        },
        {
          problem: "DKI regional enterprises needed one platform for executive recruitment and staged selection.",
          architecture: ["React", "Supabase Auth", "Row-Level Security", "Backend API"],
          decisions: [
            "Built a React recruitment platform with vacancy management, candidate review, and staged selection in one workflow",
            "Used Supabase Auth and Row-Level Security to limit access to candidate and evaluation data",
          ],
          impact: ["Centralized candidate review with access controls"],
        },
        {
          problem: "Mobile teams needed clearer issue tracking and stakeholder communication.",
          architecture: ["Issue Tracking", "Team Communication", "Mobile Support"],
          decisions: [
            "Standardized mobile issue tracking and stakeholder communication, making problem follow-up clearer for the engineering team",
            "Aligned follow-up between engineers and stakeholders so reported issues stayed visible",
          ],
          impact: ["Gave the engineering team a clearer view of open mobile issues"],
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
            "Built Next.js product and campaign pages with an internal CMS, letting marketing teams update customer content themselves",
            "Created reusable React components in a monorepo and rendered metadata server-side for search engines",
          ],
          impact: ["Made product content indexable and reduced duplicated UI work"],
        },
        {
          problem: "Supplier and billing teams needed application updates and more consistent releases.",
          architecture: ["Vue.js", "Node.js", "Jenkins", "Bitbucket", "Harbor", "NGINX"],
          decisions: [
            "Built supplier-portal and billing features with Vue.js and Node.js, and modernized Angular applications for business administration",
            "Automated delivery with Jenkins, Bitbucket, Harbor, and NGINX",
          ],
          impact: ["Improved release consistency and frontend maintainability"],
        },
      ],
    },
    stack: {
      heading1: "Core",
      heading2: "Stack",
      body: "A focused set of technologies I use across full-stack development and production delivery.",
      cards: [
        {
          title: "Frontend & Languages",
          subtitle: "Web foundations \u00b7 Frameworks",
          items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js"],
        },
        {
          title: "Backend & APIs",
          subtitle: "Runtime \u00b7 Integration \u00b7 Access",
          items: ["Node.js", "API Integrations", "Authentication", "Supabase Auth", "Row-Level Security"],
        },
        {
          title: "Delivery & Cloud",
          subtitle: "Containers \u00b7 Pipelines \u00b7 Storage",
          items: ["OpenShift", "Docker", "Helm", "GitLab CI/CD", "Jenkins", "Google Cloud Storage"],
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
    sectionLabels: ["Intro", "Pengalaman Kerja", "Stack Utama", "Kredensial", "Resume"],
    hero: {
      heading1: "Aplikasi Enterprise",
      heading2: "Dibangun untuk Produksi",
      sublabel: "FULLSTACK \u00b7 DEVOPS \u00b7 PERBANKAN \u00b7 TELKOM",
      body: "Full Stack Software Engineer yang membangun aplikasi web responsif dengan React, Next.js, TypeScript, JavaScript, HTML, dan CSS. Pekerjaan saya mendukung alur rekrutmen, konten produk, dan aplikasi internal.",
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
          problem: "Pengguna internal membutuhkan onboarding yang andal dan rilis platform yang konsisten di lingkungan pengujian maupun produksi.",
          architecture: ["Forgejo Actions", "OpenShift", "Docker", "Helm", "OpenResty / NGINX", "Bitbucket Mirroring"],
          decisions: [
            "Membangun alur registrasi dan onboarding dengan tahapan approval serta notifikasi",
            "Memimpin delivery platform dengan OpenShift, Docker, dan Helm untuk menstandarkan rilis antar lingkungan",
            "Mengotomatiskan CI/CD dan memperbaiki kegagalan login pascarilis akibat file frontend lama",
          ],
          impact: ["Membantu admin mengelola akses organisasi dan peserta", "Menjaga konsistensi rilis dan login setelah deployment"],
        },
        {
          problem: "Tim membutuhkan cara yang lebih mudah untuk menyiapkan repositori, aplikasi, dan pipeline rilis.",
          architecture: ["React", "Next.js", "GitLab CI", "Amazon Bedrock", "Autentikasi", "Integrasi API"],
          decisions: [
            "Membangun template React dan Next.js reusable dengan autentikasi, integrasi API, dan Amazon Bedrock untuk mengurangi setup aplikasi AI internal",
            "Menambahkan setup repositori mandiri dan template GitLab CI/CD",
          ],
          impact: ["Mengurangi setup manual untuk pengiriman aplikasi internal"],
        },
        {
          problem: "Rilis platform API membutuhkan pemeriksaan build, kualitas, dan rollback otomatis.",
          architecture: ["Jenkins", "SonarQube", "OpenShift", "Container Registry", "Image Signing"],
          decisions: [
            "Mengotomatiskan build platform API dan pemeriksaan kualitas dengan Jenkins, SonarQube, serta OpenShift untuk rilis yang konsisten",
            "Menambahkan image signing, verifikasi, dan rollback",
          ],
          impact: ["Pemeriksaan rilis yang konsisten dan jalur pemulihan saat deployment gagal"],
        },
        {
          problem: "BUMD DKI membutuhkan satu platform untuk rekrutmen eksekutif dan seleksi bertahap.",
          architecture: ["React", "Supabase Auth", "Row-Level Security", "Backend API"],
          decisions: [
            "Membangun platform rekrutmen dengan React yang menyatukan pengelolaan lowongan, review kandidat, dan seleksi bertahap",
            "Menggunakan Supabase Auth dan Row-Level Security untuk membatasi akses data kandidat dan evaluasi",
          ],
          impact: ["Review kandidat terpusat dengan kontrol akses"],
        },
        {
          problem: "Tim mobile membutuhkan pelacakan masalah dan komunikasi dengan stakeholder yang lebih jelas.",
          architecture: ["Issue Tracking", "Komunikasi Tim", "Dukungan Mobile"],
          decisions: [
            "Membakukan pelacakan masalah mobile dan komunikasi stakeholder agar tindak lanjut tim engineering lebih jelas",
            "Menyelaraskan tindak lanjut antara engineer dan stakeholder agar masalah yang dilaporkan tetap terlihat",
          ],
          impact: ["Tim engineering mendapat gambaran lebih jelas tentang masalah mobile yang belum selesai"],
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
            "Membangun halaman produk dan kampanye Next.js dengan CMS internal agar tim pemasaran dapat memperbarui konten sendiri",
            "Membuat komponen React reusable dalam monorepo dan merender metadata di server agar mudah ditemukan mesin pencari",
          ],
          impact: ["Konten produk dapat diindeks dan duplikasi UI berkurang"],
        },
        {
          problem: "Tim supplier dan billing membutuhkan pembaruan aplikasi dan rilis yang lebih konsisten.",
          architecture: ["Vue.js", "Node.js", "Jenkins", "Bitbucket", "Harbor", "NGINX"],
          decisions: [
            "Membangun fitur portal supplier dan billing dengan Vue.js serta Node.js, sekaligus memodernisasi aplikasi Angular untuk operasional bisnis",
            "Mengotomatiskan delivery dengan Jenkins, Bitbucket, Harbor, dan NGINX",
          ],
          impact: ["Konsistensi rilis dan maintainabilitas frontend meningkat"],
        },
      ]
    },
    stack: {
      heading1: "Stack",
      heading2: "Utama",
      body: "Teknologi inti yang saya gunakan untuk pengembangan full-stack dan rilis produksi.",
      cards: [
        {
          title: "Frontend & Bahasa",
          subtitle: "Dasar web \u00b7 Framework",
          items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js"],
        },
        {
          title: "Backend & API",
          subtitle: "Runtime \u00b7 Integrasi \u00b7 Akses",
          items: ["Node.js", "Integrasi API", "Autentikasi", "Supabase Auth", "Row-Level Security"],
        },
        {
          title: "Delivery & Cloud",
          subtitle: "Container \u00b7 Pipeline \u00b7 Penyimpanan",
          items: ["OpenShift", "Docker", "Helm", "GitLab CI/CD", "Jenkins", "Google Cloud Storage"],
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
