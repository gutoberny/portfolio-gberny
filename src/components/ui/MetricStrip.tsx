import type { Metric } from "@/content";

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px border-y border-[color:var(--rule)] bg-[color:var(--rule)] md:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.value + m.label} data-gate="metric" className="bg-[color:var(--paper)] px-3 py-3 md:px-4">
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <span className="display block text-xl md:text-2xl">{m.value}</span>
            <span className="eyebrow mt-1 block">{m.label}</span>
            {/* O denominador é obrigatório: número redondo sem fonte é descontado. */}
            <span className="mt-1 block text-[11px] leading-snug text-[color:var(--muted)]">
              {m.detail}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
