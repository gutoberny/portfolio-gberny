"use client";

import { getContent, type Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EYEBROW: Record<Lang, string> = {
  en: "Experience",
  pt: "Experiência",
  es: "Experiencia",
};

export function Experience() {
  const { language } = useLanguage();
  const { experience } = getContent(language);

  return (
    <section className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="experience-title">
      <SectionHeading eyebrow={EYEBROW[language]} id="experience-title" />
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
