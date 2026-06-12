import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fathul Bilad — Fullstack Engineer & DevOps",
  alternates: {
    canonical: "/",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
