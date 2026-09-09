import type { CaseStudy, Localized } from "./types";

const en: CaseStudy = {
  title: "Agents-IA",
  subtitle: "A multi-tenant AI agent platform in production · Imply · 03/2026 – Present",
  context: [
    "Human-only customer service does not scale. Before the platform, the median time to first response was 2 minutes and 39 seconds, and every conversation consumed an operator from the first message to the last.",
    "The goal was not a chatbot. It was a platform where each company configures its own AI agents, connects its own channels and knowledge, and keeps a human in the loop for the cases that need one — with the cost of every conversation visible.",
  ],
  decisions: [
    {
      decision: "A multi-provider LLM layer behind a common interface",
      why: "Model quality, price and availability move every few months. Business logic must not know which provider answered.",
      cost: "An extra abstraction to maintain, plus per-model capability detection — a provider that lacks a feature cannot silently degrade the pipeline.",
    },
    {
      decision: "An in-house RAG pipeline instead of a framework",
      why: "Chunking, embedding cache, versioning and knowledge-base access logging are product requirements here, not implementation details. A framework would have to be fought to expose them.",
      cost: "More code owned by us, including the query embedding cache and the retrieval tuning that a framework would have shipped for free.",
    },
    {
      decision: "An asynchronous, idempotent orchestrator over a queue",
      why: "A queue consumer will see duplicates. Any stage that is not idempotent eventually sends the same message to a customer twice.",
      cost: "Every one of the 14 stages must be written to be safely re-run, which is slower to build and harder to reason about than a synchronous call chain.",
    },
    {
      decision: "Agent routing with 7 priority levels",
      why: "The right agent depends on context: an active conversation must not be hijacked, explicit routing rules must win over defaults, and an interactive menu must win over inference.",
      cost: "Routing became the most sensitive part of the system — it needs an intent router and a message debouncer in front of it to behave under bursts.",
    },
    {
      decision: "Guardrails as a mandatory pipeline stage, not a prompt instruction",
      why: "Prompt rules degrade. Content filtering, unauthorized URL blocking, internal ID leak protection and tool argument validation have to hold even when the model misbehaves.",
      cost: "False positives. A fence that blocks code blocks outright would break legitimate content — a Pix copy-and-paste key is plain text a customer genuinely needs.",
    },
  ],
  incidents: [
    {
      title: "A NUL byte silently ate messages in the dead-letter queue",
      what: "Messages disappeared with no error surfaced. They had reached the dead-letter queue, but a NUL byte in the payload meant the content could not be persisted or read back — the failure looked like nothing had happened at all.",
      fix: "Sanitise the payload before persistence and make dead-letter contents readable, so a silent drop becomes a visible failure.",
    },
    {
      title: "The agent answered outside its scope",
      what: "Nothing in the system constrained the subject of a conversation. Asked for help with an unrelated PHP function, the agent obliged — in a customer service channel.",
      fix: "An explicit scope guard. The subtlety: the fence cannot simply block fenced code, because legitimate customer content looks like that.",
    },
    {
      title: "Conversations were returned to the queue on a false presence signal",
      what: "An expired presence heartbeat was treated as absence, so conversations were pulled from operators who were actively working and redistributed.",
      fix: "Separate presence from availability, and give an offline operator a 24-hour window instead of an immediate return.",
    },
  ],
  results: [
    "85% of conversations resolved end-to-end by AI, with no human intervention — 6,570 of 7,725 closed in Aug/2026, and 83.3% over the last 90 days.",
    "Time to first response cut from 2m39s to 4.7 seconds (median, −97%), measured across 61k question-answer pairs in production.",
    "~153k messages and ~7.8k conversations per month — 24× growth in 4 months.",
    "Inference held at $0.12 per completed conversation across 810M tokens/month, accounted per tenant and per model against a versioned price table.",
    "Sustained at scale: a ~107k-line monorepo across 1,019 files, 69 Prisma models, 109 migrations and ~3,250 test cases with an 80% coverage threshold and an architecture check in CI.",
  ],
  stack:
    "Node 22 · TypeScript · Express 5 · Prisma 6 · Zod · React 19 · Vite 6 · Tailwind 4 · PostgreSQL 16 + pgvector · Redis · RabbitMQ · Socket.io · Docker · Bitbucket Pipelines · Oracle Cloud (OCI) · Sentry · Prometheus",
  diagram: {
    intake: "Multi-channel intake",
    queue: "RabbitMQ queue",
    orchestrator: "Async orchestrator · 14 stages",
    stages: [
      "Agent loading & routing (7 priority levels)",
      "RAG retrieval · pgvector on PostgreSQL 16",
      "LLM call · multi-provider layer",
      "Tool calling · registry, HTTP, MCP",
      "Guardrails · content, scope, ID leak, tool args",
    ],
    delivery: "Delivery to channel",
    handoff: "Human handoff",
    caption:
      "Multi-channel intake lands on a RabbitMQ queue; an asynchronous, idempotent orchestrator runs 14 stages — agent routing, RAG retrieval, LLM call, tool execution and guardrails — before delivering the answer or handing the conversation to a human. The five stages shown here summarise the 14.",
  },
  labels: {
    context: "Context",
    architecture: "Architecture",
    decisions: "Engineering decisions",
    results: "Results",
    incidents: "What broke, and what I learned",
    stack: "Stack",
    back: "Back to home",
    decisionWhy: "Why",
    decisionCost: "What it cost",
    incidentWhat: "What happened",
    incidentFix: "The fix",
  },
};

