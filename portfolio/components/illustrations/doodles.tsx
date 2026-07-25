import { cn } from "@/lib/utils";

/**
 * Small hand-drawn marks used to give sections their own character.
 *
 * They are deliberately imperfect: uneven stroke lengths, curves that don't
 * quite close. That irregularity is the point — it's what separates a curated
 * page from a generated one. All of them inherit `currentColor`.
 */

type MarkProps = { className?: string };

/** Four-pointed sparkle. Sits beside "Featured Projects". */
export function Sparkle({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-5", className)}
    >
      <path
        d="M12 2.5c.6 4.7 2.2 7.3 6.8 8.4-4.5 1-6.2 3.6-6.8 8.6-.7-5-2.4-7.6-6.9-8.6 4.6-1.1 6.2-3.7 6.9-8.4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M19.4 3.2c.2 1.5.7 2.3 2.1 2.7-1.4.3-2 1.1-2.1 2.7-.2-1.6-.7-2.4-2.1-2.7 1.4-.4 1.9-1.2 2.1-2.7Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

/** Loose underline that sweeps beneath a heading, as if drawn in one pass. */
export function Underline({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
      className={cn("h-3 w-full", className)}
    >
      <path
        d="M2 8.5C28 4 55 2.5 82 3.2c27 .7 54 3.4 81 1.6 12-.8 24-2.4 35-4.3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

/** Curling arrow that points from a label toward the thing it describes. */
export function CurlyArrow({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      aria-hidden
      className={cn("h-8 w-20", className)}
    >
      <path
        d="M4 30c8-14 22-22 38-20 9 1 16 6 18 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M65 15c-1 3-3 6-5 8m5-8c2 2 5 3 8 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

/** Two stacked waves. Used as a footer sign-off and beside water scenes. */
export function WaveMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 28"
      fill="none"
      aria-hidden
      className={cn("h-7 w-30", className)}
    >
      <path
        d="M2 10c8-7 16-7 24 0s16 7 24 0 16-7 24 0 16 7 24 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M14 21c7-6 14-6 21 0s14 6 21 0 14-6 21 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

/** A short vertical squiggle, dropped into whitespace to break up a column. */
export function Squiggle({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 20 60"
      fill="none"
      aria-hidden
      className={cn("h-14 w-5", className)}
    >
      <path
        d="M10 2c-6 6-6 11 0 16s6 11 0 16 -6 11 0 16 6 6 0 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/** A pair of gulls — a single stroke each, the way you'd sketch them. */
export function Birds({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 60 24"
      fill="none"
      aria-hidden
      className={cn("h-6 w-15", className)}
    >
      <path
        d="M4 12c3-4 6-4 9 0 3-4 6-4 9 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M34 6c2.4-3.2 4.8-3.2 7.2 0 2.4-3.2 4.8-3.2 7.2 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** Dotted path suggesting a route or a timeline continuing offscreen. */
export function DottedPath({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      aria-hidden
      className={cn("h-10 w-40", className)}
    >
      <path
        d="M2 34C30 34 40 6 78 6s48 28 80 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 8"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * A scattering of stars. `seed` shifts the arrangement so two instances on the
 * same page never look copy-pasted.
 */
export function StarField({
  className,
  count = 24,
  seed = 1,
}: MarkProps & { count?: number; seed?: number }) {
  // Deterministic pseudo-random so server and client render identically.
  const stars = Array.from({ length: count }, (_, i) => {
    const n = Math.sin((i + 1) * 12.9898 * seed) * 43758.5453;
    const m = Math.sin((i + 1) * 78.233 * seed) * 24634.6345;
    return {
      x: Math.abs(n % 100),
      y: Math.abs(m % 100),
      r: 0.4 + Math.abs((n * 7) % 1) * 0.9,
      o: 0.25 + Math.abs((m * 3) % 1) * 0.6,
      delay: Math.abs((n * 11) % 4),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className={cn("size-full", className)}
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="currentColor"
          opacity={s.o}
          className="animate-twinkle"
          style={{ animationDelay: `${s.delay}s` }}
        />
      ))}
    </svg>
  );
}
