"use client";

import type { KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import type { Experience } from "@/data/experiences";
import type { BranchLayout } from "@/data/treeBranches";

type ExperienceBranchProps = {
  layout: BranchLayout;
  index: number;
  isActive: boolean;
  onActivate: (experience: Experience) => void;
};

function splitTitle(title: string) {
  if (title.length < 24) {
    return [title];
  }

  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 23 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 3);
}

export function ExperienceBranch({ layout, isActive, onActivate }: ExperienceBranchProps) {
  const { experience, node, label, color } = layout;
  const isFoundation = layout.side === "base";
  const labelAnchor = label.align === "center" ? "middle" : label.align === "left" ? "end" : "start";
  const titleLines = splitTitle(experience.title);

  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate(experience);
    }
  }

  return (
    <g
      className={cn("cursor-pointer outline-none transition-opacity", isActive ? "opacity-100" : "opacity-76 hover:opacity-95")}
      tabIndex={0}
      role="button"
      aria-label={`${experience.title}, ${experience.role}, ${experience.year}`}
      aria-pressed={isActive}
      onClick={() => onActivate(experience)}
      onMouseEnter={() => onActivate(experience)}
      onFocus={() => onActivate(experience)}
      onKeyDown={handleKeyDown}
    >
      {!isFoundation ? (
        <>
          {/* wide soft bloom in the accent colour */}
          <circle
            cx={node.x}
            cy={node.y}
            r={isActive ? 8.5 : 6}
            fill={color}
            filter="url(#nodeGlow)"
            opacity={isActive ? 0.55 : 0.34}
          />
          {/* crisp orb body */}
          <circle
            cx={node.x}
            cy={node.y}
            r={isActive ? 3.4 : 2.5}
            fill={color}
            opacity={isActive ? 1 : 0.9}
          />
          {/* white-hot core */}
          <circle cx={node.x} cy={node.y} r={isActive ? 1.5 : 1.15} fill="#fff" opacity={isActive ? 0.98 : 0.82} />
        </>
      ) : null}
      <text
        x={label.x}
        y={label.y}
        textAnchor={labelAnchor}
        className={cn("select-none fill-zinc-50 font-semibold tracking-normal", isFoundation ? "text-[12px]" : "text-[15px]")}
        style={{ filter: isActive ? "drop-shadow(0 0 8px rgba(219, 234, 254, 0.55))" : undefined }}
      >
        {titleLines.map((line, lineIndex) => (
          <tspan key={line} x={label.x} dy={lineIndex === 0 ? 0 : 19}>
            {line}
          </tspan>
        ))}
      </text>
      {!isFoundation ? (
        <text
          x={label.x}
          y={label.y + titleLines.length * 19 + 6}
          textAnchor={labelAnchor}
          className="select-none fill-zinc-400 text-[12px]"
        >
          {experience.role}
        </text>
      ) : null}
    </g>
  );
}
