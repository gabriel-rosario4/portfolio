import type { Metadata } from "next";
import { FolderOpen } from "lucide-react";

import { ProjectGrid } from "@/components/projects/project-grid";
import { PageHeader } from "@/components/ui/page-header";
import { getProjectCategories, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of things I've built — machine learning platforms, APIs, data tools and web applications, each with the reasoning behind it.",
  alternates: { canonical: "/projects" },
};

/** Projects answers: what have you built? */
export default function ProjectsPage() {
  const projects = getProjects();
  const categories = getProjectCategories();

  return (
    <div className="pb-24">
      <PageHeader
        icon={FolderOpen}
        title="Projects"
        description="A collection of things I've built and am proud of. Each one has a case study explaining the decisions behind it, not just the stack."
      />

      <div className="container-page">
        <ProjectGrid projects={projects} categories={categories} />
      </div>
    </div>
  );
}
