"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { ArticleCard } from "@/components/writing/article-card";
import type { Article } from "@/lib/content";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Search and tag filtering over the article list.
 *
 * The corpus is small enough to filter in memory, so there's no index to build
 * and no request to wait on — typing filters instantly.
 */
export function ArticleBrowser({
  articles,
  tags,
}: {
  articles: Article[];
  tags: { tag: string; count: number }[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return articles.filter((article) => {
      if (activeTag && !article.tags.includes(activeTag)) return false;
      if (!q) return true;

      // Match on the fields a reader would actually search by.
      return [article.title, article.summary, article.category, ...article.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [articles, query, activeTag]);

  const filtering = Boolean(query.trim() || activeTag);

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Search articles</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            className={cn(
              "w-full rounded-pill border border-line-strong bg-surface",
              "py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint",
              "transition-colors duration-200 hover:border-brand/30",
              "focus:border-brand/50 focus:outline-none",
            )}
          />
        </label>

        <ul className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => {
            const active = tag === activeTag;
            return (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => setActiveTag(active ? null : tag)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-pill border px-3 py-1.5 text-xs font-medium",
                    "transition-colors duration-200 ease-soft",
                    active
                      ? "border-transparent bg-mint text-canvas"
                      : "border-line-strong bg-surface text-ink-muted hover:border-mint/40 hover:text-ink",
                  )}
                >
                  {tag}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {filtering && (
        <div className="mt-5 flex items-center gap-3 text-sm text-ink-muted">
          <span aria-live="polite">
            {visible.length} {visible.length === 1 ? "article" : "articles"}
          </span>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
            className="inline-flex items-center gap-1 text-xs text-brand-soft transition-colors hover:text-mint"
          >
            <X aria-hidden className="size-3" />
            Clear filters
          </button>
        </div>
      )}

      <motion.ul
        layout={!reduced}
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((article) => (
            <motion.li
              key={article.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={transitions.quick}
            >
              <ArticleCard article={article} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-ink-muted">
          No articles match that. Try a different search or tag.
        </p>
      )}
    </>
  );
}
