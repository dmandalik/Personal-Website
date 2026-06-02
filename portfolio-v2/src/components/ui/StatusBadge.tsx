import { cn } from "@/lib/cn";
import type { ProjectStatus } from "@/data/projects";

const MAP: Record<ProjectStatus, { label: string; dot: string; text: string }> = {
  live: { label: "Live", dot: "bg-emerald-400", text: "text-emerald-300/90" },
  wip: { label: "In progress", dot: "bg-amber-400", text: "text-amber-300/90" },
  mockup: { label: "Mockup", dot: "bg-fg/40", text: "text-fg/45" },
  published: { label: "Published", dot: "bg-fg/40", text: "text-fg/45" },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const s = MAP[status];
  return (
    <span
      className={cn(
        "status-badge inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]",
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)}>
        {status === "live" && (
          <span className="block h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400/70" />
        )}
      </span>
      {s.label}
    </span>
  );
}
