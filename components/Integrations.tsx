"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

const SERVICES = [
  { name: "TMDB", glyph: "T", tint: "from-sky-400/25 to-sky-600/10" },
  { name: "JustWatch", glyph: "J", tint: "from-emerald-400/25 to-emerald-600/10" },
  { name: "Trakt", glyph: "▶", tint: "from-rose-400/25 to-rose-600/10" },
  { name: "Simkl", glyph: "S", tint: "from-indigo-400/25 to-indigo-600/10" },
  { name: "iCloud", glyph: "☁", tint: "from-slate-300/25 to-slate-500/10" },
];

/** A calm horizontal strip of the services Marquee syncs with. */
export default function Integrations() {
  return (
    <section className="relative mx-auto max-w-content px-5 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white/35">
          Powered by
        </p>

        <div className="mask-fade-x mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              className="group flex items-center gap-2.5 opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${s.tint} text-sm font-bold text-white/85 ring-1 ring-white/10`}
                aria-hidden
              >
                {s.glyph}
              </span>
              <span className="text-lg font-semibold tracking-tight text-white/80">
                {s.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
