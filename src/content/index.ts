import { education, languages } from "./education";
import { experience } from "./experience";
import { howIWork } from "./howIWork";
import { heroMetrics } from "./metrics";
import { profile } from "./profile";
import { projects } from "./projects";
import { stack } from "./stack";
import type { Job, Lang, LanguageSkill, Metric, Pillar, Profile, Project, StackGroup, Study } from "./types";

export * from "./types";
export { caseStudy } from "./caseStudy";

export interface SiteContent {
  profile: Profile;
  heroMetrics: Metric[];
  projects: Project[];
  experience: Job[];
  stack: StackGroup[];
  howIWork: Pillar[];
  education: Study[];
  languages: LanguageSkill[];
}

export function getContent(lang: Lang): SiteContent {
  return {
    profile: profile[lang],
    heroMetrics: heroMetrics[lang],
    projects: projects[lang],
    experience: experience[lang],
    stack: stack[lang],
    howIWork: howIWork[lang],
    education: education[lang],
    languages: languages[lang],
  };
}

/** O projeto em destaque do hero e da seção Featured work. */
export function getFeaturedProject(lang: Lang): Project {
  const featured = projects[lang].find((p) => p.slug === "agents-ia");
  if (!featured) throw new Error("projeto em destaque 'agents-ia' ausente do conteúdo");
  return featured;
}

/** Os demais projetos, na ordem em que devem aparecer. */
export function getOtherProjects(lang: Lang): Project[] {
  return projects[lang].filter((p) => p.slug !== "agents-ia");
}
