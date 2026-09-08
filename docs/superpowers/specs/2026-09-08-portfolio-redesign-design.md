# Redesign do portfólio gustavoberny.com — design e UX

**Data:** 2026-09-08
**Repo:** `portfolio-gberny` (Next.js 16 · React 19 · Tailwind 4)
**Fonte de conteúdo:** `~/Downloads/CV_Gustavo_Berny_EN.pdf` (canônico) e `CV_Gustavo_Berny_IA.pdf` (PT)

---

## 1. Objetivo

Transformar o portfólio de uma página genérica de "desenvolvedor fullstack" no ativo
que converte **recrutador e hiring manager internacional para vagas de AI / Applied AI
Engineer, remoto em USD**.

O site hoje subvende: o `src/data/cv.ts` é uma versão antiga que posiciona o Gustavo como
"Desenvolvedor Fullstack Sênior / PHP-Laravel", lista **um** projeto, não tem nenhum número
de impacto e enterra o chat com IA no rodapé. O CV atual tem material muito mais forte que
nunca chega à tela.

### Público, em ordem de prioridade

1. **Recrutador técnico internacional** — decide em ~30 segundos, na primeira tela, sem rolar.
   Precisa de: cargo, senioridade, prova numérica, disponibilidade remota, CV em PDF.
2. **Hiring manager / engenheiro sênior** — quer profundidade e evidência de que a pessoa
   sobreviveu à produção. Precisa de: arquitetura, decisões com trade-off, o que quebrou.
3. **Recrutador não técnico** — escaneia palavras-chave. Precisa do vocabulário de mercado
   legível (AI agents, RAG, LLM, MCP, vector search) sem jargão interno.

### Critérios de sucesso

- Na primeira tela, sem rolar, em 1280px e em 390px: nome, cargo, os quatro números de
  impacto, link de CV e o agente.
- Nenhum número aparece sem denominador ou data.
- Um hiring manager consegue, a partir de `/work/agents-ia`, descrever a arquitetura da
  plataforma e citar uma decisão de engenharia com o custo dela.
- Zero scroll horizontal em 390px; alvos de toque ≥44px; contraste AA em todo texto.

---

## 2. Posicionamento e cópia

**Cargo no site:** *Senior Software Engineer · Applied AI & Agents*.
**Headline:** "I build AI agent systems that run in production."

A cópia em inglês sai **do `CV_Gustavo_Berny_EN.pdf`**, praticamente literal — o texto já
está no tom certo e evita retradução. PT e ES derivam dele.

### Regras de cópia (valem para o site todo)

- **Número sempre com denominador e data.** "85% of conversations resolved end-to-end by AI
  (6,570 of 7,725 closed in Aug/2026)" — nunca "85%" solto. Número redondo sem fonte é
  descontado por recrutador experiente; com denominador ele é levado a sério.
- **Vocabulário de mercado, só onde o CV sustenta:** AI agents, RAG, vector search, tool /
  function calling, MCP, LLM orchestration, guardrails, observability, LLMOps, cost per
  inference, multi-tenant.
- **Nada de "evals".** O CV não descreve harness de avaliação de LLM. O material vizinho que
  existe — guardrails, ~3.250 casos de teste, threshold de 80%, métricas de SLA — é enquadrado
  como *quality gates for LLM output in production*. Não inventar capacidade.
- **Os 10 anos e PHP/Laravel não desaparecem, mas descem.** Ficam em *Experience* como
  profundidade (débito em conta para 107.000+ membros, R$ 4 milhões/mês). Liderar com Laravel
  posiciona errado para vaga de IA; esconder a década faz parecer júnior em IA.
- **Suporte técnico na RM Software fica**, em uma linha, exibido como **2015 — 2020**.

### Números canônicos (do CV EN)

