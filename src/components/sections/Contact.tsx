"use client";

import { getContent } from "@/content";
import { useLanguage } from "@/context/LanguageContext";

const COPY: Record<string, { eyebrow: string; title: string }> = {
  en: { eyebrow: "Contact", title: "Open to remote roles in AI engineering." },
  pt: { eyebrow: "Contato", title: "Aberto a vagas remotas em engenharia de IA." },
  es: { eyebrow: "Contacto", title: "Disponible para vacantes remotas en ingeniería de IA." },
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
      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-1" aria-label="Contact links">
        {profile.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.kind === "email" ? undefined : "_blank"}
            rel={l.kind === "email" ? undefined : "noopener noreferrer"}
            className="eyebrow inline-flex min-h-11 min-w-11 items-center justify-center border-b border-[color:var(--rule)] px-1.5 text-[color:var(--body)] transition-colors hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
