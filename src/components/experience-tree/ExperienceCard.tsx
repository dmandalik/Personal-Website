"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/data/experiences";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const eyebrow = experience.id === "investcorp-cornell-generative-ai" ? "Current" : experience.category;

  return (
    // Keyed so each selection remounts the card and replays the enter fade.
    // (Avoids AnimatePresence "wait" mode leaving the new card stuck at its
    // initial opacity:0 state when the active experience changes.)
    // The trailing detail card mirrors the active experience branch.
    <motion.aside
      key={experience.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="rounded-2xl border border-blue-200/15 bg-[#050813]/78 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl lg:sticky lg:top-28"
    >
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: experience.color }}>
          {eyebrow}
        </p>
        <h3 className="mt-5 font-serif text-2xl font-semibold leading-snug tracking-tight text-zinc-50">{experience.title}</h3>
        <div className="mt-4 space-y-1 text-sm text-zinc-400">
          <p>{experience.role}</p>
          <p>{experience.dateRange ?? experience.year}</p>
        </div>
        <div className="my-6 h-px bg-white/10" />
        <p className="text-sm leading-7 text-zinc-300">{experience.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-blue-200/10 bg-blue-200/[0.045] px-3 py-1.5 text-xs text-blue-100/80">
              {tag}
            </span>
          ))}
        </div>
        {experience.link ? (
          <a
            href={experience.link}
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
          >
            View Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
    </motion.aside>
  );
}
