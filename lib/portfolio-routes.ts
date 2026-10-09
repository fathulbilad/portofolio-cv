import { notFound } from "next/navigation";
import { sideProjects, sections, work } from "./portfolio";
import { parseSectionPath } from "./portfolio-paths";

export function resolveSection(section: string, slug?: string) {
  const route = parseSectionPath(`/${section}${slug ? `/${slug}` : ""}`);
  if (!route || route.section !== section || route.slug !== slug) notFound();
  return route.section;
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