| Métrica | Valor | Denominador / recorte |
|---|---|---|
| Conversas resolvidas pela IA | 85% | 6.570 de 7.725 encerradas em ago/2026; 83,3% nos últimos 90 dias |
| Volume | ~153k mensagens/mês | ~7,8k conversas/mês; crescimento de 24× em 4 meses |
| Tempo até a primeira resposta | 2min39 → 4,7s (−97%, mediana) | medido sobre 61 mil pares pergunta-resposta |
| Custo de inferência | US$ 0,12 por conversa completa | 810 milhões de tokens/mês |
| Autoria | 2.400 commits | desenvolvedor principal e arquiteto, ponta a ponta |
| Escala operacional | 11 tenants (7 ativos), 113 operadores, 126 agentes | — |
| Qualidade | ~107k linhas, 1.019 arquivos, 69 models Prisma, 109 migrations, ~3.250 casos de teste | threshold de 80% + arch-check no CI |

Os quatro do hero: **85% · 4,7s · 153k · US$ 0,12**.

---

## 3. Direção visual

**Direção A — "engineering dossier".** Claro, editorial, credível. Lê como um relatório
técnico bem composto: sinaliza senioridade em vez de gritar. Envelhece bem e não parece
template. O único elemento escuro da página é o terminal do agente, e esse contraste é
proposital — o agente é o que se quer que a pessoa note.

### Tokens (variáveis CSS em `globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#fbfaf8` | fundo |
| `--ink` | `#14171a` | texto principal e títulos |
| `--body` | `#4a5560` | corpo de texto |
| `--muted` | `#6b7482` | rótulos (escurecido em relação ao mockup, por contraste) |
| `--rule` | `#e2ded6` | filetes e divisórias |
| `--term-bg` | `#0b0e12` | fundo do terminal |
| `--term-fg` | `#adbac7` | resposta do agente |
| `--term-q` | `#58a6ff` | pergunta do usuário |
| `--term-ok` | `#3fb950` | cursor e indicador online |

Nada de hex solto em classe utilitária. Toda cor vem de token.

### Tipografia

| Papel | Família | Notas |
|---|---|---|
| Display (nome, títulos de seção, números) | **Newsreader** via `next/font/google` | serifa editorial com eixo óptico; não parece Times |
| Rótulos, terminal, metadados | **Geist Mono** | já instalado (`geist`) |
| Corpo de texto | **Geist Sans** | do mesmo pacote; evita uma terceira requisição |

Escala do display: 30px em desktop, 23px em mobile. Rótulos em maiúscula: **10–11px**,
`letter-spacing .12em`, na cor `--muted` — os 9px em `#8a929c` dos mockups não passam AA e
foram corrigidos aqui deliberadamente.

### Composição do hero (composição 6, aprovada)

Desktop, de cima para baixo:

1. Linha de identidade: à esquerda o eyebrow (*Senior Software Engineer · Applied AI &
   Agents*), o nome em serifa 30px e a tagline; à direita, no canto, a **foto pequena
   circular de 40px** com a nota "Open to remote" abaixo.
2. **Faixa de métricas na largura toda** — quatro células divididas por filete, borda em
   cima e embaixo. A prova vem antes de qualquer prosa.
3. Grid de duas colunas: à esquerda o pitch em dois parágrafos curtos e os links (GitHub,
   LinkedIn, Email, CV em PDF); **à direita, embaixo, o terminal do agente**.

Mobile (390px):

- Identidade empilha, foto e nota de disponibilidade no topo à direita.
- Faixa de métricas vira grid **2×2**.
- Pitch e links em coluna única.
- **O terminal fica recolhido** numa barra fixa no rodapé ("> ask my agent about my work_"
  com indicador online) que abre o agente em **folha de tela cheia**. Decisão consciente:
  mantém o hero curto o suficiente para o projeto em destaque entrar na primeira tela, e
  tela cheia é a forma correta de um chat num celular (teclado, rolagem, foco).

---

## 4. Arquitetura da home

Ordem das seções, e para quem cada uma serve:

1. **Hero** — os 30 segundos do recrutador. Detalhado em §3.
2. **Featured work: Agents-IA** — bloco largo, não cartão. O que é a plataforma, os quatro
   resultados duros, a stack, e "Read the full case study →". É o ativo principal e ocupa
   cerca de uma tela.
