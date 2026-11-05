import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Tailwind width class, e.g. "w-[260px]" */
  width?: string;
  className?: string;
  /** Hide the status bar for compact in-content phones */
  showStatus?: boolean;
  screenClassName?: string;
};

/**
 * A realistic iPhone frame built entirely with CSS: rounded bezel, dynamic
 * island, edge highlights and a glassy screen. Children render inside the screen.
 */
export default function PhoneFrame({
  children,
  width = "w-[260px]",
  className = "",
  showStatus = true,
  screenClassName = "",
}: Props) {
  return (
    <div
      className={`relative shrink-0 ${width}`}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      {/* Outer bezel */}
      <div
        className={`absolute inset-0 rounded-[2.6rem] border border-white/15 bg-gradient-to-b from-neutral-700/70 via-neutral-900 to-black p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] ${className}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-black">
          {/* Screen */}
          <div
            className={`relative h-full w-full overflow-hidden bg-[#0b0b0d] ${screenClassName}`}
          >
            {showStatus && (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-white/90">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span className="flex items-end gap-[1.5px]">
                    <span className="h-1 w-[2px] rounded-sm bg-white/80" />
                    <span className="h-1.5 w-[2px] rounded-sm bg-white/80" />
                    <span className="h-2 w-[2px] rounded-sm bg-white/80" />
                    <span className="h-2.5 w-[2px] rounded-sm bg-white/40" />
                  </span>
                  <span className="ml-0.5 h-2.5 w-5 rounded-[3px] border border-white/50 p-[1.5px]">
                    <span className="block h-full w-3/4 rounded-[1px] bg-white/80" />
                  </span>
                </span>
              </div>
            )}

            {/* Dynamic island */}
            <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />

            {children}

            {/* Screen edge glass reflection */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-40 rounded-[2.35rem] ring-1 ring-inset ring-white/10"
            />
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div
        aria-hidden
        className="absolute -left-[2px] top-[18%] h-8 w-[3px] rounded-l bg-neutral-700"
      />
      <div
        aria-hidden
        className="absolute -left-[2px] top-[28%] h-12 w-[3px] rounded-l bg-neutral-700"
      />
      <div
        aria-hidden
        className="absolute -right-[2px] top-[24%] h-14 w-[3px] rounded-r bg-neutral-700"
      />
    </div>
  );
}
