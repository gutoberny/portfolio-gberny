"use client";

import { getContent } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MetricStrip } from "@/components/ui/MetricStrip";
import { Portrait } from "@/components/ui/Portrait";
import type { ReactNode } from "react";

export function Hero({ agentSlot }: { agentSlot?: ReactNode }) {
  const { language } = useLanguage();
  const { profile, heroMetrics } = getContent(language);

  return (
    <header className="shell pt-8 pb-10 md:pt-14">
      {/* Linha de identidade: eyebrow + nome à esquerda, foto pequena e
          disponibilidade à direita — composição 6 aprovada. */}
      <div className="flex items-start justify-between gap-5">
        <div>
          <p data-gate="role" className="eyebrow max-w-[22ch] md:max-w-none">
            {profile.eyebrow}
          </p>
          <h1 data-gate="name" className="display mt-3 text-[23px] md:text-[30px]">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--body)] md:text-base">{profile.tagline}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <LanguageSwitcher />
          <Portrait src={profile.photo.src} alt={profile.photo.alt} size={40} />
          <p className="eyebrow text-right">{profile.availability}</p>
        </div>
      </div>

      {/* A prova vem antes de qualquer prosa. */}
      <div className="mt-6 md:mt-8">
        <MetricStrip metrics={heroMetrics} />
      </div>

      <div className="mt-7 grid gap-8 md:mt-8 md:grid-cols-[1fr_1.15fr] md:gap-10">
        <div>
          {profile.pitch.map((p) => (
            <p key={p} className="body-text mb-3 max-w-[42ch] text-sm md:text-[15px]">
              {p}
            </p>
          ))}
          <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-1" aria-label="Links">
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-gate={l.kind === "cv" ? "cv" : undefined}
                target={l.kind === "email" ? undefined : "_blank"}
                rel={l.kind === "email" ? undefined : "noopener noreferrer"}
                className="eyebrow inline-flex min-h-11 min-w-11 -mx-2 items-center justify-center border-b border-[color:var(--rule)] px-2 text-[color:var(--body)] transition-colors hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Terminal do agente. Vazio até a Task 9. */}
        <div>{agentSlot}</div>
      </div>
    </header>
  );
}
