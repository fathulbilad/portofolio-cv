import { BadgeCheck, Blocks, BookOpen, BriefcaseBusiness, Cloud, Code2, Database, FlaskConical, GitBranch, GraduationCap, Layers3, Mail, Network, Server, Terminal, Wrench, type LucideIcon } from "lucide-react";
import type { SectionKey } from "@/lib/portfolio";

export const sectionIcons: Record<SectionKey, LucideIcon> = { experience: BriefcaseBusiness, projects: Layers3, "side-projects": FlaskConical, skills: Wrench, certificates: BadgeCheck, education: GraduationCap, about: BookOpen, contact: Mail };
export const sideProjectIcons: Record<string, LucideIcon> = { dev: Code2, database: Database, cloud: Cloud, kubernetes: Blocks, "system-design": Network, "system-architecture": Layers3 };
export const skillIcons = [Code2, Server, Database, GitBranch, Cloud, Network, Terminal, Blocks];
