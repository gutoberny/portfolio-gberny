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
  /** Linha de autoria acima da faixa de métricas: põe o Gustavo como sujeito
   *  dos números, para a faixa não ler como ficha técnica de um produto. */
  authorship: string;
  /** Localização e fuso: o que um recrutador internacional precisa saber ali
   * (dá para sobrepor horário?). NÃO é declaração de disponibilidade para
   * vagas — essa vive no LinkedIn, visível só para recrutadores. */
  location: string;
  links: Link[];
  /** Ausente hoje — não há foto do dono do site. Quando houver uma, defina
   * este campo em `profile.ts` (os três idiomas) e `Portrait` passa a
   * renderizá-la automaticamente; nenhuma outra mudança é necessária. */
  photo?: { src: string; alt: string };
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

export interface Decision {
  decision: string;
  why: string;
  cost: string;
}

export interface Incident {
  title: string;
  what: string;
  fix: string;
}

export interface DiagramLabels {
  intake: string;
  channels: string[];
  queue: string;
  orchestrator: string;
  stages: string[];
  delivery: string;
  handoff: string;
  caption: string;
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  context: string[];
  decisions: Decision[];
  incidents: Incident[];
  /** Ausente de propósito quando o projeto não tem métrica externa com
   * denominador — a regra do site é que todo número carrega a sua fonte, e
   * um case study sem uma delas não deve ganhar um bloco de Resultados
   * inventado só para preencher a seção. Nunca torne obrigatório de novo. */
  results?: string[];
  stack: string;
  /** Ausente de propósito quando o projeto não tem um diagrama de
   * arquitetura real para mostrar — não desenhe um genérico só para
   * preencher a seção. Nunca torne obrigatório de novo. */
  diagram?: DiagramLabels;
  labels: {
    context: string;
    architecture: string;
    decisions: string;
    results: string;
    incidents: string;
    stack: string;
    back: string;
    decisionWhy: string;
    decisionCost: string;
    incidentWhat: string;
    incidentFix: string;
  };
}
