import type { Localized, Pillar } from "./types";

export const howIWork: Localized<Pillar[]> = {
  en: [
    { title: "AI inside my own engineering loop", body: "I use coding agents as a core part of how I build — Claude Code with parallel agents in isolated git worktrees, which sharply cuts delivery time without giving up review or quality." },
    { title: "Quality gates that hold in production", body: "A ~107k-line monorepo across 1,019 files with ~3,250 test cases and an 80% coverage threshold, plus an architecture check running in CI. For LLM output specifically: guardrails on content, scope and tool arguments, with SLA metrics and sentiment analysis on every conversation." },
    { title: "Engineering judgement with product thinking", body: "I came to engineering through product ownership, so I weigh architecture against the user and the business outcome. That is what lets me tell where AI creates real value and where it is just noise." },
  ],
  pt: [
    { title: "IA dentro do meu próprio ciclo de engenharia", body: "Uso agentes de codificação como parte central do meu processo — Claude Code com agentes paralelos em worktrees git isoladas, reduzindo drasticamente o tempo de entrega sem abrir mão de revisão e qualidade." },
    { title: "Travas de qualidade que resistem à produção", body: "Monorepo de ~107 mil linhas em 1.019 arquivos, com ~3.250 casos de teste e threshold de 80% de cobertura, além de verificação de arquitetura rodando no CI. Para a saída de LLM: guardrails de conteúdo, de escopo e de argumento de tool, com métricas de SLA e análise de sentimento em cada atendimento." },
    { title: "Julgamento de engenharia com visão de produto", body: "Cheguei à engenharia passando por Product Owner, então avalio arquitetura contra o usuário e o resultado de negócio. É isso que me permite dizer onde IA gera valor real e onde é só ruído." },
  ],
  es: [
    { title: "IA dentro de mi propio ciclo de ingeniería", body: "Uso agentes de codificación como parte central de mi proceso — Claude Code con agentes paralelos en worktrees git aislados, reduciendo drásticamente el tiempo de entrega sin renunciar a la revisión ni a la calidad." },
    { title: "Controles de calidad que aguantan en producción", body: "Monorepo de ~107 mil líneas en 1.019 archivos, con ~3.250 casos de prueba y un umbral de cobertura del 80%, además de una verificación de arquitectura en CI. Para la salida de LLM: guardrails de contenido, alcance y argumentos de tools, con métricas de SLA y análisis de sentimiento." },
    { title: "Criterio de ingeniería con visión de producto", body: "Llegué a la ingeniería desde el product ownership, así que evalúo la arquitectura frente al usuario y al resultado de negocio. Eso me permite distinguir dónde la IA genera valor real y dónde es solo ruido." },
  ],
};
