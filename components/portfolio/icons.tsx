import { BadgeCheck, BookOpen, BriefcaseBusiness, Code2, FlaskConical, GitBranch, GraduationCap, Layers3, Mail, Server, Wrench, type LucideIcon } from "lucide-react";
import type { SectionKey } from "@/lib/portfolio";

export const sectionIcons: Record<SectionKey, LucideIcon> = { experience: BriefcaseBusiness, projects: Layers3, "side-projects": FlaskConical, skills: Wrench, certificates: BadgeCheck, education: GraduationCap, about: BookOpen, contact: Mail };
export const sideProjectIcons: Record<string, LucideIcon> = { "cardio-series": Code2 };
export const skillIcons = [Code2, Server, GitBranch, Wrench];
