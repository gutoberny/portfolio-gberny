import { caseStudy as agentsIa } from "./caseStudy";
import type { CaseStudy, Lang, Localized } from "./types";

/**
 * Coleção de case studies por slug.
 *
 * A Agents-IA vem de `caseStudy.ts` e mantém os seis blocos, incluindo
 * Resultados e o diagrama de arquitetura. Os outros dois usam uma forma
 * reduzida — contexto, decisões, o que quebrou, stack — e **não têm bloco de
 * Resultados de propósito**: nenhum dos dois tem métrica externa com
 * denominador, e a regra do site é que todo número carrega a sua fonte.
 * Inventar resultado aqui quebraria justamente o que dá credibilidade ao
 * resto. Por isso `results` e `diagram` são opcionais no tipo: a honestidade
 * fica estrutural em vez de depender de disciplina.
 */

const labelsEn: CaseStudy["labels"] = {
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
};

const labelsPt: CaseStudy["labels"] = {
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
};

const labelsEs: CaseStudy["labels"] = {
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
};

const bernyflowStack =
  "Node.js · Express · Prisma · PostgreSQL + pgvector · RabbitMQ · Redis · React 19 · Vite · Stripe · Z-API (WhatsApp) · Docker · GitHub Actions";

const bernyflow: Localized<CaseStudy> = {
  en: {
    title: "BernyFlow",
    subtitle: "Multi-tenant WhatsApp-first CRM SaaS · my own product · 742 commits over 10 months",
    context: [
      "Businesses connect their WhatsApp number and an LLM agent with retrieval over their own documents answers customers, hands the conversation to a human when it should, and runs follow-up flows. The same tenant also gets scheduling, billing and a consignment module, shaped for a few service verticals.",
      "I built and run all of it alone — 69 data models, 228 endpoints, 13 releases. The CRUD is not the interesting part. The interesting part is the message pipeline, where every hard problem is about time: a gateway that retries if you answer slowly, a person who sends three fragments instead of one sentence, and a model whose context you have to assemble correctly on every turn.",
    ],
    decisions: [
      {
        decision: "Acknowledge the WhatsApp webhook immediately and process it off a queue",
        why: "An LLM call takes seconds. The gateway treats a slow response as a failure and retries it, so answering inline would have duplicated messages under exactly the load I wanted to handle.",
        cost: "The queue became a hard dependency: if it is unreachable the endpoint returns 503 and logs the payload as lost. That is an accepted loss window, not a durable outbox — the honest name for a trade-off I have not paid down yet.",
      },
      {
        decision: "Remove the similarity cutoff from retrieval instead of tuning it",
        why: "A weak chunk in the prompt gets judged by the model, which reads it. A cosine-distance threshold decides before reading, and it was throwing away context that turned out to matter.",
        cost: "Nothing short-circuits on a weak match, so more tokens go out on every call — and I have no automated evaluation proving the model-judges approach beats the threshold. I believe it does; I have not measured it.",
      },
      {
        decision: "Coalesce message bursts with an eight-second window per conversation",
        why: "People type the way they speak: three fragments in a row. Answering each one separately reads as a broken bot, and costs three LLM calls for one question.",
        cost: "The window lives in one process's memory. A worker restart mid-window drops the pending reply, and running a second worker would break the coalescing outright — this is the piece that blocks horizontal scaling.",
      },
      {
        decision: "Normalise money to integer cents before applying a percentage",
        why: "In floating point, seventy per cent of eighty-five reais evaluates to 59.49999999999999. One cent, every time, compounding across a consignment ledger.",
        cost: "The store's share is derived as the total minus the commission and never rounded on its own, so the two always sum exactly — one more invariant to keep. And the older sales modules still do float arithmetic on money, so the discipline is not uniform across the codebase yet.",
      },
      {
        decision: "Enforce tenant isolation with a filter on every query rather than database row-level security",
        why: "It was simpler with the ORM's query API and kept the schema portable across environments.",
        cost: "It is discipline, not a structural guarantee — every new query is a chance to forget. It failed once in production, which is the third incident below.",
      },
    ],
    incidents: [
      {
        title: "The agent stopped seeing new messages after the fifteenth of each conversation",
        what: "The history query ordered ascending and took fifteen rows, so it returned the fifteen *oldest* messages. Past that point the model's view of the conversation was frozen at the beginning. Worse, the customer's current message was never added to the prompt at all — it was only used to extract intent for retrieval, so the model was answering the past while reading nothing of the present.",
        fix: "Correct the window and inject the current turn explicitly. I found it live from three symptoms that only make sense together: replies repeated word for word, replies that were generically empty, and replies that answered a question from several turns earlier.",
      },
      {
        title: "A deploy that reported success and did nothing",
        what: "The deploy script was piped to the server over SSH. A health check in the middle of it used `docker compose exec -T`, which also reads standard input — it swallowed the rest of the script, the shell reached end of input and exited zero. The pipeline went green, the release tag was never written, image pruning never ran, and the automatic rollback had no previous version to return to.",
        fix: "Copy the script to the server and run it as a file instead of piping it, and redirect the health check's stdin from /dev/null as a second barrier. The lesson stuck harder than the fix: a deploy that cannot fail loudly will fail quietly, and a green pipeline is a claim, not evidence.",
      },
      {
        title: "A handoff that could write into another tenant's data",
        what: "The routing code updated a record by id with no tenant filter — the gap that per-query discipline always eventually leaves. Separately, two simultaneous handoffs collided on a composite unique key and the losing write disappeared into a caught error that logged nothing useful.",
        fix: "Scope the update by tenant, and replace the read-then-write with an atomic upsert on the composite key. The swallowed error was the more dangerous half: the isolation bug had a fix, but the silence meant nobody would have known to look.",
      },
    ],
    stack: bernyflowStack,
    labels: labelsEn,
  },
  pt: {
    title: "BernyFlow",
    subtitle: "SaaS de CRM multi-tenant com WhatsApp no centro · produto meu · 742 commits em 10 meses",
    context: [
      "A empresa conecta o número de WhatsApp e um agente de LLM com busca sobre os documentos dela atende o cliente, passa a conversa para um humano quando é o caso, e dispara fluxos de acompanhamento. O mesmo tenant tem agendamento, financeiro e um módulo de consignação, moldados para alguns nichos de serviço.",
      "Construí e opero tudo sozinho — 69 models, 228 endpoints, 13 releases. O CRUD não é a parte interessante. A parte interessante é o pipeline de mensagens, onde todo problema difícil é sobre tempo: um gateway que reenvia se você responde devagar, uma pessoa que manda três fragmentos em vez de uma frase, e um modelo cujo contexto você tem de montar certo a cada turno.",
    ],
    decisions: [
      {
        decision: "Dar ACK no webhook do WhatsApp na hora e processar fora, por fila",
        why: "Chamada de LLM leva segundos. O gateway trata resposta lenta como falha e reenvia, então responder ali mesmo duplicaria mensagem exatamente sob a carga que eu queria suportar.",
        cost: "A fila virou dependência dura: se ela está inacessível o endpoint devolve 503 e registra o payload como perdido. É uma janela de perda aceita, não um outbox durável — o nome honesto de um trade-off que eu ainda não paguei.",
      },
      {
        decision: "Remover o corte de similaridade da busca em vez de calibrá-lo",
        why: "Chunk fraco no prompt é julgado pelo modelo, que o lê. Um limiar de distância cosseno decide antes de ler, e estava descartando contexto que fazia diferença.",
        cost: "Nada mais curto-circuita em correspondência fraca, então saem mais tokens por chamada — e eu não tenho avaliação automatizada provando que deixar o modelo julgar é melhor que o limiar. Eu acredito que é; não medi.",
      },
      {
        decision: "Agrupar rajadas de mensagem numa janela de oito segundos por conversa",
        why: "As pessoas escrevem como falam: três fragmentos seguidos. Responder cada um separadamente lê como bot quebrado, e custa três chamadas de LLM para uma pergunta.",
        cost: "A janela vive na memória de um processo. Reinício do worker no meio dela descarta a resposta pendente, e subir um segundo worker quebraria o agrupamento de vez — é esta peça que impede escalar horizontalmente.",
      },
      {
        decision: "Normalizar dinheiro para centavos inteiros antes de aplicar percentual",
        why: "Em ponto flutuante, setenta por cento de oitenta e cinco reais dá 59,49999999999999. Um centavo, sempre, acumulando ao longo de um livro de consignação.",
        cost: "A parte da loja é derivada como total menos comissão e nunca arredondada sozinha, então as duas sempre somam exato — mais um invariante para manter. E os módulos de venda mais antigos ainda fazem aritmética de ponto flutuante com dinheiro, então a disciplina ainda não é uniforme no código.",
      },
      {
        decision: "Garantir isolamento entre tenants com filtro em toda query, e não com row-level security no banco",
        why: "Era mais simples com a API de query do ORM e mantinha o schema portátil entre ambientes.",
        cost: "É disciplina, não garantia estrutural — cada query nova é uma chance de esquecer. Falhou uma vez em produção, que é o terceiro incidente abaixo.",
      },
    ],
    incidents: [
      {
        title: "O agente parou de ver mensagens novas depois da décima quinta de cada conversa",
        what: "A query de histórico ordenava crescente e pegava quinze linhas, então devolvia as quinze mensagens **mais antigas**. Dali em diante a visão do modelo sobre a conversa ficava congelada no início. Pior: a mensagem atual do cliente nunca era acrescentada ao prompt — servia só para extrair intenção para a busca. O modelo respondia o passado sem ler nada do presente.",
        fix: "Corrigir a janela e injetar o turno atual explicitamente. Descobri ao vivo por três sintomas que só fazem sentido juntos: resposta repetida palavra por palavra, resposta genericamente vazia, e resposta a uma pergunta de vários turnos atrás.",
      },
      {
        title: "Um deploy que reportava sucesso e não fazia nada",
        what: "O script de deploy ia por pipe ao servidor via SSH. Um health check no meio dele usava `docker compose exec -T`, que também lê a entrada padrão — engoliu o resto do script, o shell chegou ao fim da entrada e saiu zero. O pipeline ficou verde, a tag da release nunca foi escrita, a limpeza de imagens nunca rodou, e o rollback automático não tinha versão anterior para onde voltar.",
        fix: "Copiar o script para o servidor e executar como arquivo em vez de pipe, e redirecionar a entrada do health check de /dev/null como segunda barreira. A lição pegou mais forte que a correção: um deploy que não consegue falhar alto vai falhar em silêncio, e pipeline verde é afirmação, não evidência.",
      },
      {
        title: "Um handoff que podia escrever no dado de outro tenant",
        what: "O código de roteamento atualizava um registro por id sem filtro de tenant — a brecha que disciplina por query sempre acaba deixando. Em separado, dois handoffs simultâneos colidiam numa chave única composta e a escrita perdedora desaparecia dentro de um erro capturado que não registrava nada útil.",
        fix: "Escopar a atualização por tenant e trocar o ler-depois-escrever por um upsert atômico na chave composta. O erro engolido era a metade mais perigosa: o bug de isolamento tinha conserto, mas o silêncio significava que ninguém saberia que devia olhar.",
      },
    ],
    stack: bernyflowStack,
    labels: labelsPt,
  },
  es: {
    title: "BernyFlow",
    subtitle: "SaaS de CRM multi-tenant centrado en WhatsApp · producto propio · 742 commits en 10 meses",
    context: [
      "La empresa conecta su número de WhatsApp y un agente de LLM con búsqueda sobre sus propios documentos atiende al cliente, deriva la conversación a una persona cuando corresponde y ejecuta flujos de seguimiento. El mismo tenant tiene agenda, finanzas y un módulo de consignación, moldeados para algunos nichos de servicio.",
      "Lo construí y lo opero solo — 69 modelos, 228 endpoints, 13 releases. El CRUD no es la parte interesante. La parte interesante es el pipeline de mensajes, donde todo problema difícil es sobre tiempo: un gateway que reenvía si respondes lento, una persona que manda tres fragmentos en vez de una frase, y un modelo cuyo contexto hay que armar bien en cada turno.",
    ],
    decisions: [
      {
        decision: "Confirmar el webhook de WhatsApp de inmediato y procesarlo fuera, por cola",
        why: "Una llamada al LLM tarda segundos. El gateway trata la respuesta lenta como fallo y la reenvía, así que responder en línea habría duplicado mensajes justo bajo la carga que quería soportar.",
        cost: "La cola pasó a ser dependencia dura: si no está accesible el endpoint devuelve 503 y registra el payload como perdido. Es una ventana de pérdida aceptada, no un outbox durable — el nombre honesto de un trade-off que aún no pagué.",
      },
      {
        decision: "Quitar el umbral de similitud de la búsqueda en vez de calibrarlo",
        why: "Un fragmento débil en el prompt lo juzga el modelo, que lo lee. Un umbral de distancia cosena decide antes de leer, y estaba descartando contexto que sí importaba.",
        cost: "Nada corta en corto ante una coincidencia débil, así que salen más tokens por llamada — y no tengo una evaluación automatizada que pruebe que dejar juzgar al modelo supera al umbral. Creo que sí; no lo medí.",
      },
      {
        decision: "Agrupar ráfagas de mensajes en una ventana de ocho segundos por conversación",
        why: "La gente escribe como habla: tres fragmentos seguidos. Responder cada uno por separado se lee como un bot roto, y cuesta tres llamadas al LLM para una sola pregunta.",
        cost: "La ventana vive en la memoria de un proceso. Un reinicio del worker a mitad de ventana descarta la respuesta pendiente, y levantar un segundo worker rompería el agrupamiento del todo — esta es la pieza que impide escalar horizontalmente.",
      },
      {
        decision: "Normalizar el dinero a céntimos enteros antes de aplicar un porcentaje",
        why: "En punto flotante, el setenta por ciento de ochenta y cinco da 59,49999999999999. Un céntimo, siempre, acumulándose a lo largo de un libro de consignación.",
        cost: "La parte de la tienda se deriva como total menos comisión y nunca se redondea por separado, así que ambas suman exacto — un invariante más que mantener. Y los módulos de venta más antiguos siguen haciendo aritmética flotante con dinero, así que la disciplina todavía no es uniforme en el código.",
      },
      {
        decision: "Garantizar el aislamiento entre tenants con un filtro en cada consulta, no con row-level security en la base",
        why: "Era más simple con la API de consultas del ORM y mantenía el esquema portable entre entornos.",
        cost: "Es disciplina, no garantía estructural — cada consulta nueva es una oportunidad de olvidarlo. Falló una vez en producción, que es el tercer incidente de abajo.",
      },
    ],
    incidents: [
      {
        title: "El agente dejó de ver mensajes nuevos después del decimoquinto de cada conversación",
        what: "La consulta de historial ordenaba ascendente y tomaba quince filas, así que devolvía los quince mensajes **más antiguos**. A partir de ahí la visión del modelo quedaba congelada en el inicio. Peor: el mensaje actual del cliente nunca se agregaba al prompt — solo se usaba para extraer intención para la búsqueda. El modelo respondía al pasado sin leer nada del presente.",
        fix: "Corregir la ventana e inyectar el turno actual explícitamente. Lo encontré en vivo por tres síntomas que solo tienen sentido juntos: respuestas repetidas palabra por palabra, respuestas genéricamente vacías, y respuestas a una pregunta de varios turnos atrás.",
      },
      {
        title: "Un despliegue que reportaba éxito y no hacía nada",
        what: "El script de despliegue iba por pipe al servidor vía SSH. Un health check en medio usaba `docker compose exec -T`, que también lee la entrada estándar — se comió el resto del script, el shell llegó al fin de la entrada y salió cero. El pipeline quedó verde, la etiqueta de release nunca se escribió, la limpieza de imágenes nunca corrió, y el rollback automático no tenía versión previa a la que volver.",
        fix: "Copiar el script al servidor y ejecutarlo como archivo en vez de por pipe, y redirigir la entrada del health check desde /dev/null como segunda barrera. La lección pesó más que la corrección: un despliegue que no puede fallar en voz alta fallará en silencio, y un pipeline verde es una afirmación, no evidencia.",
      },
      {
        title: "Un handoff que podía escribir en los datos de otro tenant",
        what: "El código de enrutamiento actualizaba un registro por id sin filtro de tenant — la brecha que la disciplina por consulta siempre acaba dejando. Aparte, dos handoffs simultáneos colisionaban en una clave única compuesta y la escritura perdedora desaparecía dentro de un error capturado que no registraba nada útil.",
        fix: "Acotar la actualización por tenant y cambiar el leer-luego-escribir por un upsert atómico sobre la clave compuesta. El error silenciado era la mitad más peligrosa: el bug de aislamiento tenía arreglo, pero el silencio significaba que nadie sabría que debía mirar.",
      },
    ],
    stack: bernyflowStack,
    labels: labelsEs,
  },
};

