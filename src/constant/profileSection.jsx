import {
  kp,
  indosat1,
  indosat2,
  dexa1,
  dexa2,
  astra,
} from "@/constant/experience";
import { AnimatedTooltip } from "@/components/animatedtooltip/animated-tooltip";

export const profileSection = [
  {
    title: "June 2025 - Present",
    content: (
      <div>
        <p className="mb-8 text-base font-normal text-neutral-800 sm:text-xl md:text-xl lg:text-xl dark:text-neutral-200">
          Currently expanding my full-stack capabilities by working with
          FlutterFlow, a low-code platform for cross-platform mobile app
          development.
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={kp} />
        </div>
      </div>
    ),
  },
  // Indosat
  {
    title: "October 2024 – June 2025",
    content: (
      <div>
        <p className="mb-8 text-base font-normal text-neutral-800 sm:text-xl md:text-xl lg:text-xl dark:text-neutral-200">
          Focus on full-stack development, contributing to the enhancement of
          Indosat’s internal Supplier Portal. Improved UI stability, and
          resolved legacy issues using React.js and Node.Js.
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={indosat1} />
        </div>
      </div>
    ),
  },
  // Astra
  {
    title: "August 2023 – October 2024",
    content: (
      <div>
        <p className="mb-4 text-base font-normal text-neutral-800 sm:text-xl md:text-xl lg:text-xl  dark:text-neutral-200">
          Led frontend development for the Auto2000 CMS and website,
          collaborating with cross-functional teams to build a scalable and
          maintainable UI architecture Using Next.js.
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={astra} />
        </div>
      </div>
    ),
  },
  // Indosat 2
  {
    title: "November 2022 – August 2023",
    content: (
      <div>
        <p className="mb-4 text-base font-normal text-neutral-800 sm:text-xl md:text-xl lg:text-xl  dark:text-neutral-200">
          Portal, implementing secure photo upload solutions with Google Cloud
          Storage via Signed URLs Using React.js and Node.js.
        </p>
        <div className="flex flex-row items-center justify-center mb-5 w-full">
          <AnimatedTooltip items={indosat2} />
        </div>
      </div>
    ),
  },
  // Dexa Devops
  {
    title: "November 2021 - November 2022",
    content: (
      <div>
        <p className="mb-4 text-base font-normal text-neutral-800 sm:text-xl md:text-xl lg:text-xl  dark:text-neutral-200">
          Led DevOps and full-stack development for a custom Supplier Portal
          built from scratch for Dexa Medica Using Vue.js. and Node.js.
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={dexa1} />
        </div>
        <p className="mb-4 text-base font-normal text-neutral-800 sm:text-xl md:text-xl lg:text-xl  dark:text-neutral-200">
          DevOps responsibilities included configuring and maintaining Jenkins,
          Docker, Harbor, Kubernetes, NGINX, and KONGA on Red Hat/CentOS.
        </p>
        <div className="flex flex-row items-center justify-center w-full">
          <AnimatedTooltip items={dexa2} />
        </div>
      </div>
    ),
  },
];
