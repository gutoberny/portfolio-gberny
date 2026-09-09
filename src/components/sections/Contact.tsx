"use client";

import { getContent } from "@/content";
import type { Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";

const COPY: Record<Lang, { eyebrow: string; title: string }> = {
  en: { eyebrow: "Contact", title: "Open to remote roles in AI engineering." },
  pt: { eyebrow: "Contato", title: "Aberto a vagas remotas em engenharia de IA." },
  es: { eyebrow: "Contacto", title: "Disponible para vacantes remotas en ingeniería de IA." },
};

// Rótulo do <nav> de links de contato. UI chrome, não conteúdo do CV —
// não pertence a src/content/ (esse layer é das Tasks 3-4).
const LINKS_NAV_LABEL: Record<Lang, string> = {
  en: "Contact links",
  pt: "Links de contato",
  es: "Enlaces de contacto",
};

export function Contact() {
  const { language } = useLanguage();
  const { profile } = getContent(language);
  const copy = COPY[language];

  return (
    <footer className="shell border-t border-[color:var(--rule)] py-12 md:py-16" aria-labelledby="contact-title">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 id="contact-title" className="display mt-3 max-w-[28ch] text-2xl md:text-[28px]">
        {copy.title}
      </h2>
      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-1" aria-label={LINKS_NAV_LABEL[language]}>
        {profile.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.kind === "email" ? undefined : "_blank"}
            rel={l.kind === "email" ? undefined : "noopener noreferrer"}
            className="group inline-flex min-h-11 min-w-11 -mx-2 items-center justify-center px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
          >
            {/* Sublinhado no span, dimensionado ao texto — o alvo de
                toque de 44px fica no <a>, sem esticar a régua. */}
            <span className="eyebrow border-b border-[color:var(--rule)] text-[color:var(--body)] transition-colors group-hover:border-[color:var(--ink)] group-hover:text-[color:var(--ink)]">
              {l.label}
            </span>
          </a>
        ))}
      </nav>
    </footer>
  );
}
