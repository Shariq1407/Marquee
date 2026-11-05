"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Renders a TMDB poster. If the remote image fails to load we hide it so the
 * parent's cinematic gradient fallback shows through instead of a broken img.
 */
export default function PosterImage({
  src,
  alt,
  sizes = "(max-width: 768px) 50vw, 25vw",
  className = "",
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
