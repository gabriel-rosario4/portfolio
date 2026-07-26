import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const button = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-[-0.01em]",
    "rounded-pill border",
    // One transition definition for every variant keeps hover states in sync.
    "transition-[transform,box-shadow,background-color,border-color,color]",
    "duration-200 ease-soft",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /* The one loud element per screen. Mint reads as "go". */
        primary: [
          "bg-mint text-canvas border-transparent",
          "hover:bg-teal hover:shadow-glow-mint",
        ],
        /* Sits beside primary without competing with it. */
        secondary: [
          "bg-surface text-ink border-line-strong",
          "hover:bg-surface-raised hover:border-brand/40 hover:shadow-lift",
        ],
        /* Blue fill, for in-content calls to action on darker panels. */
        brand: [
          "bg-brand text-white border-transparent",
          "hover:bg-brand-deep hover:shadow-glow",
        ],
        /* Navigation-weight actions. No chrome until hovered. */
        ghost: [
          "bg-transparent text-ink-muted border-transparent",
          "hover:text-ink hover:bg-surface",
        ],
        /* Inline "Read case study →" affordance. */
        link: [
          "bg-transparent border-transparent px-0 text-brand-soft",
          "hover:text-mint",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    compoundVariants: [
      // The link variant is text, not a control — it should not reserve height.
      { variant: "link", size: ["sm", "md", "lg"], class: "h-auto p-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariants = VariantProps<typeof button>;

type BaseProps = ButtonVariants & {
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The site's only button. Renders a `<button>`, a `next/link`, or a plain
 * `<a>` for external and download URLs — chosen from the `href` it is given
 * so callers never have to think about it.
 */
export function Button({
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  const classes = cn(button({ variant, size }), className);

  if (typeof props.href === "string") {
    const { href, ...rest } = props as ButtonAsLink;
    const isInternal = href.startsWith("/") && !href.endsWith(".pdf");

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }

    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
