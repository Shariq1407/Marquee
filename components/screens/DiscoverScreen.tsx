import { Search, Sparkles, SlidersHorizontal } from "lucide-react";
import { allTitles } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import ScreenShell from "./ScreenShell";

function Poster({ id, className }: { id: string; className?: string }) {
  const t = allTitles.find((x) => x.id === id)!;
  return (
    <div
      className={`relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 ${className}`}
      style={{
        backgroundImage: `linear-gradient(150deg, ${t.tint[0]}, ${t.tint[1]})`,
      }}
    >
      <PosterImage src={t.poster} alt={t.name} sizes="90px" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      <p className="absolute inset-x-0 bottom-1 truncate px-1 text-[8px] font-medium text-white">
        {t.name}
      </p>
    </div>
  );
}

const MOODS = ["Epic", "Cozy", "Mind-bending", "Feel-good", "Dark"];

/** Smart discovery: search, AI mood prompt and a curated poster grid. */
export default function DiscoverScreen() {
  const grid = ["dune-2", "poor-things", "shogun", "br2049", "eeaaoo", "the-bear"];

  return (
    <ScreenShell title="Discover" activeTab="search">
      {/* Search field */}
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2">
        <Search className="h-3.5 w-3.5 text-white/40" />
        <span className="text-[11px] text-white/40">Movies, shows, people…</span>
        <SlidersHorizontal className="ml-auto h-3.5 w-3.5 text-white/40" />
      </div>

      {/* AI assistant card */}
      <div className="mt-3 rounded-xl border border-accent/25 bg-gradient-to-br from-accent/15 to-transparent p-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">
            Just ask
          </p>
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-white/85">
          “A smart sci-fi film under two hours for a weeknight.”
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {MOODS.map((m) => (
            <span
              key={m}
              className="rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[8.5px] text-white/70"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
        Recommended for you
      </p>

      <div className="grid grid-cols-3 gap-2">
        {grid.map((id) => (
          <Poster key={id} id={id} />
        ))}
      </div>
      <div className="h-3" />
    </ScreenShell>
  );
}