3. **Other projects** — dois cartões, cada um com link ao vivo:
   - **BernyFlow** — SaaS de gestão empresarial (CRM, faturamento, financeiro com NFC-e);
     do zero à produção em VPS Linux, 300+ deploys em 3 meses trabalhando sozinho.
     `bernyflow.com.br`
   - **Liga dos Vales Volleyball League** — portal oficial do maior campeonato de vôlei de
     Santa Cruz do Sul: etapas, chaveamento, ranking, mercado de atletas, Hall da Fama,
     portal de notícias e área administrativa restrita. Temporada 2026 real, 20+ equipes.
     Next.js, React, Docker em VPS próprio. `ligadosvales.com.br`
4. **How I work** — a seção que quase nenhum portfólio tem e que diferencia:
   - **AI in my own engineering loop** — Claude Code com agentes paralelos em worktrees git
     isoladas, reduzindo tempo de entrega sem abrir mão de revisão e qualidade.
   - **Quality at scale** — ~107k linhas, 1.019 arquivos, ~3.250 casos de teste, threshold
     de 80%, verificação de arquitetura rodando no CI.
   - **Product thinking** — experiência prévia como Product Owner; julgar onde IA gera valor
     real e onde é só ruído.
5. **Experience** — timeline compacta das seis posições, **uma linha de impacto cada**, sem
   parágrafo: Imply (Senior Backend Engineer & Project Lead, 02/2025–presente) · BernyFlow
   (02/2025–presente) · Liga dos Vales (2026–presente) · Sellflux (09/2023–01/2025) · Imply
   (Backend, 08/2021–09/2023) · RM Software (**2015 — 2020**).
6. **Stack** — agrupada por categoria, não nuvem de palavras: *AI & Agents · Backend &
   Architecture · Automation & Integrations · Databases · Frontend · Quality & DevOps ·
   Security*. Recrutador técnico e ATS leem essa seção.
7. **Education & languages** — duas linhas.
8. **Contact** — e-mail, LinkedIn, GitHub, download do CV em PDF, nota de disponibilidade
   remota.

---

## 5. Case study — `/work/agents-ia`

A página que converte hiring manager técnico. Seis blocos:

1. **Context** — o problema: atendimento humano não escala; primeira resposta em 2min39.
2. **Architecture** — **diagrama SVG desenhado à mão no código**, não screenshot: entrada
   multicanal (WhatsApp, widget embedável, e-mail, API pública, MCP) → fila RabbitMQ →
   orquestrador assíncrono de 14 etapas → RAG no pgvector / tool calling / guardrails →
   resposta ou handoff humano (human-in-the-loop). É o artefato mais valioso da página.
3. **Engineering decisions** — cinco, no formato **decisão → por quê → o que custou**:
   - camada multi-provider de LLM (OpenAI, Anthropic, OpenWebUI) atrás de interface comum,
     com retry, detecção de capacidade por modelo e troca de provider sem tocar em regra de
     negócio;
   - pipeline RAG próprio em vez de framework: chunking customizado, embeddings, busca
     vetorial no PostgreSQL 16 com pgvector, cache de embedding de query, versionamento e
     log de acesso à base;
   - orquestrador assíncrono idempotente, porque o consumidor da fila **vai** ver duplicata;
   - roteamento de agentes com 7 níveis de prioridade (conversa ativa, regras, menu
     interativo, agente padrão, autoAssume), mais intent router e debouncer de mensagens;
   - guardrails de produção: filtro de conteúdo, bloqueio de URL não autorizada, proteção
     contra vazamento de ID interno, validação de argumento de tool.
4. **Results** — os quatro números com denominador e data (§2), mais LLMOps/FinOps: consumo
   de token e custo por tenant e por modelo, tabela de preços versionada, dashboards de uso.
5. **What broke, and what I learned** — **o bloco que mais vende**, três incidentes reais e
   a correção (autorizado pelo Gustavo, sem restrição de confidencialidade):
   - **o byte NUL que engolia mensagem na dead-letter queue** — mensagem sumia em silêncio;
   - **o agente respondendo fora de escopo** — nada limitava assunto, e a cerca não podia
     simplesmente bloquear bloco de código (Pix copia-e-cola é texto legítimo);
   - **devolução de atendimento por presença expirada** — falso positivo que devolvia à fila
     quem estava atendendo; virou prazo de 24h para quem está offline.

   Portfólio que só mostra sucesso lê como marketing; engenheiro sênior confia em quem sabe
   o que quebrou.
