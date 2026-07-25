import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The heading pattern every section on the site uses.
 *
 * A section gets its identity from the small things: an eyebrow, an optional
 * hand-drawn mark sitting next to the title, and a right-aligned action. The
 * title itself stays plain so the page never turns into a shouting match.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
  mark,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
  /** Small illustrated mark rendered beside the title. */
  mark?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex gap-6",
        centered
          ? "flex-col items-center text-center"
          : "flex-col items-start justify-between sm:flex-row sm:items-end",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        {eyebrow && (
          <p className="text-eyebrow mb-3 uppercase text-brand-soft">
            {eyebrow}
          </p>
        )}

        <div className="flex items-center gap-3">
          <Heading className="text-heading sm:text-title text-ink">
            {title}
          </Heading>
          {mark && (
            <span aria-hidden className="shrink-0 text-mint">
              {mark}
            </span>
          )}
        </div>

        {description && (
          <p className="text-lead mt-4 text-ink-muted">{description}</p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium",
            "text-brand-soft transition-colors duration-200 hover:text-mint",
          )}
        >
          {action.label}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
