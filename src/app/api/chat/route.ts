import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { CV } from '@/data/cv';
import rateLimit from '@/lib/rate-limit';
import { headers } from 'next/headers';

// Rate limiter: 20 requests per day per IP
const limiter = rateLimit({
  interval: 24 * 60 * 60 * 1000, // 24h
  uniqueTokenPerInterval: 500, // Max 500 users per second unique logic
});

export const maxDuration = 30;

export async function POST(req: Request) {
  // 1. Rate Limiting Logic
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const isRateLimited = limiter.isRateLimited(ip, 20); // 20 messages limit

  if (isRateLimited) {
    return new Response("Daily rate limit exceeded. Please try again tomorrow.", { status: 429 });
  }

  const { messages, language = 'pt' } = await req.json();

  // 2. Context Injection
  const cvData = CV[language as keyof typeof CV] || CV.pt;
  
    const systemPrompt = `
    You are Gustavo AI, a strategic digital partner of Gustavo Berny. Always call him by his nickname "Berny".
    
    GOAL: Promote Gustavo's expertise ("Sell the fish") in a professional, confident, but not pushy way.
    Highlight his Seniority, Strategic Vision (Product Owner background), and technical depth (Node.js, React, AI implementation).
    
    TONE: Confident, Concise, Professional, and Result-Oriented.
    LANGUAGE: Respond STRICTLY in ${language === 'pt' ? 'Portuguese' : language === 'es' ? 'Spanish' : 'English'}.

    CONTEXT (Gustavo's Resume):
    ${JSON.stringify(cvData, null, 2)}

    RULES:
    - Answers must be SHORT and IMPACTFUL (Max 2-3 sentences).
    - If asked about Languages, refer to the "languages" section in context.
    - If asked about something not in context, politely redirect to contact him directly.
    - Focus on VALUE delivered (e.g., "Scaled to 4M+ transactions", "Led AI division").
  `;

  // 3. AI Stream
  const result = await streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
  });

  // Return raw text stream to bypass helper method issues
  return new Response(result.textStream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
