"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, X } from "lucide-react";
import { EASE } from "@/lib/animations";

/* ============================================================
 *  YAHAN APNE OPTIONS KHUD ADD KAR SAKTE HO 👇
 *  Bas nayi line copy karke value/label badal do, jaise:
 *    { label: "Android App", value: "android" },
 *  (comma mat bhoolna)
 * ============================================================ */
const OPTIONS: { label: string; value: string }[] = [
  { label: "iPhone", value: "iphone" },
  { label: "iPad", value: "ipad" },
];

/* Form data yahan POST hota hai — route: app/api/waitlist/route.ts
 * (Nodemailer se seedha aapke Gmail par email jati hai) */
const SUBMIT_URL = "/api/waitlist";

type Props = {
  className?: string;
  label?: string;
  sublabel?: string;
  size?: "sm" | "md";
};

type Errors = Partial<Record<"name" | "email" | "mobile" | "option", string>>;

/**
 * "Join the Waitlist" button — App Store button jaisa dikhne wala pill,
 * click karne par Name / Email / Mobile + options wala form modal khulta hai.
 */
export default function WaitlistButton({
  className = "",
  label = "",
  sublabel = "Log In",
  size = "md",
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [option, setOption] = useState(OPTIONS[0]?.value ?? "");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => setMounted(true), []);

  // Modal ke dauran body scroll lock + Escape se band karo
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pad = size === "sm" ? "px-3 py-1.5 gap-2" : "px-4 py-2 gap-2.5";
  const icon = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const small = size === "sm" ? "text-[8px]" : "text-[9px]";
  const big = size === "sm" ? "text-[13px]" : "text-[15px]";

  function validate(): boolean {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Please enter a valid email";
    if (mobile.replace(/\D/g, "").length < 7)
      next.mobile = "Please enter a valid mobile number";
    if (!option) next.option = "Please pick an option";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    const payload = {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      option,
      message: message.trim(),
    };
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrors({ email: data?.error || "Something went wrong. Please try again." });
        return;
      }
      setDone(true);
    } catch {
      setErrors({ email: "Network error. Please try again." });
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setErrors({});
      setName("");
      setEmail("");
      setMobile("");
      setOption(OPTIONS[0]?.value ?? "");
      setMessage("");
    }, 250);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: EASE }}
        className={`group inline-flex items-center rounded-xl border border-white/15 bg-white text-black shadow-lg shadow-black/30 hover:bg-white/90 ${pad} ${className}`}
        aria-label={`${label} ${sublabel}`.trim()}
      >
        <Mail className={`${icon}`} aria-hidden />
        <span className="flex flex-col items-start leading-none">
          {label && (
            <span className={`${small} font-medium uppercase tracking-wide text-black/70`}>
              {label}
            </span>
          )}
          <span className={`${big} font-semibold tracking-tight`}>{sublabel}</span>
        </span>
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
                onClick={reset}
                role="dialog"
                aria-modal="true"
                aria-label="Join the waitlist"
              >
                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                  className="grain relative w-full max-w-md overflow-hidden rounded-3xl border border-white/12 bg-neutral-900/95 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-7"
                >
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Close"
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {done ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15">
                        <Check className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold tracking-tight">
                        You&rsquo;re on the list!
                      </h3>
                      <p className="mt-2 text-sm text-white/55">
                        Thanks{name ? `, ${name.split(" ")[0]}` : ""} — we&rsquo;ll email you at{" "}
                        <span className="text-white/80">{email}</span> when it&rsquo;s your turn.
                      </p>
                      <button
                        type="button"
                        onClick={reset}
                        className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold tracking-tight">Join the waitlist</h3>
                      <p className="mt-1 text-sm text-white/50">
                        Be first to know when we launch.
                      </p>

                      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                        <Field
                          id="wl-name"
                          label="Name"
                          error={errors.name}
                          input={
                            <input
                              id="wl-name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your name"
                              autoComplete="name"
                              className={inputCls}
                            />
                          }
                        />
                        <Field
                          id="wl-email"
                          label="Email"
                          error={errors.email}
                          input={
                            <input
                              id="wl-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              autoComplete="email"
                              className={inputCls}
                            />
                          }
                        />
                        <Field
                          id="wl-mobile"
                          label="Mobile No"
                          error={errors.mobile}
                          input={
                            <input
                              id="wl-mobile"
                              type="tel"
                              inputMode="tel"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              placeholder="+91 98765 43210"
                              autoComplete="tel"
                              className={inputCls}
                            />
                          }
                        />

                        {OPTIONS.length > 0 && (
                          <fieldset>
                            <legend className="text-xs font-medium uppercase tracking-wider text-white/40">
                              Option
                            </legend>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {OPTIONS.map((o) => (
                                <button
                                  key={o.value}
                                  type="button"
                                  onClick={() => setOption(o.value)}
                                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                                    option === o.value
                                      ? "bg-accent font-medium text-accent-foreground"
                                      : "bg-white/8 text-white/70 hover:bg-white/12 hover:text-white"
                                  }`}
                                >
                                  {o.label}
                                </button>
                              ))}
                            </div>
                            {errors.option && <ErrorMsg>{errors.option}</ErrorMsg>}
                          </fieldset>
                        )}

                        <Field
                          id="wl-message"
                          label="Message (optional)"
                          input={
                            <textarea
                              id="wl-message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Feedback, feature request ya kuch bhi…"
                              rows={3}
                              maxLength={1000}
                              className={`${inputCls} resize-none`}
                            />
                          }
                        />

                        <button
                          type="submit"
                          disabled={sending}
                          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-[15px] font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-60"
                        >
                          {sending ? "Sending…" : "Submit"}
                        </button>
                      </form>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.06]";

function Field({
  id,
  label,
  input,
  error,
}: {
  id: string;
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-white/40">
        {label}
      </label>
      <div className="mt-1.5">{input}</div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-rose-400">{children}</p>;
}
