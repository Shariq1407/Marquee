import { Twitter, Github, Instagram, Youtube } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WaitlistButton from "@/components/ui/WaitlistButton";

const PRODUCT = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#hub" },
  { label: "Widgets", href: "#widgets" },
  { label: "FAQ", href: "#faq" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Support", href: "#" },
];

const SOCIAL = [
  { label: "Twitter", Icon: Twitter, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "YouTube", Icon: Youtube, href: "#" },
  { label: "GitHub", Icon: Github, href: "#" },
];

/** Site footer with brand, navigation, legal and social links. */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-content px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              A beautiful movie &amp; TV show tracker for iPhone. Discover,
              watch, and track everything in one place — privately.
            </p>
            <div className="mt-6">
              <WaitlistButton size="sm" />
            </div>
          </div>

          {/* Product */}
          <nav aria-label="Product">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {PRODUCT.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Follow
            </h3>
            <div className="mt-4 flex gap-2">
              {SOCIAL.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/55 transition-colors hover:border-accent/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/45">
              Available on the App Store.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Marquee. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-6 text-xs text-white/35">
            <a href="#" className="transition-colors hover:text-white/70">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Terms
            </a>
            <a href="#faq" className="transition-colors hover:text-white/70">
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
