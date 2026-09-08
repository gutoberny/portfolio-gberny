"use client";

import type { Lang } from "@/content";
import React, { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

const STORAGE_KEY = "gb.lang";
const SUPPORTED: Lang[] = ["en", "pt", "es"];

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Conjunto de listeners para notificações de mudança de linguagem dentro da tab.
// Necessário porque o evento 'storage' não dispara na tab que fez a mudança.
const listeners: Set<() => void> = new Set();

// Lê localStorage com segurança, retornando a língua salva ou o padrão inglês.
// Ler localStorage no primeiro render causaria divergência entre servidor e cliente,
// então usamos useSyncExternalStore que sincroniza esse estado externo honestamente.
function getSnapshot(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved as Lang)) {
      return saved as Lang;
    }
  } catch {
    // localStorage bloqueado (aba privada, política do navegador): fica em inglês.
  }
  return "en";
}

// Servidor sempre renderiza em inglês. Garante que servidor e cliente concordam
// na primeira renderização, prevenindo divergência de hidratação.
function getServerSnapshot(): Lang {
  return "en";
}

// Inscreve-se para mudanças via event 'storage' (mudanças de outras abas)
// e retorna a função de desinscrição.
function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore lê localStorage sem causar divergência de hidratação.
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Mantém <html lang> em sincronia com o conteúdo exibido, para leitor de
  // tela e para tradução automática do navegador.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // sem persistência é aceitável; a troca vale para a sessão.
    }
    // Notifica listeners locais (outras tabs notificam via evento 'storage').
    listeners.forEach((listener) => listener());
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
