import type { ReactNode } from "react";
import type { DiagramLabels } from "@/content/types";

export type { DiagramLabels };

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

/** Altura que uma caixa vai ocupar para este texto, sem criar o nó — usado
 * para decidir posições ANTES de desenhar, quando o próximo elemento
 * depende de quanto uma etapa anterior cresceu ao quebrar linha. */
function boxHeight(text: string, w: number, fontSize: number, minH = 28): number {
  const lines = wrapLines(text, w, fontSize);
  return Math.max(minH, lines.length * (fontSize + 3) + 12);
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
 * as 5 etapas empilhadas, saída à direita. Todas as alturas são calculadas a
 * partir do texto — nenhuma caixa usa um passo vertical fixo — porque PT/ES
 * têm rótulos mais longos que o inglês ("Widget web embarcável" vs. "Web
 * widget") e um passo fixo faria uma caixa que quebrou linha invadir a
 * próxima. */
function DesktopDiagram({ labels }: { labels: DiagramLabels }) {
  const leftX = 0;
  const leftW = 150;
  const queueX = 200;
  const queueW = 130;
  const orchX = 390;
  const orchW = 330;
  const stageX = orchX + 12;
  const stageW = orchW - 24;
  const deliveryX = 390;
  const deliveryW = 160;
  const handoffX = 566;
  const handoffW = 154;
  const fontSize = 11;

  // Coluna de canais de entrada.
  let leftY = 26;
  const leftNodes: ReactNode[] = [];
  labels.channels.forEach((ch, i) => {
    const h = boxHeight(ch, leftW, fontSize, 28);
    leftNodes.push(
      measuredBox({ x: leftX, y: leftY, w: leftW, text: ch, fontSize, minH: 28, arrowId: `d-ch-${i}` }).node,
    );
    leftY += h + 6;
  });
  const leftBottom = leftY - 6;

  // Etapas dentro do orquestrador.
  const orchTop = 26;
  let stageY = orchTop + 32;
  const stageNodes: ReactNode[] = [];
  labels.stages.forEach((s, i) => {
    const h = boxHeight(s, stageW, fontSize, 28);
    stageNodes.push(
      measuredBox({ x: stageX, y: stageY, w: stageW, text: s, fontSize, minH: 28, arrowId: `d-stage-${i}` }).node,
    );
    stageY += h + 6;
  });
  const orchBottom = stageY - 6 + 10;

  // Fila: centralizada verticalmente contra a altura real da coluna de canais.
  const queueH = boxHeight(labels.queue, queueW, fontSize, 32);
  const queueCenterY = (26 + leftBottom) / 2;
  const queueY = queueCenterY - queueH / 2;
  const queueNode = measuredBox({
    x: queueX,
    y: queueY,
    w: queueW,
    text: labels.queue,
    dark: true,
    fontSize,
    minH: 32,
    arrowId: "d-queue",
  }).node;

  // Linha de entrega/handoff, abaixo do que for mais alto entre canais e orquestrador.
  const contentBottom = Math.max(leftBottom, orchBottom);
  const arrowDownX = orchX + orchW / 2;
  const rowY = contentBottom + 34;
  const deliveryH = boxHeight(labels.delivery, deliveryW, fontSize, 32);
  const handoffH = boxHeight(labels.handoff, handoffW, fontSize, 32);
  const rowH = Math.max(deliveryH, handoffH, 32);
  const deliveryNode = measuredBox({
    x: deliveryX,
    y: rowY,
    w: deliveryW,
    text: labels.delivery,
    dark: true,
    fontSize,
    minH: 32,
    arrowId: "d-delivery",
  }).node;
  const handoffNode = measuredBox({
    x: handoffX,
    y: rowY,
    w: handoffW,
    text: labels.handoff,
    fontSize,
    minH: 32,
    arrowId: "d-handoff",
  }).node;

  const totalHeight = rowY + rowH + 10;

  return (
    <svg
      viewBox={`0 0 720 ${totalHeight}`}
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
      {leftNodes}

      {arrow(leftW + 4, queueCenterY, queueX - 4, queueCenterY, "arrowhead-desktop")}
      {queueNode}
      {arrow(queueX + queueW + 4, queueCenterY, orchX - 4, queueCenterY, "arrowhead-desktop")}

      <rect x={orchX} y={orchTop} width={orchW} height={orchBottom - orchTop} rx="4" fill="none" stroke="var(--rule)" />
      <text x={orchX + 12} y={orchTop + 20} fontSize="10" letterSpacing="1.5" fontFamily={MONO} fill="var(--muted)">
        {labels.orchestrator.toUpperCase()}
      </text>
      {stageNodes}

      {arrow(arrowDownX, contentBottom + 4, arrowDownX, rowY - 4, "arrowhead-desktop")}

      {deliveryNode}
      {handoffNode}
      {arrow(deliveryX + deliveryW + 4, rowY + rowH / 2, handoffX - 4, rowY + rowH / 2, "arrowhead-desktop")}
    </svg>
  );
}

/** Layout empilhado (mobile): mesmas cinco caixas, uma faixa vertical em vez
 * de duas colunas lado a lado. viewBox estreito (340) para que a fonte não
 * seja escalada para baixo — em 390px de viewport ela renderiza quase 1:1. */
function MobileDiagram({ labels }: { labels: DiagramLabels }) {
  const W = 340;
  const cx = W / 2;
  const nodes: ReactNode[] = [];
  let y = 0;

  nodes.push(
    <text key="intake-label" x="0" y={y + 11} fontSize="12" letterSpacing="1" fontFamily={MONO} fill="var(--muted)">
      {labels.intake.toUpperCase()}
    </text>,
  );
  y += 22;

  for (const ch of labels.channels) {
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
