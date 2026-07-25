import Image from "next/image";

import { portrait } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Birds, Sparkle, Squiggle } from "./doodles";

/**
 * The hero illustration — the single image the whole site is built around.
 *
 * An organic blob holds a minimal landscape: a low sun, layered hills, an
 * ocean, and a lone figure at the crest looking out. Sun, birds and sparkles
 * sit *outside* the blob so the composition breaks its own frame.
 *
 * When `portrait.enabled` is true the photo is clipped into the same blob and
 * the figure steps aside. Until then the landscape stands on its own rather
 * than showing a placeholder avatar.
 */

/* The blob, in the 640×640 drawing space. */
const BLOB =
  "M320 52C430 52 520 96 566 190C606 272 600 372 552 452C500 538 410 592 316 588C214 584 128 528 84 440C42 356 44 246 96 168C148 92 226 52 320 52Z";

/* The same shape normalised to 0–1 so CSS `clip-path` can use it on an <img>. */
const BLOB_NORMALIZED =
  "M0.5 0.081C0.672 0.081 0.813 0.15 0.884 0.297C0.947 0.425 0.938 0.581 0.863 0.706C0.781 0.841 0.641 0.925 0.494 0.919C0.334 0.913 0.2 0.825 0.131 0.688C0.066 0.556 0.069 0.384 0.15 0.263C0.231 0.144 0.353 0.081 0.5 0.081Z";

