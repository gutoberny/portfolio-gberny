"use client";

import Image from "next/image";
import { useState } from "react";

export function Portrait({
  src,
  alt,
  size = 40,
  className = "",
}: {
  /** Ausente quando o dono do site ainda não forneceu uma foto — nesse caso
   * o monograma é renderizado direto, sem <Image>, sem preload e sem
   * requisição que vai dar 404. Para religar uma foto real: adicione
   * `photo: { src, alt }` de volta em `src/content/profile.ts` (os três
   * idiomas) e coloque o arquivo em `public/`. Nenhuma mudança aqui é
   * necessária — o componente volta a renderizar `<Image>` sozinho. */
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ width: size, height: size }}
        className={`flex items-center justify-center rounded-full bg-[color:var(--rule)] ${className}`}
      >
        <span className="eyebrow text-[8px]">GB</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
