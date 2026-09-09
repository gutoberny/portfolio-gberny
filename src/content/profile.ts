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
    tagline: "I build AI agent systems that run in production.",
    pitch: [
      "Lead developer and architect of a multi-tenant AI agent platform: RAG on pgvector, MCP client and server, a multi-provider LLM layer, guardrails and per-tenant cost control.",
      "Before that, ten years of backend — including a direct debit system for 107,000+ members processing over R$4 million a month.",
    ],
    availability: "Open to remote roles",
    links: [links.github, links.linkedin, links.email, { label: "CV (PDF)", href: "/cv/gustavo-berny-en.pdf", kind: "cv" }],
  },
  pt: {
    name: "Gustavo Berny",
    eyebrow: "Engenheiro de Software Sênior · IA Aplicada e Agentes",
    tagline: "Construo sistemas de agentes de IA que rodam em produção.",
    pitch: [
      "Desenvolvedor principal e arquiteto de uma plataforma multi-tenant de agentes de IA: RAG com pgvector, MCP cliente e servidor, camada multi-provider de LLM, guardrails e controle de custo por tenant.",
      "Antes disso, dez anos de backend — incluindo um sistema de débito em conta para mais de 107.000 membros, processando mais de R$ 4 milhões por mês.",
    ],
    availability: "Aberto a vagas remotas",
    links: [links.github, links.linkedin, links.email, { label: "CV (PDF)", href: "/cv/gustavo-berny-pt.pdf", kind: "cv" }],
  },
  es: {
    name: "Gustavo Berny",
    eyebrow: "Ingeniero de Software Sénior · IA Aplicada y Agentes",
    tagline: "Construyo sistemas de agentes de IA que funcionan en producción.",
    pitch: [
      "Desarrollador principal y arquitecto de una plataforma multi-tenant de agentes de IA: RAG con pgvector, MCP cliente y servidor, capa multi-proveedor de LLM, guardrails y control de coste por tenant.",
      "Antes de eso, diez años de backend — incluyendo un sistema de débito directo para más de 107.000 miembros, procesando más de R$ 4 millones al mes.",
    ],
    availability: "Disponible para trabajo remoto",
    links: [links.github, links.linkedin, links.email, { label: "CV (PDF)", href: "/cv/gustavo-berny-en.pdf", kind: "cv" }],
  },
};
