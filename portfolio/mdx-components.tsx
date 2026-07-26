import type { MDXComponents } from "mdx/types";

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
};

export function useMDXComponents(): MDXComponents {
  return components;
}
