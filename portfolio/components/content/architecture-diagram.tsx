import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

export type ArchitectureStage = {
  label: string;
  /** What this stage actually does, in one line. */
  detail?: string;
  /** Technologies doing the work at this stage. */
  tech?: string[];
};

/**
 * A left-to-right system diagram, authored as data rather than as an image.
 *
 * Case studies need to show shape of a system without shipping a PNG that
 * goes stale and can't be read by a screen reader. Stages stack vertically on
 * narrow screens with the arrows rotating to match.
 */
export function ArchitectureDiagram({
  stages,
  caption,
  className,
}: {
  stages: ArchitectureStage[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("my-10 lg:-mx-16", className)}>
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        {stages.map((stage, i) => (
          <Fragment key={stage.label}>
            <li className="flex-1">
              <div className="h-full rounded-card border border-line bg-surface p-4">
                <p className="font-display text-sm font-semibold text-ink">
                  {stage.label}
                </p>
                {stage.detail && (
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {stage.detail}
                  </p>
                )}
                {stage.tech && stage.tech.length > 0 && (
                  <p className="mt-3 font-mono text-[0.6875rem] text-brand-soft">
                    {stage.tech.join(" · ")}
                  </p>
                )}
              </div>
            </li>

            {i < stages.length - 1 && (
              <li aria-hidden className="flex shrink-0 justify-center">
                <ArrowRight className="size-4 rotate-90 text-ink-faint md:rotate-0" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
