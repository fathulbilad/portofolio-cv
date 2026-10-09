import { notFound } from "next/navigation";
import { sideProjects, isSection, sections, work } from "./portfolio";

export function resolveSection(section: string, slug?: string) {
  if (!isSection(section)) notFound();
  if (slug) {
    const valid = section === "projects" ? work.some((item) => item.slug === slug) : section === "side-projects" && sideProjects.some((item) => item.slug === slug);
    if (!valid) notFound();
  }
  return section;
}

export function sectionMetadata(section: string, slug?: string) {
  const key = resolveSection(section, slug);
  const project = key === "projects" ? work.find((item) => item.slug === slug) : null;
  const practice = key === "side-projects" ? sideProjects.find((item) => item.slug === slug) : null;
  return {
    title: project ? `${project.company} — ${project.title}` : practice?.name ?? sections[key].label.en,
    description: sections[key].description.en,
    alternates: { canonical: `/${section}${slug ? `/${slug}` : ""}` },
  };
}
