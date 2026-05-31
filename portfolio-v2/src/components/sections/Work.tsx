"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="shell -scroll-mt-4 border-t border-line pb-16 pt-8 sm:pb-20">
      {/* Section title on the left, jump-to-contact pinned to the far end. */}
      <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 sm:mb-10">
        <h2 className="font-display text-headline font-normal text-fg">
          Projects
        </h2>
        <a
          href="#contact"
          className="group flex shrink-0 items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          Contact
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </a>
      </Reveal>

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
