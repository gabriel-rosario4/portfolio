import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { Callout } from "@/components/ui/callout";
import { MetricGrid } from "@/components/ui/metric-card";
import { TechPillGroup } from "@/components/ui/tech-pill";
import { Figure, Gallery } from "@/components/content/gallery";
import { ArchitectureDiagram } from "@/components/content/architecture-diagram";

/**
 * Components available to every MDX file without an import.
 *
 * Element overrides are kept minimal — the `.prose` class in globals.css does
 * the typographic work, so this file is mostly about exposing the custom
 * blocks a case study or article is allowed to reach for.
 */
const components: MDXComponents = {
  Callout,
  MetricGrid,
  TechPillGroup,
  Figure,
  Gallery,
  ArchitectureDiagram,

  // A markdown table has no width it can shrink to, so it needs its own
  // scroll container or it forces the whole page sideways on a phone.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
