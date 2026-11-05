"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import WaitlistButton from "@/components/ui/WaitlistButton";
import HandsPhone from "@/components/HandsPhone";
import FloatingPoster from "@/components/FloatingPoster";
import { EASE, stagger } from "@/lib/animations";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const centerY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-10 sm:pt-16">
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/12 blur-[120px]" />
        <div className="absolute left-[8%] top-[30%] h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-[110px]" />
        <div className="absolute right-[6%] top-[22%] h-[320px] w-[320px] rounded-full bg-rose-500/8 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Copy */}
      <motion.div
        variants={stagger(0.09, 0.1)}
        initial="hidden"
        animate="show"
        style={{ y: copyY }}
        className="mx-auto max-w-content px-5 text-center"
      >
        <motion.a
          href="#hub"
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-1 pl-1 pr-3 text-xs text-white/70 backdrop-blur transition-colors hover:border-accent/40 hover:text-white"
        >
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
            New
          </span>
          Widgets, Live Activities &amp; more
        </motion.a>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 26 },
            show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
          }}
          className="mx-auto mt-5 whitespace-nowrap text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[1.03] tracking-tightest"
        >
          Discover. Watch.{" "}
          <span className="bg-gradient-to-br from-accent via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Track.
          </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
          }}
          className="mx-auto mt-5 max-w-2xl text-balance text-lg text-white/60 sm:text-xl"
        >
          Your movies, your series, your story.
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
          }}
          className="mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/45 sm:text-base"
        >
          Keep everything you&rsquo;re watching in one beautiful place. Discover
          your next favorite, track every episode, and never lose your place
          again.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE, staggerChildren: 0.1 },
            },
          }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
          >
            <WaitlistButton />
          </motion.div>
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[15px] font-medium text-white/90 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
          >
            Explore Features
            <ArrowDown className="h-4 w-4" />
          </motion.a>
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.6, delay: 0.5 } },
          }}
          className="mt-5 text-xs text-white/30"
        >
          Free on iPhone · iCloud sync built in
        </motion.p>
      </motion.div>

      {/* Devices */}
      <div className="relative mx-auto mt-14 w-full px-5 pb-24 sm:mt-20">
        {/* Glow behind the device */}
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-14 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-accent/16 blur-[110px]"
        />

        {/* Centerpiece: hands holding the phone */}
        <div className="relative flex justify-center">
          {/* Scroll parallax layer (separate so it doesn't fight the entrance) */}
          <motion.div style={{ y: centerY }} className="relative z-10">
            {/* Entrance: the phone rises up from below the fold on load */}
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 260, scale: reduce ? 1 : 0.9 }}
              animate={{
                opacity: 1,
                y: reduce ? 0 : [260, 0],
                scale: reduce ? 1 : [0.9, 1.02, 1],
              }}
              transition={{
                duration: reduce ? 0.6 : 1.6,
                ease: EASE,
                delay: 0.15,
                scale: { duration: reduce ? 0.6 : 1.6, ease: EASE, delay: 0.15, times: [0, 0.75, 1] },
              }}
            >
              <div className="animate-float-6" style={{ animationDelay: "-2.5s" }}>
                <HandsPhone width="w-full max-w-[960px]" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile side posters */}
        <div className="mt-10 flex justify-center gap-3 lg:hidden">
          {["dune-2", "shogun", "the-batman", "interstellar"].map((id) => (
            <FloatingPoster key={id} id={id} size="w-16" className="relative" />
          ))}
        </div>
      </div>
    </section>
  );
}
