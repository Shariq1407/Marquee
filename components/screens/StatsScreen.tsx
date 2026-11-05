import { TrendingUp, Clock, Film, Star } from "lucide-react";
import ScreenShell from "./ScreenShell";

const BARS = [
  { m: "J", v: 42 },
  { m: "F", v: 58 },
  { m: "M", v: 35 },
  { m: "A", v: 72 },
  { m: "M", v: 64 },
  { m: "J", v: 88 },
  { m: "J", v: 51 },
  { m: "A", v: 76 },
  { m: "S", v: 60 },
  { m: "O", v: 94 },
  { m: "N", v: 47 },
  { m: "D", v: 68 },
];

const GENRES = [
  { g: "Sci-Fi", pct: 34, c: "#f19c29" },
  { g: "Drama", pct: 24, c: "#5b8def" },
  { g: "Thriller", pct: 18, c: "#9d6bdf" },
  { g: "Comedy", pct: 14, c: "#3fb27f" },
  { g: "Action", pct: 10, c: "#e05f5f" },
];

function StatCard({
  Icon,
  value,
  label,
}: {
  Icon: typeof Clock;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
      <Icon className="h-3.5 w-3.5 text-accent" />
      <p className="mt-1 text-[14px] font-bold leading-none text-white">{value}</p>
      <p className="mt-0.5 text-[8px] text-white/45">{label}</p>
    </div>
  );
}

/** Viewing statistics: summary cards, a bar chart and genre breakdown. */
export default function StatsScreen() {
  return (
    <ScreenShell title="Your story" activeTab="stats">
      <div className="grid grid-cols-3 gap-2">
        <StatCard Icon={Film} value="412" label="Titles watched" />
        <StatCard Icon={Clock} value="1.2k" label="Hours viewed" />
        <StatCard Icon={Star} value="38" label="Avg rating" />
      </div>

      {/* Bar chart */}
      <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.03] p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-white">Watch time</p>
          <span className="flex items-center gap-0.5 text-[9px] text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            +18%
          </span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-[5px]">
          {BARS.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-[3px] ${
                  i === 9 ? "bg-accent" : "bg-white/20"
                }`}
                style={{ height: `${b.v}%` }}
              />
              <span className="text-[7px] text-white/35">{b.m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Genre breakdown */}
      <p className="mt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
        Favorite genres
      </p>
      <div className="space-y-2">
        {GENRES.map((g) => (
          <div key={g.g} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[9.5px] text-white/70">{g.g}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${g.pct * 2.6}%`, backgroundColor: g.c }}
              />
            </div>
            <span className="w-7 shrink-0 text-right text-[9px] text-white/45">
              {g.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className="h-3" />
    </ScreenShell>
  );
}
