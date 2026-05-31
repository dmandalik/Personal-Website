"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { TreeDefs } from "@/components/experience-tree/TreeDefs";
import { TreeShapeEditor } from "@/components/experience-tree/TreeShapeEditor";
import { TrunkStrands } from "@/components/experience-tree/TrunkStrands";
import { LightningArcs } from "@/components/experience-tree/LightningArcs";
import { ExperienceBranch } from "@/components/experience-tree/ExperienceBranch";
import { ExperienceCard } from "@/components/experience-tree/ExperienceCard";
import { experiences, type Experience } from "@/data/experiences";
import { branchLayouts, yearMarkers } from "@/data/treeBranches";

const DEFAULT_ID = "investcorp-cornell-generative-ai";

// Category legend shown beside the tree — maps each branch colour to its theme.
const legend = [
  { label: "Research", color: "#60a5fa" },
  { label: "Robotics", color: "#a855f7" },
  { label: "Systems / Engineering", color: "#5eead4" },
  { label: "AI / ML", color: "#facc15" },
] as const;

// chronological order for the linear timeline (earliest first)
const timeline = [...experiences].sort((a, b) => Number(a.year) - Number(b.year));

export function ExperienceTree() {
  const defaultExperience =
    experiences.find((experience) => experience.id === DEFAULT_ID) ?? experiences[0];
  const [activeId, setActiveId] = useState(defaultExperience.id);

  // Dev-only shape editor. Opens via the floating "Edit tree shape" button or
  // the ?edit=1 URL. Both are resolved after mount so server and client render
  // the same markup (no hydration mismatch) and nothing ships to production.
  const [isDev, setIsDev] = useState(false);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setIsDev(process.env.NODE_ENV !== "production");
    if (new URLSearchParams(window.location.search).get("edit") === "1") setEditMode(true);
  }, []);

  const activeExperience =
    experiences.find((experience) => experience.id === activeId) ?? defaultExperience;

  if (editMode) {
    return <TreeShapeEditor onClose={() => setEditMode(false)} />;
  }

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-y border-white/5 bg-[#02040a] px-5 py-16 sm:px-6 lg:min-h-screen lg:px-8"
    >
      {isDev && (
        <button
          onClick={() => setEditMode(true)}
          className="fixed bottom-4 right-4 z-50 rounded-full border border-blue-300/40 bg-blue-500/20 px-4 py-2 text-xs font-semibold text-blue-100 shadow-lg backdrop-blur hover:bg-blue-500/30"
        >
          Edit tree shape
        </button>
      )}
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)_320px] lg:items-start">
          <div className="z-10 max-w-sm lg:pt-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.34em] text-blue-400">Experience</p>
            <h2 className="font-serif text-6xl font-medium leading-[1.05] tracking-tight text-zinc-50">My Journey</h2>
            <p className="mt-7 max-w-xs text-base leading-8 text-zinc-400">
              A timeline of projects, research, and experiences that have shaped my path in AI, robotics, and systems
              engineering.
            </p>
            <ul className="mt-10 space-y-4">
              {legend.map((item) => (
                <li key={item.label} className="flex items-center gap-3.5 text-sm text-zinc-300">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
            <a
              href="#resume"
              className="mt-11 inline-flex items-center gap-4 rounded-lg border border-blue-200/15 bg-white/[0.015] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100 transition hover:border-blue-300/40 hover:bg-blue-300/10 focus:outline-none focus:ring-2 focus:ring-blue-300/60"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              View Full Resume
            </a>
          </div>

          {/* Desktop: interactive plasma tree */}
          <div className="experience-tree-shell relative hidden min-h-[900px] overflow-visible lg:block">
            <svg
              viewBox="0 0 900 980"
              role="img"
              aria-labelledby="experience-tree-title experience-tree-description"
              className="mx-auto h-full w-full max-w-[920px]"
            >
              <title id="experience-tree-title">Dhruv Mandalik&apos;s experience tree</title>
              <desc id="experience-tree-description">
                An interactive plasma tree whose branches represent experiences in research, robotics, AI, and systems
                engineering. Hover or focus a branch to see its details.
              </desc>
              <TreeDefs />
              <rect width="900" height="980" fill="transparent" />
              {/* Soft glow pooled at the white-hot base */}
              <ellipse cx="462" cy="900" rx="210" ry="120" fill="url(#rootGlow)" opacity="0.55" />
              {/* Faint column glow along the trunk's rise */}
              <ellipse cx="466" cy="470" rx="150" ry="430" fill="url(#rootGlow)" opacity="0.28" />

              <TrunkStrands />

              {/* Year markers running up the trunk */}
              <g aria-hidden="true">
                {yearMarkers.map((marker) => (
                  <text
                    key={marker.year}
                    x={marker.x}
                    y={marker.y}
                    textAnchor="middle"
                    className="select-none fill-blue-200/45 text-[12px] font-medium tracking-[0.18em]"
                  >
                    {marker.year}
                  </text>
                ))}
              </g>

              {/* Experience branches — thin cool filaments tipped with orbs */}
              {branchLayouts.map((layout, index) => (
                <ExperienceBranch
                  key={layout.id}
                  layout={layout}
                  index={index}
                  isActive={layout.id === activeId}
                  onActivate={(experience) => setActiveId(experience.id)}
                />
              ))}

              <LightningArcs />
            </svg>
          </div>

          {/* Desktop: detail card */}
          <div className="hidden lg:block">
            <ExperienceCard experience={activeExperience} />
          </div>
        </div>

        {/* Mobile / tablet: linear timeline fallback */}
        <ol className="mt-12 space-y-5 lg:hidden">
          {timeline.map((experience) => {
            const eyebrow = experience.id === DEFAULT_ID ? "Current" : experience.category;
            return (
              <li
                key={experience.id}
                className="relative rounded-2xl border border-blue-200/15 bg-[#050813]/70 p-6 pl-7"
              >
                <span
                  className="absolute left-0 top-7 h-[calc(100%-2.5rem)] w-px"
                  style={{ background: `linear-gradient(${experience.color}, transparent)` }}
                  aria-hidden="true"
                />
                <span
                  className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: experience.color, boxShadow: `0 0 12px ${experience.color}` }}
                  aria-hidden="true"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: experience.color }}>
                  {eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tight text-zinc-50">
                  {experience.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {experience.role} · {experience.dateRange ?? experience.year}
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{experience.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-200/10 bg-blue-200/[0.045] px-3 py-1.5 text-xs text-blue-100/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
