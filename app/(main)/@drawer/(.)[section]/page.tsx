import { RouteDrawer } from "@/components/portfolio/drawer";
import { resolveSection, sectionMetadata } from "@/lib/portfolio-routes";

type Props = { params: Promise<{ section: string }> };
export async function generateMetadata({ params }: Props) {
  return sectionMetadata((await params).section);
}
export default async function Page({ params }: Props) {
  const { section } = await params;
  return <RouteDrawer section={resolveSection(section)} />;
}
