"use client";

import { motion } from "framer-motion";
import { Play, Tv, TrendingUp, Clock } from "lucide-react";
import { byId } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { EASE, stagger } from "@/lib/animations";

/** A lock screen with a Live Activity + widget stack. */
function LockScreenWidget() {
  const now = byId("severance");
  return (
    <PhoneFrame width="w-[220px]" showStatus>
      <div className="relative h-full w-full bg-gradient-to-b from-[#1a1420] via-[#0e0b12] to-black">
        {/* Clock */}
        <div className="pt-16 text-center">
          <p className="text-[13px] font-medium text-white/60">Monday, 18 March</p>
          <p className="text-[52px] font-light leading-none tracking-tight text-white">
            9:41
          </p>
        </div>

        {/* Live Activity */}
        <div className="mt-6 px-4">
          <div className="rounded-2xl border border-white/12 bg-black/50 p-3 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div
                className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${now.tint[0]}, ${now.tint[1]})`,
                }}
              >
                <PosterImage src={now.poster} alt={now.name} sizes="44px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold text-white">
                  {now.name}
                </p>
                <p className="text-[8px] text-white/50">S1 · E6 · 21m left</p>
              </div>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent">
                <Play className="h-3 w-3 fill-black text-black" />
              </span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/15">
              <motion.div
                initial={{ width: "35%" }}
                whileInView={{ width: "62%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
                className="h-full rounded-full bg-accent"
              />
            </div>
          </div>
        </div>

        {/* Lock widgets */}
        <div className="mt-3 flex justify-center gap-2 px-4">
          <div className="flex-1 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur">
            <Tv className="h-3 w-3 text-accent" />
            <p className="mt-1 text-[7.5px] leading-tight text-white/60">
              3 episodes tonight
            </p>
          </div>
          <div className="flex-1 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <p className="mt-1 text-[7.5px] leading-tight text-white/60">
              Dune: Part Two trending
            </p>
          </div>
        </div>

        <div className="absolute bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/40" />
      </div>
    </PhoneFrame>
  );
}

/** A home screen with a grid of widgets. */
function HomeScreenWidgets() {
  const upcoming = byId("shogun");
  const next = byId("the-bear");
  return (
    <PhoneFrame width="w-[240px]" showStatus>
      <div className="relative h-full w-full bg-gradient-to-b from-[#141a24] via-[#0c1017] to-black">
        {/* Time */}
        <div className="pt-14 text-center">
          <p className="text-[40px] font-light leading-none tracking-tight text-white">
            9:41
          </p>
        </div>

        {/* Widget grid */}
        <div className="mt-5 grid grid-cols-2 gap-2 px-3">
          {/* Next to Watch (medium) */}
          <div className="col-span-2 rounded-2xl border border-white/12 bg-white/[0.06] p-2.5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-semibold uppercase tracking-wider text-white/50">
                Next to watch
              </p>
              <Clock className="h-2.5 w-2.5 text-white/40" />
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div
                className="relative h-10 w-7 shrink-0 overflow-hidden rounded"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${next.tint[0]}, ${next.tint[1]})`,
                }}
              >
                <PosterImage src={next.poster} alt={next.name} sizes="40px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-semibold text-white">
                  {next.name}
                </p>
                <p className="text-[7px] text-white/50">S3E4 · Violet</p>
                <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-1/3 rounded-full bg-accent" />
                </div>
              </div>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent">
                <Play className="h-2.5 w-2.5 fill-black text-black" />
              </span>
            </div>
          </div>

          {/* Upcoming episodes (small) */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-2.5 backdrop-blur-xl">
            <p className="text-[7.5px] font-semibold uppercase tracking-wider text-white/50">
              Upcoming
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div
                className="relative h-8 w-6 shrink-0 overflow-hidden rounded"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${upcoming.tint[0]}, ${upcoming.tint[1]})`,
                }}
              >
                <PosterImage src={upcoming.poster} alt={upcoming.name} sizes="36px" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[8px] font-semibold text-white">
                  Shōgun
                </p>
                <p className="text-[6.5px] text-white/50">Tonight · 9PM</p>
              </div>
            </div>
          </div>

          {/* Trending (small) */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-2.5 backdrop-blur-xl">
            <p className="text-[7.5px] font-semibold uppercase tracking-wider text-white/50">
              Trending
            </p>
            <div className="mt-1.5 flex -space-x-1.5">
              {["dune-2", "hotd", "the-boys"].map((id) => {
                const t = byId(id);
                return (
                  <div
                    key={id}
                    className="relative h-8 w-6 overflow-hidden rounded border border-black/40"
                    style={{
                      backgroundImage: `linear-gradient(150deg, ${t.tint[0]}, ${t.tint[1]})`,
                    }}
                  >
                    <PosterImage src={t.poster} alt={t.name} sizes="36px" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dock */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur-xl">
          {["bg-accent", "bg-sky-400", "bg-emerald-400", "bg-rose-400"].map((c) => (
            <span key={c} className={`h-8 w-8 rounded-xl ${c}`} />
          ))}
        </div>
        <div className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/40" />
      </div>
    </PhoneFrame>
  );
}

/** Home + lock screen widget showcase. */
export default function WidgetsShowcase() {
  return (
    <section
      id="widgets"
      className="relative overflow-hidden py-24 sm:py-32 lg:min-h-[820px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute left-[6%] top-1/2 h-[280px] w-[280px] rounded-full bg-sky-500/8 blur-[110px]" />
      </div>

      <div className="mx-auto grid max-w-content items-center gap-14 px-5 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <motion.div
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={fadeUp()}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60"
          >
            On your home screen
          </motion.span>
          <motion.h2
            variants={fadeUp()}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl lg:text-[3.5rem]"
          >
            Your watchlist,{" "}
            <span className="bg-gradient-to-br from-accent to-amber-500 bg-clip-text text-transparent">
              always within reach.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp()}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Marquee, without opening Marquee. A Live Activity follows what
            you&rsquo;re watching right on the Lock Screen, while widgets keep
            Upcoming Episodes, Next to Watch and trending titles one glance away.
          </motion.p>

          <motion.ul variants={fadeUp()} className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Play, label: "Currently watching" },
              { icon: Clock, label: "Next to Watch" },
              { icon: Tv, label: "Upcoming episodes" },
              { icon: TrendingUp, label: "Trending movies & shows" },
            ].map((w) => (
              <li
                key={w.label}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/12">
                  <w.icon className="h-4 w-4 text-accent" />
                </span>
                <span className="text-sm text-white/80">{w.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Devices */}
        <div className="relative flex items-center justify-center gap-5 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="hidden sm:block"
          >
            <div className="animate-float-2" style={{ animationDelay: "-1s" }}>
              <LockScreenWidget />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
            className="relative z-10"
          >
            <div className="animate-float-4" style={{ animationDelay: "-2.5s" }}>
              <HomeScreenWidgets />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function fadeUp() {
  return {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  } as const;
}
