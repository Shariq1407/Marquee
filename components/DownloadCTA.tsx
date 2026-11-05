"use client";

import { motion } from "framer-motion";
import PhoneFrame from "@/components/ui/PhoneFrame";
import WaitlistButton from "@/components/ui/WaitlistButton";
import DashboardScreen from "@/components/screens/DashboardScreen";
import DetailScreen from "@/components/screens/DetailScreen";
import EpisodesScreen from "@/components/screens/EpisodesScreen";
import { EASE, stagger } from "@/lib/animations";

/** The closing call-to-action with three devices and a gradient glow. */
export default function DownloadCTA() {
  return (
    <section className="relative overflow-hidden py-24 text-center sm:py-36">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-accent/14 blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-amber-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-content px-5">
        <motion.div
          variants={stagger(0.09, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h2
            variants={fadeUp()}
            className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.03] tracking-tightest sm:text-6xl"
          >
            Start tracking your{" "}
            <span className="bg-gradient-to-br from-accent via-amber-300 to-amber-500 bg-clip-text text-transparent">
              story.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp()}
            className="mx-auto mt-5 max-w-xl text-balance text-base text-white/55 sm:text-lg"
          >
            Bring your movies, shows, and watch history together in one
            beautiful place.
          </motion.p>
          <motion.div variants={fadeUp()} className="mt-8 flex justify-center">
            <WaitlistButton />
          </motion.div>
        </motion.div>

        {/* Devices */}
        <div className="relative mt-16 flex items-end justify-center gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            className="hidden origin-bottom -rotate-6 md:block"
          >
            <div className="animate-float-5" style={{ animationDelay: "-0.8s" }}>
              <PhoneFrame width="w-[180px]">
                <EpisodesScreen />
              </PhoneFrame>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative z-10"
          >
            <div className="animate-float-6" style={{ animationDelay: "-2s" }}>
              <PhoneFrame width="w-[230px] sm:w-[260px]">
                <DashboardScreen />
              </PhoneFrame>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            className="hidden origin-bottom rotate-6 md:block"
          >
            <div className="animate-float-3" style={{ animationDelay: "-1.4s" }}>
              <PhoneFrame width="w-[180px]">
                <DetailScreen />
              </PhoneFrame>
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
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  } as const;
}
