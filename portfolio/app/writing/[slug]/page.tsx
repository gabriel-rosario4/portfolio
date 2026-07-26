import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { PlaceholderArt } from "@/components/illustrations/placeholder-art";
import { TableOfContents } from "@/components/content/table-of-contents";
import { Entrance } from "@/components/motion/reveal";
import { ArticleCard } from "@/components/writing/article-card";
import { ShareLinks } from "@/components/writing/share-links";
import { getArticle, getArticles, getHeadings } from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: `${site.url}/writing/${slug}`,
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article || article.draft) notFound();

  const headings = getHeadings(slug, "blog");
  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);

  // Related by shared tags, most overlap first; falls back to most recent.
  const related = getArticles()
    .filter((other) => other.slug !== slug)
    .map((other) => ({
      article: other,
      overlap: other.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)
    .map((entry) => entry.article);

  const url = `${site.url}/writing/${slug}`;

  return (
    <article>
      <header className="container-page pt-8">
        <Link
          href="/writing"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-brand-soft"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-200 ease-soft group-hover:-translate-x-0.5"
          />
          Back to writing
        </Link>

        <Entrance className="mx-auto mt-10 max-w-[46rem]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
            <span className="font-medium text-brand-soft">
              {article.category}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden className="size-3.5" />
              {article.readingMinutes} min read
            </span>
          </div>

          <h1 className="text-heading sm:text-title mt-4 text-ink">
            {article.title}
          </h1>

          <p className="text-lead mt-4 text-ink-muted">{article.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-pill border border-line-strong px-2.5 py-1 text-xs text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Entrance>

        <Entrance
          delay={0.12}
          className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-panel border border-line"
        >
          <PlaceholderArt seed={article.slug} className="aspect-[21/9]" />
        </Entrance>
      </header>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_15rem] lg:gap-16">
        <div className="min-w-0 justify-self-center lg:justify-self-end">
          <div className="prose max-w-[46rem]">
            <Body />
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <ShareLinks title={article.title} url={url} />
            <a
              href="/rss.xml"
              className="text-xs text-ink-faint transition-colors hover:text-brand-soft"
            >
              Subscribe via RSS
            </a>
          </div>
        </div>

        <aside className="hidden lg:block">
          <TableOfContents headings={headings} className="sticky top-28" />
        </aside>
      </div>

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="container-page border-t border-line py-14"
        >
          <h2
            id="related-heading"
            className="text-eyebrow uppercase text-ink-faint"
          >
            Keep reading
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((other) => (
              <li key={other.slug}>
                <ArticleCard article={other} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
