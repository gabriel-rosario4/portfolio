import { Quote } from "lucide-react";

import { StarField } from "@/components/illustrations/doodles";
import { Reveal } from "@/components/motion/reveal";
import { Panel } from "@/components/ui/card";

/**
 * The closing note before the footer. One idea, given a whole panel, because
 * a belief stated quietly lands harder than a manifesto.
 */
export function QuotePanel() {
  return (
    <section className="container-page pb-8">
      <Reveal>
        <Panel className="isolate px-8 py-14 sm:px-14 sm:py-20">
          {/* Dusk gradient, warm at the horizon like the hero. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(150deg,#12274A_0%,#173C63_45%,#1D5E70_100%)]"
          />
          <StarField
            aria-hidden
            className="absolute inset-0 -z-10 text-ink opacity-50"
            count={30}
            seed={3}
          />
          {/* A low ridge line grounds the panel. */}
          <svg
            aria-hidden
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full"
          >
            <path
              d="M0 160V96c96-38 192-46 288-22 108 27 216 21 324-18 96-35 192-33 288 6 60 24 180 26 300 4v94Z"
              fill="#0A1E36"
              opacity="0.85"
            />
          </svg>

          <Quote aria-hidden className="size-8 text-brand-soft/60" />

          <blockquote className="mt-6 max-w-3xl">
            <p className="font-display text-2xl leading-snug tracking-[-0.02em] text-ink sm:text-3xl">
              The best software doesn&apos;t just work. It makes life easier
              for the people using it.
            </p>
          </blockquote>
        </Panel>
      </Reveal>
    </section>
  );
}
