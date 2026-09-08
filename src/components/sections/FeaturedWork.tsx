"use client";

import { getFeaturedProject, getContent } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetricStrip } from "@/components/ui/MetricStrip";
import { ArrowRight } from "lucide-react";

const CTA: Record<string, string> = {
  en: "Read the full case study",
  pt: "Ler o case study completo",
  es: "Leer el caso completo",
};

const EYEBROW: Record<string, string> = {
  en: "Featured work",
  pt: "Projeto em destaque",
  es: "Proyecto destacado",
};

export function FeaturedWork() {
  const { language } = useLanguage();
  const project = getFeaturedProject(language);
  const { heroMetrics } = getContent(language);

  return (
    <section
      className="shell border-t border-[color:var(--rule)] pt-12 pb-12 md:pt-28 md:pb-16 lg:pt-16 lg:pb-16"
      aria-labelledby="featured-title"
    >
      <SectionHeading eyebrow={EYEBROW[language]} title={project.name} id="featured-title" />
      <p className="eyebrow -mt-5 mb-6">
        {project.kind} · {project.period}
      </p>

      <p className="body-text max-w-[68ch] text-sm md:text-[15px]">{project.summary}</p>

      <div className="mt-8">
        <MetricStrip metrics={heroMetrics} />
      </div>

      <ul className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-10">
        {project.highlights.map((h) => (
          <li key={h} className="body-text border-l-2 border-[color:var(--rule)] pl-3 text-sm">
            {h}
          </li>
        ))}
      </ul>

      <p className="eyebrow mt-8">{project.stack}</p>

      {project.caseStudyHref ? (
        <a
          href={project.caseStudyHref}
          className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[color:var(--ink)] text-sm font-medium text-[color:var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
        >
          {CTA[language]}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      ) : null}
    </section>
  );
}
