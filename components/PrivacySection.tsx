"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Ban, Fingerprint } from "lucide-react";
import { EASE, stagger } from "@/lib/animations";

const BLOCKS = [
  {
    Icon: ShieldCheck,
    title: "Private by design",
    desc: "Your library is built to stay yours. Nothing about what you watch leaves your devices without your say-so.",
  },
  {
    Icon: Ban,
    title: "No ads. No profiling.",
    desc: "Your activity is never packaged, sold, or used to build an advertising profile.",
  },
  {
    Icon: Fingerprint,
    title: "Always in control",
    desc: "Your watch history belongs to you, from first episode to final credits. Export or delete it whenever you like.",
  },
];

/** A calm, minimal statement on privacy. */
export default function PrivacySection() {
  return (
    <section
      id="privacy"
      className="scroll-mt-16 border-y border-border bg-secondary py-24 sm:py-32"
    >
      <div className="mx-auto max-w-content px-5">
        <motion.div
          variants={stagger(0.09, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp()}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60"
          >
            Privacy
          </motion.span>
          <motion.h2
            variants={fadeUp()}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl"
          >
            Your watchlist is nobody else&rsquo;s business.
          </motion.h2>
          <motion.p
            variants={fadeUp()}
            className="mt-5 text-balance text-base leading-relaxed text-white/55 sm:text-lg"
          >
            What you watch stays between you and your screen. Enjoy a more
            personal way to organize everything you watch.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-5 sm:grid-cols-3"
        >
          {BLOCKS.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp()}
              className="group rounded-2xl border border-white/8 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
                <b.Icon className="h-5 w-5 text-accent" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                {b.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/50">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-xs text-white/35"
        >
          No advertising trackers. Sync happens privately through iCloud and your
          chosen providers.
        </motion.p>
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
