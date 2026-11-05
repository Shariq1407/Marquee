import { Film, Layers, Star, Tv } from "lucide-react";
import { allTitles } from "@/lib/data";
import Poster from "@/components/ui/Poster";
import { Card, CardHeader } from "@/admin/ui";

/* ------------------------------------------------------------------ *
 * Title library — app ke movies/series ka catalog view.
 * Adds aur completion numbers demo stats hain.
 * ------------------------------------------------------------------ */

/* Demo stats: har title ke liye deterministic (index-based) numbers —
   taaki server/client render me mismatch na ho. */
const rows = allTitles.slice(0, 12).map((t, i) => ({
  ...t,
  adds: 1842 - i * 84,
  completion: 92 - ((i * 7) % 38),
}));

export default function TitlesView() {
  const movies = allTitles.filter((t) => t.kind === "movie").length;
  const series = allTitles.length - movies;
  const avg = allTitles.reduce((s, t) => s + t.rating, 0) / (allTitles.length || 1);

  const stats = [
    { label: "Total titles", value: String(allTitles.length), icon: Layers },
    { label: "Movies", value: String(movies), icon: Film },
    { label: "Series", value: String(series), icon: Tv },
    { label: "Avg rating", value: avg.toFixed(1), icon: Star },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-center gap-4 px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/[0.12] text-accent">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <div>
                <p className="text-[12px] text-white/50">{s.label}</p>
                <p className="text-2xl font-semibold leading-tight tracking-tight text-white">
                  {s.value}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader
          title="Catalog performance"
          hint="Watchlist adds aur completion rate (demo stats)"
          action={
            <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/55">
              {rows.length} titles
            </span>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-white/35">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 font-medium">Rating</th>
                <th className="px-3 py-3 font-medium">Watchlist adds</th>
                <th className="px-5 py-3 text-right font-medium">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {rows.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Poster
                        title={t}
                        sizes="64px"
                        className="h-14 w-10 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-white/90">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-white/40">
                          {t.year} · {t.genre}
                          {t.runtime ? ` · ${t.runtime}` : ""}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex rounded-md border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 text-[11px] capitalize text-white/60">
                      {t.kind}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-accent">
                      <Star className="h-3 w-3 fill-current" />
                      {t.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent"
                          style={{
                            width: `${Math.round((t.adds / 1900) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[12px] tabular-nums text-white/55">
                        {t.adds.toLocaleString("en-US")}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`text-[13px] font-medium tabular-nums ${
                        t.completion >= 75
                          ? "text-emerald-300"
                          : t.completion >= 55
                            ? "text-amber-300"
                            : "text-rose-300"
                      }`}
                    >
                      {t.completion}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
