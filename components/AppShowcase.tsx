"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, ListVideo, Sparkles, CalendarDays, Trophy, Library, Film, BarChart3 } from "lucide-react";
import PhoneFrame from "@/components/ui/PhoneFrame";
import DashboardScreen from "@/components/screens/DashboardScreen";
import EpisodesScreen from "@/components/screens/EpisodesScreen";
import DiscoverScreen from "@/components/screens/DiscoverScreen";
import CalendarScreen from "@/components/screens/CalendarScreen";
import AchievementsScreen from "@/components/screens/AchievementsScreen";
import LibraryScreen from "@/components/screens/LibraryScreen";
import DetailScreen from "@/components/screens/DetailScreen";
import StatsScreen from "@/components/screens/StatsScreen";
import { EASE } from "@/lib/animations";

const FEATURES = [
  {
    icon: LayoutDashboard,
    eyebrow: "Your dashboard",
    title: "Everything you're watching. At a glance.",
    desc: "Recently watched shows, upcoming episodes, live progress and personalized recommendations — your whole evening, decided in seconds.",
    Screen: DashboardScreen,
    glow: "from-amber-400/25",
    // Each device gets its own motion signature
    float: "animate-float-1",
    delay: "0s",
    tilt: -3,
  },
  {
    icon: ListVideo,
    eyebrow: "Episode tracking",
    title: "Every episode. Every detail.",
    desc: "Browse complete seasons, see thumbnails and runtimes, and mark episodes watched with a single tap. Progress is tracked to the minute.",
    Screen: EpisodesScreen,
    glow: "from-sky-400/25",
    float: "animate-float-2",
    delay: "-1.5s",
    tilt: 2,
  },
  {
    icon: Sparkles,
    eyebrow: "Smart discovery",
    title: "Find your next obsession.",
    desc: "Search by mood, audience or genre and get an instant recommendation. Posters, ratings and suggestions tuned to how you actually watch.",
    Screen: DiscoverScreen,
    glow: "from-fuchsia-400/25",
    float: "animate-float-3",
    delay: "-3s",
    tilt: -2,
  },
  {
    icon: CalendarDays,
    eyebrow: "Release calendar",
    title: "Never miss a new episode.",
    desc: "Every upcoming episode and movie release lined up on a single, beautiful timeline so the next premiere never slips past you.",
    Screen: CalendarScreen,
    glow: "from-emerald-400/25",
    float: "animate-float-4",
    delay: "-0.8s",
    tilt: 3,
  },
  {
    icon: Trophy,
    eyebrow: "Achievements",
    title: "Make every watch count.",
    desc: "Complete missions, earn badges and level up as your watch history grows. A little reward for everything you finish.",
    Screen: AchievementsScreen,
    glow: "from-orange-400/25",
    float: "animate-float-5",
    delay: "-2.2s",
    tilt: -4,
  },
  {
    icon: Library,
    eyebrow: "Personal library",
    title: "Your entire watchlist, beautifully organized.",
    desc: "Browse every series and film you follow, sorted into watchlist, watching and watched. Understand your progress instantly.",
    Screen: LibraryScreen,
    glow: "from-indigo-400/25",
    float: "animate-float-6",
    delay: "-4s",
    tilt: 2,
  },
  {
    icon: Film,
    eyebrow: "Movie details",
    title: "Everything worth knowing.",
    desc: "Artwork, synopsis, release date, ratings, cast, trailer controls and streaming availability — all in one elegant view.",
    Screen: DetailScreen,
    glow: "from-rose-400/25",
    float: "animate-float-2",
    delay: "-5s",
    tilt: -2,
  },
  {
    icon: BarChart3,
    eyebrow: "Viewing statistics",
    title: "Your viewing story, visualized.",
    desc: "Turn your watch history into clear yearly trends, favorite genres and watch-time summaries you will actually want to revisit.",
    Screen: StatsScreen,
    glow: "from-teal-400/25",
    float: "animate-float-4",
    delay: "-6s",
    tilt: 3,
  },
];

export default function AppShowcase() {
  return (
    <section
      id="hub"
      className="relative scroll-mt-16 overflow-hidden bg-background py-24 text-foreground sm:py-32"
    >
      {/* Cinematic ambient glows so the dark band still reads as distinct */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-accent/8 blur-[130px]" />
        <div className="absolute bottom-0 right-[8%] h-[300px] w-[300px] rounded-full bg-indigo-500/8 blur-[110px]" />
      </div>

      {/* Section header */}
      <div className="mx-auto max-w-content px-5">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60">
            A closer look
          </span>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl lg:text-[3.5rem]">
            Every part of the app.
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-white/55 sm:text-lg">
            Your feed, your calendar, your stats, your assistant. Screen by
            screen, here is everything Marquee does.
          </p>
        </motion.div>
      </div>

      {/* Feature rows */}
      <div className="mx-auto mt-16 max-w-content space-y-20 px-5 sm:mt-24 sm:space-y-28">
        {FEATURES.map((f, i) => {
          const reversed = i % 2 === 1;
          const Icon = f.icon;
          const Screen = f.Screen;
          return (
            <div key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: EASE }}
                className={reversed ? "lg:order-2" : ""}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/55">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {f.eyebrow}
                </span>
                <h3 className="mt-4 max-w-md text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[2.25rem]">
                  {f.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
                  {f.desc}
                </p>
              </motion.div>

              {/* Visual */}
              <div className={`relative flex justify-center ${reversed ? "lg:order-1" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, y: 40, x: reversed ? -18 : 18, rotate: f.tilt, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className="relative"
                >
                  {/* Colored glow behind each device */}
                  <div
                    aria-hidden
                    className={`absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br ${f.glow} to-transparent opacity-60 blur-2xl`}
                  />
                  {/* Dark card backdrop */}
                  <div className="relative rounded-[2.25rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
                    <div
                      className={f.float}
                      style={{ animationDelay: f.delay, animationDuration: undefined }}
                    >
                      <PhoneFrame width="w-[248px] sm:w-[264px]">
                        <Screen />
                      </PhoneFrame>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
