import type { Localized } from "./types";

export interface AgentExchange {
  question: string;
  answer: string;
}

/** Já visível quando o terminal carrega — caixa vazia não engaja. */
export const agentOpening: Localized<AgentExchange> = {
  en: {
    question: "why should we hire you?",
    answer:
      "Because I have already shipped what you are hiring for: a multi-tenant AI agent platform in production, resolving 85% of conversations end to end, with the guardrails, cost tracking and test coverage that keep it there.",
  },
  pt: {
    question: "por que te contratar?",
    answer:
      "Porque eu já entreguei o que você está contratando: uma plataforma multi-tenant de agentes de IA em produção, resolvendo 85% dos atendimentos ponta a ponta, com os guardrails, o controle de custo e a cobertura de teste que a mantêm lá.",
  },
  es: {
    question: "¿por qué contratarte?",
    answer:
      "Porque ya he entregado lo que estás contratando: una plataforma multi-tenant de agentes de IA en producción, resolviendo el 85% de las conversaciones de extremo a extremo, con los guardrails, el control de coste y la cobertura de pruebas que la mantienen ahí.",
  },
};

/** Perguntas sugeridas. A resposta de cada uma é o fallback se a API cair. */
export const agentSuggestions: Localized<AgentExchange[]> = {
  en: [
    {
      question: "Show me the architecture",
      answer:
        "Multi-channel intake (WhatsApp, embeddable widget, email, public API, MCP) lands on a RabbitMQ queue. An asynchronous orchestrator runs a 14-stage pipeline: agent loading, RAG retrieval on pgvector, LLM call through a multi-provider layer, tool execution, guardrails, and delivery — or handoff to a human when needed.",
    },
    {
      question: "What broke in production?",
      answer:
        "Three worth telling: a NUL byte that silently ate messages in the dead-letter queue; the agent answering outside its scope, because nothing constrained the subject; and attendance being returned to the queue on a false presence-expiry signal, which now gives offline operators a 24-hour window instead.",
    },
    {
      question: "How do you use AI in your own workflow?",
      answer:
        "Claude Code with parallel agents in isolated git worktrees, which sharply cuts delivery time without giving up review or quality. Coding agents are a core part of how I build, not a demo.",
    },
    {
      question: "How do you keep inference cost under control?",
      answer:
        "Token consumption and cost are accounted per tenant and per model against a versioned price table, with usage dashboards. That is what holds inference at $0.12 per completed conversation across 810M tokens a month.",
    },
  ],
  pt: [
    {
      question: "Mostre a arquitetura",
      answer:
        "A entrada multicanal (WhatsApp, widget embarcável, e-mail, API pública, MCP) cai numa fila RabbitMQ. Um orquestrador assíncrono roda um pipeline de 14 etapas: carga do agente, busca RAG no pgvector, chamada ao LLM por uma camada multi-provider, execução de tools, guardrails e envio — ou repasse para humano quando necessário.",
    },
    {
      question: "O que quebrou em produção?",
      answer:
        "Três que valem contar: um byte NUL que engolia mensagens em silêncio na dead-letter queue; o agente respondendo fora de escopo, porque nada limitava o assunto; e a devolução de atendimento por um falso sinal de presença expirada, que hoje dá 24 horas de janela a quem está offline.",
    },
    {
      question: "Como você usa IA no seu próprio processo?",
      answer:
        "Claude Code com agentes paralelos em worktrees git isoladas, reduzindo drasticamente o tempo de entrega sem abrir mão de revisão e qualidade. Agentes de codificação são parte central de como eu construo, não demonstração.",
    },
    {
      question: "Como você controla o custo de inferência?",
      answer:
        "Consumo de token e custo são apurados por tenant e por modelo contra uma tabela de preços versionada, com dashboards de uso. É isso que mantém a inferência em US$ 0,12 por atendimento completo sobre 810 milhões de tokens por mês.",
    },
  ],
  es: [
    {
      question: "Muéstrame la arquitectura",
      answer:
        "La entrada multicanal (WhatsApp, widget integrable, correo, API pública, MCP) llega a una cola RabbitMQ. Un orquestador asíncrono ejecuta un pipeline de 14 etapas: carga del agente, búsqueda RAG en pgvector, llamada al LLM mediante una capa multi-proveedor, ejecución de tools, guardrails y entrega — o derivación a un humano cuando es necesario.",
    },
    {
      question: "¿Qué se rompió en producción?",
      answer:
        "Tres que vale contar: un byte NUL que se comía mensajes en silencio en la dead-letter queue; el agente respondiendo fuera de su alcance, porque nada limitaba el tema; y la devolución de conversaciones por una falsa señal de presencia expirada, que hoy da 24 horas de margen a quien está desconectado.",
    },
    {
      question: "¿Cómo usas IA en tu propio proceso?",
      answer:
        "Claude Code con agentes paralelos en worktrees git aislados, reduciendo drásticamente el tiempo de entrega sin renunciar a la revisión ni a la calidad.",
    },
    {
      question: "¿Cómo controlas el coste de inferencia?",
      answer:
        "El consumo de tokens y el coste se calculan por tenant y por modelo contra una tabla de precios versionada, con paneles de uso. Eso mantiene la inferencia en US$ 0,12 por conversación completa sobre 810 millones de tokens al mes.",
    },
  ],
};
