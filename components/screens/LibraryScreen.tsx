"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { movies, series } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import ScreenShell from "./ScreenShell";

const FILTERS = ["All", "Watchlist", "Watching", "Watched"] as const;

function Poster({ id }: { id: string }) {
  const t = [...movies, ...series].find((x) => x.id === id)!;
  return (
    <div
      className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10"
      style={{
        backgroundImage: `linear-gradient(150deg, ${t.tint[0]}, ${t.tint[1]})`,
      }}
    >
      <PosterImage src={t.poster} alt={t.name} sizes="90px" />
    </div>
  );
}

/** Personal library / watchlist organised into filterable categories. */
export default function LibraryScreen() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const watchlist = [
    "dune-2", "hotd", "andor", "the-boys", "interstellar",
    "mandalorian", "br2049", "top-gun", "poor-things", "fallout",
  ];

  return (
    <ScreenShell title="Library" activeTab="list">
      {/* Filter chips */}
      <div className="flex gap-1.5 pb-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-2.5 py-1 text-[9px] font-medium transition-colors ${
              filter === f
                ? "bg-accent text-accent-foreground"
                : "bg-white/8 text-white/60"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Progress summary */}
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] p-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15">
          <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />
        </span>
        <div className="flex-1">
          <p className="text-[10px] font-medium text-white">2 titles finished</p>
          <p className="text-[8px] text-white/45">this month</p>
        </div>
        <span className="text-[9px] font-semibold text-accent">+6 this year</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {watchlist.map((id) => (
          <Poster key={id} id={id} />
        ))}
      </div>
      <div className="h-3" />
    </ScreenShell>
  );
}
