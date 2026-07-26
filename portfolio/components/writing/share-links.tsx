"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

import { LinkedinIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

/**
 * Share row for articles. Copy-link uses the Clipboard API with a visible
 * confirmation, because a share button that gives no feedback gets pressed
 * three times.
 */
export function ShareLinks({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the share links still work.
    }
  };

  // Matches the networks in lib/site — offering a share target for a platform
  // he isn't on would just advertise an absence.
  const targets = [
    {
      label: "Share on LinkedIn",
      Icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  const buttonClass = cn(
    "grid size-9 place-items-center rounded-pill border border-line bg-surface",
    "text-ink-muted transition-[color,border-color,transform] duration-200 ease-soft",
    "hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand-soft",
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="mr-1 text-xs text-ink-faint">Share</span>

      {targets.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={buttonClass}
        >
          <Icon className="size-4" />
        </a>
      ))}

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cn(buttonClass, copied && "border-mint/40 text-mint")}
      >
        {copied ? (
          <Check aria-hidden className="size-4" />
        ) : (
          <Link2 aria-hidden className="size-4" />
        )}
      </button>
    </div>
  );
}
