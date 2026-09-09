"use client";

import type { Lang } from "@/content";
import { useLanguage } from "@/context/LanguageContext";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AgentTerminal } from "./AgentTerminal";

const BAR: Record<Lang, string> = {
  en: "> ask my agent about my work_",
  pt: "> pergunte ao meu agente sobre meu trabalho_",
  es: "> pregunta a mi agente sobre mi trabajo_",
};

const CLOSE: Record<Lang, string> = { en: "Close", pt: "Fechar", es: "Cerrar" };

const DIALOG_LABEL: Record<Lang, string> = {
  en: "Ask my agent",
  pt: "Pergunte ao meu agente",
  es: "Pregunta a mi agente",
};

export function AgentSheet() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      // Armadilha de foco: sem isso o Tab vaza para a página atrás da folha.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("input")?.focus();
    const opener = openerRef.current;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        data-gate="agent"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="fixed inset-x-3 bottom-3 z-40 flex min-h-11 items-center justify-between rounded-lg bg-[color:var(--term-bg)] px-3 py-2 shadow-lg md:hidden"
      >
        <span className="eyebrow text-[color:var(--term-fg)]">{BAR[language]}</span>
        <span className="eyebrow text-[color:var(--term-ok)]">●</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={DIALOG_LABEL[language]}
          className="fixed inset-0 z-50 flex flex-col bg-[color:var(--term-bg)] md:hidden"
          ref={panelRef}
        >
          <div className="flex items-center justify-end p-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex min-h-11 min-w-11 items-center justify-center text-[color:var(--term-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--term-q)]"
            >
              <X size={18} aria-hidden="true" />
              <span className="sr-only">{CLOSE[language]}</span>
            </button>
          </div>
          <AgentTerminal className="flex-1 rounded-none" />
        </div>
      ) : null}
    </>
  );
}
