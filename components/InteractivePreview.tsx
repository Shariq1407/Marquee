"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Bookmark,
  CalendarDays,
  Sparkles,
  BarChart3,
} from "lucide-react";
import PhoneFrame from "@/components/ui/PhoneFrame";
import DashboardScreen from "@/components/screens/DashboardScreen";
import LibraryScreen from "@/components/screens/LibraryScreen";
import CalendarScreen from "@/components/screens/CalendarScreen";
import DiscoverScreen from "@/components/screens/DiscoverScreen";
import StatsScreen from "@/components/screens/StatsScreen";
import { EASE } from "@/lib/animations";

const TABS = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard, Screen: DashboardScreen },
  { key: "watchlist", label: "Watchlist", Icon: Bookmark, Screen: LibraryScreen },
  { key: "calendar", label: "Calendar", Icon: CalendarDays, Screen: CalendarScreen },
  { key: "discovery", label: "Discovery", Icon: Sparkles, Screen: DiscoverScreen },
  { key: "stats", label: "Statistics", Icon: BarChart3, Screen: StatsScreen },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const BLURB: Record<TabKey, string> = {
  dashboard: "Your home feed — continue watching, next up and trending.",
  watchlist: "Every title you follow, organised into clean categories.",
  calendar: "Upcoming episodes and premieres on one timeline.",
  discovery: "Search by mood, genre or audience for an instant pick.",
  stats: "Watch time, favourite genres and yearly trends at a glance.",
};

/** A hands-on preview: switch between five real app screens. */
export default function InteractivePreview() {
  const [active, setActive] = useState<TabKey>("dashboard");
  const Active = TABS.find((t) => t.key === active)!;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-content px-5">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Try it
          </span>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl">
            Take a spin through the app.
          </h2>
          <p className="mt-4 text-balance text-base text-white/55 sm:text-lg">
            Switch between screens right here — no download required.
          </p>
        </motion.div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="App preview screens"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.key}`}
                id={`tab-${t.key}`}
                onClick={() => setActive(t.key)}
                className={`relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-transparent text-accent-foreground"
                    : "border-white/12 bg-white/[0.03] text-white/65 hover:border-white/25 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="preview-tab"
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                  />
                )}
                <t.Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Phone + blurb */}
        <div className="mt-12 flex flex-col items-center gap-8">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-full bg-accent/12 blur-[80px]"
            />
            <div className="animate-float-1" style={{ animationDelay: "-3s" }}>
            <PhoneFrame width="w-[280px] sm:w-[310px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 24, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-full w-full"
                  role="tabpanel"
                  id={`panel-${active}`}
                  aria-labelledby={`tab-${active}`}
                >
                  <Active.Screen />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={active + "-blurb"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="max-w-md text-center text-sm text-white/55"
            >
              {BLURB[active]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
