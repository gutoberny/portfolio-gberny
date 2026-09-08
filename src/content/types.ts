export type Lang = "en" | "pt" | "es";

export type Localized<T> = Record<Lang, T>;

export interface Link {
  label: string;
  href: string;
  kind: "github" | "linkedin" | "email" | "cv";
}

export interface Profile {
  name: string;
  eyebrow: string;
  tagline: string;
  pitch: string[];
  availability: string;
  links: Link[];
  photo: { src: string; alt: string };
}

/** Um número do hero. `detail` carrega o denominador ou a data — nunca vazio. */
export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Ex.: "AI agent platform · Imply" */
  kind: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string;
  /** URL pública do projeto, quando existir. */
  href?: string;
  /** Rota interna do case study, quando existir. */
  caseStudyHref?: string;
}

export interface Job {
  role: string;
  company: string;
  period: string;
  /** Uma linha. Nunca parágrafo. */
  impact: string;
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface Pillar {
  title: string;
  body: string;
}

export interface Study {
  course: string;
  institution: string;
  status: string;
}

export interface LanguageSkill {
  name: string;
  level: string;
}
