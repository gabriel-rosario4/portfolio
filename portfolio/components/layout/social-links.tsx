import { Mail } from "lucide-react";
import type { ComponentType } from "react";

import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/brand-icons";
import { socials, type SocialId } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialId, ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
  x: XIcon,
};

export function SocialLinks({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((social) => {
        const Icon = ICONS[social.id];
        return (
          <li key={social.id}>
            <a
              href={social.href}
              aria-label={social.label}
              {...(social.id !== "email"
                ? { target: "_blank", rel: "me noopener noreferrer" }
                : null)}
              className={cn(
                "grid place-items-center rounded-pill border border-line",
                "bg-surface/60 text-ink-muted",
                "transition-[color,border-color,transform,background-color] duration-200",
                "ease-soft",
                "hover:-translate-y-0.5 hover:border-brand/40 hover:bg-surface hover:text-brand-soft",
                size === "sm" ? "size-9" : "size-10",
              )}
            >
              <Icon className={size === "sm" ? "size-4" : "size-4.5"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
