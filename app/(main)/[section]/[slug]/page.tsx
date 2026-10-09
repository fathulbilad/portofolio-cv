import { SectionPage } from "@/components/portfolio/content";
import { sideProjects, work } from "@/lib/portfolio";
import { resolveSection, sectionMetadata } from "@/lib/portfolio-routes";

type Props = { params: Promise<{ section: string; slug: string }> };
export function generateStaticParams() {
  return [
    ...work.map(({ slug }) => ({ section: "projects", slug })),
    ...sideProjects.map(({ slug }) => ({ section: "side-projects", slug })),
  ];
}
export async function generateMetadata({ params }: Props) {
  const { section, slug } = await params;
  return sectionMetadata(section, slug);
}
export default async function Page({ params }: Props) {
  const { section, slug } = await params;
  return <SectionPage section={resolveSection(section, slug)} slug={slug} />;
}
