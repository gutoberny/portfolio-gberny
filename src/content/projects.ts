import type { Localized, Project } from "./types";

export const projects: Localized<Project[]> = {
  en: [
    {
      slug: "agents-ia",
      name: "Agents-IA",
      kind: "Multi-tenant AI agent SaaS platform · Imply",
      period: "03/2026 – Present",
      summary:
        "A multi-tenant customer engagement platform where companies configure AI agents that talk autonomously to leads and customers, handing off to a human agent when needed. Channels: WhatsApp, embeddable web widget, email, public API and MCP. I served as lead developer and architect, with over 2,400 commits and end-to-end ownership — from AI architecture to production infrastructure.",
      highlights: [
        "85% of conversations resolved end-to-end by AI, with no human intervention (6,570 of 7,725 closed in Aug/2026)",
        "Cut time to first response from 2m39s to 4.7 seconds (median, −97%), measured across 61k question-answer pairs",
        "Built an in-house RAG pipeline: custom chunking, embeddings, vector search on PostgreSQL 16 with pgvector",
        "Asynchronous agent orchestrator with a 14-stage pipeline consumed from a RabbitMQ queue",
        "MCP client and server, tool calling with encrypted credentials, and production guardrails",
        "Inference cost held at $0.12 per completed conversation across 810M tokens/month",
      ],
      stack: "Node 22 · TypeScript · Express 5 · Prisma 6 · PostgreSQL 16 + pgvector · Redis · RabbitMQ · Socket.io · React 19 · Docker · OCI",
      caseStudyHref: "/work/agents-ia",
    },
    {
      slug: "bernyflow",
      name: "BernyFlow",
      kind: "Business management SaaS · personal project",
      period: "02/2025 – Present",
      summary:
        "Full-stack business management SaaS covering CRM, invoicing and financial reporting, with a finance module that issues NFC-e electronic invoices.",
      highlights: [
        "From zero to production on a Linux VPS with over 300 deploys in 3 months, working solo",
        "Docker infrastructure, JWT authentication and REST APIs",
        "AI agents assisting across the entire development cycle",
      ],
      stack: "Node.js · TypeScript · React · PostgreSQL · Prisma · Docker",
      href: "https://bernyflow.com.br",
      caseStudyHref: "/work/bernyflow",
    },
    {
      slug: "liga-dos-vales",
      name: "Liga dos Vales Volleyball League",
      kind: "Official league portal · personal project",
      period: "2026 – Present",
      summary:
        "Built and maintain the public site for the largest volleyball championship in Santa Cruz do Sul, Brazil — stages, brackets, rankings, a player transfer market, Hall of Fame and a news portal, with a restricted admin area for the organizers.",
      highlights: [
        "Live operation through the 2026 season, with men's and women's stages gathering 20+ teams",
        "Results and standings published after every stage",
      ],
      stack: "Next.js · React · Docker on a self-managed VPS",
      href: "https://ligadosvales.com.br",
      caseStudyHref: "/work/liga-dos-vales",
    },
  ],
  pt: [
    {
      slug: "agents-ia",
      name: "Agents-IA",
      kind: "Plataforma SaaS multi-tenant de agentes de IA · Imply",
      period: "03/2026 – Atual",
      summary:
        "Plataforma multi-tenant de atendimento em que empresas configuram agentes de IA que conversam de forma autônoma com leads e clientes, com repasse para atendente humano quando necessário. Canais: WhatsApp, widget web embarcável, e-mail, API pública e MCP. Atuei como desenvolvedor principal e arquiteto, com mais de 2.400 commits e responsabilidade de ponta a ponta — da arquitetura de IA à infraestrutura em produção.",
      highlights: [
        "85% dos atendimentos resolvidos ponta a ponta pela IA, sem intervenção humana (6.570 de 7.725 encerrados em ago/2026)",
        "Tempo até a primeira resposta caiu de 2min39 para 4,7 segundos (mediana, −97%), medido sobre 61 mil pares pergunta-resposta",
        "Pipeline RAG próprio: chunking customizado, embeddings e busca vetorial no PostgreSQL 16 com pgvector",
        "Orquestrador assíncrono de agentes com pipeline de 14 etapas consumido de fila RabbitMQ",
        "MCP cliente e servidor, tool calling com credenciais criptografadas e guardrails de produção",
        "Custo de inferência mantido em US$ 0,12 por atendimento completo, sobre 810 milhões de tokens/mês",
      ],
      stack: "Node 22 · TypeScript · Express 5 · Prisma 6 · PostgreSQL 16 + pgvector · Redis · RabbitMQ · Socket.io · React 19 · Docker · OCI",
      caseStudyHref: "/work/agents-ia",
    },
    {
      slug: "bernyflow",
      name: "BernyFlow",
      kind: "SaaS de gestão empresarial · projeto próprio",
      period: "02/2025 – Atual",
      summary:
        "SaaS de gestão empresarial fullstack com CRM, faturamento e relatórios financeiros, incluindo módulo financeiro com emissão de NFC-e.",
      highlights: [
        "Do zero à produção em VPS Linux, com mais de 300 deploys em 3 meses atuando sozinho",
        "Infraestrutura Docker, autenticação JWT e APIs REST",
        "Agentes de IA assistindo todo o ciclo de desenvolvimento",
      ],
      stack: "Node.js · TypeScript · React · PostgreSQL · Prisma · Docker",
      href: "https://bernyflow.com.br",
      caseStudyHref: "/work/bernyflow",
    },
    {
      slug: "liga-dos-vales",
      name: "Liga dos Vales de Voleibol",
      kind: "Portal oficial da liga · projeto próprio",
      period: "2026 – Atual",
      summary:
        "Desenvolvi e mantenho o site público do maior campeonato de voleibol de Santa Cruz do Sul — etapas, chaveamento, ranking, mercado de atletas, Hall da Fama e portal de notícias, com área administrativa restrita para a organização.",
      highlights: [
        "Operação real na temporada 2026, com etapas masculinas e femininas reunindo mais de 20 equipes",
        "Resultados e classificação publicados a cada etapa",
      ],
      stack: "Next.js · React · Docker em VPS próprio",
      href: "https://ligadosvales.com.br",
      caseStudyHref: "/work/liga-dos-vales",
    },
  ],
  es: [
    {
      slug: "agents-ia",
      name: "Agents-IA",
      kind: "Plataforma SaaS multi-tenant de agentes de IA · Imply",
      period: "03/2026 – Actual",
      summary:
        "Plataforma multi-tenant de atención en la que las empresas configuran agentes de IA que conversan de forma autónoma con leads y clientes, con derivación a un agente humano cuando es necesario. Canales: WhatsApp, widget web integrable, correo, API pública y MCP. Fui el desarrollador principal y arquitecto, con más de 2.400 commits y responsabilidad de extremo a extremo.",
      highlights: [
        "85% de las conversaciones resueltas de extremo a extremo por la IA, sin intervención humana (6.570 de 7.725 cerradas en ago/2026)",
        "Tiempo hasta la primera respuesta reducido de 2min39 a 4,7 segundos (mediana, −97%), sobre 61 mil pares pregunta-respuesta",
        "Pipeline RAG propio: chunking personalizado, embeddings y búsqueda vectorial en PostgreSQL 16 con pgvector",
        "Orquestador asíncrono de agentes con pipeline de 14 etapas consumido de una cola RabbitMQ",
        "MCP cliente y servidor, tool calling con credenciales cifradas y guardrails de producción",
        "Coste de inferencia mantenido en US$ 0,12 por conversación completa, sobre 810 millones de tokens/mes",
      ],
      stack: "Node 22 · TypeScript · Express 5 · Prisma 6 · PostgreSQL 16 + pgvector · Redis · RabbitMQ · Socket.io · React 19 · Docker · OCI",
      caseStudyHref: "/work/agents-ia",
    },
    {
      slug: "bernyflow",
      name: "BernyFlow",
      kind: "SaaS de gestión empresarial · proyecto propio",
      period: "02/2025 – Actual",
      summary:
        "SaaS de gestión empresarial full-stack con CRM, facturación e informes financieros, incluyendo un módulo financiero con emisión de NFC-e.",
      highlights: [
        "De cero a producción en un VPS Linux, con más de 300 despliegues en 3 meses trabajando solo",
        "Infraestructura Docker, autenticación JWT y APIs REST",
        "Agentes de IA asistiendo en todo el ciclo de desarrollo",
      ],
      stack: "Node.js · TypeScript · React · PostgreSQL · Prisma · Docker",
      href: "https://bernyflow.com.br",
      caseStudyHref: "/work/bernyflow",
    },
    {
      slug: "liga-dos-vales",
      name: "Liga dos Vales de Voleibol",
      kind: "Portal oficial de la liga · proyecto propio",
      period: "2026 – Actual",
      summary:
        "Desarrollé y mantengo el sitio público del mayor campeonato de voleibol de Santa Cruz do Sul — etapas, cuadros, ranking, mercado de jugadores, Hall de la Fama y portal de noticias, con área administrativa restringida para la organización.",
      highlights: [
        "Operación real en la temporada 2026, con etapas masculinas y femeninas que reúnen más de 20 equipos",
        "Resultados y clasificación publicados en cada etapa",
      ],
      stack: "Next.js · React · Docker en VPS propio",
      href: "https://ligadosvales.com.br",
      caseStudyHref: "/work/liga-dos-vales",
    },
  ],
};
