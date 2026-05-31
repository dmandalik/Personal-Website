"use client";

import { ArrowUpRight, Github, MoveRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusBadge } from "./StatusBadge";

// A glass case-study card. Clicking the body opens the full case study; the
// Demo / Code buttons are independent links that stop propagation.
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article
      onClick={onOpen}
      className="group glass relative flex cursor-pointer flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fg/15"
      style={{ ["--c" as string]: project.accent }}
    >
      {/* accent wash on hover */}
      <div
        className="proj-wash pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 100% 0%, ${project.accent}1f, transparent 60%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className="proj-dot h-2.5 w-2.5 rounded-full"
            style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg/45">
            {project.category}
          </span>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="relative mt-5 font-display text-2xl font-normal text-fg">{project.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-fg/60">{project.blurb}</p>

      {/* metric */}
      <p
        className="proj-metric relative mt-4 flex items-center gap-2 text-sm font-medium"
        style={{ color: project.accent }}
      >
        <MoveRight className="h-4 w-4" />
        {project.metric}
      </p>

      {/* tags */}
      <ul className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-md border border-line bg-fg/[0.03] px-2 py-0.5 font-mono text-[10px] text-fg/55"
          >
            {t}
          </li>
        ))}
      </ul>

      {/* footer links */}
      <div className="relative mt-6 flex items-center gap-3 border-t border-line pt-4">
        {project.links.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm text-fg/80 transition-colors hover:text-fg"
          >
            Live demo <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-sm text-fg/30">
            Demo soon
          </span>
        )}
        {project.links.code && (
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm text-fg/60 transition-colors hover:text-fg"
          >
            <Github className="h-3.5 w-3.5" /> Code
          </a>
        )}
        <span className="ml-auto flex items-center gap-1 text-xs text-fg/40 transition-colors group-hover:text-fg/70">
          Case study <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </article>
  );
}
