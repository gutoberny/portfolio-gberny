import type { Lang, Project } from "@/content";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const CASE_STUDY_CTA: Record<Lang, string> = {
  en: "Read the case study",
  pt: "Ler o case study",
  es: "Leer el caso completo",
};

export function ProjectCard({ project, language }: { project: Project; language: Lang }) {
  return (
    <article className="flex flex-col border border-[color:var(--rule)] p-5">
      <p className="eyebrow">{project.kind}</p>
      <h3 className="display mt-3 text-lg">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
          >
            {/* Sublinhado no span, dimensionado ao texto — mesmo padrão de
                Hero/Contact — para não riscar o ícone junto. */}
            <span className="border-b border-transparent group-hover:border-[color:var(--ink)]">
              {project.name}
            </span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : (
          project.name
        )}
      </h3>
      <p className="body-text mt-2 text-sm">{project.summary}</p>
      <ul className="mt-4 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="body-text text-sm">
            {h}
          </li>
        ))}
      </ul>
      <p className="eyebrow mt-auto pt-5">{project.stack}</p>
      {/* Sem isto o case study fica órfão: a página existe, responde 200 e não
          há nada em lugar nenhum do site apontando para ela. O gate não pega,
          porque ele navega direto por URL — alcançabilidade é fora do que ele
          mede. Ver a asserção nova em scripts/visual-gate.mjs. */}
      {project.caseStudyHref ? (
        <a
          href={project.caseStudyHref}
          className="group mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-[color:var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
        >
          <span className="border-b border-[color:var(--ink)]">{CASE_STUDY_CTA[language]}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}
