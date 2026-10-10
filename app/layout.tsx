import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/contexts/language-context";
import { WelcomeIntro } from "@/components/portfolio/welcome-intro";
import { welcomeBootstrap } from "@/lib/welcome-intro";
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fathul Bilad — Full Stack Software Engineer",
    template: "%s | Fathul Bilad",
  },
  description:
    "Explore Fathul Bilad’s enterprise work, full stack and DevOps experience, side projects, and certifications.",

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
    title: "Fathul Bilad — Full Stack Software Engineer",
    description:
      "Building scalable systems that actually hold up in production.",
    url: "/",
    siteName: "Fathul Bilad Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fathul Bilad — Full Stack Software Engineer",
    description:
      "Building scalable systems that actually hold up in production.",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: "/icon.svg",
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
      className={`${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <head><script dangerouslySetInnerHTML={{ __html: welcomeBootstrap }} /></head>
      <body>
        <LanguageProvider><WelcomeIntro>{children}</WelcomeIntro></LanguageProvider>
      </body>
    </html>
  );
}
