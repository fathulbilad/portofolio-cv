"use client";

import { cn } from "./utils";
import { Boxes } from "@/components/background-boxes/backgroundboxes";
import { ContainerTextFlip } from "@/components/containtertextflip/containertextflip";
import { useEffect, useRef, useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/resizablenavbar/resizablenavbar";
import { Timeline } from "@/components/timeline/timeline";
import { navItems } from "@/constant/navItems";
import { words } from "@/constant/words";
import { profileSection } from "@/constant/profileSection";
import { FloatingDock } from "@/components/floatingdock/floatingdock";
import { links } from "@/constant/floatingItem";
import { TypewriterEffectSmooth } from "@/components/typewriter/typewriter";
import { LoaderComponent } from "@/components/loadercomponent/loadercomponent";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const homeRef = useRef(null);
  const resumeRef = useRef(null);
  const contactMeRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    resume: resumeRef,
    contactMe: contactMeRef,
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNavClick = (refKey) => {
    sectionRefs[refKey]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClickMobile = (refKey) => {
    sectionRefs[refKey]?.current?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const wordContactMe = [
    {
      text: "Let's make something together",
    },
  ];

  return (
    <div>
      {isClient ? (
        <>
          <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
              <NavbarLogo />
              <NavItems
                items={navItems}
                onItemClick={(refKey) => handleNavClick(refKey)}
              />
              <div className="flex items-center gap-4">
                <NavbarButton
                  variant="primary"
                  onClick={() => {
                    handleNavClick("contactMe");
                  }}
                >
                  Contact Me
                </NavbarButton>
              </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </MobileNavHeader>

              <MobileNavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              >
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => handleNavClickMobile(item?.refKey)}
                    className="relative text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton
                    onClick={() => handleNavClickMobile("contactMe")}
                    variant="primary"
                    className="w-full"
                  >
                    Contact Me
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
          <section ref={homeRef}>
            <ContentSection isClient={isClient} words={words} />
          </section>
          <section ref={resumeRef}>
            <ContentSectionPortofolio data={profileSection} />
          </section>
          <section ref={contactMeRef} className=" space-x-6">
            <ContactMeSection wordContactMe={wordContactMe} />
          </section>
        </>
      ) : (
        <div className="flex inset-x-0 justify-center items-center h-screen">
          <LoaderComponent />
        </div>
      )}
    </div>
  );
}

const ContentSection = ({ isClient, words }) => (
  <>
    <div className="relative h-screen">
      <div className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,black)] pointer-events-none" />
        <Boxes />
        <h1 className="text-5xl text-white relative z-20">
          Hello I&apos;m Fathul
        </h1>
        <h2 className={cn("md:text-4xl text-xl text-white relative z-20 mt-4")}>
          Turning Ideas Into Web Solutions
        </h2>
        <p className="text-center p-5 text-neutral-300 relative z-20 text-xl">
          Full-Stack Developer focused on frontend experience, system
          performance, and clean UI.
        </p>

        {isClient && (
          <div className="mt-11 sm:mt-12 md:mt-12 lg:mt-12">
            <ContainerTextFlip words={words} isClient={isClient} />
          </div>
        )}

        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-black z-30 pointer-events-none" />
      </div>
    </div>
  </>
);

const ContentSectionPortofolio = ({ data }) => (
  <>
    <div className="relative w-screen bg-black">
      <div className="absolute top-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
      <Timeline data={data} />
    </div>
  </>
);

const ContactMeSection = ({ wordContactMe }) => (
  <div className="flex flex-col inset-x-0 justify-center items-center h-150 w-screen bg-black">
    <div className="flex flex-col items-center justify-center mt-5 mb-1 sm:mb-10 md:mb-10 xl:mb-10">
      <p className="text-neutral-200 text-base sm:text-2xl md:text-2xl ">
        Turning Ideas Into Impactful Products
      </p>
      <TypewriterEffectSmooth words={wordContactMe} />
    </div>
    <div className="flex items-center justify-center w-full">
      <FloatingDock items={links} />
    </div>
  </div>
);
