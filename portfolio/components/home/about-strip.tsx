import {
  ArrowRight,
  Brain,
  Cloud,
  Compass,
  Server,
  Users,
  Zap,
} from "lucide-react";

import { DeskScene } from "@/components/illustrations/desk-scene";
import { Underline } from "@/components/illustrations/doodles";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const TRAITS = [
  { Icon: Server, label: "Backend Engineering", tone: "text-brand-soft" },
  { Icon: Brain, label: "Machine Learning", tone: "text-mint" },
  { Icon: Cloud, label: "Cloud & DevOps", tone: "text-teal" },
  { Icon: Zap, label: "Problem Solver", tone: "text-sun" },
  { Icon: Compass, label: "Curious Learner", tone: "text-brand-soft" },
  { Icon: Users, label: "Team Player", tone: "text-coral" },
];

/**
 * The bridge between "what I built" and "who I am" — a short personal note
 * next to the desk scene, with the full story one click away.
 */
export function AboutStrip() {
  return (
    <section className="border-y border-line bg-surface-sunken/40">
      <div className="container-page grid items-center gap-12 py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal variant="left">
          <DeskScene className="w-full rounded-panel border border-line" />
        </Reveal>

        <Reveal variant="right">
          <div className="relative inline-block">
            <h2 className="text-heading text-ink">A little about me</h2>
            <Underline
              aria-hidden
              className="absolute -bottom-2 left-0 h-3 w-full text-mint"
            />
          </div>

          <div className="mt-8 space-y-4 leading-relaxed text-ink-muted">
            <p>
              I&apos;m a software engineer who loves turning ideas into
              products. My work spans backend systems, applied machine
              learning, and the product thinking that decides which of the two
              a problem actually needs.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me on the golf course,
              buried in basketball analytics, or reading something that has
              nothing to do with software.
            </p>
          </div>

          <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {TRAITS.map(({ Icon, label, tone }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon aria-hidden className={`size-[18px] shrink-0 ${tone}`} />
                <span className="text-sm text-ink">{label}</span>
              </li>
            ))}
          </ul>

          <Button href="/about" variant="secondary" size="md" className="mt-9">
            More about me
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
