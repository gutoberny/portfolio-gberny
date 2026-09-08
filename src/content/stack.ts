import type { Localized, StackGroup } from "./types";

const groups = (t: Record<string, string>): StackGroup[] => [
  { title: t.ai, items: ["Production AI agents", "RAG with pgvector", "Multi-agent orchestration", "Tool / function calling", "MCP (client & server)", "Guardrails", "Multimodal AI", "LLMOps / FinOps"] },
  { title: t.backend, items: ["Node.js", "TypeScript (ESM)", "Express", "Prisma", "PHP/Laravel (MVC)", "REST APIs", "Multi-tenant architecture", "RabbitMQ", "Socket.io"] },
  { title: t.automation, items: ["Python", "WhatsApp (Z-API, Meta Cloud API)", "Third-party integrations", "Data processing"] },
  { title: t.data, items: ["PostgreSQL", "MySQL", "pgvector", "Query tuning", "Functions, triggers, CTEs"] },
  { title: t.frontend, items: ["React", "Vite", "Next.js", "Tailwind", "Redux Toolkit", "In-house design system"] },
  { title: t.quality, items: ["Vitest / Jest", "Testcontainers", "Property-based testing", "Docker", "CI/CD", "Sentry", "Prometheus"] },
  { title: t.security, items: ["JWT", "Per-tenant API keys", "Encrypted credentials", "Rate limiting", "SSRF protection", "Audit trails"] },
];

export const stack: Localized<StackGroup[]> = {
  en: groups({ ai: "AI & Agents", backend: "Backend & Architecture", automation: "Automation & Integrations", data: "Databases", frontend: "Frontend", quality: "Quality & DevOps", security: "Security" }),
  pt: groups({ ai: "IA & Agentes", backend: "Backend & Arquitetura", automation: "Automação & Integrações", data: "Banco de Dados", frontend: "Frontend", quality: "Qualidade & DevOps", security: "Segurança" }),
  es: groups({ ai: "IA & Agentes", backend: "Backend & Arquitectura", automation: "Automatización & Integraciones", data: "Bases de Datos", frontend: "Frontend", quality: "Calidad & DevOps", security: "Seguridad" }),
};
