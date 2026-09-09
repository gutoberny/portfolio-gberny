import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://gustavoberny.com", priority: 1 },
    { url: "https://gustavoberny.com/work/agents-ia", priority: 0.8 },
  ];
}
