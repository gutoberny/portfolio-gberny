"use client";

import { getContent, type Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EYEBROW: Record<Lang, string> = {
  en: "Experience",
  pt: "Experiência",
  es: "Experiencia",
};

// A timeline sozinha lê como apêndice de CV. Esta linha enquadra as seis
// posições como a trajetória de um profissional, não como uma lista.
const ARC: Record<Lang, string> = {
  en: "Ten years: ERP support, backend, fullstack, and now technical lead of an AI platform.",
  pt: "Dez anos: suporte de ERP, backend, fullstack, e agora liderança técnica de uma plataforma de IA.",
  es: "Diez años: soporte de ERP, backend, full-stack, y ahora liderazgo técnico de una plataforma de IA.",
};

export function Experience() {
  const { language } = useLanguage();
  const { experience } = getContent(language);

  return (
    <section className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="experience-title">
      <SectionHeading eyebrow={EYEBROW[language]} id="experience-title" />
      <p className="body-text mb-8 max-w-[60ch] text-sm md:text-[15px]">{ARC[language]}</p>
      <ol className="space-y-8">
        {experience.map((job) => (
          <li key={job.company + job.period} className="grid gap-1 md:grid-cols-[160px_1fr] md:gap-8">
            <p className="eyebrow md:pt-1">{job.period}</p>
            <div>
              <h3 className="display text-base">{job.role}</h3>
              <p className="mt-1 text-sm font-medium text-[color:var(--ink)]">{job.company}</p>
              <p className="body-text mt-2 max-w-[64ch] text-sm">{job.impact}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