6. **Stack & links** — Node 22, TypeScript, Express 5, Prisma 6, Zod, React 19, Vite 6,
   Tailwind 4, PostgreSQL 16 + pgvector, Redis, RabbitMQ, Socket.io, Docker, Bitbucket
   Pipelines, Oracle Cloud (OCI), Sentry, Prometheus. Mais link para o CV.

---

## 6. O terminal do agente

O chat existe hoje (`TerminalChat.tsx`, `@ai-sdk/google`, `api/chat/route.ts`) mas está
subaproveitado e — pior — responde com informação velha, porque lê o `cv.ts` desatualizado.
Um agente que erra sobre você é pior do que nenhum agente.

Mudanças:

- **Contexto passa a ser o CV novo inteiro**, vindo da camada `src/content/`. Fonte única.
- **Abre com resposta na tela**, não caixa vazia, e com 3–4 perguntas sugeridas clicáveis:
  *"Show me the architecture" · "What broke in production?" · "How do you use AI in your own
  workflow?" · "Why should we hire you?"*. Recrutador que não sabe o que perguntar não
  engaja numa caixa em branco.
- **Guardrail de escopo**: recusa assunto fora do trabalho do Gustavo. É a mesma cerca que
  ele já construiu no Agents-IA, em versão pequena.
- **Rate limit** mantido (`lru-cache` + `rate-limit.ts` já existem).
- **Degradação elegante e obrigatória**: sem `GOOGLE_GENERATIVE_AI_API_KEY`, sob erro de
  API ou sob rate limit, o bloco exibe as respostas pré-escritas em vez de quebrar. Essas
  respostas ficam em `src/content/agentFallback.ts` — um par pergunta-resposta para cada uma
  das perguntas sugeridas, escrito à mão a partir do CV, por idioma. São elas também que
  aparecem como resposta inicial na abertura do terminal, então o caminho sem API e o caminho
  com API partem do mesmo conteúdo e não divergem.
  Recrutador que abre o site e encontra um chat com erro tira conclusão pior do que se não
  houvesse chat nenhum. Esse é um requisito de release, não um "nice to have".

---

## 7. Estrutura de código

Hoje `page.tsx` tem 181 linhas com layout, dados e i18n misturados. Passa a ser:

```
src/
  content/                 # camada de conteúdo tipada, uma fonte de verdade
    profile.ts             #   nome, cargo, tagline, pitch, links, disponibilidade
    metrics.ts             #   os números canônicos, com denominador e data
    projects.ts            #   Agents-IA, BernyFlow, Liga dos Vales
    experience.ts          #   as seis posições
    stack.ts               #   stack agrupada por categoria
    howIWork.ts
    caseStudy.ts           #   conteúdo de /work/agents-ia
    index.ts               #   tipos + resolução por idioma
  components/
    sections/              # um componente por seção, uma responsabilidade
      Hero.tsx  FeaturedWork.tsx  Projects.tsx  HowIWork.tsx
      Experience.tsx  Stack.tsx  Education.tsx  Contact.tsx
    ui/                    # primitivos reaproveitados
      MetricStrip.tsx  SectionHeading.tsx  ProjectCard.tsx
      Portrait.tsx  AgentTerminal.tsx  AgentSheet.tsx  LanguageSwitcher.tsx
    case-study/
      ArchitectureDiagram.tsx   # SVG desenhado no código, theme-aware
      DecisionList.tsx  IncidentList.tsx
  app/
    page.tsx               # só composição de seções
    work/agents-ia/page.tsx
    api/chat/route.ts
```

Editar o site quando o CV mudar deve significar tocar **só** em `src/content/` — nunca em
layout. Esse é o teste da estrutura.

### i18n

Continua **client-side** (`LanguageContext`), com **inglês como padrão** e a escolha
persistida em `localStorage`. Rotas `/en` `/pt` `/es` dariam SEO melhor, mas o recrutador
chega pelo link que o Gustavo mandou, não por busca orgânica — não paga o custo. Os três
idiomas atuais (PT/EN/ES) são mantidos.

### Tema

