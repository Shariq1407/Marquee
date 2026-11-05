import type { ReactNode } from "react";
import { Home, Search, Calendar, BarChart3, Bookmark } from "lucide-react";

type Props = {
  children: ReactNode;
  title?: string;
  /** Renders a bottom tab bar like the real app */
  tabBar?: boolean;
  activeTab?: "home" | "search" | "calendar" | "stats" | "list";
  className?: string;
  /** Extra element pinned under the header (e.g. season chips) */
  belowHeader?: ReactNode;
};

const TABS = [
  { key: "home", label: "Home", Icon: Home },
  { key: "search", label: "Discover", Icon: Search },
  { key: "calendar", label: "Calendar", Icon: Calendar },
  { key: "stats", label: "Stats", Icon: BarChart3 },
  { key: "list", label: "Library", Icon: Bookmark },
] as const;

/**
 * Shared chrome for every in-app screen mockup: an iOS-style large title
 * header, scrollable content area and an optional bottom tab bar.
 */
export default function ScreenShell({
  children,
  title,
  tabBar = true,
  activeTab = "home",
  belowHeader,
  className = "",
}: Props) {
  return (
    <div className={`flex h-full flex-col ${className}`}>
      {title && (
        <div className="shrink-0 px-5 pb-2 pt-11">
          <h3 className="text-[22px] font-bold leading-tight tracking-tight text-white">
            {title}
          </h3>
        </div>
      )}

      {belowHeader}

      <div className="min-h-0 flex-1 overflow-hidden px-5">{children}</div>

      {tabBar && (
        <nav className="flex shrink-0 items-center justify-around border-t border-white/10 bg-black/40 px-2 pb-5 pt-2 backdrop-blur">
          {TABS.map(({ key, label, Icon }) => {
            const active = key === activeTab;
            return (
              <div
                key={key}
                className="flex flex-col items-center gap-1"
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={`h-[18px] w-[18px] ${
                    active ? "text-accent" : "text-white/45"
                  }`}
                />
                <span
                  className={`text-[8px] font-medium ${
                    active ? "text-accent" : "text-white/45"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </nav>
      )}

      {/* Home indicator */}
      <div className="pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/40" />
    </div>
  );
}
