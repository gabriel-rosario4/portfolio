import { cn } from "@/lib/utils";

/**
 * The "a little about me" vignette: a desk by a window, late, city below.
 *
 * Warm lamp light against the cold city is the only place on the site where
 * the two temperatures meet — which is the point of the section it sits in.
 */
export function DeskScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      role="img"
      aria-label="Illustration of a person working at a desk beside a window overlooking a city at night"
      className={cn("size-full", className)}
    >
      <defs>
        <linearGradient id="desk-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1E38" />
          <stop offset="100%" stopColor="#16406A" />
        </linearGradient>

        <radialGradient id="desk-lamp" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="desk-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6DB8FF" />
          <stop offset="100%" stopColor="#43C6AC" />
        </linearGradient>

        <clipPath id="desk-window">
          <rect x="52" y="28" width="456" height="236" rx="10" />
        </clipPath>
      </defs>

      <rect width="560" height="420" rx="16" fill="#0B1627" />

      {/* ---- Window ---- */}
      <g clipPath="url(#desk-window)">
        <rect x="52" y="28" width="456" height="236" fill="url(#desk-night)" />

        {/* Stars above the skyline. */}
        <g fill="#F5F7FA" opacity="0.55">
          {[
            [96, 58, 1.2], [168, 44, 1], [242, 66, 1.4], [318, 42, 1.1],
            [392, 70, 1.3], [452, 50, 1], [128, 88, 0.9], [286, 96, 1.1],
            [420, 100, 1.2],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              className="animate-twinkle"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
        </g>

        <circle cx="440" cy="72" r="14" fill="#DCEBFA" opacity="0.8" />

        {/* Skyline. Windows are lit at a believable density — not every one. */}
        {BUILDINGS.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={264 - b.y}
              fill={i % 2 === 0 ? "#0C2B4A" : "#0F3357"}
            />
            {b.lights.map(([lx, ly], j) => (
              <rect
                key={j}
                x={b.x + lx}
                y={b.y + ly}
                width="4"
                height="5"
                fill="#FFD166"
                opacity={(i + j) % 3 === 0 ? 0.75 : 0.35}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Window frame and mullions. */}
      <rect
        x="52"
        y="28"
        width="456"
        height="236"
        rx="10"
        stroke="#1D3A5C"
        strokeWidth="6"
      />
      <path
        d="M280 28v236M52 146h456"
        stroke="#1D3A5C"
        strokeWidth="5"
        opacity="0.9"
      />

      {/* ---- Lamp glow spilling across the desk ---- */}
      <ellipse cx="230" cy="300" rx="200" ry="86" fill="url(#desk-lamp)" />

      {/* ---- Desk ---- */}
      <rect x="24" y="298" width="512" height="12" rx="4" fill="#153050" />
      <rect x="24" y="310" width="512" height="6" rx="3" fill="#0D2138" />

      {/* ---- Person, seen from behind ---- */}
      <g transform="translate(196 176)">
        <circle cx="44" cy="34" r="26" fill="#0A1B2E" />
        {/* Hair */}
        <path
          d="M18 32c0-16 12-26 26-26s26 10 26 26c-6-8-16-11-26-11s-20 3-26 11Z"
          fill="#06121F"
        />
        {/* Shoulders */}
        <path
          d="M44 62c-30 0-48 18-52 44l-2 16h108l-2-16c-4-26-22-44-52-44Z"
          fill="#0A1B2E"
        />
        {/* Screen light catching the near shoulder. */}
        <path
          d="M78 74c8 8 12 18 14 30"
          stroke="#6DB8FF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
        />
        {/* Lamp light on the far shoulder. */}
        <path
          d="M10 74c-6 8-9 18-10 30"
          stroke="#FFD166"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
          fill="none"
        />
      </g>

      {/* ---- Laptop ---- */}
      <g transform="translate(206 236)">
        <path d="M6 0h116a6 6 0 016 6v54H0V6a6 6 0 016-6Z" fill="#12293F" />
        <rect x="8" y="8" width="112" height="46" rx="3" fill="url(#desk-screen)" opacity="0.22" />
        {/* Content on screen: a couple of lines and a small chart. */}
        <g fill="#6DB8FF" opacity="0.65">
          <rect x="16" y="15" width="46" height="3.5" rx="1.75" />
          <rect x="16" y="23" width="62" height="3.5" rx="1.75" />
          <rect x="16" y="31" width="34" height="3.5" rx="1.75" />
        </g>
        <g fill="#53D7B7" opacity="0.8">
          <rect x="88" y="40" width="5" height="8" rx="1" />
          <rect x="96" y="34" width="5" height="14" rx="1" />
          <rect x="104" y="28" width="5" height="20" rx="1" />
        </g>
        <path d="M-8 60h144l6 8H-14Z" fill="#1B3A57" />
      </g>

      {/* ---- Desk lamp ---- */}
      <g transform="translate(414 214)">
        <rect x="18" y="80" width="34" height="5" rx="2.5" fill="#1B3A57" />
        <path
          d="M35 80V40c0-12 8-20 20-22"
          stroke="#1B3A57"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M44 18l26-4 6 22-26 4Z" fill="#E8624A" opacity="0.85" />
        <ellipse cx="58" cy="42" rx="12" ry="4" fill="#FFD166" opacity="0.5" />
      </g>

      {/* ---- Coffee ---- */}
      <g transform="translate(148 268)">
        <path d="M0 4h26v18a8 8 0 01-8 8H8a8 8 0 01-8-8Z" fill="#1B3A57" />
        <path
          d="M26 8h5a6 6 0 010 12h-5"
          stroke="#1B3A57"
          strokeWidth="3"
          fill="none"
        />
        {/* Steam */}
        <path
          d="M9 -2c3-4 3-7 0-11M17 -2c3-4 3-7 0-11"
          stroke="#9AA6B2"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
        />
      </g>

      {/* ---- Plant ---- */}
      <g transform="translate(456 232)">
        <path d="M14 44h32l-4 30a6 6 0 01-6 5H24a6 6 0 01-6-5Z" fill="#1B3A57" />
        <g
          stroke="#43C6AC"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        >
          <path d="M30 44V16" />
          <path d="M30 30c-8-2-13-8-14-16 8 0 13 5 14 12" />
          <path d="M30 24c8-3 12-9 12-17-8 1-12 6-12 13" />
          <path d="M30 38c-6 0-10-4-11-10 6 0 10 3 11 8" />
        </g>
      </g>

      {/* ---- Notebook and pen ---- */}
      <g transform="translate(48 274)">
        <rect x="0" y="10" width="60" height="16" rx="3" fill="#12293F" />
        <rect x="4" y="14" width="52" height="2.5" rx="1.25" fill="#4F8CFF" opacity="0.4" />
        <rect x="4" y="20" width="38" height="2.5" rx="1.25" fill="#4F8CFF" opacity="0.25" />
        <path d="M66 24l14-12" stroke="#E8624A" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </g>
    </svg>
  );
}

/** Skyline blocks with hand-placed lit windows. */
const BUILDINGS = [
  { x: 60, y: 176, w: 34, lights: [[6, 12], [20, 12], [6, 34], [20, 56]] },
  { x: 100, y: 148, w: 26, lights: [[6, 10], [6, 30], [16, 30], [16, 52]] },
  { x: 132, y: 190, w: 40, lights: [[8, 14], [24, 14], [8, 36], [24, 58]] },
  { x: 178, y: 160, w: 30, lights: [[6, 12], [18, 34], [6, 54]] },
  { x: 214, y: 200, w: 36, lights: [[8, 12], [22, 12], [8, 34]] },
  { x: 256, y: 142, w: 28, lights: [[6, 10], [16, 28], [6, 48], [16, 68]] },
  { x: 290, y: 184, w: 44, lights: [[8, 14], [26, 14], [8, 38], [26, 60]] },
  { x: 340, y: 166, w: 30, lights: [[6, 12], [18, 32], [6, 52]] },
  { x: 376, y: 204, w: 38, lights: [[8, 12], [24, 30], [8, 50]] },
  { x: 420, y: 178, w: 32, lights: [[7, 14], [20, 36], [7, 58]] },
  { x: 458, y: 196, w: 42, lights: [[9, 12], [26, 12], [9, 36]] },
] satisfies { x: number; y: number; w: number; lights: [number, number][] }[];
