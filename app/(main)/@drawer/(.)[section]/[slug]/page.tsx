import { RouteDrawer } from "@/components/portfolio/drawer";
import { resolveSection, sectionMetadata } from "@/lib/portfolio-routes";

type Props = { params: Promise<{ section: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { section, slug } = await params;
  return sectionMetadata(section, slug);
}
export default async function Page({ params }: Props) {
  const { section, slug } = await params;
  return <RouteDrawer section={resolveSection(section, slug)} slug={slug} />;
}
