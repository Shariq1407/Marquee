import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { Status } from "@/admin/data";

/* ------------------------------------------------------------------ *
 * Admin panel ke chhote shared UI atoms — taaki har view me
 * cards, pills aur badges ka look bilkul consistent rahe.
 * ------------------------------------------------------------------ */

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-secondary/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] ${className}`}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-4">
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-white/45">{hint}</p>}
      </div>
      {action}
    </header>
  );
}

const STATUS_STYLES: Record<Status, string> = {
  active: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  pending: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  invited: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  inactive: "border-white/[0.12] bg-white/[0.05] text-white/45",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${STATUS_STYLES[status]}`}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
      />
      {status}
    </span>
  );
}

const PLAN_STYLES: Record<string, string> = {
  Pro: "border-accent/30 bg-accent/[0.12] text-accent",
  Team: "border-violet-400/25 bg-violet-400/10 text-violet-300",
  Free: "border-white/[0.12] bg-white/5 text-white/60",
};

export function PlanPill({ plan }: { plan: string }) {
  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium ${PLAN_STYLES[plan] ?? PLAN_STYLES.Free}`}
    >
      {plan}
    </span>
  );
}

const AVATAR_TONES = [
  "from-amber-500/80 to-orange-700/80",
  "from-sky-500/80 to-blue-700/80",
  "from-violet-500/80 to-purple-700/80",
  "from-emerald-500/80 to-teal-700/80",
  "from-rose-500/80 to-pink-700/80",
];

export function Avatar({
  name,
  size = "h-9 w-9 text-xs",
}: {
  name: string;
  size?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tone = AVATAR_TONES[name.charCodeAt(0) % AVATAR_TONES.length];

  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-semibold text-white/90 ring-1 ring-white/10 ${size} ${tone}`}
    >
      {initials}
    </span>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300 ${
        checked
          ? "border-accent/50 bg-accent/80"
          : "border-white/[0.12] bg-white/[0.08]"
      }`}
    >
      <span
        className="absolute top-0.5 grid place-items-center rounded-full bg-white text-[10px] text-black transition-all duration-300"
        style={{
          height: "1.1rem",
          width: "1.1rem",
          left: checked ? "calc(100% - 1.2rem)" : "0.125rem",
        }}
      >
        {checked && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
      </span>
    </button>
  );
}
