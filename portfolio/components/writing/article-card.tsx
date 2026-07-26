import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { PlaceholderArt } from "@/components/illustrations/placeholder-art";
import { Card } from "@/components/ui/card";
import type { Article } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

export function ArticleCard({
  article,
  featured = false,
  className,
}: {
  article: Article;
  /** Wide layout with the cover beside the copy, for the lead article. */
  featured?: boolean;
  className?: string;
}) {
  return (
    <Card
      interactive
      className={cn(
        "group flex h-full",
        featured ? "flex-col md:flex-row" : "flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-surface-sunken",
          featured
            ? "aspect-16/10 border-b border-line md:aspect-auto md:w-[45%] md:border-b-0 md:border-r"
            : "aspect-16/9 border-b border-line",
        )}
      >
        <PlaceholderArt
          seed={article.slug}
          className="transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
          <span className="font-medium text-brand-soft">
            {article.category}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-3" />
            {article.readingMinutes} min read
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 text-ink",
            featured ? "text-subheading sm:text-heading" : "text-subheading",
          )}
        >
          <Link
            href={`/writing/${article.slug}`}
            className="after:absolute after:inset-0"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {article.summary}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-pill border border-line-strong px-2 py-0.5 text-[0.6875rem] text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <ArrowRight
            aria-hidden
            className="size-4 shrink-0 text-brand-soft transition-transform duration-200 ease-soft group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Card>
  );
}
