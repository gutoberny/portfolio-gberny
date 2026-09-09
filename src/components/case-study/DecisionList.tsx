import type { Decision } from "@/content";

export function DecisionList({
  decisions,
  whyLabel,
  costLabel,
}: {
  decisions: Decision[];
  whyLabel: string;
  costLabel: string;
}) {
  return (
    <ol className="space-y-8">
      {decisions.map((d, i) => (
        <li key={d.decision} className="grid gap-2 md:grid-cols-[40px_1fr] md:gap-6">
          <span className="display text-lg text-[color:var(--muted)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="display text-base md:text-lg">{d.decision}</h3>
            <p className="body-text mt-2 max-w-[64ch] text-sm">
              <span className="eyebrow mr-2 text-[color:var(--ink)]">{whyLabel}</span>
              {d.why}
            </p>
            <p className="body-text mt-2 max-w-[64ch] text-sm">
              <span className="eyebrow mr-2 text-[color:var(--ink)]">{costLabel}</span>
              {d.cost}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
