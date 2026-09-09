"use client";

import { caseStudy } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { DecisionList } from "@/components/case-study/DecisionList";
import { IncidentList } from "@/components/case-study/IncidentList";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AgentsIaCaseStudy() {
  const { language } = useLanguage();
  const study = caseStudy[language];
  const l = study.labels;

  return (
    <main>
      <header className="shell pt-8 md:pt-14">
        <div className="flex items-start justify-between gap-4">
          <Link
            href="/"
            className="eyebrow inline-flex min-h-11 items-center gap-2 text-[color:var(--body)] hover:text-[color:var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {l.back}
          </Link>
          <LanguageSwitcher />
        </div>

        <h1 className="display mt-6 text-[23px] md:text-[30px]">{study.title}</h1>
        <p className="eyebrow mt-3">{study.subtitle}</p>
      </header>

      <section className="shell py-10 md:py-14" aria-labelledby="cs-context">
        <SectionHeading eyebrow={l.context} id="cs-context" />
        {study.context.map((p) => (
          <p key={p} className="body-text mb-3 max-w-[68ch] text-sm md:text-[15px]">
            {p}
          </p>
        ))}
      </section>

      <section className="shell border-t border-[color:var(--rule)] py-10 md:py-14" aria-labelledby="cs-results">
        <SectionHeading eyebrow={l.results} id="cs-results" />
        <ul className="space-y-3">
          {study.results.map((r) => (
            <li key={r} className="body-text max-w-[70ch] border-l-2 border-[color:var(--rule)] pl-3 text-sm">
              {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="shell border-t border-[color:var(--rule)] py-10 md:py-14" aria-labelledby="cs-decisions">
        <SectionHeading eyebrow={l.decisions} id="cs-decisions" />
        <DecisionList decisions={study.decisions} whyLabel={l.decisionWhy} costLabel={l.decisionCost} />
      </section>

      <section className="shell border-t border-[color:var(--rule)] py-10 md:py-14" aria-labelledby="cs-incidents">
        <SectionHeading eyebrow={l.incidents} id="cs-incidents" />
        <IncidentList incidents={study.incidents} whatLabel={l.incidentWhat} fixLabel={l.incidentFix} />
      </section>

      <footer className="shell border-t border-[color:var(--rule)] py-10 md:py-14">
        <p className="eyebrow">{l.stack}</p>
        <p className="body-text mt-3 max-w-[70ch] text-sm">{study.stack}</p>
      </footer>
    </main>
  );
}
