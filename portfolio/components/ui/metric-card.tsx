import { cn } from "@/lib/utils";

export type Metric = {
  /** The number itself — kept short. "18.7%", "120ms", "10K+". */
  value: string;
  label: string;
  /** Optional one-line qualifier: how it was measured, over what window. */
  detail?: string;
};

/**
 * Results, stated plainly. The number carries the weight, so it gets the
 * display face and the accent; everything else recedes to muted body text.
 */
export function MetricCard({
  metric,
  tone = "mint",
  className,
}: {
  metric: Metric;
  tone?: "mint" | "blue";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-display text-4xl font-bold tracking-[-0.03em] tabular-nums",
          tone === "mint" ? "text-mint" : "text-brand-soft",
        )}
      >
        {metric.value}
      </span>
      <span className="text-sm font-medium text-ink">{metric.label}</span>
      {metric.detail && (
        <span className="text-xs leading-relaxed text-ink-faint">
          {metric.detail}
        </span>
      )}
    </div>
  );
}

export function MetricGrid({
  metrics,
  className,
}: {
  metrics: readonly Metric[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {metrics.map((metric, i) => (
        <div key={metric.label}>
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <MetricCard metric={metric} tone={i % 2 === 0 ? "mint" : "blue"} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
