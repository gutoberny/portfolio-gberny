import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gustavoberny.com"),
  title: "Gustavo Berny — Senior Software Engineer · Applied AI & Agents",
  description:
    "Lead developer and architect of a multi-tenant AI agent platform in production: 6,570 of 7,725 conversations (85%) resolved end-to-end by AI in Aug/2026, ~153k messages a month, $0.12 per completed conversation.",
  openGraph: {
    type: "website",
    title: "Gustavo Berny — Senior Software Engineer · Applied AI & Agents",
    description:
      "AI agents, RAG and LLM orchestration in production. 6,570 of 7,725 conversations (85%) resolved without human intervention in Aug/2026.",
    url: "https://gustavoberny.com",
    siteName: "Gustavo Berny",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Berny — Senior Software Engineer · Applied AI & Agents",
    description:
      "AI agents, RAG and LLM orchestration in production. 6,570 of 7,725 conversations (85%) resolved without human intervention in Aug/2026.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable} min-h-screen selection:bg-[color:var(--ink)] selection:text-[color:var(--paper)]`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
