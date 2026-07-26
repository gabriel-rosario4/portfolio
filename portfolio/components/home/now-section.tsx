import { BookOpen, Code2, Coffee, Music } from "lucide-react";
import type { ComponentType } from "react";

import { CurlyArrow } from "@/components/illustrations/doodles";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { now } from "@/lib/now";
import { formatMonth } from "@/lib/utils";

const ICONS: Record<string, { Icon: ComponentType<{ className?: string }>; tone: string }> = {
  code: { Icon: Code2, tone: "text-mint" },
  book: { Icon: BookOpen, tone: "text-brand-soft" },
  coffee: { Icon: Coffee, tone: "text-coral" },
  music: { Icon: Music, tone: "text-teal" },
};

/**
 * Four small cards saying what's happening right now. The point of the
 * section is currency, so the last-updated date is shown, not hidden.
 */
export function NowSection() {
  return (
    <section className="container-page py-24">
      <Reveal className="relative flex items-end gap-4">
        <h2 className="text-heading sm:text-title text-ink">
          What I&apos;m up to
        </h2>
        <CurlyArrow
          aria-hidden
          className="mb-2 hidden h-8 w-20 text-brand-soft sm:block"
        />
        <p className="ml-auto hidden text-xs text-ink-faint sm:block">
          Updated {formatMonth(now.lastUpdated)}
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {now.cards.map((card) => {
          const { Icon, tone } = ICONS[card.icon];
          return (
            <StaggerItem key={card.id}>
              <Card interactive className="h-full p-5">
                <span
                  className={`grid size-10 place-items-center rounded-pill border border-line bg-surface-raised ${tone}`}
                >
                  <Icon className="size-[18px]" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {card.body}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
