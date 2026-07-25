import { cn } from "@/lib/utils";

/**
 * The footer scene: a night ocean, a headland, and a lighthouse still working.
 *
 * Drawn full-bleed at 1440×420 and cropped by its container, so it holds up
 * from a phone to an ultrawide without the horizon ever moving.
 */
export function NightShore({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      role="img"
      aria-label="Illustration of a lighthouse on a headland above a calm night ocean"
      className={cn("size-full", className)}
    >
      <defs>
        <linearGradient id="shore-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07111F" />
          <stop offset="60%" stopColor="#0B2038" />
          <stop offset="100%" stopColor="#123454" />
        </linearGradient>

        <linearGradient id="shore-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123B5C" />
          <stop offset="100%" stopColor="#08182B" />
        </linearGradient>

        <radialGradient id="shore-moon-glow">
          <stop offset="0%" stopColor="#9FD4FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9FD4FF" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="shore-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1440" height="420" fill="url(#shore-sky)" />

      {/* ---- Stars ---- */}
      <g fill="#F5F7FA">
        {STARS.map(([cx, cy, r, o], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            opacity={o}
            className="animate-twinkle"
            style={{ animationDelay: `${(i % 7) * 0.55}s` }}
          />
        ))}
      </g>

      {/* ---- Moon ---- */}
      <circle cx="1180" cy="86" r="120" fill="url(#shore-moon-glow)" />
      <circle cx="1180" cy="86" r="26" fill="#DCEBFA" opacity="0.9" />
      <circle cx="1188" cy="80" r="6" fill="#B9D3E8" opacity="0.35" />
      <circle cx="1172" cy="94" r="4" fill="#B9D3E8" opacity="0.3" />

      {/* ---- Distant mountains ---- */}
      <path
        d="M0 262 L120 196 L196 234 L292 168 L372 226 L452 190 L540 252 L640 262 Z"
        fill="#12314E"
        opacity="0.7"
      />
      <path
        d="M900 262 L988 204 L1060 240 L1148 178 L1236 238 L1320 208 L1440 258 L1440 262 Z"
        fill="#12314E"
        opacity="0.55"
      />

      {/* Snow on the two tallest peaks. */}
      <path d="M292 168l22 16-14 3-10-6-9 5-11-4Z" fill="#DCEBFA" opacity="0.5" />
      <path
        d="M1148 178l20 15-13 3-9-6-8 5-10-4Z"
        fill="#DCEBFA"
        opacity="0.4"
      />

      {/* ---- Sea ---- */}
      <rect y="262" width="1440" height="158" fill="url(#shore-sea)" />

      {/* Moon path on the water. */}
      <g stroke="#9FD4FF" strokeLinecap="round" opacity="0.35">
        <path d="M1148 288h64" strokeWidth="3" />
        <path d="M1160 306h40" strokeWidth="2.5" opacity="0.8" />
        <path d="M1140 324h80" strokeWidth="2" opacity="0.55" />
        <path d="M1158 342h44" strokeWidth="2" opacity="0.35" />
      </g>

      {/* Wave lines. Fewer than feels right, which is the right number. */}
      <g stroke="#4F8CFF" strokeLinecap="round" fill="none" opacity="0.22">
        <path d="M60 296c24-9 48-9 72 0s48 9 72 0" strokeWidth="2" />
        <path d="M320 320c28-10 56-10 84 0s56 10 84 0" strokeWidth="2.5" />
        <path d="M700 300c24-9 48-9 72 0s48 9 72 0" strokeWidth="2" />
        <path d="M180 364c30-11 60-11 90 0s60 11 90 0" strokeWidth="2.5" />
        <path d="M840 356c26-10 52-10 78 0s52 10 78 0" strokeWidth="2" />
        <path d="M520 388c30-11 60-11 90 0s60 11 90 0" strokeWidth="3" />
      </g>

      {/* ---- Headland and lighthouse ---- */}
      <g transform="translate(196 0)">
        {/* Beam sweeping out over the water. */}
        <path
          d="M52 178 L520 118 L520 244 Z"
          fill="url(#shore-beam)"
          className="animate-drift-slow"
          style={{ transformOrigin: "52px 178px" }}
        />

        <path
          d="M-196 420 L-40 300 L40 268 L120 292 L240 420 Z"
          fill="#081C30"
        />

        {/* Tower */}
        <path d="M34 268 L30 180 L74 180 L70 268 Z" fill="#0D273F" />
        {/* Painted band — the only warm accent on the whole footer. */}
        <path d="M32.4 232 L71.6 232 L70.8 250 L33.2 250 Z" fill="#E8624A" opacity="0.75" />
        {/* Lamp room */}
        <rect x="36" y="160" width="32" height="22" rx="3" fill="#0D273F" />
        <rect x="41" y="165" width="22" height="12" rx="2" fill="#FFD166" opacity="0.95" />
        {/* Gallery rail and cap */}
        <rect x="30" y="156" width="44" height="5" rx="2.5" fill="#123454" />
        <path d="M52 138 L68 158 L36 158 Z" fill="#0D273F" />
        <circle cx="52" cy="136" r="3" fill="#6DB8FF" opacity="0.8" />
      </g>

      {/* ---- Foreground rocks ---- */}
      <path
        d="M1040 420c30-38 66-56 108-54 30 1 54 16 72 44 12 18 26 10 44 10H1040Z"
        fill="#061321"
      />
      <path
        d="M0 420c40-30 84-40 132-30 26 6 46 18 60 30H0Z"
        fill="#061321"
        opacity="0.9"
      />

      {/* A single gull, because an empty sky reads as unfinished. */}
      <g transform="translate(600 120)" stroke="#9AA6B2" fill="none" opacity="0.45">
        <path
          d="M0 8c4-5 8-5 12 0 4-5 8-5 12 0"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** Fixed star positions — hand-scattered, not generated, so they read as sky. */
const STARS: [number, number, number, number][] = [
  [72, 48, 1.4, 0.8], [148, 96, 1, 0.5], [214, 40, 1.6, 0.9],
  [298, 88, 1.1, 0.6], [356, 34, 1.3, 0.75], [432, 104, 0.9, 0.45],
  [498, 56, 1.5, 0.85], [560, 118, 1.1, 0.5], [628, 44, 1.2, 0.7],
  [694, 92, 1.6, 0.9], [758, 30, 1, 0.55], [822, 110, 1.3, 0.65],
  [886, 62, 1.4, 0.8], [948, 24, 1.1, 0.5], [1014, 96, 1.5, 0.85],
  [1076, 48, 1, 0.45], [1268, 140, 1.2, 0.6], [1330, 70, 1.4, 0.8],
  [1392, 118, 1, 0.5], [1244, 36, 1.3, 0.7], [1404, 32, 1.1, 0.6],
  [104, 152, 1, 0.4], [386, 148, 1.2, 0.5], [660, 164, 0.9, 0.35],
  [934, 152, 1.1, 0.45],
];
