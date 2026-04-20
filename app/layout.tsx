import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { StarfieldWrapper } from "@/components/wrappers/starfield-wrappers";
import { Space_Grotesk } from "next/font/google";
import { FloatingDockWrapper } from "@/components/wrappers/floating-wrappers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fathul Bilad — Fullstack Engineer & DevOps",
    template: "%s | Fathul Bilad",
  },
  description:
    "Fullstack Engineer & DevOps specialist building scalable, production-grade systems. Focused on performance, reliability, and real-world impact.",

  keywords: [
    "Fathul Bilad",
    "Fullstack Engineer",
    "DevOps Engineer",
    "Next.js",
    "React",
    "Node.js",
    "CI/CD",
    "System Design",
    "Software Engineer Indonesia",
  ],

  authors: [{ name: "Fathul Bilad" }],
  creator: "Fathul Bilad",

  metadataBase: new URL("https://fathul-bilad-cv.vercel.app"),

  openGraph: {
    title: "Fathul Bilad — Fullstack Engineer & DevOps",
    description:
      "Building scalable systems that actually hold up in production.",
    url: "https://your-domain.com",
    siteName: "Fathul Bilad Portfolio",
    images: [
      {
        url: "/og-image.png", // optional (can add later)
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fathul Bilad — Fullstack Engineer & DevOps",
    description:
      "Building scalable systems that actually hold up in production.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                const theme = localStorage.getItem("theme");
                if (theme === "dark") {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {}
            })();
          `}
        </Script>

        <div className="fixed inset-0 -z-10 opacity-0 dark:opacity-100 transition-opacity duration-700">
          <StarfieldWrapper className="opacity-0 dark:opacity-100 transition-opacity" />
        </div>

        {children}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 mb-3j">
          <FloatingDockWrapper></FloatingDockWrapper>
        </div>
      </body>
    </html>
  );
}
