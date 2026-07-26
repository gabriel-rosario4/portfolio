"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Sticky table of contents with scroll-spy.
 *
 * The observer's root margin pins the "active" band near the top of the
 * viewport, so the highlighted entry is the heading you are actually reading
 * rather than whichever one happens to be on screen.
 */
export function TableOfContents({
  headings,
  className,
}: {
  headings: Heading[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost heading currently inside the active band.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-labelledby="toc-heading" className={cn("text-sm", className)}>
      <h2 id="toc-heading" className="text-eyebrow uppercase text-ink-faint">
        On this page
      </h2>

      <ul className="mt-4 space-y-0.5 border-l border-line">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 transition-colors duration-200",
                  heading.level === 3 ? "pl-7" : "pl-4",
                  active
                    ? "border-mint text-mint"
                    : "border-transparent text-ink-muted hover:text-ink",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
