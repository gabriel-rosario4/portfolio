import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Grid classes capped at the number of items.
 *
 * A single card sitting in a three-column grid reads as a page that failed to
 * load rather than as a short list, so small collections get a narrower track
 * instead of a full-width row of gaps.
 */
export function cardGrid(count: number) {
  if (count <= 1) return "max-w-md";
  if (count === 2) return "md:grid-cols-2";
  return "md:grid-cols-2 lg:grid-cols-3";
}

/** "2024-01-15" -> "Jan 15, 2024". Fixed to UTC so SSR and client agree. */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** "2024-01-15" -> "January 2024", for timelines and case-study meta. */
export function formatMonth(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

/**
 * Estimate reading time at 220 wpm — the usual pace for technical prose.
 * Code fences are stripped first; nobody reads a snippet word by word.
 */
export function readingTime(content: string) {
  const prose = content.replace(/```[\s\S]*?```/g, "");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
