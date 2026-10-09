import { isSection, sideProjects, work, type SectionKey } from "./portfolio";

export type SectionRoute = { section: SectionKey; slug?: string };

export function parseSectionPath(path: string): SectionRoute | null {
  const parts = path.split("/").filter(Boolean);
  const [section, slug] = parts;
  if (!path.startsWith("/") || parts.length > 2 || !isSection(section)) return null;
  if (slug && !(section === "projects" ? work.some((item) => item.slug === slug)
    : section === "side-projects" && sideProjects.some((item) => item.slug === slug))) return null;
  return { section, slug };
}
