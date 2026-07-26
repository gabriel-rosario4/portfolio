import { getArticles } from "@/lib/content";
import { site } from "@/lib/site";

// The feed is derived entirely from files on disk, so it can be prerendered
// with the rest of the site rather than rebuilt per request.
export const dynamic = "force-static";

/** Escape the five characters that are not legal as raw text in XML. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getArticles();

  const items = articles
    .map((article) => {
      const url = `${site.url}/writing/${article.slug}`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.summary)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
    </item>`;
    })
    .join("\n");

  const lastBuild = articles[0]
    ? new Date(articles[0].date).toUTCString()
    : new Date().toUTCString();

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} — Writing`)}</title>
    <link>${site.url}/writing</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
