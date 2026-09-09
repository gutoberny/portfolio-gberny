"use client";

import { agentOpening, agentSuggestions, type AgentExchange } from "@/content/agentFallback";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

interface Line {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const PLACEHOLDER: Record<string, string> = {
  en: "Ask anything about my work…",
  pt: "Pergunte qualquer coisa sobre meu trabalho…",
  es: "Pregunta lo que quieras sobre mi trabajo…",
};

const OFFLINE_NOTE: Record<string, string> = {
  en: "The live agent is unavailable right now — showing pre-written answers.",
  pt: "O agente ao vivo está indisponível — exibindo respostas pré-escritas.",
  es: "El agente en vivo no está disponible — mostrando respuestas pre-escritas.",
};

export function AgentTerminal({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const opening = agentOpening[language];
  const suggestions = agentSuggestions[language];

  const [lines, setLines] = useState<Line[]>([
    { id: "q0", role: "user", content: opening.question },
    { id: "a0", role: "assistant", content: opening.answer },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [degraded, setDegraded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Trocar de idioma reinicia a conversa, senão a abertura fica órfã.
  useEffect(() => {
    setLines([
      { id: "q0", role: "user", content: opening.question },
      { id: "a0", role: "assistant", content: opening.answer },
    ]);
  }, [opening.question, opening.answer]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, busy]);

  /** Fallback: se a pergunta é uma das sugeridas, responde do conteúdo local. */
  const localAnswer = (question: string): string => {
    const match: AgentExchange | undefined = suggestions.find(
      (s) => s.question.toLowerCase() === question.toLowerCase()
    );
    return match ? match.answer : opening.answer;
  };

  const send = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;

    const userLine: Line = { id: `q${Date.now()}`, role: "user", content: q };
    const history = [...lines, userLine];
    setLines(history);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((l) => ({ role: l.role, content: l.content })),
          language,
        }),
      });

      if (!res.ok || !res.body) throw new Error(`status ${res.status}`);

      const id = `a${Date.now()}`;
      setLines((prev) => [...prev, { id, role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setLines((prev) => prev.map((l) => (l.id === id ? { ...l, content: text } : l)));
      }
    } catch {
      // Requisito de release: nunca mostrar erro cru ao visitante.
      setDegraded(true);
      setLines((prev) => [
        ...prev,
        { id: `a${Date.now()}`, role: "assistant", content: localAnswer(q) },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      data-gate="agent"
      className={`flex flex-col rounded-lg bg-[color:var(--term-bg)] p-3 font-mono ${className}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="eyebrow text-[color:var(--term-fg)]">ask my agent</span>
        <span className="eyebrow" style={{ color: degraded ? "var(--muted)" : "var(--term-ok)" }}>
          {degraded ? "offline" : "● online"}
        </span>
      </div>

      {/* Decisão do plano: sem teto no mobile (a folha ocupa a tela inteira);
          teto de 16rem só a partir de md, onde o terminal fica compacto no hero. */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex-1 min-h-0 space-y-2 overflow-y-auto text-[13px] leading-relaxed md:max-h-64"
      >
        {lines.map((l) => (
          <p key={l.id} className="break-words">
            {l.role === "user" ? (
              <span className="text-[color:var(--term-q)]">&gt; {l.content}</span>
            ) : (
              <span className="text-[color:var(--term-fg)]">{l.content}</span>
            )}
          </p>
        ))}
        {busy ? <p className="text-[color:var(--term-ok)]">▍</p> : null}
      </div>

      {degraded ? (
        <p className="eyebrow mt-2 text-[color:var(--muted)]">{OFFLINE_NOTE[language]}</p>
      ) : null}

      <div className="mt-2 flex flex-wrap gap-1.5">
        {suggestions.map((s) => (
          <button
            key={s.question}
            type="button"
            onClick={() => send(s.question)}
            disabled={busy}
            className="min-h-11 rounded-full border border-white/10 px-3 text-[11px] text-[color:var(--term-fg)] transition-colors hover:border-white/30 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--term-q)]"
          >
            {s.question}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2"
      >
        <label htmlFor="agent-input" className="sr-only">
          {PLACEHOLDER[language]}
        </label>
        <input
          id="agent-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={PLACEHOLDER[language]}
          autoComplete="off"
          className="min-h-11 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[color:var(--muted)]"
        />
        <button
          type="submit"
          disabled={busy}
          className="eyebrow min-h-11 min-w-11 text-[color:var(--term-ok)] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--term-q)]"
        >
          send
        </button>
      </form>
    </div>
  );
}
