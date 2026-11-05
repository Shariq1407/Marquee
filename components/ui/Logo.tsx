type Props = {
  className?: string;
  size?: number;
  withWordmark?: boolean;
  wordmarkClassName?: string;
};

/**
 * Marquee brand mark: a stylised cinema marquee / play glyph in a rounded
 * amber tile. Original artwork, drawn as inline SVG.
 */
export default function Logo({
  className = "",
  size = 30,
  withWordmark = true,
  wordmarkClassName = "",
}: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative inline-grid place-items-center rounded-[0.6rem] bg-gradient-to-br from-accent to-amber-600 shadow-[0_6px_20px_-6px_rgba(241,156,41,0.7)]"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Play triangle */}
          <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#0f0f0f" />
        </svg>
      </span>
      {withWordmark && (
        <span
          className={`text-[19px] font-semibold tracking-tightest text-foreground ${wordmarkClassName}`}
        >
          Marquee
        </span>
      )}
    </span>
  );
}
