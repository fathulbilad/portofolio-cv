import { SectionPage } from "@/components/portfolio/content";
import { sectionKeys } from "@/lib/portfolio";
import { resolveSection, sectionMetadata } from "@/lib/portfolio-routes";

type Props = { params: Promise<{ section: string }> };
export function generateStaticParams() {
  return sectionKeys.map((section) => ({ section }));
}
export async function generateMetadata({ params }: Props) {
  return sectionMetadata((await params).section);
}
export default async function Page({ params }: Props) {
  const { section } = await params;
  return <SectionPage section={resolveSection(section)} />;
}
