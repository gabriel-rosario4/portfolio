import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CircleDot,
  Flag,
  GraduationCap,
  Mail,
  Sparkles,
} from "lucide-react";
import type { ComponentType } from "react";

import { DeskScene } from "@/components/illustrations/desk-scene";
import { Squiggle, Underline } from "@/components/illustrations/doodles";
import { SocialLinks } from "@/components/layout/social-links";
import { Entrance, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, Panel } from "@/components/ui/card";
import { Timeline } from "@/components/ui/timeline";
import { chapters, interests, principles, type Interest } from "@/lib/about";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How I got into software, why I went back for a master's in AI, and what I'm chasing now — plus the things I do when I'm not building.",
  alternates: { canonical: "/about" },
};

const INTEREST_ICONS: Record<
  Interest["icon"],
  { Icon: ComponentType<{ className?: string }>; tone: string }
> = {
  golf: { Icon: Flag, tone: "text-mint" },
  basketball: { Icon: CircleDot, tone: "text-coral" },
  brain: { Icon: Brain, tone: "text-brand-soft" },
  automation: { Icon: Sparkles, tone: "text-teal" },
  book: { Icon: BookOpen, tone: "text-sun" },
  learning: { Icon: GraduationCap, tone: "text-brand-soft" },
};

/** About answers: who are you outside of work? */
export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* ---- Intro ---- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[720px] rounded-full bg-mint/8 blur-[130px]"
        />

        <div className="container-page relative grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20">
          <Entrance>
            <p className="text-eyebrow uppercase text-mint">About</p>

            <div className="relative mt-4 inline-block">
              <h1 className="text-heading sm:text-title text-ink">
                I build things, and I think about
                <br className="hidden sm:block" /> why they work
              </h1>
              <Underline
                aria-hidden
                className="absolute -bottom-3 left-0 h-3 w-2/3 text-brand-soft"
              />
            </div>

            <div className="text-lead mt-10 space-y-5 text-ink-muted">
              <p>
                I&apos;m a senior software engineer with {site.yearsOfExperience}{" "}
                years of experience and a master&apos;s in artificial
                intelligence. That&apos;s the summary. The longer version is
                that I&apos;m mostly interested in the gap between a system that
                demos well and one that holds up.
              </p>
              <p>
                This page is the story rather than the résumé — if you want
                dates and titles, the PDF has them.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href={site.resumePath} variant="secondary" size="md" download>
                Download Resume
              </Button>
              <SocialLinks size="sm" />
            </div>
          </Entrance>

          <Entrance delay={0.15}>
            <DeskScene className="w-full rounded-panel border border-line shadow-lift-lg" />
          </Entrance>
        </div>
      </section>

      {/* ---- Timeline ---- */}
      <section className="container-page py-20">
        <Reveal className="relative">
          <h2 className="text-heading text-ink">How I got here</h2>
          <Squiggle
            aria-hidden
            className="absolute -left-8 top-0 hidden h-14 w-5 text-teal xl:block"
          />
        </Reveal>

        <Reveal className="mt-12 max-w-2xl">
          <Timeline
            entries={chapters.map((chapter) => ({
              period: chapter.period,
              title: chapter.title,
              org: chapter.org,
              pivotal: chapter.pivotal,
              body: <p>{chapter.body}</p>,
            }))}
          />
        </Reveal>
      </section>

      {/* ---- Principles ---- */}
      <section className="border-y border-line bg-surface-sunken/40">
        <div className="container-page py-20">
          <Reveal>
            <h2 className="text-heading text-ink">How I like to work</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((principle, i) => (
              <StaggerItem key={principle.title}>
                <Card className="h-full p-6">
                  {/* Decorative ordinal — the list order already conveys it,
                      so it's hidden rather than held to a contrast ratio. */}
                  <span
                    aria-hidden
                    className="font-display text-3xl font-bold text-brand/30 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-subheading mt-3 text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">
                    {principle.body}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Interests ---- */}
      <section className="container-page py-20">
        <Reveal>
          <h2 className="text-heading text-ink">Outside of work</h2>
          <p className="text-lead mt-4 max-w-2xl text-ink-muted">
            The things that fill the rest of the week — several of which have
            quietly turned into projects.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest) => {
            const { Icon, tone } = INTEREST_ICONS[interest.icon];
            return (
              <StaggerItem key={interest.title}>
                <Card interactive className="h-full p-6">
                  <span
                    className={`grid size-10 place-items-center rounded-pill border border-line bg-surface-raised ${tone}`}
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">
                    {interest.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {interest.body}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ---- Contact ---- */}
      <section className="container-page">
        <Reveal>
          <Panel className="isolate px-8 py-14 text-center sm:px-14">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(83,215,183,0.12),transparent_65%)]"
            />

            <h2 className="text-heading text-ink">Let&apos;s talk</h2>
            <p className="text-lead mx-auto mt-4 max-w-xl text-ink-muted">
              I&apos;m always happy to talk about engineering, AI that has to
              work in production, or whether a spreadsheet has finally become a
              database.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={`mailto:${site.email}`} variant="primary" size="lg">
                <Mail aria-hidden className="size-4" />
                Get in touch
              </Button>
              <Button href="/projects" variant="secondary" size="lg">
                See what I&apos;ve built
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </div>
          </Panel>
        </Reveal>
      </section>
    </div>
  );
}
