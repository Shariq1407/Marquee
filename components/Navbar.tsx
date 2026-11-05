"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WaitlistButton from "@/components/ui/WaitlistButton";
import { EASE } from "@/lib/animations";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#hub" },
  { label: "Privacy", href: "#privacy" },
  { label: "FAQ", href: "#faq" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
];

/** Floating pill navigation with blur-on-scroll, language menu and mobile sheet. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav
        aria-label="Main"
        className={`relative mx-auto flex h-16 w-fit max-w-full items-center gap-3 rounded-full border px-5 transition-all duration-500 ${
          scrolled
            ? "border-white/12 bg-background/80 shadow-xl shadow-black/40 backdrop-blur-xl"
            : "border-white/5 bg-background/40 backdrop-blur-md"
        }`}
      >
        <a href="#top" aria-label="Marquee home">
          <Logo />
        </a>

        {/* Desktop links */}
        <ul className="ml-4 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language dropdown */}
        <div ref={langRef} className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            {lang.code.toUpperCase()}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${
                langOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.ul
                role="listbox"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-white/12 bg-neutral-900/95 p-1 shadow-2xl backdrop-blur-xl"
              >
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={l.code === lang.code}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/8 hover:text-white"
                    >
                      {l.label}
                      {l.code === lang.code && (
                        <Check className="h-3.5 w-3.5 text-accent" />
                      )}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-1 hidden md:block">
          <WaitlistButton size="sm" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="ml-1 grid h-10 w-10 place-items-center rounded-full text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="mx-4 mt-4 rounded-3xl border border-white/12 bg-neutral-900/95 p-5 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full text-white/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-4 space-y-1">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-3 py-3 text-lg text-white/85 transition-colors hover:bg-white/5"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="px-3 text-xs uppercase tracking-wider text-white/40">
                  Language
                </p>
                <div className="mt-2 flex flex-wrap gap-2 px-1">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l)}
                      className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                        l.code === lang.code
                          ? "bg-accent text-accent-foreground"
                          : "bg-white/8 text-white/70"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <WaitlistButton className="mt-5 w-full justify-center" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
