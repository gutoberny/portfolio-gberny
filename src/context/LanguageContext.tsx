"use client";

import type { Lang } from "@/content";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "gb.lang";
const SUPPORTED: Lang[] = ["en", "pt", "es"];

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inglês é o padrão: o público-alvo do site é recrutador internacional.
  const [language, setLanguageState] = useState<Lang>("en");

  // Restaura a escolha anterior depois da hidratação. Ler localStorage no
  // primeiro render causaria divergência entre servidor e cliente.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved as Lang)) {
        setLanguageState(saved as Lang);
      }
    } catch {
      // localStorage bloqueado (aba privada, política do navegador): fica em inglês.
    }
  }, []);

  // Mantém <html lang> em sincronia com o conteúdo exibido, para leitor de
  // tela e para tradução automática do navegador.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Lang) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // sem persistência é aceitável; a troca vale para a sessão.
    }
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
