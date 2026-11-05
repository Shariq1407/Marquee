import { Play, ChevronRight, Bell } from "lucide-react";
import { byId } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import ScreenShell from "./ScreenShell";

function Bar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
      <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
    </div>
  );
}

function Poster({
  id,
  className = "w-[86px]",
  ratio = "aspect-[2/3]",
}: {
  id: string;
  className?: string;
  ratio?: string;
}) {
  const t = byId(id);
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border border-white/10 ${className} ${ratio}`}
      style={{
        backgroundImage: `linear-gradient(150deg, ${t.tint[0]}, ${t.tint[1]})`,
      }}
    >
      <PosterImage src={t.poster} alt={t.name} sizes="100px" />
    </div>
  );
}

/** The home feed: greeting, continue-watching hero, next-up and trending. */
export default function DashboardScreen() {
  const hero = byId("severance");
  const nextUp = [
    { id: "shogun", ep: "S1E7 · A Stick of Time" },
    { id: "the-bear", ep: "S3E4 · Violet" },
    { id: "fallout", ep: "S1E6 · The Trap" },
  ];
  const trending = ["dune-2", "hotd", "the-boys", "andor"];

  return (
    <ScreenShell activeTab="home">
      <div className="flex h-full flex-col">
        {/* Greeting */}
        <div className="flex items-center justify-between pb-3 pt-1">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/45">
              Tuesday
            </p>
            <p className="text-[17px] font-semibold text-white">Good evening</p>
          </div>
          <div className="relative">
            <Bell className="h-4.5 w-4.5 text-white/70" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-[#0b0b0d]" />
          </div>
        </div>

        {/* Continue watching hero */}
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <div
            className="relative aspect-[16/10] w-full"
            style={{
              backgroundImage: `linear-gradient(140deg, ${hero.tint[0]}, ${hero.tint[1]})`,
            }}
          >
            <PosterImage
              src={hero.poster}
              alt={hero.name}
              sizes="260px"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-[13px] font-semibold text-white">{hero.name}</p>
              <p className="mt-0.5 text-[9px] text-white/65">
                S1 · E5 of 9 · 43m left
              </p>
              <div className="mt-2">
                <Bar value={55} />
              </div>
            </div>
            <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-lg">
              <Play className="h-4 w-4 fill-black text-black" />
            </div>
          </div>
        </div>

        {/* Next up */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Next up
          </p>
          <ChevronRight className="h-3.5 w-3.5 text-white/40" />
        </div>
        <div className="mt-2 space-y-2">
          {nextUp.map((n) => {
            const t = byId(n.id);
            return (
              <div
                key={n.id}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] p-1.5"
              >
                <Poster id={n.id} className="w-8" ratio="aspect-[2/3]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium text-white">
                    {t.name}
                  </p>
                  <p className="truncate text-[9px] text-white/50">{n.ep}</p>
                </div>
                <div className="grid h-6 w-6 place-items-center rounded-full bg-accent/15">
                  <Play className="h-2.5 w-2.5 fill-accent text-accent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Trending row */}
        <p className="mt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
          Trending now
        </p>
        <div className="flex gap-2 pb-3">
          {trending.map((id) => (
            <Poster key={id} id={id} className="w-[calc(25%-6px)]" />
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
