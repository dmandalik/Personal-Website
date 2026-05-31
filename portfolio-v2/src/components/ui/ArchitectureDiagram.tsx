import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

// Renders a project's `architecture` stages as a connected pipeline flow.
// Pure presentational — give it the stage labels + an accent hex.
export function ArchitectureDiagram({
  stages,
  accent,
}: {
  stages: string[];
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-bg/40 p-4">
      <div className="flex flex-wrap items-center gap-y-3">
        {stages.map((stage, i) => (
          <Fragment key={stage}>
            <div
              className="arch-stage rounded-lg border px-3 py-2 text-center text-xs font-medium text-fg/85"
              style={{
                borderColor: `${accent}40`,
                background: `linear-gradient(180deg, ${accent}14, transparent)`,
                boxShadow: `0 0 24px -12px ${accent}`,
              }}
            >
              {stage}
            </div>
            {i < stages.length - 1 && (
              <ChevronRight
                className="arch-chevron mx-1 h-4 w-4 shrink-0"
                style={{ color: `${accent}99` }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
