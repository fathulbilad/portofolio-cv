import { Anton } from "next/font/google";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-lab-display", display: "swap" });

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
