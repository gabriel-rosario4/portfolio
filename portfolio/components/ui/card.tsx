import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/**
 * The base surface. Cards lift on hover — 2px, never more — and gain a faint
 * blue rim so the movement reads as light rather than as a jump.
 */
export function Card({
  className,
  interactive = false,
  ...props
}: ComponentPropsWithoutRef<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "surface-card relative overflow-hidden",
        interactive && [
          "transition-[transform,border-color,box-shadow] duration-300",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lift-lg",
        ],
        className,
      )}
      {...props}
    />
  );
}

/**
 * A panel that sits *inside* a section rather than in a grid — used for the
 * quote block, the case-study CTA and the newsletter-style footers.
 */
export function Panel({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-panel border border-line",
        "bg-surface-sunken",
        className,
      )}
      {...props}
    />
  );
}
