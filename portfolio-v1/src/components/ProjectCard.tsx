import { ArrowUpRight, Github, PenLine } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.06] hover:shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-50">{project.title}</h3>
        <ArrowUpRight className="h-5 w-5 text-zinc-500 transition group-hover:text-cyan-300" aria-hidden="true" />
      </div>
      <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
      {project.links ? (
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {project.links.github ? (
            <a className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-cyan-300" href={project.links.github}>
              <Github className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          ) : null}
          {project.links.demo ? (
            <a className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-cyan-300" href={project.links.demo}>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              Demo
            </a>
          ) : null}
          {project.links.writeup ? (
            <a className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-cyan-300" href={project.links.writeup}>
              <PenLine className="h-4 w-4" aria-hidden="true" />
              Writeup
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
