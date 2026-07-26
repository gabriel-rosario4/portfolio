import { Sparkle } from "@/components/illustrations/doodles";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionTitle } from "@/components/ui/section-title";
import { getFeaturedProjects } from "@/lib/content";
import { cardGrid, cn } from "@/lib/utils";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(3);
  if (projects.length === 0) return null;

  return (
    <section className="container-page py-24">
      <Reveal>
        <SectionTitle
          title="Featured Projects"
          mark={<Sparkle className="size-5" />}
          action={{ href: "/projects", label: "View all projects" }}
        />
      </Reveal>

      <Stagger className={cn("mt-12 grid gap-6", cardGrid(projects.length))}>
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
