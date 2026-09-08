"use client";

import Image from "next/image";
import { useState } from "react";

export function Portrait({
  src,
  alt,
  size = 40,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
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
      priority
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
