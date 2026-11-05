"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { activity, kpis, platforms, signups, sources, trend } from "@/admin/data";
import { Avatar, Card, CardHeader, PlanPill, StatusPill } from "@/admin/ui";

/* ------------------------------------------------------------------ *
 * Overview — KPI cards, 14-din ka trend chart (hover tooltip),
 * traffic sources donut, recent signups aur activity feed.
 * ------------------------------------------------------------------ */

/** Chhota sparkline jo har KPI card ke saath chalta hai. */
function Spark({ data, up }: { data: readonly number[]; up: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i * 100) / (data.length - 1);
      const y = 30 - ((v - min) / span) * 26 - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="h-8 w-full"
      aria-hidden
    >
      <polyline
        points={pts}
        fill="none"
        stroke={up ? "#34d399" : "#f87171"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.85"
      />
    </svg>
  );
}

function KpiCard({ kpi }: { kpi: (typeof kpis)[number] }) {
  const positive = kpi.up;
  const good = "good" in kpi ? Boolean(kpi.good) : positive;
  const Icon: LucideIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] text-white/50">{kpi.label}</p>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
            good
              ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
              : "border-rose-400/25 bg-rose-400/10 text-rose-300"
          }`}
        >
          <Icon className="h-3 w-3" strokeWidth={2.4} />
          {kpi.delta}
        </span>
      </div>
      <p className="mt-2 text-[28px] font-semibold leading-none tracking-tight text-white">
        {kpi.value}
      </p>
      <p className="mt-1.5 text-[11px] text-white/35">{kpi.note}</p>
      <div className="mt-3 opacity-80">
        <Spark data={kpi.spark} up={good} />
      </div>
    </Card>
  );
}

/* --------------------------- Trend chart --------------------------- */

const W = 760;
const H = 288;
const PAD = { l: 42, r: 16, t: 18, b: 32 };
const MAX = 140;

const px = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (trend.length - 1);
const py = (v: number) => PAD.t + (1 - v / MAX) * (H - PAD.t - PAD.b);
const BASE = H - PAD.b;

const linePath = (key: "signups" | "activated") =>
  trend
    .map(
      (d, i) =>
        `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(d[key]).toFixed(1)}`
    )
    .join(" ");

const areaPath = (key: "signups" | "activated") =>
  `${linePath(key)} L${px(trend.length - 1).toFixed(1)},${BASE} L${px(0).toFixed(1)},${BASE} Z`;

function TrendChart() {
  const [hover, setHover] = useState<number | null>(null);
  const step = (W - PAD.l - PAD.r) / (trend.length - 1);
  const active = hover === null ? null : trend[hover];
  const tipLeft = hover === null ? 0 : (px(hover) / W) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Signups trend"
        hint="Last 14 din — signups vs activations"
        action={
          <div className="flex items-center gap-4 text-[11px] text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Signups
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Activated
            </span>
          </div>
        }
      />

      <div className="relative px-3 pb-4 pt-3" onMouseLeave={() => setHover(null)}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Last 14 din ke signups ka trend chart"
        >
          <defs>
            <linearGradient id="areaAccent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f19c29" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#f19c29" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="areaSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* grid + y labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => {
            const v = MAX * (1 - f);
            const y = PAD.t + f * (H - PAD.t - PAD.b);
            return (
              <g key={f}>
                <line
                  x1={PAD.l}
                  x2={W - PAD.r}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeDasharray={f === 1 ? "0" : "3 5"}
                />
                <text
                  x={PAD.l - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-white/35 text-[10px]"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* areas + lines */}
          <path d={areaPath("signups")} fill="url(#areaAccent)" />
          <path d={areaPath("activated")} fill="url(#areaSky)" />
          <path
            d={linePath("signups")}
            fill="none"
            stroke="#f19c29"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={linePath("activated")}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 5"
            opacity="0.9"
          />

          {/* x labels (har doosra din) */}
          {trend.map((d, i) =>
            i % 2 === 0 ? (
              <text
                key={d.label}
                x={px(i)}
                y={H - 10}
                textAnchor="middle"
                className="fill-white/35 text-[10px]"
              >
                {d.label.replace(" Oct", "")}
              </text>
            ) : null
          )}

          {/* hover marker */}
          {hover !== null && (
            <g>
              <line
                x1={px(hover)}
                x2={px(hover)}
                y1={PAD.t}
                y2={BASE}
                stroke="rgba(255,255,255,0.22)"
              />
              <circle
                cx={px(hover)}
                cy={py(trend[hover].signups)}
                r="4.5"
                fill="#0a0a0a"
                stroke="#f19c29"
                strokeWidth="2.5"
              />
              <circle
                cx={px(hover)}
                cy={py(trend[hover].activated)}
                r="3.5"
                fill="#0a0a0a"
                stroke="#38bdf8"
                strokeWidth="2"
              />
            </g>
          )}

          {/* invisible hit areas */}
          {trend.map((d, i) => (
            <rect
              key={`hit-${d.label}`}
              x={px(i) - step / 2}
              y={0}
              width={step}
              height={H - PAD.b}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
          ))}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute top-3 z-10 w-[168px] -translate-x-1/2 rounded-xl border border-white/[0.12] bg-neutral-900/[0.97] px-3 py-2.5 shadow-2xl backdrop-blur-xl"
            style={{ left: `clamp(88px, ${tipLeft}%, calc(100% - 88px))` }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              {active.label}
            </p>
            <div className="mt-1.5 flex items-center justify-between text-[12px]">
              <span className="text-white/60">Signups</span>
              <span className="font-semibold text-accent">{active.signups}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[12px]">
              <span className="text-white/60">Activated</span>
              <span className="font-semibold text-sky-300">
                {active.activated}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/* --------------------------- Sources donut -------------------------- */

function SourcesCard() {
  const total = sources.reduce((s, x) => s + x.value, 0);
  const R = 54;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader title="Traffic sources" hint="Naye signups kahan se aa rahe" />
      <div className="flex flex-1 flex-col items-center gap-5 px-5 py-6">
        <div className="relative h-[148px] w-[148px]">
          <svg viewBox="0 0 148 148" className="h-full w-full -rotate-90">
            <circle
              cx="74"
              cy="74"
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="16"
            />
            {sources.map((s) => {
              const len = (s.value / total) * C;
              const el = (
                <circle
                  key={s.label}
                  cx="74"
                  cy="74"
                  r={R}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="16"
                  strokeLinecap="butt"
                  strokeDasharray={`${len - 2} ${C - len + 2}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center">
            <p className="text-2xl font-semibold leading-none text-white">4,812</p>
            <p className="mt-1 text-[11px] text-white/40">total</p>
          </div>
        </div>

        <ul className="w-full space-y-2.5">
          {sources.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between text-[13px]"
            >
              <span className="flex items-center gap-2 text-white/60">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </span>
              <span className="font-medium text-white/85">{s.value}%</span>
            </li>
          ))}
        </ul>

        <div className="w-full border-t border-white/[0.06] pt-4">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/35">
            Platforms
          </p>
          <ul className="space-y-2.5">
            {platforms.map((p) => (
              <li key={p.label} className="text-[13px]">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-white/60">{p.label}</span>
                  <span className="font-medium text-white/85">{p.value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent"
                    style={{ width: `${p.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------ View ------------------------------- */

export default function Overview() {
  const recent = signups.slice(0, 6);

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.key} kpi={k} />
        ))}
      </div>

      {/* Chart + sources */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrendChart />
        </div>
        <SourcesCard />
      </div>

      {/* Recent + activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent signups"
            hint="Aaj ke naye log"
            action={
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/55">
                Live
              </span>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-white/35">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-3 py-3 font-medium">Plan</th>
                  <th className="px-3 py-3 font-medium">Source</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {recent.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.name} size="h-8 w-8 text-[11px]" />
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium text-white/90">
                            {s.name}
                          </p>
                          <p className="truncate text-[11px] text-white/40">
                            {s.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <PlanPill plan={s.plan} />
                    </td>
                    <td className="px-3 py-3 text-[13px] text-white/55">
                      {s.source}
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill status={s.status} />
                    </td>
                    <td className="px-5 py-3 text-right text-[12px] whitespace-nowrap text-white/45">
                      {s.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Activity" hint="Pichle 24 ghante" />
          <ul className="space-y-1 px-3 py-3">
            {activity.map((a) => (
              <li
                key={a.text}
                className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.04]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                <div className="min-w-0">
                  <p className="text-[13px] leading-snug text-white/75">
                    {a.text}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/35">{a.time} pehle</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
