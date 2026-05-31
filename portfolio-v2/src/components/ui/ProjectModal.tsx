"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusBadge } from "./StatusBadge";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
      <span className="eyebrow pt-0.5">{label}</span>
      <div className="text-sm leading-relaxed text-fg/75">{children}</div>
    </div>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto px-4 py-[8vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="glass relative w-full max-w-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* accent header bar */}
            <div
              className="proj-bar h-1 w-full"
              style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
            />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="proj-cat font-mono text-[11px] uppercase tracking-[0.18em]"
                      style={{ color: project.accent }}
                    >
                      {project.category}
                    </span>
                    <StatusBadge status={project.status} />
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-normal text-fg">{project.title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-line bg-fg/[0.03] p-2 text-fg/60 transition-colors hover:text-fg"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* link buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-demo flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-bg"
                    style={{ background: project.accent }}
                  >
                    Live demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="rounded-lg border border-line bg-fg/[0.03] px-4 py-2 text-sm text-fg/40">
                    Demo coming soon
                  </span>
                )}
                {project.links.code && (
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-line bg-fg/[0.03] px-4 py-2 text-sm text-fg/80 transition-colors hover:text-fg"
                  >
                    <Github className="h-4 w-4" /> View code
                  </a>
                )}
              </div>

              <div className="mt-8 space-y-6">
                <Block label="Problem">{project.problem}</Block>

                <Block label="Approach">
                  <ul className="space-y-1.5">
                    {project.approach.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="proj-bullet" style={{ color: project.accent }}>—</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block label="Architecture">
                  <ArchitectureDiagram stages={project.architecture} accent={project.accent} />
                </Block>

                <Block label="Result">
                  <ul className="space-y-1.5">
                    {project.results.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="proj-bullet" style={{ color: project.accent }}>—</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </Block>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
