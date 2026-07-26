import { ArrowRight, Download } from "lucide-react";

import { HeroScene } from "@/components/illustrations/hero-scene";
import { SocialLinks } from "@/components/layout/social-links";
import { Entrance } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Split hero: the claim on the left, the illustration on the right.
 *
 * Copy animates in on mount rather than on scroll — it's already in view, and
 * waiting for an intersection would just look broken.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* A single soft light source behind the whole hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="container-page relative grid items-center gap-12 pt-12 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-32">
        <div className="max-w-xl">
          <Entrance>
            <p className="flex items-center gap-2 font-display text-lg text-mint">
              Hey there, I&apos;m
              <span aria-hidden className="inline-block animate-float">
                👋
              </span>
            </p>
          </Entrance>

          <Entrance delay={0.08}>
            <h1 className="text-title mt-3 text-ink sm:text-display">
              Gabriel
              <br />
              Rosario
            </h1>
          </Entrance>

          <Entrance delay={0.16}>
            <p className="mt-5 font-display text-xl font-medium text-brand-soft sm:text-2xl">
              {site.role}
            </p>
          </Entrance>

          <Entrance delay={0.24}>
            <p className="text-lead mt-6 text-ink-muted">
              I build software that transforms complex ideas into products
              people love using — AI-powered systems, and the scalable
              infrastructure that keeps them honest.
            </p>
            <p className="mt-4 text-sm text-ink-faint">
              {site.yearsOfExperience} years of experience · {site.degree}
            </p>
          </Entrance>

          <Entrance delay={0.32}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/projects" variant="primary" size="lg">
                View My Work
                <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button
                href={site.resumePath}
                variant="secondary"
                size="lg"
                download
              >
                Download Resume
                <Download aria-hidden className="size-4" />
              </Button>
            </div>
          </Entrance>

          <Entrance delay={0.4}>
            <SocialLinks className="mt-10" />
          </Entrance>
        </div>

        <Entrance delay={0.2} className="relative mx-auto w-full max-w-lg">
          <HeroScene />
        </Entrance>
      </div>
    </section>
  );
}
