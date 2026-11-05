"use client";

import { useState } from "react";
import { Check, Mail, Server, ShieldAlert } from "lucide-react";
import { Card, CardHeader, Toggle } from "@/admin/ui";

/* ------------------------------------------------------------------ *
 * Settings — general details, notification toggles, SMTP status aur
 * danger zone. Sab kuch local state hai (demo panel).
 * ------------------------------------------------------------------ */

type Prefs = {
  signupEmail: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
  maintenance: boolean;
};

export default function SettingsView() {
  const [siteName, setSiteName] = useState("Marquee");
  const [tagline, setTagline] = useState("Movie & TV show tracker for iPhone");
  const [notifyEmail, setNotifyEmail] = useState("admin@marquee-app.com");
  const [prefs, setPrefs] = useState<Prefs>({
    signupEmail: true,
    weeklyDigest: true,
    productUpdates: false,
    maintenance: false,
  });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof Prefs) => (v: boolean) =>
    setPrefs((p) => ({ ...p, [k]: v }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  const inputCls =
    "w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent/50";

  const notifRows: { key: keyof Prefs; title: string; desc: string }[] = [
    {
      key: "signupEmail",
      title: "Naye signup ki email",
      desc: "Jaise hi koi waitlist form bhare, NOTIFY_EMAIL par notification jaaye",
    },
    {
      key: "weeklyDigest",
      title: "Weekly digest",
      desc: "Har somvaar stats ka summary email",
    },
    {
      key: "productUpdates",
      title: "Product updates",
      desc: "Naye features aur release notes bhejo",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* General */}
        <Card className="lg:col-span-2">
          <CardHeader title="General" hint="Website aur panel ki basic details" />
          <div className="space-y-5 px-5 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-white/55">
                  Site name
                </span>
                <input
                  className={inputCls}
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-white/55">
                  Notify email
                </span>
                <input
                  type="email"
                  className={inputCls}
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-white/55">
                Tagline
              </span>
              <textarea
                rows={3}
                className={`${inputCls} resize-none`}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </label>

            <div className="flex items-center justify-end gap-3 border-t border-white/[0.06] pt-4">
              <span
                className={`text-[13px] text-emerald-300 transition-opacity duration-300 ${
                  saved ? "opacity-100" : "opacity-0"
                }`}
              >
                Changes save ho gaye ✓
              </span>
              <button
                type="button"
                onClick={save}
                className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                Save changes
              </button>
            </div>
          </div>
        </Card>

        {/* SMTP */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="Email (SMTP)" hint="Nodemailer configuration" />
            <div className="space-y-3 px-5 py-5">
              <div className="flex items-center gap-2 text-[13px] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.45)]" />
                Connected
              </div>
              {[
                { icon: Server, label: "Host", value: "smtp.gmail.com" },
                { icon: Server, label: "Port", value: "465 (SSL)" },
                { icon: Mail, label: "From", value: "Marquee Website" },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.label}
                    className="flex items-center justify-between text-[13px]"
                  >
                    <span className="flex items-center gap-2 text-white/45">
                      <Icon className="h-3.5 w-3.5" />
                      {r.label}
                    </span>
                    <span className="font-medium text-white/80">{r.value}</span>
                  </div>
                );
              })}
              <p className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-[11px] leading-relaxed text-white/45">
                Credentials .env se aate hain (SMTP_USER / SMTP_PASS) — panel me
                kabhi expose nahi hote.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader title="Notifications" hint="Kab emails jaane chahiye" />
        <ul className="divide-y divide-white/[0.06]">
          {notifRows.map((row) => (
            <li
              key={row.key}
              className="flex items-center justify-between gap-6 px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium text-white/90">{row.title}</p>
                <p className="mt-0.5 text-[12px] text-white/45">{row.desc}</p>
              </div>
              <Toggle
                label={row.title}
                checked={prefs[row.key]}
                onChange={set(row.key)}
              />
            </li>
          ))}
        </ul>
      </Card>

      {/* Danger zone */}
      <Card className="border-rose-400/25">
        <CardHeader title="Danger zone" hint="In changes se live site affect hoti hai" />
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-rose-400/25 bg-rose-400/10 text-rose-300">
              <ShieldAlert className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-white/90">Maintenance mode</p>
              <p className="mt-0.5 max-w-md text-[12px] text-white/45">
                Chalu karne par website par waitlist form band ho jayega aur users
                ko ek maintenance page dikhega.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-[12px] font-medium ${
                prefs.maintenance ? "text-rose-300" : "text-white/45"
              }`}
            >
              {prefs.maintenance ? "Band hai" : "Chalu hai"}
            </span>
            <Toggle
              label="Maintenance mode"
              checked={prefs.maintenance}
              onChange={set("maintenance")}
            />
          </div>
        </div>
      </Card>

      <p className="flex items-center gap-2 text-[12px] text-white/35">
        <Check className="h-3.5 w-3.5 text-emerald-400" />
        Panel build v1.4.0 par · sab kuch theek chal raha hai
      </p>
    </div>
  );
}
