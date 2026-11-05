"use client";

import { motion } from "framer-motion";
import { Check, Minus, Cloud, Crown } from "lucide-react";
import { syncComparisonRows } from "@/lib/data";
import { EASE } from "@/lib/animations";

const COLS = [
  { key: "icloud", name: "iCloud", sub: "Free tier", Icon: Cloud, premium: false },
  { key: "simkl", name: "Simkl", sub: "Premium", Icon: Crown, premium: true },
  { key: "trakt", name: "Trakt", sub: "Premium", Icon: Crown, premium: true },
] as const;

type Cell = (typeof syncComparisonRows)[number]["values"][number];

function CellMark({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15">
        <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />
      </span>
    );
  if (value === "no")
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/5">
        <Minus className="h-3.5 w-3.5 text-white/30" />
      </span>
    );
  return <span className="text-sm text-white/25">—</span>;
}

/** Side-by-side comparison of the three sync providers. */
export default function SyncComparison() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60">
            How it compares
          </span>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl">
            iCloud, Trakt &amp; Simkl compared
          </h2>
          <p className="mt-4 text-balance text-base text-white/55 sm:text-lg">
            Marquee works with all three. Here&rsquo;s what each sync provider
            actually supports under the hood.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-secondary shadow-2xl shadow-black/40"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Feature support across iCloud, Simkl and Trakt
              </caption>
              <thead>
                <tr className="border-b border-white/10">
                  <th
                    scope="col"
                    className="w-[46%] px-5 py-5 text-sm font-medium text-white/50"
                  >
                    Capability
                  </th>
                  {COLS.map((c) => (
                    <th key={c.key} scope="col" className="px-4 py-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="flex items-center gap-1.5">
                          <c.Icon
                            className={`h-4 w-4 ${
                              c.premium ? "text-accent" : "text-sky-300"
                            }`}
                          />
                          <span className="text-[15px] font-semibold text-white">
                            {c.name}
                          </span>
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            c.premium
                              ? "bg-accent/15 text-accent"
                              : "bg-white/8 text-white/50"
                          }`}
                        >
                          {c.sub}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {syncComparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-white/[0.06] transition-colors hover:bg-white/[0.03] ${
                      i % 2 === 1 ? "bg-white/[0.015]" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-5 py-3 text-[13px] font-normal text-white/75"
                    >
                      {row.label}
                    </th>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <CellMark value={v} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Sync capacity row */}
                <tr className="bg-accent/[0.04]">
                  <th
                    scope="row"
                    className="px-5 py-4 text-[13px] font-semibold text-white"
                  >
                    Sync capacity
                  </th>
                  <td className="px-4 py-4 text-center text-[12px] text-white/70">
                    30 max
                    <span className="block text-[10px] text-white/40">
                      episodes not counted
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-[12px] font-semibold text-white">
                    Unlimited
                  </td>
                  <td className="px-4 py-4 text-center text-[12px] font-semibold text-white">
                    Unlimited
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="mt-5 text-center text-xs text-white/35">
          Availability of individual capabilities depends on each provider&rsquo;s
          own API. Premium features require a Marquee subscription.
        </p>
      </div>
    </section>
  );
}
