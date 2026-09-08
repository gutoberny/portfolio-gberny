"use client";

import type { Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";

const LANGS: Lang[] = ["en", "pt", "es"];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
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
