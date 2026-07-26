import type { MetadataRoute } from "next";

import { getArticles, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: site.url, changeFrequency: "monthly", priority: 1 },
      { url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${site.url}/writing`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified: now }));

  const caseStudies: MetadataRoute.Sitemap = getProjects()
    .filter((project) => project.hasCaseStudy)
    .map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    }));

  const articles: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: `${site.url}/writing/${article.slug}`,
    // Articles have a real publication date; use it rather than build time.
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudies, ...articles];
}
