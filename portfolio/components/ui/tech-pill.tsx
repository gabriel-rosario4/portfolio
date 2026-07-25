import { cn } from "@/lib/utils";

/**
 * Technology tags carry a hue so a stack is scannable at a glance rather than
 * read word by word. The mapping is deliberate and stable — Python is always
 * mint, TypeScript is always blue — so repeat visitors build muscle memory.
 */
const TONE_BY_TECH: Record<string, PillTone> = {
  // Languages and runtimes
  Python: "mint",
  TypeScript: "blue",
  JavaScript: "blue",
  SQL: "teal",
  Go: "teal",
  // Frameworks
  "Next.js": "blue",
  React: "blue",
  FastAPI: "mint",
  Streamlit: "mint",
  Tailwind: "blue",
  "Tailwind CSS": "blue",
  MDX: "neutral",
  // Data and ML
  XGBoost: "mint",
  PyTorch: "mint",
  MLflow: "mint",
  "scikit-learn": "mint",
  Postgres: "teal",
  PostgreSQL: "teal",
  Redis: "teal",
  DuckDB: "teal",
  // Platform
  AWS: "neutral",
  Docker: "neutral",
  Vercel: "neutral",
  Kubernetes: "neutral",
  OpenAI: "mint",
};

type PillTone = "blue" | "mint" | "teal" | "neutral";

const toneClasses: Record<PillTone, string> = {
  blue: "text-brand-soft bg-brand/10 border-brand/20",
  mint: "text-mint bg-mint/10 border-mint/20",
  teal: "text-teal bg-teal/10 border-teal/20",
  neutral: "text-ink-muted bg-white/[0.04] border-line-strong",
};

export function TechPill({
  children,
  tone,
  className,
}: {
  children: string;
  /** Override the automatic tone. Rarely needed. */
  tone?: PillTone;
  className?: string;
}) {
  const resolved = tone ?? TONE_BY_TECH[children] ?? "neutral";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-1",
        "text-xs font-medium tracking-[-0.005em]",
        toneClasses[resolved],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TechPillGroup({
  items,
  className,
  limit,
}: {
  items: readonly string[];
  className?: string;
  /** Show at most N pills, then a "+N" counter. Keeps cards from wrapping. */
  limit?: number;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  const overflow = limit ? items.length - shown.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((item) => (
        <li key={item}>
          <TechPill>{item}</TechPill>
        </li>
      ))}
      {overflow > 0 && (
        <li>
          <TechPill tone="neutral">{`+${overflow}`}</TechPill>
        </li>
      )}
    </ul>
  );
}
