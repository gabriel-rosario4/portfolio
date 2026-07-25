import type { Transition, Variants } from "framer-motion";

/**
 * Motion rules for the whole site.
 *
 * Two principles, borrowed from the design brief:
 *   1. Everything decelerates. No spring overshoot, no bounce, no wobble.
 *   2. Motion clarifies arrival — it never performs. If removing an animation
 *      loses no meaning, the animation was too big to begin with.
 */

/** The house curve: fast start, long soft landing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const transitions = {
  /** Hover and press feedback. Must feel instantaneous. */
  quick: { duration: 0.2, ease: EASE },
  /** Default for entrances. */
  base: { duration: 0.5, ease: EASE },
  /** Large elements: hero art, full-width panels. */
  slow: { duration: 0.8, ease: EASE },
} satisfies Record<string, Transition>;

/** Sections and cards rise a short distance as they fade in. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

/** Images and illustrations settle without translating. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
};

/** Content that arrives from the side — hero copy, timeline entries. */
export const slideFrom = (direction: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: direction === "left" ? -24 : 24 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
});

/**
 * Parent for lists. Children inherit `rise` and arrive one after another.
 * 70ms reads as a single gesture; anything slower reads as a slideshow.
 */
export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren },
  },
});

/** Viewport config shared by every scroll-triggered reveal. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" } as const;
