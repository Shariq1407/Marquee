import { Star } from "lucide-react";
import type { Title } from "@/lib/data";
import PosterImage from "./PosterImage";

type Props = {
  title: Title;
  priority?: boolean;
  sizes?: string;
  showMeta?: boolean;
  className?: string;
};

/**
 * A movie/series poster tile. Always paints a per-title cinematic gradient
 * behind the artwork so a failed load degrades gracefully rather than breaking.
 */
export default function Poster({
  title,
  priority = false,
  sizes = "(max-width: 768px) 45vw, 22vw",
  showMeta = false,
  className = "",
}: Props) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900 ${className}`}
    >
      {/* Gradient fallback (also the loading placeholder) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(150deg, ${title.tint[0]} 0%, ${title.tint[1]} 100%)`,
        }}
      />

      <PosterImage
        src={title.poster}
        alt={`${title.name} poster`}
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Bottom scrim for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
      />

      {showMeta && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5">
          <p className="truncate text-[11px] font-semibold leading-tight text-white">
            {title.name}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/70">
            <span>{title.year}</span>
            <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-white/40" />
            <span className="flex items-center gap-0.5 text-accent">
              <Star className="h-2.5 w-2.5 fill-current" />
              {title.rating.toFixed(1)}
            </span>
          </div>
        </figcaption>
      )}
    </figure>
  );
}