const pt: CaseStudy = {
  title: "Agents-IA",
  subtitle: "Uma plataforma multi-tenant de agentes de IA em produção · Imply · 03/2026 – Atual",
  context: [
    "Atendimento só com humanos não escala. Antes da plataforma, o tempo mediano até a primeira resposta era de 2 minutos e 39 segundos, e cada conversa consumia um operador da primeira à última mensagem.",
    "O objetivo não era um chatbot. Era uma plataforma em que cada empresa configura seus próprios agentes de IA, conecta seus próprios canais e conhecimento, e mantém um humano no loop para os casos que precisam de um — com o custo de cada conversa visível.",
  ],
  decisions: [
    {
      decision: "Uma camada de LLM multi-provedor atrás de uma interface comum",
      why: "Qualidade, preço e disponibilidade dos modelos mudam a cada poucos meses. A lógica de negócio não pode saber qual provedor respondeu.",
      cost: "Uma abstração extra para manter, mais detecção de capacidade por modelo — um provedor sem determinada funcionalidade não pode degradar o pipeline silenciosamente.",
    },
    {
      decision: "Um pipeline de RAG próprio em vez de um framework",
      why: "Chunking, cache de embedding, versionamento e log de acesso à base de conhecimento são requisitos de produto aqui, não detalhes de implementação. Seria preciso lutar contra um framework para expô-los.",
      cost: "Mais código sob nossa responsabilidade, incluindo o cache de embedding de consulta e o ajuste de recuperação que um framework teria entregado de graça.",
    },
    {
      decision: "Um orquestrador assíncrono e idempotente sobre uma fila",
      why: "Um consumidor de fila vai ver duplicatas. Qualquer etapa que não seja idempotente acaba enviando a mesma mensagem duas vezes para um cliente.",
      cost: "Cada uma das 14 etapas precisa ser escrita para ser reexecutada com segurança, o que é mais lento de construir e mais difícil de raciocinar do que uma cadeia de chamadas síncrona.",
    },
    {
      decision: "Roteamento de agentes com 7 níveis de prioridade",
      why: "O agente certo depende do contexto: uma conversa ativa não pode ser sequestrada, regras de roteamento explícitas têm de vencer os padrões, e um menu interativo tem de vencer a inferência.",
      cost: "O roteamento virou a parte mais sensível do sistema — precisa de um roteador de intenção e de um debouncer de mensagens na frente para se comportar sob rajadas.",
    },
    {
      decision: "Guardrails como etapa obrigatória do pipeline, não instrução de prompt",
      why: "Regras em prompt degradam. Filtragem de conteúdo, bloqueio de URL não autorizada, proteção contra vazamento de ID interno e validação de argumento de ferramenta têm de valer mesmo quando o modelo se comporta mal.",
      cost: "Falsos positivos. Uma cerca que bloqueia blocos de código sem critério quebraria conteúdo legítimo — uma chave Pix copia-e-cola é texto puro que o cliente realmente precisa.",
    },
  ],
  incidents: [
    {
      title: "Um byte NUL engoliu mensagens silenciosamente na dead-letter queue",
      what: "Mensagens sumiam sem nenhum erro aparecer. Elas tinham chegado à dead-letter queue, mas um byte NUL no payload impedia que o conteúdo fosse persistido ou lido de volta — a falha parecia que nada tinha acontecido.",
      fix: "Sanitizar o payload antes de persistir e tornar o conteúdo da dead-letter legível, para que uma perda silenciosa vire uma falha visível.",
    },
    {
      title: "O agente respondeu fora do escopo dele",
      what: "Nada no sistema restringia o assunto de uma conversa. Ao ser pedido ajuda com uma função PHP sem relação nenhuma, o agente atendeu — dentro de um canal de atendimento ao cliente.",
      fix: "Uma trava explícita de escopo. A sutileza: a cerca não pode simplesmente bloquear blocos de código, porque conteúdo legítimo de cliente se parece com isso.",
    },
    {
      title: "Conversas voltavam para a fila por um sinal de presença falso",
      what: "Um heartbeat de presença expirado era tratado como ausência, então conversas eram tiradas de operadores que estavam trabalhando ativamente e redistribuídas.",
      fix: "Separar presença de disponibilidade, e dar a um operador offline uma janela de 24 horas em vez de uma devolução imediata.",
    },
  ],
  results: [
    "85% das conversas resolvidas de ponta a ponta pela IA, sem intervenção humana — 6.570 de 7.725 fechadas em ago/2026, e 83,3% nos últimos 90 dias.",
    "Tempo até a primeira resposta reduzido de 2m39s para 4,7 segundos (mediana, −97%), medido em 61 mil pares de pergunta e resposta em produção.",
    "~153 mil mensagens e ~7,8 mil conversas por mês — crescimento de 24× em 4 meses.",
    "Custo de inferência sustentado em US$ 0,12 por conversa concluída, sobre 810 milhões de tokens/mês, contabilizado por tenant e por modelo contra uma tabela de preços versionada.",
    "Sustentado em escala: um monorepo de ~107 mil linhas em 1.019 arquivos, 69 models Prisma, 109 migrations e ~3.250 casos de teste com limiar de 80% de cobertura e uma verificação de arquitetura no CI.",
  ],
  stack:
    "Node 22 · TypeScript · Express 5 · Prisma 6 · Zod · React 19 · Vite 6 · Tailwind 4 · PostgreSQL 16 + pgvector · Redis · RabbitMQ · Socket.io · Docker · Bitbucket Pipelines · Oracle Cloud (OCI) · Sentry · Prometheus",
  diagram: {
    intake: "Entrada multicanal",
    queue: "Fila RabbitMQ",
    orchestrator: "Orquestrador assíncrono · 14 etapas",
    stages: [
      "Carregamento e roteamento de agente (7 níveis de prioridade)",
      "Recuperação RAG · pgvector no PostgreSQL 16",
      "Chamada de LLM · camada multi-provedor",
      "Chamada de ferramentas · registro, HTTP, MCP",
      "Guardrails · conteúdo, escopo, vazamento de ID, argumentos",
    ],
    delivery: "Entrega no canal",
    handoff: "Transferência para humano",
    caption:
      "A entrada multicanal cai numa fila RabbitMQ; um orquestrador assíncrono e idempotente roda 14 etapas — roteamento de agente, recuperação RAG, chamada de LLM, execução de ferramentas e guardrails — antes de entregar a resposta ou transferir a conversa para um humano. As cinco etapas mostradas aqui resumem as 14.",
  },
  labels: {
    context: "Contexto",
    architecture: "Arquitetura",
    decisions: "Decisões de engenharia",
    results: "Resultados",
    incidents: "O que quebrou, e o que eu aprendi",
    stack: "Stack",
    back: "Voltar para a home",
    decisionWhy: "Por quê",
    decisionCost: "O que custou",
    incidentWhat: "O que aconteceu",
    incidentFix: "A correção",
  },
};

