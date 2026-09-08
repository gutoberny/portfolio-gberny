import type { Localized, Metric } from "./types";

export const heroMetrics: Localized<Metric[]> = {
  en: [
    { value: "85%", label: "resolved autonomously", detail: "6,570 of 7,725 conversations closed in Aug/2026" },
    { value: "4.7s", label: "median first response", detail: "down from 2m39s (−97%), across 61k Q&A pairs" },
    { value: "153k", label: "messages per month", detail: "~7.8k conversations · 24× growth in 4 months" },
    { value: "$0.12", label: "cost per conversation", detail: "810M tokens/month, tracked per tenant and model" },
  ],
  pt: [
    { value: "85%", label: "resolvidos sem humano", detail: "6.570 de 7.725 atendimentos encerrados em ago/2026" },
    { value: "4,7s", label: "1ª resposta (mediana)", detail: "de 2min39 (−97%), sobre 61 mil pares pergunta-resposta" },
    { value: "153k", label: "mensagens por mês", detail: "~7,8 mil atendimentos · 24× em 4 meses" },
    { value: "US$ 0,12", label: "custo por atendimento", detail: "810 milhões de tokens/mês, por tenant e por modelo" },
  ],
  es: [
    { value: "85%", label: "resueltos sin humano", detail: "6.570 de 7.725 conversaciones cerradas en ago/2026" },
    { value: "4,7s", label: "1ª respuesta (mediana)", detail: "desde 2min39 (−97%), sobre 61 mil pares pregunta-respuesta" },
    { value: "153k", label: "mensajes por mes", detail: "~7,8 mil conversaciones · 24× en 4 meses" },
    { value: "US$ 0,12", label: "coste por conversación", detail: "810 millones de tokens/mes, por tenant y modelo" },
  ],
};
