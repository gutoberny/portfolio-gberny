"use client";

import { getContent } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EYEBROW: Record<string, string> = {
  en: "How I work",
  pt: "Como eu trabalho",
  es: "Cómo trabajo",
};

export function HowIWork() {
  const { language } = useLanguage();
  const { howIWork } = getContent(language);

  return (
    <section className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="how-title">
      <SectionHeading eyebrow={EYEBROW[language]} id="how-title" />
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {howIWork.map((pillar) => (
          <div key={pillar.title}>
            <h3 className="display text-base md:text-lg">{pillar.title}</h3>
            <p className="body-text mt-3 text-sm">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
