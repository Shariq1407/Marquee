"use client";

import { motion } from "framer-motion";
import {
  ListChecks,
  SkipForward,
  CircleCheck,
  CalendarDays,
  Sparkles,
  Check,
} from "lucide-react";
import PhoneFrame from "@/components/ui/PhoneFrame";
import EpisodesScreen from "@/components/screens/EpisodesScreen";
import { EASE, stagger } from "@/lib/animations";

const ICONS = {
  listchecks: ListChecks,
  skipforward: SkipForward,
  circlecheck: CircleCheck,
  calendar: CalendarDays,
  sparkles: Sparkles,
} as const;

const FEATURES = [
  { icon: "listchecks", title: "Episode-by-episode progress", desc: "Track every season down to the individual episode." },
  { icon: "skipforward", title: "Automatic next-up queue", desc: "Always know exactly what to watch next." },
  { icon: "circlecheck", title: "Season completion at a glance", desc: "See how far you are through every show." },
  { icon: "calendar", title: "Personal viewing calendar", desc: "Every upcoming release on a single timeline." },
  { icon: "sparkles", title: "Live Activities & widgets", desc: "Follow along without even opening the app." },
] as const;

/** "Tap or swipe. Marked as watched." — the core tracking feature block. */
export default function FeatureSection() {
  return (
    <section
      id="features"
      className="relative overflow-x-hidden overflow-y-visible py-24 sm:py-32 lg:py-40"
    >
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-1/4 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-content items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <motion.div
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUpVariant()}
            className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent"
          >
            Track
          </motion.p>

          <motion.h2
            variants={fadeUpVariant()}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl lg:text-[3.5rem]"
          >
            Tap or swipe.{" "}
            <span className="text-white/40">Marked as watched.</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant()}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Mark an episode or a movie watched with one tap or swipe. Marquee
            remembers the season, the episode, and exactly where you left off
            across everything you follow.
          </motion.p>

          <ul className="mt-8 space-y-4">
            {FEATURES.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <motion.li
                  key={f.title}
                  variants={fadeUpVariant()}
                  className="group flex items-start gap-3.5"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] transition-colors group-hover:border-accent/40 group-hover:bg-accent/10">
                    <Icon className="h-4 w-4 text-accent" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-white">
                      {f.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-white/45">
                      {f.desc}
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Visual */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <div className="animate-float-3" style={{ animationDelay: "-2s" }}>
              <PhoneFrame width="w-[280px] sm:w-[310px]">
                <EpisodesScreen />
              </PhoneFrame>
            </div>

            {/* Floating episode-progress card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="absolute -left-6 top-24 hidden w-44 rounded-2xl border border-white/12 bg-neutral-900/90 p-3 shadow-2xl backdrop-blur-xl xl:block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
                  Season 1
                </span>
                <span className="text-[10px] font-bold text-accent">56%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/12">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "56%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE, delay: 0.7 }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className={`grid h-5 flex-1 place-items-center rounded text-[8px] font-bold ${
                      i < 5
                        ? "bg-accent text-accent-foreground"
                        : "bg-white/8 text-white/40"
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Floating "marked" confirmation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="absolute -right-4 bottom-28 hidden items-center gap-2.5 rounded-2xl border border-white/12 bg-neutral-900/90 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl xl:flex"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/20">
                <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />
              </span>
              <span>
                <span className="block text-[11px] font-semibold text-white">
                  Episode 5 watched
                </span>
                <span className="block text-[9px] text-white/45">
                  Next: E7 · Defiant Jazz
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Local helper returning the shared fade-up variant. */
function fadeUpVariant() {
  return {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  } as const;
}
