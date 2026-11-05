import type { Variants } from "framer-motion";

/** Common ease used across the site for a premium, intentional feel. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Parent container that staggers its children. */
export const stagger = (
  staggerChildren = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Viewport trigger config for scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportAmount = (amount: number) =>
  ({ once: true, amount }) as const;

/** Wraps children in a motion container that plays `variant` when in view. */
export const inViewProps = (variants: Variants, amount = 0.25) => ({
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, amount },
  variants,
});
