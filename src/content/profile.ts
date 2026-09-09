import type { Localized, Profile } from "./types";

const links = {
  github: { label: "GitHub", href: "https://github.com/gutoberny", kind: "github" as const },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/gustavo-berny/", kind: "linkedin" as const },
  email: { label: "Email", href: "mailto:pelotas.berny93@gmail.com", kind: "email" as const },
};

export const profile: Localized<Profile> = {
  en: {
    name: "Gustavo Berny",
    eyebrow: "Senior Software Engineer · Applied AI & Agents",
    tagline: "Ten years of engineering. I take AI from architecture to production.",
    authorship: "Lead developer and architect — 2,400 commits, end to end.",
    pitch: [
      "Lead developer and architect of a multi-tenant AI agent platform: RAG on pgvector, MCP client and server, a multi-provider LLM layer, guardrails and per-tenant cost control.",
      "Before that, ten years of backend — including a direct debit system for 107,000+ members processing over R$4 million a month.",
    ],
    location: "Brazil · UTC−3",
    links: [links.github, links.linkedin, links.email, { label: "CV (PDF)", href: "/cv/gustavo-berny-en.pdf", kind: "cv" }],
  },
  pt: {
    name: "Gustavo Berny",
    eyebrow: "Engenheiro de Software Sênior · IA Aplicada e Agentes",
    tagline: "Dez anos de engenharia. Levo IA da arquitetura à produção.",
    authorship: "Desenvolvedor principal e arquiteto — 2.400 commits, ponta a ponta.",
    pitch: [
      "Desenvolvedor principal e arquiteto de uma plataforma multi-tenant de agentes de IA: RAG com pgvector, MCP cliente e servidor, camada multi-provider de LLM, guardrails e controle de custo por tenant.",
      "Antes disso, dez anos de backend — incluindo um sistema de débito em conta para mais de 107.000 membros, processando mais de R$ 4 milhões por mês.",
    ],
    location: "Brasil · UTC−3",
    links: [links.github, links.linkedin, links.email, { label: "CV (PDF)", href: "/cv/gustavo-berny-pt.pdf", kind: "cv" }],
  },
  es: {
    name: "Gustavo Berny",
    eyebrow: "Ingeniero de Software Sénior · IA Aplicada y Agentes",
    tagline: "Diez años de ingeniería. Llevo IA de la arquitectura a la producción.",
    authorship: "Desarrollador principal y arquitecto — 2.400 commits, de extremo a extremo.",
    pitch: [
      "Desarrollador principal y arquitecto de una plataforma multi-tenant de agentes de IA: RAG con pgvector, MCP cliente y servidor, capa multi-proveedor de LLM, guardrails y control de coste por tenant.",
      "Antes de eso, diez años de backend — incluyendo un sistema de débito directo para más de 107.000 miembros, procesando más de R$ 4 millones al mes.",
    ],
    location: "Brasil · UTC−3",
    links: [links.github, links.linkedin, links.email, { label: "CV (PDF)", href: "/cv/gustavo-berny-en.pdf", kind: "cv" }],
  },
};
