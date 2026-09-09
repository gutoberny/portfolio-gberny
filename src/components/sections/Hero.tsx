"use client";

import { getContent } from "@/content";
import type { Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { AgentSheet } from "@/components/ui/AgentSheet";
import { AgentTerminal } from "@/components/ui/AgentTerminal";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MetricStrip } from "@/components/ui/MetricStrip";
import { Portrait } from "@/components/ui/Portrait";
import type { ReactNode } from "react";

// Rótulo do <nav> de links de contato. UI chrome, não conteúdo do CV —
// não pertence a src/content/ (esse layer é das Tasks 3-4).
const LINKS_NAV_LABEL: Record<Lang, string> = {
  en: "Links",
  pt: "Links",
  es: "Enlaces",
};

export function Hero({ agentSlot }: { agentSlot?: ReactNode }) {
  const { language } = useLanguage();
  const { profile, heroMetrics } = getContent(language);

  return (
    <header className="shell pt-8 pb-10 md:pt-14">
      {/* No mobile o switcher ganha linha própria: em conjunto com foto e
          disponibilidade na coluna direita ele espremia o eyebrow em 3
          linhas. No desktop ele volta para a coluna direita, junto da foto
          — composição 6 aprovada, sem alteração. */}
      <div className="flex justify-end md:hidden">
        <LanguageSwitcher />
      </div>

      {/* Linha de identidade: eyebrow + nome à esquerda, foto pequena e
          disponibilidade à direita — composição 6 aprovada. */}
      <div className="mt-2 flex items-start justify-between gap-5 md:mt-0">
        <div>
          <p data-gate="role" className="eyebrow max-w-[30ch] md:max-w-none">
            {profile.eyebrow}
          </p>
          <h1 data-gate="name" className="display mt-3 text-[23px] md:text-[30px]">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--body)] md:text-base">{profile.tagline}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Portrait src={profile.photo?.src} alt={profile.photo?.alt ?? profile.name} size={40} />
          <p className="eyebrow max-w-[120px] text-right md:max-w-none">{profile.availability}</p>
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
          <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-1" aria-label={LINKS_NAV_LABEL[language]}>
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-gate={l.kind === "cv" ? "cv" : undefined}
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
        </div>

        <div>
          {agentSlot ?? (
            <>
              {/* Desktop: terminal aberto no hero. Mobile: barra + folha. */}
              <AgentTerminal className="hidden md:flex" />
              <AgentSheet />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
