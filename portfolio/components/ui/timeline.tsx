import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TimelineEntry = {
  period: string;
  title: string;
  org?: string;
  body: ReactNode;
  /** Marks a turning point — rendered with a filled mint node. */
  pivotal?: boolean;
};

/**
 * A vertical rail with a node per entry. The rail fades at both ends so the
 * story reads as an excerpt from a longer life rather than a closed list.
 */
export function Timeline({
  entries,
  className,
}: {
  entries: readonly TimelineEntry[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {/* The rail itself — behind the nodes, fading out at the bottom. */}
      <span
        aria-hidden
        className={cn(
          "absolute left-[7px] top-2 bottom-2 w-px",
          "bg-gradient-to-b from-line-strong via-line-strong to-transparent",
        )}
      />

      {entries.map((entry) => (
        <li key={entry.title} className="relative pl-10 pb-12 last:pb-0">
          <span
            aria-hidden
            className={cn(
              "absolute left-0 top-1.5 size-[15px] rounded-full border-2",
              entry.pivotal
                ? "border-mint bg-mint shadow-glow-mint"
                : "border-line-strong bg-surface",
            )}
          />

          <p className="text-eyebrow uppercase text-ink-faint">
            {entry.period}
          </p>

          <h3 className="text-subheading mt-2 text-ink">{entry.title}</h3>

          {entry.org && (
            <p className="mt-1 text-sm font-medium text-brand-soft">
              {entry.org}
            </p>
          )}

          <div className="mt-3 leading-relaxed text-ink-muted">
            {entry.body}
          </div>
        </li>
      ))}
    </ol>
  );
}
