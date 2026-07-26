"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import type { Project, ProjectCategory } from "@/lib/content";
import { transitions } from "@/lib/motion";
import { cardGrid, cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/**
 * Filterable project grid.
 *
 * Filtering is client-side over an already-rendered list rather than a route
 * change: the set is small, and keeping the URL stable means the back button
 * still returns to wherever the visitor came from.
 */
export function ProjectGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();

  const filters: Filter[] = ["All", ...categories];
  const visible =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-10 flex flex-wrap gap-2"
      >
        {filters.map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={active}
              className={cn(
                "rounded-pill border px-4 py-2 text-sm font-medium",
                "transition-[color,background-color,border-color] duration-200 ease-soft",
                active
                  ? "border-transparent bg-brand text-canvas"
                  : "border-line-strong bg-surface text-ink-muted hover:border-brand/40 hover:text-ink",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Announce the result count for screen readers as the filter changes. */}
      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
        {filter !== "All" && ` in ${filter}`}
      </p>

      <motion.ul
        layout={!reduced}
        // Sized from the full set, not the filtered one, so the track doesn't
        // resize every time a filter is toggled.
        className={cn("mt-10 grid gap-6", cardGrid(projects.length))}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={transitions.quick}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-ink-muted">
          Nothing here yet — try another category.
        </p>
      )}
    </>
  );
}
