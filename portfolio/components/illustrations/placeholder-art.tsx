import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER ART — intentionally simple, to be replaced.
 *
 * Project thumbnails and article covers need *something* to occupy their
 * frames while the screens are built. These are deliberately restrained
 * abstract compositions rather than fake UI screenshots: they read as
 * intentional at a glance and are easy to swap out wholesale later.
 *
 * Each variant is chosen from a stable hash of the slug, so a given project
 * or article always gets the same artwork across renders and rebuilds.
 */

const PALETTES = [
  { from: "#1B4B7A", to: "#0F2A47", accent: "#6DB8FF" },
  { from: "#14544F", to: "#0D2E33", accent: "#53D7B7" },
  { from: "#1E3D6E", to: "#101F3A", accent: "#4F8CFF" },
  { from: "#17505F", to: "#0C2733", accent: "#43C6AC" },
  { from: "#243A66", to: "#101B33", accent: "#8FB8FF" },
] as const;

/** Stable, order-independent string hash. */
function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function PlaceholderArt({
  seed,
  className,
}: {
  /** Usually the project or article slug. */
  seed: string;
  className?: string;
}) {
  const h = hash(seed);
  const palette = PALETTES[h % PALETTES.length];
  const variant = h % 3;
  const id = `art-${h.toString(36)}`;

  return (
    <svg
      viewBox="0 0 480 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
      className={cn("size-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill={`url(#${id}-bg)`} />

      {/* Horizon line shared by every variant, so the set feels related. */}
      <path
        d="M0 214h480"
        stroke={palette.accent}
        strokeWidth="1"
        opacity="0.25"
      />

      {variant === 0 && (
        <>
          <circle cx="352" cy="108" r="52" fill={palette.accent} opacity="0.2" />
          <path
            d="M0 214C72 168 128 168 196 200s124 30 196-14v100H0Z"
            fill={palette.accent}
            opacity="0.14"
          />
        </>
      )}

      {variant === 1 && (
        <g stroke={palette.accent} strokeLinecap="round" opacity="0.3">
          <path d="M60 214V150" strokeWidth="10" />
          <path d="M108 214V116" strokeWidth="10" opacity="0.8" />
          <path d="M156 214V166" strokeWidth="10" opacity="0.6" />
          <path d="M204 214V92" strokeWidth="10" opacity="0.9" />
          <path d="M252 214V138" strokeWidth="10" opacity="0.7" />
        </g>
      )}

      {variant === 2 && (
        <g opacity="0.28">
          <path
            d="M40 214L140 96l84 78 76-56 100 96H40Z"
            fill={palette.accent}
          />
          <circle cx="392" cy="76" r="26" fill={palette.accent} opacity="0.6" />
        </g>
      )}

      {/* A faint grain of dots so flat fills don't band on wide screens. */}
      <g fill={palette.accent} opacity="0.16">
        {Array.from({ length: 14 }, (_, i) => (
          <circle
            key={i}
            cx={((h >> i) % 46) * 10 + 12}
            cy={((h >> (i + 3)) % 20) * 10 + 20}
            r="1.5"
          />
        ))}
      </g>
    </svg>
  );
}
