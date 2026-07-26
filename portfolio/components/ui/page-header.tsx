import type { ComponentType, ReactNode } from "react";

import { Entrance } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The masthead every non-home page opens with.
 *
 * An icon tile, a title, and a two-line description — consistent enough that
 * Projects, Writing and About read as chapters of one document.
 */
export function PageHeader({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("container-page pt-12 pb-4 lg:pt-20", className)}>
      <Entrance>
        {Icon && (
          <span className="mb-6 grid size-12 place-items-center rounded-card border border-line bg-surface text-brand-soft">
            <Icon className="size-5" />
          </span>
        )}

        <h1 className="text-heading sm:text-title text-ink">{title}</h1>

        {description && (
          <p className="text-lead mt-4 max-w-2xl text-ink-muted">
            {description}
          </p>
        )}

        {children}
      </Entrance>
    </header>
  );
}
