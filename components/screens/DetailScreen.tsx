import { ChevronLeft, Play, Plus, Star, Share2 } from "lucide-react";
import { byId } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import ScreenShell from "./ScreenShell";

const CAST = ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"];
const STREAMING = ["Max", "Apple TV", "Prime Video"];

/** A detailed movie screen: artwork, meta, cast, trailer and availability. */
export default function DetailScreen() {
  const m = byId("dune-2");

  return (
    <ScreenShell tabBar={false}>
      <div className="-mx-5 flex h-full flex-col">
        {/* Backdrop */}
        <div className="relative shrink-0">
          <div
            className="relative h-44 w-full"
            style={{
              backgroundImage: `linear-gradient(140deg, ${m.tint[0]}, ${m.tint[1]})`,
            }}
          >
            <PosterImage
              src={m.poster}
              alt={m.name}
              sizes="260px"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/40 to-black/30" />
            <div className="absolute inset-x-0 top-9 flex items-center justify-between px-4">
              <ChevronLeft className="h-4.5 w-4.5 text-white/90" />
              <Share2 className="h-4 w-4 text-white/90" />
            </div>
            {/* Trailer play */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/40 backdrop-blur">
                <Play className="h-4 w-4 fill-white text-white" />
              </div>
            </div>
          </div>

          {/* Title block */}
          <div className="-mt-8 px-5">
            <p className="text-[18px] font-bold leading-tight text-white">{m.name}</p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[9px] text-white/60">
              <span>{m.year}</span>
              <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-white/30" />
              <span>{m.runtime}</span>
              <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-white/30" />
              <span className="rounded border border-white/20 px-1">PG-13</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5">{m.genre}</span>
            </div>

            {/* Rating + actions */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="text-[11px] font-bold text-white">
                  {m.rating.toFixed(1)}
                </span>
                <span className="text-[8px] text-white/40">/10</span>
              </div>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-accent py-2 text-[10px] font-semibold text-accent-foreground"
              >
                <Plus className="h-3 w-3" strokeWidth={3} />
                Add to watchlist
              </button>
              <button
                type="button"
                aria-label="Mark watched"
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/5"
              >
                <Play className="h-3 w-3 fill-white text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-4 px-5">
          <p className="text-[9.5px] leading-relaxed text-white/65">
            Paul Atreides unites with Chani and the Fremen while seeking revenge
            against the conspirators who destroyed his family.
          </p>
        </div>

        {/* Cast */}
        <p className="mt-4 px-5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
          Cast
        </p>
        <div className="flex gap-2 px-5">
          {CAST.map((c, i) => (
            <div key={c} className="flex w-14 flex-col items-center gap-1">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800" />
              <p className="text-center text-[7px] leading-tight text-white/55">
                {c.split(" ")[0]}
              </p>
              {i === 0 && (
                <span className="text-[6.5px] text-accent">Lead</span>
              )}
            </div>
          ))}
        </div>

        {/* Streaming */}
        <p className="mt-4 px-5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
          Where to watch
        </p>
        <div className="flex gap-1.5 px-5">
          {STREAMING.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[8.5px] text-white/70"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="h-4" />
      </div>
    </ScreenShell>
  );
}
