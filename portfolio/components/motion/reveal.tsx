"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { fade, rise, slideFrom, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealVariant = "rise" | "fade" | "left" | "right";

const variantMap: Record<RevealVariant, Variants> = {
  rise,
  fade,
  left: slideFrom("left"),
  right: slideFrom("right"),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Which entrance to use. Defaults to the site-wide rise. */
  variant?: RevealVariant;
  /** Seconds to wait before starting. Use sparingly. */
  delay?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Fades a block into place the first time it scrolls into view.
 *
 * With `prefers-reduced-motion` the element renders in its final state and no
 * animation is registered at all, so there is nothing to "finish".
 */
export function Reveal({
  children,
  className,
  variant = "rise",
  delay = 0,
  as = "div",
  id,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

/**
 * Parent for a list of `StaggerItem`s. Children arrive in sequence once the
 * group enters the viewport.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  as = "div",
}: StaggerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={stagger(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** A single child of `Stagger`. Inherits timing from its parent. */
export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={cn(className)} variants={rise}>
      {children}
    </MotionTag>
  );
}

/** Fades content in on mount rather than on scroll — for above-the-fold copy. */
export function Entrance({
  children,
  className,
  delay = 0,
  as = "div",
}: StaggerItemProps & { delay?: number }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={fade}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
