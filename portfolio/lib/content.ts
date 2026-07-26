import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { readingTime } from "./utils";

/**
 * Content lives on disk as MDX and is read at build time.
 *
 * Frontmatter is parsed here with gray-matter for *listings* (cards, indexes,
 * RSS); the MDX pipeline parses the same frontmatter again when a page renders
 * the body. One file, one source of truth, no duplicated registry.
 *
 * These functions are server-only — they touch `fs`.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ProjectCategory = "AI/ML" | "Web Apps" | "APIs" | "Data";

export type Metric = { value: string; label: string; detail?: string };

export type Project = {
  slug: string;
  title: string;
  /** One line, used on cards. */
  summary: string;
  /** Longer blurb for the case-study hero and meta description. */
  description: string;
  tech: string[];
  category: ProjectCategory;
  featured: boolean;
  /** Lower sorts first. */
  order: number;
  role: string;
  timeline: string;
  github?: string;
  live?: string;
  /** When false the card links straight to source instead of a case study. */
  hasCaseStudy: boolean;
  metrics: Metric[];
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, e.g. "2024-11-02". */
  date: string;
  tags: string[];
  category: string;
  featured: boolean;
  draft: boolean;
  readingMinutes: number;
};

export type Heading = { id: string; text: string; level: 2 | 3 };

/* ------------------------------------------------------------------------ */
/* Reading                                                                   */
/* ------------------------------------------------------------------------ */

function readCollection(dir: string) {
  const full = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(full)) return [];

  return fs
    .readdirSync(full)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

/* ------------------------------------------------------------------------ */
/* Projects                                                                  */
/* ------------------------------------------------------------------------ */

export function getProjects(): Project[] {
  return readCollection("case-studies")
    .map(({ slug, data }) => ({
      slug,
      title: String(data.title ?? slug),
      summary: String(data.summary ?? ""),
      description: String(data.description ?? data.summary ?? ""),
      tech: (data.tech as string[]) ?? [],
      category: (data.category as ProjectCategory) ?? "Web Apps",
      featured: Boolean(data.featured),
      order: Number(data.order ?? 99),
      role: String(data.role ?? ""),
      timeline: String(data.timeline ?? ""),
      github: data.github ? String(data.github) : undefined,
      live: data.live ? String(data.live) : undefined,
      hasCaseStudy: data.hasCaseStudy !== false,
      metrics: (data.metrics as Metric[]) ?? [],
    }))
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** Categories actually present in the content, in the brief's display order. */
export function getProjectCategories(): ProjectCategory[] {
  const ORDER: ProjectCategory[] = ["AI/ML", "Web Apps", "APIs", "Data"];
  const present = new Set(getProjects().map((p) => p.category));
  return ORDER.filter((category) => present.has(category));
}

/* ------------------------------------------------------------------------ */
/* Articles                                                                  */
/* ------------------------------------------------------------------------ */

export function getArticles({ includeDrafts = false } = {}): Article[] {
  return readCollection("blog")
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title ?? slug),
      summary: String(data.summary ?? ""),
      date: String(data.date ?? "1970-01-01"),
      tags: (data.tags as string[]) ?? [],
      category: String(data.category ?? "Engineering"),
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
      readingMinutes: readingTime(content),
    }))
    .filter((article) => includeDrafts || !article.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles({ includeDrafts: true }).find(
    (article) => article.slug === slug,
  );
}

/** Every tag in use, most frequent first. */
export function getArticleTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const article of getArticles()) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/* ------------------------------------------------------------------------ */
/* Table of contents                                                         */
/* ------------------------------------------------------------------------ */

/**
 * Pull h2/h3 headings straight out of the markdown source.
 *
 * Slugs are generated the same way `rehype-slug` (github-slugger) does for the
 * common cases, so anchors line up with the rendered ids. Fenced code blocks
 * are stripped first — a `# comment` in a shell snippet is not a heading.
 */
export function getHeadings(slug: string, collection: "blog" | "case-studies") {
  const file = path.join(CONTENT_ROOT, collection, `${slug}.mdx`);
  if (!fs.existsSync(file)) return [];

  const { content } = matter(fs.readFileSync(file, "utf8"));
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");

  const headings: Heading[] = [];
  const seen = new Map<string, number>();

  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    // Strip inline markdown so the TOC shows plain text.
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);

    headings.push({ id: count === 0 ? base : `${base}-${count}`, text, level });
  }

  return headings;
}

/** Mirrors github-slugger for ASCII headings. */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}
