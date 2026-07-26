import type { Metadata } from "next";
import { PenLine } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ArticleBrowser } from "@/components/writing/article-browser";
import { ArticleCard } from "@/components/writing/article-card";
import { PageHeader } from "@/components/ui/page-header";
import { getArticleTags, getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on backend engineering, applied machine learning, and the decisions behind the systems I build.",
  alternates: { canonical: "/writing" },
};

/** Writing answers: how do you learn? */
export default function WritingPage() {
  const articles = getArticles();
  const tags = getArticleTags();

  // The newest article gets the wide treatment; the rest go in the grid.
  const [lead, ...rest] = articles;

  return (
    <div className="pb-24">
      <PageHeader
        icon={PenLine}
        title="Writing"
        description="Notes on things I've learned the hard way — architecture decisions, machine learning in production, and the occasional opinion."
      />

      <div className="container-page">
        {lead && (
          <Reveal className="mt-10">
            <ArticleCard article={lead} featured />
          </Reveal>
        )}

        {rest.length > 0 && <ArticleBrowser articles={rest} tags={tags} />}

        {articles.length === 0 && (
          <p className="mt-16 text-ink-muted">
            Nothing published yet — first piece is in progress.
          </p>
        )}
      </div>
    </div>
  );
}
