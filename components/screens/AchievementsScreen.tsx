import { Flame, Trophy, Target, Award } from "lucide-react";
import ScreenShell from "./ScreenShell";

const BADGES = [
  { Icon: Flame, name: "Binge Worthy", desc: "10 episodes in a week", earned: true },
  { Icon: Trophy, name: "Marathon", desc: "50 hours this month", earned: true },
  { Icon: Target, name: "Completionist", desc: "Finish 10 series", earned: true },
  { Icon: Award, name: "Night Owl", desc: "Watch past 2 AM", earned: false },
  { Icon: Flame, name: "Genre Hopper", desc: "6 genres in a month", earned: false },
  { Icon: Trophy, name: "Century", desc: "100 titles tracked", earned: true },
];

/** Gamification screen: level, progress and achievement badges. */
export default function AchievementsScreen() {
  const levelPct = 68;

  return (
    <ScreenShell title="Achievements">
      {/* Level card */}
      <div className="rounded-xl border border-accent/25 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent p-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-accent text-[15px] font-black text-accent-foreground">
            12
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-white">Cinephile</p>
            <p className="text-[8.5px] text-white/55">
              420 XP to level 13
            </p>
          </div>
        </div>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-black/30">
          <div className="h-full rounded-full bg-accent" style={{ width: `${levelPct}%` }} />
        </div>
      </div>

      <p className="mt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
        Badges
      </p>

      <div className="grid grid-cols-2 gap-2">
        {BADGES.map((b) => (
          <div
            key={b.name}
            className={`rounded-lg border p-2.5 ${
              b.earned
                ? "border-accent/25 bg-accent/[0.07]"
                : "border-white/8 bg-white/[0.02] opacity-55"
            }`}
          >
            <b.Icon
              className={`h-4 w-4 ${b.earned ? "text-accent" : "text-white/40"}`}
            />
            <p className="mt-1.5 text-[10px] font-semibold text-white">{b.name}</p>
            <p className="text-[7.5px] leading-tight text-white/45">{b.desc}</p>
          </div>
        ))}
      </div>
      <div className="h-3" />
    </ScreenShell>
  );
}
