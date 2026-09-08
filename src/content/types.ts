export type Lang = "en" | "pt" | "es";

export type Localized<T> = Record<Lang, T>;

export interface Link {
  label: string;
  href: string;
  kind: "github" | "linkedin" | "email" | "cv";
}

export interface Profile {
  name: string;
  eyebrow: string;
  tagline: string;
  pitch: string[];
  availability: string;
  links: Link[];
  photo: { src: string; alt: string };
}

/** Um número do hero. `detail` carrega o denominador ou a data — nunca vazio. */
export interface Metric {
  value: string;
  label: string;
  detail: string;
}
