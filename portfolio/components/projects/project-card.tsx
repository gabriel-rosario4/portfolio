import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PlaceholderArt } from "@/components/illustrations/placeholder-art";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Card } from "@/components/ui/card";
import { TechPillGroup } from "@/components/ui/tech-pill";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The project card, used on the home page and the projects index.
 *
 * The whole card is a link via a stretched overlay, but the GitHub icon stays
 * clickable by sitting above it — one obvious target, one secondary escape
 * hatch, and no nested anchors.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const href = project.hasCaseStudy
    ? `/projects/${project.slug}`
    : (project.github ?? project.live ?? "#");

  return (
    <Card
      interactive
      className={cn("group flex h-full flex-col", className)}
    >
      {/* --- Thumbnail --- */}
      <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-surface-sunken">
        <PlaceholderArt
          seed={project.slug}
          className="transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent"
        />
      </div>

      {/* --- Body --- */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-subheading text-ink">
          <Link href={href} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {project.summary}
        </p>

        <TechPillGroup items={project.tech} limit={4} className="mt-4" />

        <div className="mt-5 flex items-center justify-between gap-3 pt-1">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-soft transition-colors group-hover:text-mint">
            {project.hasCaseStudy ? "Case Study" : "View Source"}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-soft group-hover:translate-x-0.5"
            />
          </span>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              // Above the stretched link so it wins the click.
              className="relative z-10 text-ink-faint transition-colors hover:text-ink"
            >
              <GithubIcon aria-hidden className="size-4.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
