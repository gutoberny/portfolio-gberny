import type { ReactNode } from "react";

export interface DiagramLabels {
  intake: string;
  queue: string;
  orchestrator: string;
  stages: string[];
  delivery: string;
  handoff: string;
  caption: string;
}

const MONO = "var(--font-geist-mono), monospace";

/** Quebra ingênua por palavra — não há medição real de glyph disponível em
 * build time, então usamos uma largura média de caractere para fonte
 * monoespaçada. Suficiente para não deixar o texto vazar da caixa. */
function wrapLines(text: string, width: number, fontSize: number): string[] {
  const avgChar = fontSize * 0.62;
  const maxChars = Math.max(8, Math.floor((width - 16) / avgChar));
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function MultilineText({
  x,
  cy,
  lines,
  fontSize,
  lineHeight,
  fill,
}: {
  x: number;
  cy: number;
  lines: string[];
  fontSize: number;
  lineHeight: number;
  fill: string;
}) {
  const firstY = cy - ((lines.length - 1) * lineHeight) / 2 + fontSize * 0.35;
  return (
    <text x={x} textAnchor="middle" fontSize={fontSize} fontFamily={MONO} fill={fill}>
      {lines.map((line, i) => (
        <tspan key={line + i} x={x} y={firstY + i * lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/** Caixa com altura calculada a partir do texto: nada é cortado nem vaza,
 * em nenhum dos três idiomas. Retorna a altura usada para o chamador
 * posicionar o próximo elemento. */
function measuredBox(opts: {
  x: number;
  y: number;
  w: number;
  text: string;
  dark?: boolean;
  fontSize?: number;
  minH?: number;
  arrowId: string;
}) {
  const { x, y, w, text, dark = false, fontSize = 11, minH = 28, arrowId } = opts;
  const lineHeight = fontSize + 3;
  const lines = wrapLines(text, w, fontSize);
  const height = Math.max(minH, lines.length * lineHeight + 12);
  const node = (
    <g key={`${arrowId}-${x}-${y}`}>
      <rect
        x={x}
        y={y}
        width={w}
        height={height}
        rx="4"
        fill={dark ? "var(--term-bg)" : "var(--paper)"}
        stroke={dark ? "var(--term-bg)" : "var(--rule)"}
      />
      <MultilineText
        x={x + w / 2}
        cy={y + height / 2}
        lines={lines}
        fontSize={fontSize}
        lineHeight={lineHeight}
        fill={dark ? "var(--term-fg)" : "var(--ink)"}
      />
    </g>
  );
  return { node, height };
}

function arrow(x1: number, y1: number, x2: number, y2: number, markerId: string) {
  return (
    <line
      key={`${x1}-${y1}-${x2}-${y2}-${markerId}`}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--muted)"
      strokeWidth="1"
      markerEnd={`url(#${markerId})`}
    />
  );
}

function ArrowheadDef({ id }: { id: string }) {
  return (
    <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="var(--muted)" />
    </marker>
  );
}

/** Layout largo (tablet/desktop): entrada à esquerda, fila, orquestrador com
 * as 5 etapas empilhadas, saída à direita. */
function DesktopDiagram({ labels }: { labels: DiagramLabels }) {
  const channels = ["WhatsApp", "Web widget", "Email", "Public API", "MCP"];
  const stageEls = labels.stages.map((s, i) => {
    const { node } = measuredBox({
      x: 402,
      y: 58 + i * 32,
      w: 306,
      text: s,
      fontSize: 11,
      minH: 28,
      arrowId: `d-stage-${i}`,
    });
    return node;
  });

  return (
    <svg
      viewBox="0 0 720 420"
      role="img"
      aria-label={labels.caption}
      preserveAspectRatio="xMidYMid meet"
      className="hidden h-auto w-full md:block"
    >
      <defs>
        <ArrowheadDef id="arrowhead-desktop" />
      </defs>

      <text x="0" y="14" fontSize="10" letterSpacing="1.5" fontFamily={MONO} fill="var(--muted)">
        {labels.intake.toUpperCase()}
      </text>
      {channels.map((ch, i) => measuredBox({ x: 0, y: 26 + i * 34, w: 130, text: ch, fontSize: 11, arrowId: `d-ch-${i}` }).node)}

      {arrow(134, 100, 196, 100, "arrowhead-desktop")}

      {measuredBox({ x: 200, y: 84, w: 120, text: labels.queue, dark: true, fontSize: 11, minH: 32, arrowId: "d-queue" }).node}
      {arrow(324, 100, 386, 100, "arrowhead-desktop")}

      <rect x="390" y="26" width="330" height="200" rx="4" fill="none" stroke="var(--rule)" />
      <text x="402" y="46" fontSize="10" letterSpacing="1.5" fontFamily={MONO} fill="var(--muted)">
        {labels.orchestrator.toUpperCase()}
      </text>
      {stageEls}

      {arrow(555, 232, 555, 268, "arrowhead-desktop")}

      {measuredBox({ x: 390, y: 274, w: 160, text: labels.delivery, dark: true, fontSize: 11, minH: 32, arrowId: "d-delivery" }).node}
      {measuredBox({ x: 566, y: 274, w: 154, text: labels.handoff, fontSize: 11, minH: 32, arrowId: "d-handoff" }).node}
      {arrow(550, 290, 562, 290, "arrowhead-desktop")}
    </svg>
  );
}

/** Layout empilhado (mobile): mesmas cinco caixas, uma faixa vertical em vez
 * de duas colunas lado a lado. viewBox estreito (340) para que a fonte não
 * seja escalada para baixo — em 390px de viewport ela renderiza quase 1:1. */
function MobileDiagram({ labels }: { labels: DiagramLabels }) {
  const W = 340;
  const cx = W / 2;
  const channels = ["WhatsApp", "Web widget", "Email", "Public API", "MCP"];
  const nodes: ReactNode[] = [];
  let y = 0;

  nodes.push(
    <text key="intake-label" x="0" y={y + 11} fontSize="12" letterSpacing="1" fontFamily={MONO} fill="var(--muted)">
      {labels.intake.toUpperCase()}
    </text>,
  );
  y += 22;

  for (const ch of channels) {
    const { node, height } = measuredBox({ x: 0, y, w: W, text: ch, fontSize: 13, minH: 30, arrowId: `m-ch-${ch}` });
    nodes.push(node);
    y += height + 6;
  }

  nodes.push(arrow(cx, y + 4, cx, y + 22, "arrowhead-mobile"));
  y += 30;

  {
    const { node, height } = measuredBox({ x: 0, y, w: W, text: labels.queue, dark: true, fontSize: 13, minH: 34, arrowId: "m-queue" });
    nodes.push(node);
    y += height;
  }

  nodes.push(arrow(cx, y + 4, cx, y + 22, "arrowhead-mobile"));
  y += 30;

  const orchestratorTop = y;
  nodes.push(
    <text key="orch-label" x="10" y={y + 18} fontSize="12" letterSpacing="1" fontFamily={MONO} fill="var(--muted)">
      {labels.orchestrator.toUpperCase()}
    </text>,
  );
  y += 28;

  labels.stages.forEach((s, i) => {
    const { node, height } = measuredBox({ x: 10, y, w: W - 20, text: s, fontSize: 12, minH: 30, arrowId: `m-stage-${i}` });
    nodes.push(node);
    y += height + 6;
  });
  y += 6;
  nodes.unshift(
    <rect
      key="orch-box"
      x="0"
      y={orchestratorTop}
      width={W}
      height={y - orchestratorTop}
      rx="4"
      fill="none"
      stroke="var(--rule)"
    />,
  );

  nodes.push(arrow(cx, y + 4, cx, y + 22, "arrowhead-mobile"));
  y += 30;

  {
    const { node, height } = measuredBox({ x: 0, y, w: W, text: labels.delivery, dark: true, fontSize: 13, minH: 32, arrowId: "m-delivery" });
    nodes.push(node);
    y += height + 8;
  }
  {
    const { node, height } = measuredBox({ x: 0, y, w: W, text: labels.handoff, fontSize: 13, minH: 32, arrowId: "m-handoff" });
    nodes.push(node);
    y += height;
  }

  const totalHeight = y + 6;

  return (
    <svg
      viewBox={`0 0 ${W} ${totalHeight}`}
      role="img"
      aria-label={labels.caption}
      preserveAspectRatio="xMidYMid meet"
      className="h-auto w-full md:hidden"
    >
      <defs>
        <ArrowheadDef id="arrowhead-mobile" />
      </defs>
      {nodes}
    </svg>
  );
}

export function ArchitectureDiagram({ labels }: { labels: DiagramLabels }) {
  return (
    <figure className="my-2">
      <DesktopDiagram labels={labels} />
      <MobileDiagram labels={labels} />
      <figcaption className="eyebrow mt-3">{labels.caption}</figcaption>
    </figure>
  );
}
