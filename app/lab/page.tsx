import type { Metadata } from "next";
import { Lab } from "@/components/lab/lab";

export const metadata: Metadata = {
  title: "Off duty — The Lab",
  description: "A little corner of my own. Life lately, games, music, projects, and things with nowhere else to go.",
  alternates: { canonical: "/lab" },
  openGraph: { title: "Off duty — Fathul Bilad", description: "A little corner of my own.", url: "/lab" },
};

export default function LabPage() {
  return <Lab />;
}
