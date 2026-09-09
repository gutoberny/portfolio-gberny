"use client";

import { getOtherProjects, type Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EYEBROW: Record<Lang, string> = {
  en: "Other projects",
  pt: "Outros projetos",
  es: "Otros proyectos",
};

export function Projects() {
  const { language } = useLanguage();
  const projects = getOtherProjects(language);

  return (
    <section className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="projects-title">
      <SectionHeading eyebrow={EYEBROW[language]} id="projects-title" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} language={language} />
        ))}
      </div>
    </section>
  );
}
