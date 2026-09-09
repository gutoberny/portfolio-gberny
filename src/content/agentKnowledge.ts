/**
 * Conhecimento profundo dos projetos, para o agente do portfólio.
 * Mantido apenas em inglês: o prompt força o idioma da resposta.
 * Não incluir nome de cliente/tenant nem número de protocolo interno.
 */
export interface KnowledgeTopic {
  topic: string;
  facts: string[];
}

export const agentKnowledge: KnowledgeTopic[] = [
  {
    topic: "Agents-IA — what the product actually does",
    facts: [
      "A multi-tenant SaaS for customer service where each tenant configures its own AI agents, prompts, knowledge base and channels.",
      "Channels: WhatsApp (Meta Cloud API and Z-API), an embeddable web widget, email, a public API and MCP.",
      "Modules Gustavo built or owns: conversations inbox, kanban of tickets, campaigns (WhatsApp templates and email), knowledge base with RAG, supervision and operator presence, analytics, persisted notifications, Meta template management, CSAT survey, and a copilot that assists the human operator.",
      "Human-in-the-loop is a first-class feature, not a fallback: agents hand off to a human on rules, on failure, and on subjects that must not be answered by AI.",
    ],
  },
  {
    topic: "Architecture and layering",
    facts: [
      "Backend modules follow a strict controller / service / repository / DTO split: controllers only parse requests, services hold business logic and never import HTTP types, repositories only run queries.",
      "Those layer rules are enforced mechanically in CI by an architecture check script with 8 rules, not by review discipline. Its allowlist of pre-existing debt is only allowed to shrink.",
      "One rule exists specifically to catch what the type checker cannot: an unauthenticated route reading tenantId. In Prisma, `where: { tenantId: undefined }` silently drops the filter instead of matching nothing — so a missing tenant filter leaks data across tenants rather than failing loudly.",
      "Every database query is filtered by tenantId. Multi-tenant isolation is a tested property, not a convention.",
    ],
  },
  {
    topic: "The AI pipeline in detail",
    facts: [
      "Inbound messages go to a RabbitMQ queue. Consumers are written to be idempotent because the queue will redeliver.",
      "The orchestrator runs 14 stages: agent loading, routing, RAG retrieval, LLM call, tool execution, guardrails, delivery.",
      "Agent routing has 7 priority levels — an active conversation cannot be hijacked, explicit routing rules beat defaults, an interactive menu beats inference — with an intent router and a message debouncer in front of it so bursts do not trigger multiple answers.",
      "RAG is in-house: custom chunking, embeddings, vector search on PostgreSQL 16 with pgvector, a query embedding cache, knowledge versioning and access logging.",
      "The LLM layer is multi-provider (OpenAI, Anthropic, OpenWebUI) behind one interface, with retry, per-model capability detection and provider switching that does not touch business code.",
      "Prompt prefix caching cuts cost on the stable part of the agent prompt.",
      "Token consumption and cost are accounted per tenant and per model against a versioned price table, with usage dashboards — that is how $0.12 per completed conversation is a measured number and not an estimate.",
      "Tool calling has a tool registry, HTTP execution with encrypted credentials, a preview, per-call logging and tool memory. MCP is implemented on both sides: client and server, with a tool catalog, an adapter and a URL/SSRF guard.",
    ],
  },
  {
    topic: "Guardrails and the failures that motivated them",
    facts: [
      "Guardrails are a mandatory pipeline stage, not a prompt instruction, because prompt rules degrade: content filtering, unauthorized URL blocking, internal ID leak protection and tool argument validation.",
      "A scope guard was added after the agent answered an unrelated programming question in a customer service channel — nothing in the system had constrained the subject. The subtlety: the fence cannot block fenced code outright, because legitimate customer content (a Pix copy-and-paste key) looks like that.",
      "A handoff guard covers volume and repetition, so a conversation going in circles reaches a human instead of looping.",
      "A promise guard exists because an agent without the right tools would say it had registered a request it could not actually register.",
      "A language detector once scored non-Latin scripts as zero words, so a customer writing in Korean got answered in Portuguese. The fix changed how the language of a message is decided.",
    ],
  },
  {
    topic: "Reliability and operations",
    facts: [
      "Migrations are pure DDL. Conditional logic in a migration is banned after one declared a UUID column where the real column was TEXT: CI passed because the database was empty and the buggy branch never ran, and it broke production. Backfills live in seed scripts with integration tests covering every branch.",
      "Operator presence is declared and heartbeat-backed. Presence (is the machine there) and availability (is the person taking work) are two separate axes, because conflating them redistributed conversations away from people who were actively working.",
      "Distribution balances load by active conversations first, then by the day's total, then by clock — so a returning operator is not flooded.",
      "Observability: Sentry, Prometheus metrics, and a durable activity log — used because container logs are lost on restart and cannot explain an incident after a deploy.",
    ],
  },
  {
    topic: "Testing and delivery",
    facts: [
      "~3,250 test cases: Vitest unit tests, integration tests on real PostgreSQL with pgvector via Testcontainers, and property-based tests, at an 80% coverage threshold.",
      "Tests are validated by mutation — break the implementation on purpose and confirm the test fails — because a green suite can also mean the assertions are inert.",
      "UI work is not done until a visual gate runs it in a real browser at real device widths. Unit tests in jsdom miss whole classes of layout and overlay defects.",
      "Production deploys are triggered by a git tag through Bitbucket Pipelines, gated on typecheck plus the unit and integration suites, then build, migrate, seed. A separate branch deploys to a homologation environment on every push.",
    ],
  },
  {
    topic: "Security",
    facts: [
      "JWT with jose, per-tenant API keys, credentials encrypted at rest, rate limiting, SSRF protection on outbound URLs, and audit trails.",
      "tenantId and userId always come from the decoded token, never from the request body or query.",
      "Webhooks from external providers are validated per tenant, and every external payload is schema-validated with Zod before reaching business logic.",
    ],
  },
  {
    topic: "How Gustavo works",
    facts: [
      "He uses coding agents as a core part of engineering: Claude Code with parallel agents in isolated git worktrees, so concurrent work never fights over the same checkout or branch.",
      "He writes the architecture rules down and then makes CI enforce them, rather than relying on review.",
      "He came to engineering through product ownership, which is why he argues about whether a feature earns its complexity, not only about how to build it.",
    ],
  },
  {
    topic: "BernyFlow",
    facts: [
      "His own business management SaaS: CRM, invoicing, financial reporting, and a finance module that issues NFC-e electronic invoices.",
      "JWT authentication, REST APIs, Docker on a Linux VPS. From zero to production with 300+ deploys in 3 months, working solo with AI agents across the whole cycle.",
    ],
  },
  {
    topic: "Liga dos Vales Volleyball League",
    facts: [
      "The official public site for the largest volleyball championship in Santa Cruz do Sul, Brazil, built and maintained by Gustavo: stages, brackets, rankings, a player transfer market, Hall of Fame and a news portal, plus a restricted admin area for the organizers.",
      "Live through the 2026 season, with men's and women's stages gathering 20+ teams, publishing results and standings after every stage.",
      "Next.js, React and Docker on a self-managed VPS.",
    ],
  },
];