const ligaStack =
  "Next.js 16 · React 19 · TypeScript · Prisma · PostgreSQL · NextAuth · Cloudinary · Docker · nginx";

const ligaDosVales: Localized<CaseStudy> = {
  en: {
    title: "Liga dos Vales",
    subtitle: "Official portal for a regional volleyball league · my own project · 192 commits over 6 months",
    context: [
      "The public site and the back office for the largest volleyball championship in Santa Cruz do Sul, Brazil: stages, standings, playoff brackets, a player transfer market, per-stage awards and a news section. The league's organisers run it themselves.",
      "What makes this one interesting is that the rules are not mine to invent. Scoring and tie-breaks come from a printed regulation, and the code cites its articles. Getting them wrong does not raise an error — it publishes a wrong ranking, which the teams read before I do.",
    ],
    decisions: [
      {
        decision: "Award three points for a win and none for a loss, not the federation's 3/2/1/0",
        why: "The league's own regulation says so, in articles 24a and 30. The international scale is the obvious default and it is the wrong one here.",
        cost: "I shipped the obvious default first. It mis-ranked teams silently until I read the rulebook line by line against the code — the kind of bug that has no stack trace and no failing test, only a standings table that looks plausible.",
      },
      {
        decision: "Rank across groups by point average, never by raw points",
        why: "The groups are not the same size — four, three and three. Raw totals are not comparable between them, so a cross-group table built on points would reward whoever played more matches.",
        cost: "An extra path through the tie-break code, and a comment warning whoever comes next not to 'fix' it back to points. It reads like an inconsistency until you know why it is there.",
      },
      {
        decision: "Cache-bust generated share images with a version derived from the data",
        why: "The images are generated and cached, but they have to change the moment a result changes. A fixed URL serves a stale scoreboard; a random one throws the cache away.",
        cost: "A version query on every image request, and a window of up to an hour in which a very recent edit may still serve the previous image.",
      },
      {
        decision: "Call the authorisation check inside every server action instead of relying on route middleware",
        why: "Server actions are globally reachable POST endpoints. The middleware that guards the admin URLs never sees them — a fact that is easy to learn the wrong way.",
        cost: "Thirty-eight call sites to get right, and no structural guarantee that the thirty-ninth will have it. The check is a convention held by hand, which is exactly what the middleware was supposed to avoid.",
      },
      {
        decision: "Make a transfer an atomic conditional update rather than a read-then-write",
        why: "Two people submitting a transfer for the same player at the same time would otherwise corrupt which team he belongs to, and the loser would never know.",
        cost: "Translating the database's constraint violation into a message a human can act on — the error is precise and unreadable, and the person filling the form deserves the opposite.",
      },
    ],
    incidents: [
      {
        title: "A security review found the back office was not the boundary I thought it was",
        what: "The middleware guarded the admin URLs, but server actions are imported into public pages and reachable directly — around thirty-eight data-changing actions could be invoked with no authentication at all. A database seeding route had also been left open, and the admin credentials existed as literal defaults in the source.",
        fix: "An authorisation check inside every action, field allowlists on everything serialised into public pages, the seeding route removed, and the password replaced by a hash in an environment variable with no fallback — because a silent default is worse than a loud failure: it works, and so nobody finds it.",
      },
      {
        title: "Regenerating a bracket deleted matches that had already been played",
        what: "'Generate bracket' deleted and recreated the knockout matches. In the ten-team format, with a play-in feeding a second semifinal, three finished results could vanish from one click in the middle of the tournament — and the button gave no warning that it would.",
        fix: "Query for finished playoff matches first and return a confirmation step that names the exact scores about to be lost. The destructive action is still there; it just can no longer be taken by accident.",
      },
      {
        title: "Sharing a result to Instagram failed silently on phones",
        what: "The browser's share API rejected on some mobile devices and the app had no way to know why. The user tapped, nothing happened, and there was nothing to debug from — the worst shape a bug can take, because it is invisible to everyone except the person it happens to.",
        fix: "Instrument the three failure points to report the error name and whether file sharing was supported at all, then use that telemetry to add a fallback that shares without the image, and fix a stale closure that left the button hanging. Measuring first turned an unreproducible complaint into two specific bugs.",
      },
    ],
    stack: ligaStack,
    labels: labelsEn,
  },
  pt: {
    title: "Liga dos Vales",
    subtitle: "Portal oficial de uma liga regional de voleibol · projeto meu · 192 commits em 6 meses",
    context: [
      "O site público e o back office do maior campeonato de voleibol de Santa Cruz do Sul: etapas, classificação, chaveamento de playoffs, mercado de atletas, premiações por etapa e uma seção de notícias. Quem opera é a própria organização da liga.",
      "O que torna este projeto interessante é que as regras não são minhas para inventar. Pontuação e critérios de desempate vêm de um regulamento impresso, e o código cita os artigos dele. Errar não levanta exceção — publica uma classificação errada, que os times leem antes de mim.",
    ],
    decisions: [
      {
        decision: "Dar três pontos por vitória e zero por derrota, não o 3/2/1/0 da federação",
        why: "O regulamento da liga manda isso, nos artigos 24a e 30. A escala internacional é o padrão óbvio e é o errado aqui.",
        cost: "Eu subi o padrão óbvio primeiro. Ele classificou os times errado em silêncio até eu ler o regulamento linha por linha contra o código — o tipo de bug que não tem stack trace nem teste vermelho, só uma tabela de classificação que parece plausível.",
      },
      {
        decision: "Classificar entre grupos por média de pontos, nunca por pontos brutos",
        why: "Os grupos não têm o mesmo tamanho — quatro, três e três. Total bruto não é comparável entre eles, então uma tabela geral por pontos premiaria quem jogou mais partidas.",
        cost: "Um caminho extra no código de desempate, e um comentário avisando quem vier depois para não 'consertar' de volta para pontos. Parece inconsistência até você saber por que está ali.",
      },
      {
        decision: "Invalidar o cache das imagens de compartilhamento com uma versão derivada do dado",
        why: "As imagens são geradas e cacheadas, mas têm de mudar no instante em que um resultado muda. URL fixa serve placar velho; URL aleatória joga o cache no lixo.",
        cost: "Uma consulta de versão em cada requisição de imagem, e uma janela de até uma hora em que uma edição muito recente ainda pode servir a imagem anterior.",
      },
      {
        decision: "Chamar a verificação de autorização dentro de cada server action em vez de confiar no middleware de rota",
        why: "Server actions são endpoints POST alcançáveis globalmente. O middleware que protege as URLs de admin não as vê — fato fácil de aprender do jeito errado.",
        cost: "Trinta e oito pontos de chamada para acertar, e nenhuma garantia estrutural de que o trigésimo nono terá. A verificação virou convenção mantida à mão, que é exatamente o que o middleware devia evitar.",
      },
      {
        decision: "Fazer da transferência uma atualização condicional atômica em vez de ler-depois-escrever",
        why: "Duas pessoas registrando transferência do mesmo atleta ao mesmo tempo corromperiam a que time ele pertence, e quem perdesse nunca saberia.",
        cost: "Traduzir a violação de restrição do banco numa mensagem sobre a qual um humano consiga agir — o erro é preciso e ilegível, e quem está preenchendo o formulário merece o contrário.",
      },
    ],
    incidents: [
      {
        title: "Uma revisão de segurança mostrou que o back office não era a fronteira que eu pensava",
        what: "O middleware protegia as URLs de admin, mas server actions são importadas em páginas públicas e alcançáveis diretamente — cerca de trinta e oito ações que alteram dado podiam ser invocadas sem autenticação nenhuma. Uma rota de seed do banco também tinha ficado aberta, e as credenciais de admin existiam como valores literais no código.",
        fix: "Verificação de autorização dentro de cada ação, allowlist de campos em tudo o que é serializado para página pública, rota de seed removida, e a senha trocada por um hash em variável de ambiente sem fallback — porque padrão silencioso é pior que falha alta: ele funciona, e por isso ninguém descobre.",
      },
      {
        title: "Regerar o chaveamento apagava partidas que já tinham sido jogadas",
        what: "O 'Gerar chaveamento' apagava e recriava as partidas do mata-mata. No formato de dez equipes, com uma repescagem alimentando uma segunda semifinal, três resultados já encerrados podiam desaparecer com um clique no meio do torneio — e o botão não avisava que faria isso.",
        fix: "Consultar as partidas de playoff já finalizadas antes e devolver um passo de confirmação que nomeia os placares exatos a serem perdidos. A ação destrutiva continua ali; só não pode mais ser tomada por acidente.",
      },
      {
        title: "Compartilhar um resultado no Instagram falhava em silêncio no celular",
        what: "A API de compartilhamento do navegador recusava em alguns aparelhos e o app não tinha como saber por quê. O usuário tocava, nada acontecia, e não havia nada para depurar — a pior forma que um bug pode ter, porque é invisível para todos exceto para quem passa por ele.",
        fix: "Instrumentar os três pontos de falha para reportar o nome do erro e se compartilhar arquivo era suportado, e usar essa telemetria para adicionar um fallback que compartilha sem a imagem e corrigir um closure obsoleto que travava o botão. Medir primeiro transformou uma reclamação não reproduzível em dois bugs específicos.",
      },
    ],
    stack: ligaStack,
    labels: labelsPt,
  },
  es: {
    title: "Liga dos Vales",
    subtitle: "Portal oficial de una liga regional de voleibol · proyecto propio · 192 commits en 6 meses",
    context: [
      "El sitio público y el back office del mayor campeonato de voleibol de Santa Cruz do Sul, Brasil: etapas, clasificación, cuadros de playoffs, mercado de jugadores, premios por etapa y una sección de noticias. Lo operan los propios organizadores de la liga.",
      "Lo interesante de este proyecto es que las reglas no son mías para inventarlas. La puntuación y los desempates vienen de un reglamento impreso, y el código cita sus artículos. Equivocarse no lanza una excepción — publica una clasificación errónea, que los equipos leen antes que yo.",
    ],
    decisions: [
      {
        decision: "Dar tres puntos por victoria y cero por derrota, no el 3/2/1/0 de la federación",
        why: "El reglamento de la liga lo indica, en los artículos 24a y 30. La escala internacional es el valor por defecto obvio y aquí es el equivocado.",
        cost: "Subí el valor obvio primero. Clasificó mal a los equipos en silencio hasta que leí el reglamento línea por línea contra el código — el tipo de error que no tiene stack trace ni test en rojo, solo una tabla que parece plausible.",
      },
      {
        decision: "Clasificar entre grupos por promedio de puntos, nunca por puntos brutos",
        why: "Los grupos no tienen el mismo tamaño — cuatro, tres y tres. El total bruto no es comparable entre ellos, así que una tabla general por puntos premiaría a quien jugó más partidos.",
        cost: "Un camino extra en el código de desempate, y un comentario avisando a quien venga después que no lo 'arregle' de vuelta a puntos. Parece una inconsistencia hasta que sabes por qué está ahí.",
      },
      {
        decision: "Invalidar la caché de las imágenes de compartir con una versión derivada de los datos",
        why: "Las imágenes se generan y se cachean, pero tienen que cambiar en el instante en que cambia un resultado. Una URL fija sirve un marcador viejo; una aleatoria tira la caché a la basura.",
        cost: "Una consulta de versión en cada solicitud de imagen, y una ventana de hasta una hora en la que una edición muy reciente puede seguir sirviendo la imagen anterior.",
      },
      {
        decision: "Llamar la verificación de autorización dentro de cada server action en vez de confiar en el middleware de ruta",
        why: "Las server actions son endpoints POST alcanzables globalmente. El middleware que protege las URLs de admin no las ve — un hecho fácil de aprender por el camino equivocado.",
        cost: "Treinta y ocho puntos de llamada que acertar, y ninguna garantía estructural de que el trigésimo noveno la tenga. La verificación quedó como convención sostenida a mano, que es justo lo que el middleware debía evitar.",
      },
      {
        decision: "Hacer de la transferencia una actualización condicional atómica en vez de leer-luego-escribir",
        why: "Dos personas registrando la transferencia del mismo jugador al mismo tiempo corromperían a qué equipo pertenece, y quien perdiera nunca lo sabría.",
        cost: "Traducir la violación de restricción de la base en un mensaje sobre el que una persona pueda actuar — el error es preciso e ilegible, y quien llena el formulario merece lo contrario.",
      },
    ],
    incidents: [
      {
        title: "Una revisión de seguridad mostró que el back office no era la frontera que yo creía",
        what: "El middleware protegía las URLs de admin, pero las server actions se importan en páginas públicas y son alcanzables directamente — cerca de treinta y ocho acciones que modifican datos podían invocarse sin autenticación alguna. Una ruta de seed de la base también había quedado abierta, y las credenciales de admin existían como valores literales en el código.",
        fix: "Verificación de autorización dentro de cada acción, allowlist de campos en todo lo que se serializa a páginas públicas, ruta de seed eliminada, y la contraseña reemplazada por un hash en variable de entorno sin fallback — porque un valor por defecto silencioso es peor que un fallo ruidoso: funciona, y por eso nadie lo encuentra.",
      },
      {
        title: "Regenerar el cuadro borraba partidos ya jugados",
        what: "'Generar cuadro' borraba y recreaba los partidos de eliminatorias. En el formato de diez equipos, con una repesca alimentando una segunda semifinal, tres resultados ya cerrados podían desaparecer con un clic en medio del torneo — y el botón no avisaba de que lo haría.",
        fix: "Consultar primero los partidos de playoff ya finalizados y devolver un paso de confirmación que nombra los marcadores exactos que se perderían. La acción destructiva sigue ahí; solo ya no puede tomarse por accidente.",
      },
      {
        title: "Compartir un resultado en Instagram fallaba en silencio en los móviles",
        what: "La API de compartir del navegador rechazaba en algunos dispositivos y la app no tenía forma de saber por qué. El usuario tocaba, no pasaba nada, y no había nada que depurar — la peor forma que puede tomar un error, porque es invisible para todos excepto para quien lo sufre.",
        fix: "Instrumentar los tres puntos de fallo para reportar el nombre del error y si compartir archivos estaba soportado, y usar esa telemetría para añadir un fallback que comparte sin la imagen y corregir un closure obsoleto que dejaba el botón colgado. Medir primero convirtió una queja irreproducible en dos errores concretos.",
      },
    ],
    stack: ligaStack,
    labels: labelsEs,
  },
};

export const CASE_STUDY_SLUGS = ["agents-ia", "bernyflow", "liga-dos-vales"] as const;
export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

const collection: Record<CaseStudySlug, Localized<CaseStudy>> = {
  "agents-ia": agentsIa,
  bernyflow,
  "liga-dos-vales": ligaDosVales,
};

export function isCaseStudySlug(value: string): value is CaseStudySlug {
  return (CASE_STUDY_SLUGS as readonly string[]).includes(value);
}

export function getCaseStudy(slug: CaseStudySlug, lang: Lang): CaseStudy {
  return collection[slug][lang];
}

/** Todos os case studies num idioma — usado para dar contexto ao agente. */
export function getAllCaseStudies(lang: Lang): Record<CaseStudySlug, CaseStudy> {
  return {
    "agents-ia": collection["agents-ia"][lang],
    bernyflow: collection.bernyflow[lang],
    "liga-dos-vales": collection["liga-dos-vales"][lang],
  };
}
