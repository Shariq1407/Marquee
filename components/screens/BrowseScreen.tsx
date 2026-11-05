import { ChevronRight, Tv, Film, LayoutGrid, User, Search } from "lucide-react";
import { byId } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";

const IN_PROGRESS = ["the-bear", "severance", "shogun", "andor"];

/**
 * A "browse" screen modelled on the reference hero: a large featured poster
 * with title + metadata, an "in progress" poster rail, and a floating tab bar.
 */
export default function BrowseScreen() {
  const feature = byId("fallout");

  return (
    <div className="flex h-full flex-col bg-[#0b0b0d]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-2 pt-11">
        <h3 className="text-[20px] font-bold tracking-tight text-white">Series</h3>
        <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] py-1 pl-1 pr-2.5">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
            M
          </span>
          <span className="text-[9px] font-medium text-white/80">Cinephile</span>
        </span>
      </div>

      {/* Featured card */}
      <div className="px-4">
        <div
          className="relative aspect-[4/3.4] w-full overflow-hidden rounded-2xl border border-white/10"
          style={{
            backgroundImage: `linear-gradient(150deg, ${feature.tint[0]}, ${feature.tint[1]})`,
          }}
        >
          <PosterImage
            src={feature.poster}
            alt={feature.name}
            sizes="280px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="text-[22px] font-black leading-none tracking-tight text-white drop-shadow">
              {feature.name}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-white/75">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-white/90 text-[6px] font-bold text-black">
                4K
              </span>
              <span>{feature.year}</span>
              <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-white/40" />
              <span>{feature.genre}</span>
            </div>
          </div>
        </div>
      </div>

      {/* In progress rail */}
      <div className="mt-4 px-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-[13px] font-bold text-white">
            Series in Progress
            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
          </p>
          <span className="text-[10px] tracking-widest text-accent">•••</span>
        </div>
        <p className="mt-0.5 text-[9px] text-white/45">
          Last watched · The Bear S3E4
        </p>
      </div>

      <div className="mt-2 flex gap-2 overflow-hidden px-5">
        {IN_PROGRESS.map((id) => {
          const t = byId(id);
          return (
            <div key={id} className="w-[30%] shrink-0">
              <div
                className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-white/10"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${t.tint[0]}, ${t.tint[1]})`,
                }}
              >
                <PosterImage src={t.poster} alt={t.name} sizes="90px" />
              </div>
              <p className="mt-1 truncate text-[8px] text-white/60">{t.name}</p>
            </div>
          );
        })}
      </div>

      {/* Floating tab bar */}
      <div className="mt-auto px-4 pb-5 pt-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2 backdrop-blur-xl">
          {[
            { Icon: Tv, label: "Series", active: true },
            { Icon: Film, label: "Movies", active: false },
            { Icon: LayoutGrid, label: "Hub", active: false },
            { Icon: User, label: "Profile", active: false },
          ].map(({ Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon
                className={`h-4 w-4 ${active ? "text-accent" : "text-white/70"}`}
              />
              <span
                className={`text-[7.5px] font-medium ${
                  active ? "text-accent" : "text-white/70"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
            <Search className="h-3.5 w-3.5 text-white/80" />
          </span>
        </div>
      </div>
    </div>
  );
}
