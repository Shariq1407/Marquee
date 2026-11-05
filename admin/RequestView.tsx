"use client";

import { useMemo, useState } from "react";
import { Check, Inbox, X } from "lucide-react";
import { initialRequests, type AdminRequest, type RequestStatus } from "@/admin/data";
import { Avatar, Card, CardHeader } from "@/admin/ui";

/* ------------------------------------------------------------------ *
 * Request — Overview ke neeche wala "Request" option. Aane wali
 * requests (waitlist access, feature ideas, bugs, partnerships) ko
 * approve/reject karo. Sab local state hai (demo panel).
 * ------------------------------------------------------------------ */

const FILTERS: { key: RequestStatus | "all"; label: string }[] = [
  { key: "all", label: "Sabhi" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const TYPE_STYLES: Record<string, string> = {
  "Waitlist access": "border-accent/30 bg-accent/[0.12] text-accent",
  "Feature request": "border-sky-400/25 bg-sky-400/10 text-sky-300",
  "Bug report": "border-rose-400/25 bg-rose-400/10 text-rose-300",
  Partnership: "border-violet-400/25 bg-violet-400/10 text-violet-300",
};

export default function RequestView() {
  const [items, setItems] = useState<AdminRequest[]>(initialRequests);
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length, pending: 0, approved: 0, rejected: 0 };
    for (const r of items) c[r.status] += 1;
    return c;
  }, [items]);    const rows = useMemo(
    () => (filter === "all" ? items : items.filter((r: AdminRequest) => r.status === filter)),
    [items, filter]
  );

  const decide = (id: string, status: RequestStatus) =>
    setItems((prev: AdminRequest[]) =>
      prev.map((r) => (r.id === id ? ({ ...r, status } as AdminRequest) : r))
    );

  const summary = [
    { label: "Pending", value: counts.pending, tone: "text-amber-300" },
    { label: "Approved", value: counts.approved, tone: "text-emerald-300" },
    { label: "Rejected", value: counts.rejected, tone: "text-rose-300" },
  ];

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((s) => (
          <Card key={s.label} className="px-5 py-4">
            <p className="text-[13px] text-white/50">{s.label}</p>
            <p className={`mt-1 text-2xl font-semibold tracking-tight ${s.tone}`}>
              {s.value}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Requests"
          hint={`${counts.pending} pending — baaki decide ho chuki hain`}
          action={
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => {
                const on = f.key === filter;
                const n =
                  f.key === "all" ? counts.all : counts[f.key as RequestStatus];
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                      on
                        ? "border-accent/50 bg-accent/[0.12] text-accent"
                        : "border-white/[0.12] text-white/55 hover:border-white/25 hover:text-white/85"
                    }`}
                  >
                    {f.label}
                    <span className="ml-1.5 text-[11px] text-white/40">{n}</span>
                  </button>
                );
              })}
            </div>
          }
        />

        {rows.length > 0 ? (
          <ul className="divide-y divide-white/[0.06]">
            {rows.map((r: AdminRequest, i: number) => (
              <li
                key={r.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-white/[0.03] lg:flex-row lg:items-center lg:gap-5"
              >
                <span className="hidden w-6 shrink-0 text-right text-[11px] tabular-nums text-white/35 lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Avatar name={r.name} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13px] font-medium text-white/90">
                      {r.name}
                    </p>
                    <span
                      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] ${TYPE_STYLES[r.type] ?? "border-white/[0.12] bg-white/[0.04] text-white/60"}`}
                    >
                      {r.type}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-white/60">
                    {r.message}
                  </p>
                  <p className="mt-1 text-[11px] text-white/35">
                    {r.email} · {r.received}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {r.status === "pending" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => decide(r.id, "approved")}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[13px] font-medium text-emerald-300 transition-colors hover:bg-emerald-400/20"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => decide(r.id, "rejected")}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-[13px] font-medium text-rose-300 transition-colors hover:bg-rose-400/20"
                      >
                        <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => decide(r.id, "pending")}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium capitalize ${
                        r.status === "approved"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border-rose-400/30 bg-rose-400/10 text-rose-300"
                      }`}
                    >
                      {r.status}
                      <span className="text-white/40">↺</span>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white/40">
              <Inbox className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-white/80">
              Is filter me koi request nahi
            </p>
            <p className="max-w-xs text-[13px] text-white/45">
              Filter badlo — saari requests &ldquo;Sabhi&rdquo; me dikh jayengi.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-1 rounded-full border border-white/[0.12] px-4 py-2 text-[13px] text-white/70 transition-colors hover:border-accent/40 hover:text-white"
            >
              Sabhi dikhao
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
