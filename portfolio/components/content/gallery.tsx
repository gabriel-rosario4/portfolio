import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A single captioned image inside long-form content. Breaks out past the
 * prose measure slightly so screenshots have room to breathe.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
  bleed = true,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
  /** Extend past the text column on wide screens. */
  bleed?: boolean;
}) {
  return (
    <figure className={cn("my-10", bleed && "lg:-mx-16")}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 800px, 100vw"
        className="w-full rounded-card border border-line"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Two- or three-up grid of screenshots. */
export function Gallery({
  items,
  columns = 2,
  caption,
}: {
  items: { src: string; alt: string }[];
  columns?: 2 | 3;
  caption?: ReactNode;
}) {
  return (
    <figure className="my-10 lg:-mx-16">
      <div
        className={cn(
          "grid gap-4",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={900}
            height={600}
            sizes="(min-width: 640px) 400px, 100vw"
            className="w-full rounded-card border border-line"
          />
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