const es: CaseStudy = {
  title: "Agents-IA",
  subtitle: "Una plataforma multi-tenant de agentes de IA en producción · Imply · 03/2026 – Actual",
  context: [
    "La atención al cliente solo con humanos no escala. Antes de la plataforma, el tiempo mediano hasta la primera respuesta era de 2 minutos y 39 segundos, y cada conversación consumía a un operador desde el primer hasta el último mensaje.",
    "El objetivo no era un chatbot. Era una plataforma en la que cada empresa configura sus propios agentes de IA, conecta sus propios canales y conocimiento, y mantiene a un humano en el loop para los casos que lo requieren — con el costo de cada conversación visible.",
  ],
  decisions: [
    {
      decision: "Una capa de LLM multi-proveedor detrás de una interfaz común",
      why: "La calidad, el precio y la disponibilidad de los modelos cambian cada pocos meses. La lógica de negocio no puede saber qué proveedor respondió.",
      cost: "Una abstracción extra que mantener, más detección de capacidades por modelo — un proveedor sin cierta funcionalidad no puede degradar el pipeline en silencio.",
    },
    {
      decision: "Un pipeline de RAG propio en lugar de un framework",
      why: "El chunking, el caché de embeddings, el versionado y el registro de acceso a la base de conocimiento son requisitos de producto aquí, no detalles de implementación. Habría que pelear contra un framework para exponerlos.",
      cost: "Más código bajo nuestra responsabilidad, incluyendo el caché de embedding de consulta y el ajuste de recuperación que un framework habría entregado gratis.",
    },
    {
      decision: "Un orquestador asíncrono e idempotente sobre una cola",
      why: "Un consumidor de cola verá duplicados. Cualquier etapa que no sea idempotente termina enviando el mismo mensaje dos veces a un cliente.",
      cost: "Cada una de las 14 etapas debe escribirse para poder reejecutarse con seguridad, lo cual es más lento de construir y más difícil de razonar que una cadena de llamadas síncrona.",
    },
    {
      decision: "Enrutamiento de agentes con 7 niveles de prioridad",
      why: "El agente correcto depende del contexto: una conversación activa no debe ser secuestrada, las reglas de enrutamiento explícitas deben ganar sobre los valores por defecto, y un menú interactivo debe ganar sobre la inferencia.",
      cost: "El enrutamiento se convirtió en la parte más sensible del sistema — necesita un enrutador de intención y un debouncer de mensajes delante para comportarse bien bajo ráfagas.",
    },
    {
      decision: "Guardrails como etapa obligatoria del pipeline, no instrucción de prompt",
      why: "Las reglas en el prompt se degradan. El filtrado de contenido, el bloqueo de URLs no autorizadas, la protección contra la fuga de IDs internos y la validación de argumentos de herramientas tienen que mantenerse incluso cuando el modelo se comporta mal.",
      cost: "Falsos positivos. Una cerca que bloquee bloques de código sin criterio rompería contenido legítimo — una clave Pix de copiar y pegar es texto plano que el cliente realmente necesita.",
    },
  ],
  incidents: [
    {
      title: "Un byte NUL se tragó mensajes en silencio en la dead-letter queue",
      what: "Los mensajes desaparecían sin que apareciera ningún error. Habían llegado a la dead-letter queue, pero un byte NUL en el payload impedía que el contenido se persistiera o se pudiera volver a leer — la falla parecía como si no hubiera pasado nada.",
      fix: "Sanitizar el payload antes de persistirlo y hacer legible el contenido de la dead-letter, para que una pérdida silenciosa se convierta en una falla visible.",
    },
    {
      title: "El agente respondió fuera de su alcance",
      what: "Nada en el sistema restringía el tema de una conversación. Al pedírsele ayuda con una función PHP sin relación alguna, el agente accedió — dentro de un canal de atención al cliente.",
      fix: "Un control explícito de alcance. La sutileza: la cerca no puede simplemente bloquear bloques de código, porque el contenido legítimo del cliente se parece a eso.",
    },
    {
      title: "Las conversaciones volvían a la cola por una señal de presencia falsa",
      what: "Un heartbeat de presencia expirado se trataba como ausencia, así que las conversaciones se retiraban de operadores que estaban trabajando activamente y se redistribuían.",
      fix: "Separar la presencia de la disponibilidad, y darle a un operador offline una ventana de 24 horas en lugar de una devolución inmediata.",
    },
  ],
  results: [
    "85% de las conversaciones resueltas de punta a punta por la IA, sin intervención humana — 6.570 de 7.725 cerradas en ago/2026, y 83,3% en los últimos 90 días.",
    "Tiempo hasta la primera respuesta reducido de 2m39s a 4,7 segundos (mediana, −97%), medido en 61 mil pares de pregunta y respuesta en producción.",
    "~153 mil mensajes y ~7,8 mil conversaciones por mes — crecimiento de 24× en 4 meses.",
    "Costo de inferencia sostenido en US$ 0,12 por conversación completada, sobre 810 millones de tokens/mes, contabilizado por tenant y por modelo contra una tabla de precios versionada.",
    "Sostenido a escala: un monorepo de ~107 mil líneas en 1.019 archivos, 69 modelos Prisma, 109 migraciones y ~3.250 casos de prueba con un umbral de cobertura del 80% y una verificación de arquitectura en el CI.",
  ],
  stack:
    "Node 22 · TypeScript · Express 5 · Prisma 6 · Zod · React 19 · Vite 6 · Tailwind 4 · PostgreSQL 16 + pgvector · Redis · RabbitMQ · Socket.io · Docker · Bitbucket Pipelines · Oracle Cloud (OCI) · Sentry · Prometheus",
  diagram: {
    intake: "Entrada multicanal",
    queue: "Cola RabbitMQ",
    orchestrator: "Orquestador asíncrono · 14 etapas",
    stages: [
      "Carga y enrutamiento de agente (7 niveles de prioridad)",
      "Recuperación RAG · pgvector en PostgreSQL 16",
      "Llamada al LLM · capa multi-proveedor",
      "Llamada a herramientas · registro, HTTP, MCP",
      "Guardrails · contenido, alcance, fuga de ID, argumentos",
    ],
    delivery: "Entrega al canal",
    handoff: "Transferencia a un humano",
    caption:
      "La entrada multicanal cae en una cola RabbitMQ; un orquestador asíncrono e idempotente ejecuta 14 etapas — enrutamiento de agente, recuperación RAG, llamada al LLM, ejecución de herramientas y guardrails — antes de entregar la respuesta o transferir la conversación a un humano. Las cinco etapas mostradas aquí resumen las 14.",
  },
  labels: {
    context: "Contexto",
    architecture: "Arquitectura",
    decisions: "Decisiones de ingeniería",
    results: "Resultados",
    incidents: "Qué se rompió, y qué aprendí",
    stack: "Stack",
    back: "Volver al inicio",
    decisionWhy: "Por qué",
    decisionCost: "Qué costó",
    incidentWhat: "Qué pasó",
    incidentFix: "La corrección",
  },
};

export const caseStudy: Localized<CaseStudy> = { en, pt, es };
