import type { Incident } from "@/content";

export function IncidentList({
  incidents,
  whatLabel,
  fixLabel,
}: {
  incidents: Incident[];
  whatLabel: string;
  fixLabel: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {incidents.map((inc) => (
        <article key={inc.title} className="border border-[color:var(--rule)] p-4">
          <h3 className="display text-base">{inc.title}</h3>
          <p className="body-text mt-3 text-sm">
            <span className="eyebrow block text-[color:var(--ink)]">{whatLabel}</span>
            {inc.what}
          </p>
          <p className="body-text mt-3 text-sm">
            <span className="eyebrow block text-[color:var(--ink)]">{fixLabel}</span>
            {inc.fix}
          </p>
        </article>
      ))}
    </div>
  );
}
