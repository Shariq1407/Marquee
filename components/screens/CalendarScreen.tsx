import { ChevronLeft, ChevronRight } from "lucide-react";
import { byId } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import ScreenShell from "./ScreenShell";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEK = [
  { d: 15, n: 0 },
  { d: 16, n: 1 },
  { d: 17, n: 0 },
  { d: 18, n: 2 },
  { d: 19, n: 0 },
  { d: 20, n: 1 },
  { d: 21, n: 0 },
];
const TODAY = 18;

const EVENTS = [
  { id: "shogun", when: "Tonight · 9:00 PM", ep: "S1E7 · A Stick of Time" },
  { id: "the-bear", when: "Thu · 12:00 AM", ep: "S3E4 · Violet" },
  { id: "fallout", when: "Fri · 8:00 PM", ep: "S1E6 · The Trap" },
  { id: "dune-2", when: "Sat · Streaming", ep: "Digital release" },
];

/** Release calendar with a month grid and an upcoming timeline. */
export default function CalendarScreen() {
  return (
    <ScreenShell title="Calendar" activeTab="calendar">
      {/* Month switcher */}
      <div className="flex items-center justify-between pb-2">
        <ChevronLeft className="h-4 w-4 text-white/40" />
        <p className="text-[12px] font-semibold text-white">March 2026</p>
        <ChevronRight className="h-4 w-4 text-white/40" />
      </div>

      {/* Week grid */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((d, i) => (
            <span
              key={i}
              className="py-0.5 text-center text-[8px] font-medium text-white/40"
            >
              {d}
            </span>
          ))}
          {WEEK.map((w) => {
            const isToday = w.d === TODAY;
            return (
              <div
                key={w.d}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-md text-[10px] ${
                  isToday
                    ? "bg-accent font-bold text-accent-foreground"
                    : "text-white/75"
                }`}
              >
                {w.d}
                {w.n > 0 && (
                  <span
                    className={`absolute bottom-1 flex gap-[2px] ${
                      isToday ? "" : ""
                    }`}
                  >
                    {Array.from({ length: w.n }).map((_, k) => (
                      <span
                        key={k}
                        className={`h-1 w-1 rounded-full ${
                          isToday ? "bg-black/70" : "bg-accent"
                        }`}
                      />
                    ))}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
        Upcoming
      </p>

      <div className="space-y-2">
        {EVENTS.map((e) => {
          const t = byId(e.id);
          return (
            <div
              key={e.id + e.ep}
              className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.03] p-1.5"
            >
              <div
                className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${t.tint[0]}, ${t.tint[1]})`,
                }}
              >
                <PosterImage src={t.poster} alt={t.name} sizes="60px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-white">
                  {t.name}
                </p>
                <p className="truncate text-[9px] text-white/50">{e.ep}</p>
              </div>
              <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[8px] font-medium text-accent">
                {e.when}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-3" />
    </ScreenShell>
  );
}