export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {/* Normalised clip path, consumed by the portrait <Image> below. */}
      <svg aria-hidden className="absolute size-0">
        <defs>
          <clipPath id="hero-blob-clip" clipPathUnits="objectBoundingBox">
            <path d={BLOB_NORMALIZED} />
          </clipPath>
        </defs>
      </svg>

      <svg
        viewBox="0 0 640 640"
        fill="none"
        role="img"
        aria-label="Illustration of a figure on a hillside looking out over the ocean at sunrise"
        className="size-full overflow-visible"
      >
        <defs>
          {/* Sky inside the blob: night at the top easing into dawn. */}
          <linearGradient id="hero-sky" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#123A63" />
            <stop offset="45%" stopColor="#155E7E" />
            <stop offset="100%" stopColor="#1D8A87" />
          </linearGradient>

          <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E4E72" />
            <stop offset="100%" stopColor="#0A2E4E" />
          </linearGradient>

          <linearGradient id="hero-hill-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E9E9B" />
            <stop offset="100%" stopColor="#1F7A80" />
          </linearGradient>

          <linearGradient id="hero-hill-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B6FA8" />
            <stop offset="100%" stopColor="#144E7C" />
          </linearGradient>

          <linearGradient id="hero-hill-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F2E4C" />
            <stop offset="100%" stopColor="#0A1E36" />
          </linearGradient>

          <radialGradient id="hero-sun-glow">
            <stop offset="0%" stopColor="#FFD166" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
          </radialGradient>

          <clipPath id="hero-blob">
            <path d={BLOB} />
          </clipPath>
        </defs>

        {/* ---- Ambient glow behind everything ---------------------------- */}
        <ellipse
          cx="320"
          cy="330"
          rx="300"
          ry="290"
          fill="url(#hero-sun-glow)"
          opacity="0.45"
          className="animate-drift-slow"
          style={{ transformOrigin: "center" }}
        />

        {/* ---- The scene, clipped to the blob ---------------------------- */}
        <g clipPath="url(#hero-blob)">
          <path d={BLOB} fill="url(#hero-sky)" />

          {/* A few stars still out in the upper sky. */}
          {[
            [148, 128, 1.6],
            [206, 96, 1.1],
            [268, 148, 1.3],
            [402, 108, 1.5],
            [470, 168, 1.2],
            [512, 122, 1.7],
            [352, 82, 1],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="#F5F7FA"
              opacity="0.7"
              className="animate-twinkle"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}

          {/* Low sun sitting just above the water. */}
          <circle cx="430" cy="266" r="46" fill="#FFD166" opacity="0.95" />
          <circle cx="430" cy="266" r="76" fill="#FFD166" opacity="0.12" />

          {/* Clouds — flat lozenges, no fluff. */}
          <g fill="#F5F7FA" opacity="0.16">
            <rect x="120" y="196" width="112" height="13" rx="6.5" />
            <rect x="156" y="220" width="72" height="11" rx="5.5" />
            <rect x="404" y="160" width="94" height="12" rx="6" />
            <rect x="438" y="182" width="56" height="10" rx="5" />
          </g>

          {/* ---- Ocean ---- */}
          <path d="M0 330H640V640H0Z" fill="url(#hero-sea)" />

          {/* The sun's reflection, broken into dashes on the water. */}
          <g stroke="#FFD166" strokeLinecap="round" opacity="0.5">
            <path d="M404 350h52" strokeWidth="4" />
            <path d="M412 368h36" strokeWidth="3.5" opacity="0.8" />
            <path d="M398 386h64" strokeWidth="3" opacity="0.6" />
            <path d="M416 402h28" strokeWidth="2.5" opacity="0.45" />
          </g>

          {/* Wave lines, thinning with distance. */}
          <g stroke="#6DB8FF" strokeLinecap="round" fill="none">
            <path
              d="M40 344c18-7 36-7 54 0s36 7 54 0"
              strokeWidth="2"
              opacity="0.3"
            />
            <path
              d="M498 358c16-6 32-6 48 0s32 6 48 0"
              strokeWidth="2"
              opacity="0.25"
            />
            <path
              d="M60 396c22-9 44-9 66 0s44 9 66 0"
              strokeWidth="2.5"
              opacity="0.28"
            />
          </g>

          {/* ---- Headlands, far to near ---- */}
          <path
            d="M-20 330C60 292 132 300 196 330 236 348 268 330 300 330H-20Z"
            fill="url(#hero-hill-far)"
            opacity="0.85"
          />
          <path
            d="M380 330C440 296 512 300 580 326 616 340 650 336 680 330V330H380Z"
            fill="url(#hero-hill-far)"
            opacity="0.6"
          />

          <path
            d="M-20 430C70 372 168 358 262 388 328 409 396 404 460 380 528 354 596 356 660 386V660H-20Z"
            fill="url(#hero-hill-mid)"
          />

          <path
            d="M-20 520C80 460 190 448 296 478 372 499 452 492 528 464 580 445 626 446 668 466V680H-20Z"
            fill="url(#hero-hill-near)"
          />

          {/* Grass ticks on the near hill — sparse, hand-placed. */}
          <g stroke="#43C6AC" strokeWidth="2" strokeLinecap="round" opacity="0.35">
            <path d="M126 508v-14" />
            <path d="M144 504v-11" />
            <path d="M162 502v-15" />
            <path d="M330 494v-12" />
            <path d="M348 492v-16" />
            <path d="M462 486v-13" />
            <path d="M480 484v-10" />
          </g>

          {/* ---- The figure at the crest ---- */}
          {!portrait.enabled && <Figure />}
        </g>

        {/* Blob rim: a light edge on the sunward side only. */}
        <path
          d={BLOB}
          stroke="url(#hero-hill-far)"
          strokeWidth="1.5"
          opacity="0.4"
          fill="none"
        />

        {/* ---- Elements that break the frame ----------------------------- */}

        {/* Sun disc outside the blob, echoing the one inside it. */}
        <circle cx="88" cy="150" r="34" fill="#FFD166" opacity="0.95" />
        <circle cx="88" cy="150" r="52" fill="#FFD166" opacity="0.14" />

        <g className="animate-float" style={{ transformOrigin: "560px 118px" }}>
          <g transform="translate(516 96)" className="text-brand-soft">
            <path
              d="M4 12c3-4 6-4 9 0 3-4 6-4 9 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.9"
              fill="none"
            />
            <path
              d="M32 3c2.4-3.2 4.8-3.2 7.2 0 2.4-3.2 4.8-3.2 7.2 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
              fill="none"
            />
          </g>
        </g>

        {/* Signature squiggle, bottom-left. */}
        <path
          d="M96 552c-14 12-14 22 0 32s14 20 0 30"
          stroke="#4F8CFF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
      </svg>

      {/* ---- Portrait, clipped to the same blob ------------------------- */}
      {portrait.enabled && (
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          priority
          sizes="(min-width: 1024px) 480px, 90vw"
          className="object-cover"
          style={{ clipPath: "url(#hero-blob-clip)" }}
        />
      )}

      {/* Floating marks that sit above the artwork in the DOM. */}
      <Sparkle className="absolute right-[12%] top-[8%] size-6 text-mint animate-float [animation-delay:1.5s]" />
      <Sparkle className="absolute bottom-[16%] left-[4%] size-4 text-brand-soft opacity-70" />
      <Birds className="absolute left-[10%] top-[22%] h-4 w-10 text-ink opacity-30" />
      <Squiggle className="absolute -right-2 bottom-[26%] h-10 w-4 text-teal opacity-40" />
    </div>
  );
}

/** Silhouetted figure standing at the crest of the near hill. */
function Figure() {
  return (
    <g transform="translate(268 392)" opacity="0.92">
      {/* Long shadow cast toward the viewer. */}
      <ellipse cx="14" cy="96" rx="26" ry="5" fill="#050C17" opacity="0.35" />
      {/* Head */}
      <circle cx="14" cy="10" r="9" fill="#061321" />
      {/* Body — a single tapered stroke, coat catching the light. */}
      <path
        d="M14 21c-9 0-14 7-15 16l-2 26c-.4 6 1 10 4 12l2 21h22l2-21c3-2 4.4-6 4-12l-2-26c-1-9-6-16-15-16Z"
        fill="#061321"
      />
      {/* Rim light on the sunward edge. */}
      <path
        d="M23 22c5 2 8 8 8.6 15l2 26c.4 6-1 10-4 12"
        stroke="#FFD166"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
        fill="none"
      />
      <path
        d="M18 3.5c3 1.4 5 4 5 7"
        stroke="#FFD166"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
        fill="none"
      />
    </g>
  );
}
