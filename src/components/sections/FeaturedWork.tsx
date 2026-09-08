"use client";

import { getFeaturedProject } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

  return (
    <section className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="featured-title">
      <SectionHeading
        eyebrow={EYEBROW[language]}
        title={project.name}
        meta={`${project.kind} · ${project.period}`}
        id="featured-title"
      />

      <p className="body-text max-w-[68ch] text-sm md:text-[15px]">{project.summary}</p>

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
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[color:var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
        >
          <span className="border-b border-[color:var(--ink)]">{CTA[language]}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      ) : null}
    </section>
  );
}
