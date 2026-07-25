import { Info, Lightbulb, TriangleAlert, Quote } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutTone = "note" | "insight" | "warning" | "quote";

const TONES: Record<
  CalloutTone,
  { icon: typeof Info; ring: string; accent: string; label: string }
> = {
  note: {
    icon: Info,
    ring: "border-brand/25 bg-brand/[0.06]",
    accent: "text-brand-soft",
    label: "Note",
  },
  insight: {
    icon: Lightbulb,
    ring: "border-mint/25 bg-mint/[0.06]",
    accent: "text-mint",
    label: "Insight",
  },
  warning: {
    icon: TriangleAlert,
    ring: "border-coral/30 bg-coral/[0.07]",
    accent: "text-coral",
    label: "Watch out",
  },
  quote: {
    icon: Quote,
    ring: "border-line-strong bg-white/[0.03]",
    accent: "text-ink-muted",
    label: "Quote",
  },
};

/**
 * Used inside MDX to break up long-form prose. The tone sets the icon and the
 * accent; the title is optional because most callouts are a single thought.
 */
export function Callout({
  children,
  tone = "note",
  title,
  className,
}: {
  children: ReactNode;
  tone?: CalloutTone;
  title?: string;
  className?: string;
}) {
  const { icon: Icon, ring, accent, label } = TONES[tone];

  return (
    <div
      className={cn(
        "my-8 flex gap-4 rounded-card border p-5",
        ring,
        className,
      )}
    >
      <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", accent)} />
      <div className="min-w-0 flex-1">
        <p className={cn("text-eyebrow mb-2 uppercase", accent)}>
          {title ?? label}
        </p>
        <div className="text-[0.95rem] leading-relaxed text-ink-muted [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
