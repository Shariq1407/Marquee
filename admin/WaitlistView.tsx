"use client";

import { useMemo, useState } from "react";
import {
  Ban,
  Check,
  Download,
  Loader2,
  MailPlus,
  RefreshCw,
  Search,
  UserSearch,
  X,
} from "lucide-react";
import type { Status } from "@/admin/data";
import { updateWaitlistStatus, useWaitlist } from "@/admin/store";
import { Avatar, Card, CardHeader, PlanPill, StatusPill } from "@/admin/ui";

/* ------------------------------------------------------------------ *
 * Waitlist — Firestore ke `waitlist` collection se live data padhta
 * hai. Search, status filters, poora users table aur asli CSV export
 * (Blob se download hota hai, koi server nahi).
 * ------------------------------------------------------------------ */

const FILTERS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "Sabhi" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "invited", label: "Invited" },
  { key: "inactive", label: "Inactive" },
];

export default function WaitlistView() {
  const { signups, loading, error } = useWaitlist();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [exported, setExported] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  /** Pending user ko Accept (active) ya Invite karke Firestore me save. */
  const changeStatus = async (id: string, next: Status) => {
    setSavingId(id);
    setActionError(null);
    try {
      await updateWaitlistStatus(id, next);
    } catch (err) {
      console.error("Status update failed:", err);
      setActionError(
        "Status update nahi ho paya — Firestore rules ya network check karo."
      );
    } finally {
      setSavingId(null);
    }
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return signups.filter((s) => {
      const okStatus = status === "all" || s.status === status;
      const okQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.source.toLowerCase().includes(q);
      return okStatus && okQuery;
    });
  }, [query, status, signups]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: signups.length };
    for (const s of signups) c[s.status] = (c[s.status] ?? 0) + 1;
    return c;
  }, [signups]);

  /** Pichle 7 din me aaye signups. */
  const thisWeek = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return signups.filter((s) => {
      const t = new Date(s.joinedAt).getTime();
      return !Number.isNaN(t) && t >= cutoff;
    }).length;
  }, [signups]);

  const exportCsv = () => {
    const header = ["Name", "Email", "Plan", "Status", "Source", "Joined"];
    const body = rows.map((r) =>
      [r.name, r.email, r.plan, r.status, r.source, r.joinedAt]
        .map((v) => `"${v}"`)
        .join(",")
    );
    const csv = [header.join(","), ...body].join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "marquee-waitlist.csv";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2200);
  };

  return (
    <div className="space-y-4">
      {/* Summary strip — Firestore ke asli numbers */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total signups", value: signups.length.toLocaleString("en-IN") },
          { label: "Pending", value: String(counts.pending ?? 0) },
          { label: "Is hafte naye", value: thisWeek.toLocaleString("en-IN") },
        ].map((s) => (
          <Card key={s.label} className="px-5 py-4">
            <p className="text-[13px] text-white/50">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
              {s.value}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Users"
          hint={
            loading
              ? "Firestore se load ho raha hai…"
              : `${rows.length} me se ${signups.length} records dikh rahe`
          }
          action={
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-white/75 transition-colors hover:border-accent/40 hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              {exported ? "Download ho gaya ✓" : "Export CSV"}
            </button>
          }
        />

        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Naam, email ya source dhoondo…"
              className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] py-2.5 pl-9 pr-9 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-accent/50"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const on = f.key === status;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setStatus(f.key)}
                  className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    on
                      ? "border-accent/50 bg-accent/[0.12] text-accent"
                      : "border-white/[0.12] text-white/55 hover:border-white/25 hover:text-white/85"
                  }`}
                >
                  {f.label}
                  <span className="ml-1.5 text-[11px] text-white/40">
                    {counts[f.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action ka error (agar Firestore write fail ho) */}
        {actionError && !loading && !error && (
          <p className="border-b border-white/[0.08] px-5 py-3 text-[13px] text-rose-300">
            {actionError}
          </p>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
            <Loader2 className="h-6 w-6 animate-spin text-accent" aria-hidden />
            <p className="text-sm text-white/55">Firestore se signups load ho rahe hain…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-rose-400/25 bg-rose-400/10 text-rose-300">
              <RefreshCw className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-white/80">Data nahi mila</p>
            <p className="max-w-sm text-[13px] text-white/45">{error}</p>
          </div>
        ) : rows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-white/35">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-3 py-3 font-medium">Plan</th>
                  <th className="px-3 py-3 font-medium">Source</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Message</th>
                  <th className="px-3 py-3 font-medium">Action</th>
                  <th className="px-5 py-3 text-right font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {rows.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.name} />
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
                    <td className="px-3 py-3.5">
                      <PlanPill plan={s.plan} />
                    </td>
                    <td className="px-3 py-3.5 text-[13px] text-white/55">
                      {s.source}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusPill status={s.status} />
                    </td>
                    <td className="px-3 py-3.5">
                      {s.status === "pending" ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={savingId === s.id}
                            onClick={() => void changeStatus(s.id, "active")}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[12px] font-medium text-emerald-300 transition-colors hover:bg-emerald-400/20 disabled:opacity-60"
                          >
                            {savingId === s.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
                            ) : (
                              <Check className="h-3 w-3" aria-hidden />
                            )}
                            Accept
                          </button>
                          <button
                            type="button"
                            disabled={savingId === s.id}
                            onClick={() => void changeStatus(s.id, "invited")}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/25 bg-sky-400/10 px-2.5 py-1.5 text-[12px] font-medium text-sky-300 transition-colors hover:bg-sky-400/20 disabled:opacity-60"
                          >
                            <MailPlus className="h-3 w-3" aria-hidden />
                            Invite
                          </button>
                        </div>
                      ) : s.status === "active" || s.status === "invited" ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] text-white/30">
                            {s.status === "active" ? "Accepted ✓" : "Invited ✓"}
                          </span>
                          <button
                            type="button"
                            disabled={savingId === s.id}
                            onClick={() => void changeStatus(s.id, "inactive")}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-2.5 py-1.5 text-[12px] font-medium text-white/55 transition-colors hover:border-rose-400/30 hover:text-rose-300 disabled:opacity-60"
                          >
                            <Ban className="h-3 w-3" aria-hidden />
                            Inactive
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={savingId === s.id}
                          onClick={() => void changeStatus(s.id, "active")}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[12px] font-medium text-emerald-300 transition-colors hover:bg-emerald-400/20 disabled:opacity-60"
                        >
                          {savingId === s.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
                          ) : (
                            <Check className="h-3 w-3" aria-hidden />
                          )}
                          Reactivate
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-3.5 text-[12px] text-white/80 max-w-[220px] truncate">
                      {s.message || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right text-[12px] whitespace-nowrap text-white/45">
                      {s.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white/40">
              <UserSearch className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-white/80">
              {signups.length === 0
                ? "Abhi tak koi signup nahi"
                : "Koi user nahi mila"}
            </p>
            <p className="max-w-xs text-[13px] text-white/45">
              {signups.length === 0
                ? "Website ka waitlist form bharte hi user yahan dikhne lagenge."
                : `“${query}” ke liye koi match nahi — search badlo ya filter reset karo.`}
            </p>
            {signups.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setStatus("all");
                }}
                className="mt-1 rounded-full border border-white/[0.12] px-4 py-2 text-[13px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                Reset karo
              </button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
