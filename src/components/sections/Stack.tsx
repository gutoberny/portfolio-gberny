"use client";

import { getContent, type Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EYEBROW: Record<Lang, string> = { en: "Stack", pt: "Stack", es: "Stack" };

export function Stack() {
  const { language } = useLanguage();
  const { stack } = getContent(language);

  return (
    <section className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="stack-title">
      <SectionHeading eyebrow={EYEBROW[language]} id="stack-title" />
      <div className="grid gap-7 md:grid-cols-2 md:gap-x-12">
        {stack.map((group) => (
          <div key={group.title}>
            <h3 className="eyebrow text-[color:var(--ink)]">{group.title}</h3>
            <p className="body-text mt-2 text-sm">{group.items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
