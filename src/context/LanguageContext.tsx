"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  // Simple translations map
  const translations: Record<Language, Record<string, string>> = {
    pt: {
      'nav.projects': 'Projetos',
      'nav.about': 'Sobre',
      'nav.contact': 'Contato',
      'hero.role': 'Software Engineer & AI Specialist',
      'project.view': 'Ver Projeto',
    },
    en: {
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.role': 'Software Engineer & AI Specialist',
      'project.view': 'View Project',
    },
    es: {
      'nav.projects': 'Proyectos',
      'nav.about': 'Sobre Mí',
      'nav.contact': 'Contacto',
      'hero.role': 'Ingeniero de Software y Especialista en IA',
      'project.view': 'Ver Proyecto',
    }
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
