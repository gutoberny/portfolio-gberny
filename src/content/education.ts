import type { LanguageSkill, Localized, Study } from "./types";

export const education: Localized<Study[]> = {
  en: [
    { course: "BSc in Data Science", institution: "Unopar", status: "In progress" },
    { course: "Technical Degree in Information Technology", institution: "UNISC, Santa Cruz do Sul, Brazil", status: "Completed" },
  ],
  pt: [
    { course: "Ciência de Dados", institution: "Unopar", status: "Em andamento" },
    { course: "Técnico em Informática", institution: "UNISC, Santa Cruz do Sul", status: "Concluído" },
  ],
  es: [
    { course: "Grado en Ciencia de Datos", institution: "Unopar", status: "En curso" },
    { course: "Técnico en Informática", institution: "UNISC, Santa Cruz do Sul, Brasil", status: "Completado" },
  ],
};

export const languages: Localized<LanguageSkill[]> = {
  en: [
    { name: "English", level: "Advanced — fluent in professional and technical settings" },
    { name: "Portuguese", level: "Native" },
  ],
  pt: [
    { name: "Inglês", level: "Avançado — comunicação fluida em contextos profissionais e técnicos" },
    { name: "Português", level: "Nativo" },
  ],
  es: [
    { name: "Inglés", level: "Avanzado — comunicación fluida en contextos profesionales y técnicos" },
    { name: "Portugués", level: "Nativo" },
  ],
};
