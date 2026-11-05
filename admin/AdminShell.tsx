"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Clapperboard,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Avatar } from "@/admin/ui";
import { activity } from "@/admin/data";
import { auth } from "@/lib/firebase-auth";
import { EASE } from "@/lib/animations";

export type NavKey = "overview" | "request" | "waitlist" | "titles" | "settings";

export const NAV: {
  key: NavKey;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "request", label: "Request", icon: Inbox },
  { key: "waitlist", label: "Waitlist", icon: Users, badge: "918" },
  { key: "titles", label: "Title library", icon: Clapperboard },
  { key: "settings", label: "Settings", icon: Settings },
];

export const PAGE_META: Record<NavKey, { title: string; desc: string }> = {
  overview: {
    title: "Overview",
    desc: "Marquee ki performance ka aaj ka snapshot",
  },
  request: {
    title: "Request",
    desc: "Aane wali requests dekho aur approve / reject karo",
  },
  waitlist: {
    title: "Waitlist & users",
    desc: "Signups dekho, filter karo aur CSV export karo",
  },
  titles: {
    title: "Title library",
    desc: "App ke movies aur series ka catalog",
  },
  settings: {
    title: "Settings",
    desc: "Panel, notifications aur SMTP configuration",
  },
};

/** Admin panel ka frame — fixed sidebar, topbar aur content slot. */
export default function AdminShell({
  active,
  onNavigate,
  children,
}: {
  active: NavKey;
  onNavigate: (k: NavKey) => void;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@marquee-app.com");
  const bellRef = useRef<HTMLDivElement>(null);
  const meta = PAGE_META[active];

  // Logged-in admin ka asli email dikhao (Firebase session se).
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u?.email) setAdminEmail(u.email);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (k: NavKey) => {
    onNavigate(k);
    setMobileOpen(false);
  };

  const navList = (
    <nav className="flex flex-col gap-1">
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
        Menu
      </p>
      {NAV.map((item) => {
        const Icon = item.icon;
        const on = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => go(item.key)}
            aria-current={on ? "page" : undefined}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              on
                ? "bg-accent/[0.12] text-white"
                : "text-white/55 hover:bg-white/5 hover:text-white/90"
            }`}
          >
            {on && (
              <motion.span
                layoutId="nav-pill"
                aria-hidden
                className="absolute inset-0 rounded-xl border border-accent/30 bg-accent/10"
                transition={{ duration: 0.3, ease: EASE }}
              />
            )}
            <Icon
              className={`relative h-4 w-4 ${on ? "text-accent" : ""}`}
              strokeWidth={1.9}
            />
            <span className="relative flex-1 text-left font-medium">
              {item.label}
            </span>
            {item.badge && (
              <span className="relative rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-semibold text-white/60">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  const sidebarFoot = (
    <div className="mt-auto space-y-3">
      <a
        href="/"
        className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white/55 transition-colors hover:border-white/15 hover:text-white/90"
      >
        <ExternalLink className="h-4 w-4" strokeWidth={1.9} />
        Website par wapas
      </a>
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] px-3 py-3">
        <Avatar name="Marquee Admin" size="h-9 w-9 text-[11px]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white/90">
            Marquee Admin
          </p>
          <p className="truncate text-[11px] text-white/40">{adminEmail}</p>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-white/[0.08] bg-[#0c0c0c] px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo />
          <span className="ml-2 align-middle rounded-md border border-accent/30 bg-accent/[0.12] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Admin
          </span>
        </div>
        <div className="mt-8 flex flex-1 flex-col">{navList}</div>
        <div className="flex flex-col">{sidebarFoot}</div>
      </aside>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="fixed inset-y-0 left-0 z-50 flex w-[276px] flex-col border-r border-white/[0.12] bg-[#0c0c0c] px-4 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between px-2">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-white/60 hover:bg-white/5"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>
              <div className="mt-8 flex flex-1 flex-col">{navList}</div>
              <div className="flex flex-col">{sidebarFoot}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ---------- Main column ---------- */}
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-background/75 backdrop-blur-xl">
          <div className="mx-auto flex h-[74px] w-full max-w-[1240px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/70 lg:hidden"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] text-white/35">
                <span>Admin</span>
                <span aria-hidden>/</span>
                <span className="text-accent/80">{meta.title}</span>
              </div>
              <h1 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
                {meta.title}
              </h1>
            </div>

            <span className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300 sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              All systems operational
            </span>

            {/* Notifications */}
            <div ref={bellRef} className="relative">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={bellOpen}
                onClick={() => setBellOpen((v) => !v)}
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/70 transition-colors hover:border-white/20 hover:text-white"
              >
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-background" />
              </button>
              <AnimatePresence>
                {bellOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute right-0 top-full z-50 mt-2 w-[300px] overflow-hidden rounded-2xl border border-white/[0.12] bg-neutral-900/[0.97] shadow-2xl backdrop-blur-xl"
                  >
                    <p className="border-b border-white/[0.08] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Recent activity
                    </p>
                    <ul className="max-h-[300px] overflow-y-auto p-2">
                      {activity.map((a) => (
                        <li
                          key={a.text}
                          className="flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-white/[0.04]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                          <div className="min-w-0">
                            <p className="text-[13px] leading-snug text-white/80">
                              {a.text}
                            </p>
                            <p className="mt-0.5 text-[11px] text-white/35">
                              {a.time} pehle
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Avatar name="Marquee Admin" size="h-10 w-10 text-xs" />
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1240px] px-4 pb-16 pt-7 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm text-white/45">{meta.desc}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
