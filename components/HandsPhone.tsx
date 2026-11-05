import Image from "next/image";

type Props = {
  /** Tailwind width for the photo, e.g. "w-[320px] sm:w-[460px]" */
  width?: string;
  className?: string;
};

/** Soft fade so the cut wrists/fingers melt into the dark hero background. */
const EDGE_FADE =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

/**
 * Hero centerpiece: a photo of hands holding an iPhone that already shows the
 * Marquee app UI. Transparent webp, so it sits naturally on the dark hero.
 */
export default function HandsPhone({
  width = "w-full max-w-[960px]",
  className = "",
}: Props) {
  return (
    <div
      className={`relative ${width} ${className}`}
      style={{
        maskImage: EDGE_FADE,
        WebkitMaskImage: EDGE_FADE,
      }}
    >
      <Image
        src="/iphone-hands.webp"
        alt="Hands holding an iPhone showing the Marquee app"
        width={3680}
        height={2760}
        priority
        sizes="(max-width: 1000px) 100vw, 960px"
        className="h-auto w-full"
      />
    </div>
  );
}
