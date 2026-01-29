import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Gustavo Berny | Software Engineer",
  description: "Minimalist Portfolio - AI Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} font-mono antialiased selection:bg-black selection:text-white min-h-screen`}
      >
        <LanguageProvider>
            {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