**Só tema claro, sem toggle.** A direção A é clara por definição e o terminal escuro já dá o
contraste. Um toggle é código, estado e duas paletas para manter num site de uma página.
Decisão tomada agora justamente para não ser enxertada depois.

---

## 8. Acessibilidade, performance e SEO

- **Contraste AA em todo texto**, incluindo os rótulos minúsculos — foi por isso que
  `--muted` escureceu e os rótulos subiram para 10–11px.
- Landmarks semânticos (`header`, `main`, `section` com `aria-labelledby`), foco visível em
  todo elemento interativo, e a folha do agente no mobile com armadilha de foco e fechamento
  por `Esc`.
- `framer-motion` já está instalado; animação **discreta** e respeitando
  `prefers-reduced-motion`.
- Foto pela `next/image`, com dimensão explícita para não causar layout shift.
- Metadados de verdade em `layout.tsx`: título, descrição orientada a recrutador, Open Graph
  e Twitter card (imagem OG gerada via `next/og`), `favicon`, `robots`, `sitemap`. O
  `metadata` atual ("Minimalist Portfolio - AI Specialist") é substituído.
- `<html lang>` acompanha o idioma escolhido — hoje está fixo em `en` mesmo quando o
  conteúdo está em português.

---

## 9. Verificação

Não há runner de teste no projeto e um site estático não justifica montar um. A verificação é:

1. `npx tsc --noEmit` — limpo.
2. `npm run lint` — limpo.
3. `npm run build` — build de produção passando.
4. **Gate visual em larguras reais**, Chrome headless, com print de cada uma: **390** (iPhone
   14), **768** (tablet), **1280** e **1440**. Em cada largura, verificar:
   - zero scroll horizontal (`document.scrollWidth <= innerWidth`);
   - a primeira tela contém nome, cargo, as quatro métricas e o CTA de CV;
   - alvos de toque ≥44px em mobile (medidos, não presumidos);
   - a folha do agente abre, recebe foco, fecha por `Esc` e pelo botão;
   - o terminal exibe o fallback pré-escrito **com a variável de ambiente ausente** — testado
     de propósito, não deduzido.
5. Case study aberto e o diagrama legível em 390px.

Print em desktop não é evidência de mobile: as larguras são medidas em dispositivo real
emulado, não em janela redimensionada.

---

## 10. Fora de escopo

- Blog / seção de escrita.
- Analytics e formulário de contato com backend.
- Dark mode (decidido em §7).
- Rotas de i18n por idioma (decidido em §7).
- Refatorar `rate-limit.ts` e a rota de chat além do necessário para o contexto novo, o
  guardrail de escopo e o fallback.
- CMS ou painel de edição de conteúdo.

---

## 11. Assets e pendências

| Item | Estado | Ação |
|---|---|---|
| CV em inglês (PDF) | **✅ recebido** — `~/Downloads/CV_Gustavo_Berny_EN.pdf` | copiar para `public/` e ligar no botão "CV (PDF)"; é o download padrão para o público internacional |
| CV em português (PDF) | recebido — `CV_Gustavo_Berny_IA.pdf` | copiar para `public/`; servido quando o idioma for PT |
| **Foto de perfil** | **pendente** | não foi localizada nenhuma foto de perfil no `~/Downloads`. Implementar com placeholder e trocar quando o Gustavo enviar o arquivo. |
| `GOOGLE_GENERATIVE_AI_API_KEY` | **a confirmar** | sem ela o terminal cai no fallback pré-escrito (que é comportamento válido, mas perde o diferencial) |
| CV em espanhol (PDF) | não existe | o site oferece o EN quando o idioma for ES |

---

## 12. Riscos

- **A foto define o hero.** Foto ruim num hero editorial estraga a página inteira; se a que
  vier não servir, é melhor manter o layout sem ela do que forçá-la.
- **O terminal é o diferencial e também o maior risco.** Um agente que erra sobre o Gustavo
  ou que quebra em frente ao recrutador causa dano maior que a ausência dele. Por isso o
  fallback é requisito de release e o contexto vem de fonte única.
- **O diagrama de arquitetura é o item mais custoso** do escopo. Se o tempo apertar, ele é o
  único candidato a virar uma segunda etapa — o resto da página funciona sem ele, mas a
  página fica notavelmente mais fraca.
