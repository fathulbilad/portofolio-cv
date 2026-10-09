import { PortfolioNavigation } from "@/components/portfolio/navigation";
import { SiteHeader, SiteFooter } from "@/components/portfolio/shell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioNavigation>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </PortfolioNavigation>
  );
}
