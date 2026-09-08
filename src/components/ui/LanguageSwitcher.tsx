"use client";

import type { Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";

const LANGS: Lang[] = ["en", "pt", "es"];

// Rótulo do grupo de botões de idioma. UI chrome, não conteúdo do CV —
// não pertence a src/content/ (esse layer é das Tasks 3-4).
const LANGUAGE_GROUP_LABEL: Record<Lang, string> = {
  en: "Language",
  pt: "Idioma",
  es: "Idioma",
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1" role="group" aria-label={LANGUAGE_GROUP_LABEL[language]}>
      {LANGS.map((lang) => {
        const active = lang === language;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className={`eyebrow min-h-11 min-w-11 rounded px-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)] ${
              active
                ? "text-[color:var(--ink)] underline decoration-2 underline-offset-4"
                : "hover:text-[color:var(--ink)]"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
