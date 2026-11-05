import { Check, Play, ChevronLeft, MoreHorizontal } from "lucide-react";
import { byId, severanceSeasons } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import ScreenShell from "./ScreenShell";

/** A series detail screen focused on season-by-season episode tracking. */
export default function EpisodesScreen() {
  const show = byId("severance");
  const season = severanceSeasons[0];
  const watchedCount = season.episodes.filter((e) => e.watched).length;
  const pct = Math.round((watchedCount / season.episodes.length) * 100);

  return (
    <ScreenShell tabBar={false}>
      <div className="-mx-5 flex h-full flex-col">
        {/* Backdrop header */}
        <div className="relative shrink-0">
          <div
            className="relative h-32 w-full"
            style={{
              backgroundImage: `linear-gradient(140deg, ${show.tint[0]}, ${show.tint[1]})`,
            }}
          >
            <PosterImage
              src={show.poster}
              alt={show.name}
              sizes="260px"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/50 to-transparent" />
            <div className="absolute inset-x-0 top-9 flex items-center justify-between px-4">
              <ChevronLeft className="h-4.5 w-4.5 text-white/90" />
              <MoreHorizontal className="h-4.5 w-4.5 text-white/90" />
            </div>
          </div>

          <div className="-mt-10 flex items-end gap-3 px-5">
            <div
              className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg border border-white/15 shadow-xl"
              style={{
                backgroundImage: `linear-gradient(150deg, ${show.tint[0]}, ${show.tint[1]})`,
              }}
            >
              <PosterImage src={show.poster} alt={show.name} sizes="80px" />
            </div>
            <div className="pb-1">
              <p className="text-[15px] font-semibold leading-tight text-white">
                {show.name}
              </p>
              <p className="mt-0.5 text-[9px] text-white/55">
                {show.year} · {show.genre} · TV-MA
              </p>
            </div>
          </div>
        </div>

        {/* Progress summary */}
        <div className="mt-3 px-5">
          <div className="flex items-center justify-between text-[9px] text-white/60">
            <span>
              {watchedCount} of {season.episodes.length} watched
            </span>
            <span className="font-semibold text-accent">{pct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/12">
            <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Season chips */}
        <div className="mt-3 flex gap-1.5 px-5">
          {["Season 1", "Season 2", "Specials"].map((s, i) => (
            <span
              key={s}
              className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${
                i === 0
                  ? "bg-accent text-accent-foreground"
                  : "bg-white/8 text-white/60"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Episode list */}
        <div className="mt-3 min-h-0 flex-1 overflow-hidden px-5">
          <div className="space-y-1.5">
            {season.episodes.map((ep) => (
              <div
                key={ep.id}
                className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.03] p-1.5"
              >
                <div className="relative grid h-11 w-16 shrink-0 place-items-center overflow-hidden rounded-md bg-neutral-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
                  <span className="relative text-[9px] font-semibold text-white/70">
                    E{ep.index}
                  </span>
                  {ep.watched ? (
                    <span className="absolute bottom-1 right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-accent">
                      <Check className="h-2 w-2 text-black" strokeWidth={3.5} />
                    </span>
                  ) : (
                    <span className="absolute bottom-1 right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-black/60">
                      <Play className="h-2 w-2 fill-white text-white" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium text-white">
                    {ep.title}
                  </p>
                  <p className="text-[9px] text-white/45">{ep.runtime}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Mark episode ${ep.index} watched`}
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${
                    ep.watched
                      ? "border-accent/40 bg-accent/15"
                      : "border-white/15 bg-white/5"
                  }`}
                >
                  <Check
                    className={`h-3.5 w-3.5 ${
                      ep.watched ? "text-accent" : "text-white/40"
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
