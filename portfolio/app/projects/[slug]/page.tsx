import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { TableOfContents } from "@/components/content/table-of-contents";
import { CaseStudyHero } from "@/components/projects/case-study-hero";
import { Reveal } from "@/components/motion/reveal";
import { MetricGrid } from "@/components/ui/metric-card";
import { getHeadings, getProject, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/** Prerender every case study; unknown slugs 404 rather than render blank. */
export function generateStaticParams() {
  return getProjects()
    .filter((project) => project.hasCaseStudy)
    .map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — Case Study`,
      description: project.description,
      url: `${site.url}/projects/${slug}`,
    },
  };
}

/** A case study answers: how do you think? */
export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.hasCaseStudy) notFound();

  const headings = getHeadings(slug, "case-studies");
  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  // Neighbours for the footer pager, in the same order as the index.
  const all = getProjects().filter((p) => p.hasCaseStudy);
  const index = all.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <article>
      <CaseStudyHero project={project} />

      {project.metrics.length > 0 && (
        <Reveal className="border-b border-line bg-surface-sunken/50">
          <div className="container-page py-12">
            <h2 className="text-eyebrow uppercase text-ink-faint">
              The Results
            </h2>
            <MetricGrid metrics={project.metrics} className="mt-8" />
          </div>
        </Reveal>
      )}

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_15rem] lg:gap-16">
        <div className="prose min-w-0 max-w-content">
          <Body />
        </div>

        <aside className="hidden lg:block">
          <TableOfContents headings={headings} className="sticky top-28" />
        </aside>
      </div>

      {/* --- Pager --- */}
      <nav
        aria-label="More case studies"
        className="container-page grid gap-4 border-t border-line py-12 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="group surface-card p-5 transition-colors hover:border-brand/30"
          >
            <span className="flex items-center gap-1.5 text-xs text-ink-faint">
              <ArrowLeft
                aria-hidden
                className="size-3.5 transition-transform duration-200 ease-soft group-hover:-translate-x-0.5"
              />
              Previous
            </span>
            <span className="mt-2 block font-display font-semibold text-ink">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group surface-card p-5 text-right transition-colors hover:border-brand/30 sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-ink-faint">
              Next
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 ease-soft group-hover:translate-x-0.5"
              />
            </span>
            <span className="mt-2 block font-display font-semibold text-ink">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
