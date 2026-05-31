"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="shell scroll-mt-24 border-t border-line py-16 sm:py-20">
      <SectionHeading index="02" eyebrow="Selected work" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08}>
            <ProjectCard project={p} onOpen={() => setOpen(p)} />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
