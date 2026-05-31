"use client";

// ---------------------------------------------------------------------------
// NeuroRunner — the compact hero-panel widget. A population of tiny neural
// nets learns to clear obstacles by neuroevolution, live. Click ↗ to open the
// full lab (bigger sim + network diagram + learning curve + controls).
// ---------------------------------------------------------------------------

import { useRef, useState } from "react";
import { Github, Maximize2 } from "lucide-react";
import { profile } from "@/data/profile";
import { useNeuroRunner } from "./useNeuroRunner";
import { Sparkline } from "./Sparkline";
import { NeuroRunnerLab } from "./NeuroRunnerLab";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[9px] uppercase tracking-wider text-fg/35">
        {label}
      </span>
      <span className="font-mono text-sm tabular-nums text-fg/85">{value}</span>
    </div>
  );
}

export function NeuroRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [labOpen, setLabOpen] = useState(false);
  const { stats } = useNeuroRunner({ canvasRef });

  return (
    <div className="glass flex flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Neuro-runner</span>
        <span className="flex items-center gap-2">
          <a
            href={profile.links.neuroRunner}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg/30 transition-colors hover:text-fg"
            aria-label="View Neuro-Runner source on GitHub"
            title="View source on GitHub"
          >
            <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
          <button
            type="button"
            onClick={() => setLabOpen(true)}
            className="rounded border border-line bg-fg/[0.03] p-1 text-fg/45 transition-colors hover:border-fg/20 hover:text-fg"
            aria-label="Open neuro-runner lab"
            title="Open the lab"
          >
            <Maximize2 className="h-3 w-3" />
          </button>
        </span>
      </div>

      {/* simulation canvas — logical 300×120 (≈2.5:1) */}
      <div className="relative mt-4 overflow-hidden rounded-md border border-line bg-fg/[0.02]">
        <canvas
          ref={canvasRef}
          className="block h-[104px] w-full"
          aria-label="Neural-network agents learning to clear obstacles"
        />
        <span className="absolute right-1.5 top-1.5 rounded bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-fg/40 backdrop-blur-sm">
          gen {stats.generation}
        </span>
      </div>

      {/* HUD */}
      <div className="mt-3 flex items-center justify-between">
        <Stat label="Alive" value={`${stats.aliveCount}/${stats.total}`} />
        <Stat label="Best" value={`${Math.round(stats.best)}`} />
        <Stat label="Record" value={`${Math.round(stats.bestEver)}`} />
      </div>

      {/* learning curve */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wider text-fg/35">
            Best / generation
          </span>
          <button
            type="button"
            onClick={() => setLabOpen(true)}
            className="font-mono text-[10px] text-accent/80 transition-colors hover:text-accent"
          >
            open lab →
          </button>
        </div>
        <Sparkline data={stats.history} className="mt-1.5 h-7 w-full" />
      </div>

      <NeuroRunnerLab open={labOpen} onClose={() => setLabOpen(false)} />
    </div>
  );
}
