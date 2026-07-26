import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink, Layers, User } from "lucide-react";

import { PlaceholderArt } from "@/components/illustrations/placeholder-art";
import { StarField } from "@/components/illustrations/doodles";
import { Entrance } from "@/components/motion/reveal";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content";

/**
 * The case-study masthead: what it is, who built it, when, and with what —
 * answered above the fold so a hiring manager skimming five tabs gets the
 * shape of the project in one screen.
 */
export function CaseStudyHero({ project }: { project: Project }) {
  const meta = [
    { Icon: User, label: "Role", value: project.role },
    { Icon: CalendarDays, label: "Timeline", value: project.timeline },
    { Icon: Layers, label: "Tech Stack", value: project.tech.join(", ") },
  ].filter((item) => item.value);

  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(79,140,255,0.14),transparent_60%)]" />
        <StarField className="absolute inset-0 text-ink opacity-25" count={22} seed={5} />
      </div>

      <div className="container-page relative pt-8 pb-16 lg:pb-20">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-brand-soft"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-200 ease-soft group-hover:-translate-x-0.5"
          />
          Back to projects
        </Link>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Entrance>
            <p className="text-eyebrow inline-flex rounded-pill border border-mint/25 bg-mint/10 px-3 py-1.5 uppercase text-mint">
              Case Study
            </p>

            <h1 className="text-heading sm:text-title mt-5 text-ink">
              {project.title}
            </h1>

            <p className="text-lead mt-5 text-ink-muted">
              {project.description}
            </p>

            <dl className="mt-9 grid gap-5 sm:grid-cols-3">
              {meta.map(({ Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-1.5 text-xs text-ink-faint">
                    <Icon aria-hidden className="size-3.5" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {(project.github || project.live) && (
              <div className="mt-9 flex flex-wrap gap-3">
                {project.live && (
                  <Button href={project.live} variant="primary" size="md">
                    Visit site
                    <ExternalLink aria-hidden className="size-4" />
                  </Button>
                )}
                {project.github && (
                  <Button href={project.github} variant="secondary" size="md">
                    <GithubIcon className="size-4" />
                    View source
                  </Button>
                )}
              </div>
            )}
          </Entrance>

          <Entrance delay={0.15}>
            <div className="overflow-hidden rounded-panel border border-line shadow-lift-lg">
              <PlaceholderArt seed={project.slug} className="aspect-16/10" />
            </div>
          </Entrance>
        </div>
      </div>
    </header>
  );
}
