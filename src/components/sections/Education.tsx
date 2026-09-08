"use client";

import { getContent } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LABELS: Record<string, { eyebrow: string; languages: string }> = {
  en: { eyebrow: "Education", languages: "Languages" },
  pt: { eyebrow: "Formação", languages: "Idiomas" },
  es: { eyebrow: "Formación", languages: "Idiomas" },
};

export function Education() {
  const { language } = useLanguage();
  const { education, languages } = getContent(language);
  const labels = LABELS[language];

  return (
    <section className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="education-title">
      <SectionHeading eyebrow={labels.eyebrow} id="education-title" />
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ul className="space-y-4">
          {education.map((study) => (
            <li key={study.course}>
              <p className="text-sm font-medium text-[color:var(--ink)]">{study.course}</p>
              <p className="body-text text-sm">
                {study.institution} · {study.status}
              </p>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="eyebrow text-[color:var(--ink)]">{labels.languages}</h3>
          <ul className="mt-2 space-y-2">
            {languages.map((l) => (
              <li key={l.name} className="body-text text-sm">
                <span className="font-medium text-[color:var(--ink)]">{l.name}</span> — {l.level}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
