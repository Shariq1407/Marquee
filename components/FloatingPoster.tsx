"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { byId } from "@/lib/data";
import PosterImage from "@/components/ui/PosterImage";
import { EASE } from "@/lib/animations";

type Props = {
  id: string;
  /** Tailwind positioning classes, e.g. "left-[6%] top-4" */
  className?: string;
  delay?: number;
  size?: string;
};

/**
 * A small poster card that gently floats around the hero devices.
 * Positioning is fully caller-controlled via `className` (e.g. "absolute left-2 top-4"
 * for the desktop decorations, or "relative" for the mobile in-flow row).
 */
export default function FloatingPoster({
  id,
  className = "",
  delay = 0,
  size = "w-24",
}: Props) {
  const t = byId(id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
        className={`${size} overflow-hidden rounded-xl border border-white/12 shadow-2xl shadow-black/60`}
        style={{
          backgroundImage: `linear-gradient(150deg, ${t.tint[0]}, ${t.tint[1]})`,
        }}
      >
        <div className="relative aspect-[2/3] w-full">
          <PosterImage src={t.poster} alt={t.name} sizes="120px" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-1.5 px-2">
            <p className="truncate text-[9px] font-semibold text-white">
              {t.name}
            </p>
            <span className="flex items-center gap-0.5 text-[8px] text-accent">
              <Star className="h-2 w-2 fill-current" />
              {t.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
