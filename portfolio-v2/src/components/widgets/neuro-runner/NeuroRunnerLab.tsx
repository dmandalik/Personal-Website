"use client";

// ---------------------------------------------------------------------------
// NeuroRunnerLab — fullscreen "lab" for the neuro-runner. Runs its own,
// larger simulation alongside a live diagram of the leading agent's network
// and a learning curve, with controls for speed / population / mutation.
// The sim only mounts while the modal is open (LabContent), so nothing runs
// in the background when it's closed.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Pause, Play, RotateCcw, X } from "lucide-react";
import type { Agent, Palette, World } from "./types";
import { useNeuroRunner } from "./useNeuroRunner";
import { drawHistory, drawNet } from "./render";
import { profile } from "@/data/profile";

const SPEEDS = [1, 2, 4, 8] as const;
const POPULATIONS = [40, 80, 150] as const;
const MUTATIONS = [0.05, 0.1, 0.2] as const;

function leaderOf(world: World): Agent | null {
  let alive: Agent | null = null;
  let any: Agent | null = null;
  for (const a of world.agents) {
    if (!any || a.fitness > any.fitness) any = a;
    if (a.alive && (!alive || a.fitness > alive.fitness)) alive = a;
  }
  return alive ?? any;
}

function setupCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { dpr, w: rect.width, h: rect.height };
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-fg/[0.02] px-3 py-2.5">
      <p className="font-mono text-[9px] uppercase tracking-wider text-fg/35">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-lg tabular-nums text-fg">{value}</p>
    </div>
  );
}

function Segmented<T extends number>({
  label,
  value,
  options,
  format,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  format: (v: T) => string;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="eyebrow mb-1.5">{label}</p>
      <div className="flex gap-1 rounded-lg border border-line bg-fg/[0.02] p-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`flex-1 rounded-md px-2 py-1.5 font-mono text-xs transition-colors ${
              value === o
                ? "bg-accent/20 text-accent"
                : "text-fg/50 hover:text-fg/80"
            }`}
          >
            {format(o)}
          </button>
        ))}
      </div>
    </div>
  );
}

function LabContent() {
  const simRef = useRef<HTMLCanvasElement>(null);
  const netRef = useRef<HTMLCanvasElement>(null);
  const histRef = useRef<HTMLCanvasElement>(null);

  const [population, setPopulation] = useState<(typeof POPULATIONS)[number]>(80);
  const [mutation, setMutation] = useState<(typeof MUTATIONS)[number]>(0.1);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(2);
  const [paused, setPaused] = useState(false);

  // draw the leader's network each sim frame
  const onFrame = useCallback((world: World, pal: Palette) => {
    const canvas = netRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const leader = leaderOf(world);
    if (!leader) return;
    drawNet(
      ctx,
      leader.net,
      leader.act.inputs,
      leader.act.hidden,
      leader.act.out,
      pal,
      canvas.width / dpr,
      canvas.height / dpr,
    );
  }, []);

  const { stats, setSpeedMul, setUserPaused, reset, reconfigure, paletteRef } =
    useNeuroRunner({ canvasRef: simRef, onFrame, autoPlay: true });

  // apply speed immediately and on mount
  useEffect(() => {
    setSpeedMul(speed);
  }, [speed, setSpeedMul]);

  // size the secondary canvases on mount + resize
  useEffect(() => {
    const resize = () => {
      if (netRef.current) setupCanvas(netRef.current);
      if (histRef.current) setupCanvas(histRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // redraw the learning curve whenever history advances
  useEffect(() => {
    const canvas = histRef.current;
    const pal = paletteRef.current;
    if (!canvas || !pal) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    drawHistory(ctx, stats.history, pal, canvas.width / dpr, canvas.height / dpr);
  }, [stats.history, paletteRef]);

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    setUserPaused(next);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* left: the simulation + learning curve */}
      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-lg border border-line bg-fg/[0.02]">
          <canvas
            ref={simRef}
            className="block h-[230px] w-full sm:h-[300px]"
            aria-label="Neural-network agents learning to clear obstacles"
          />
          <span className="absolute left-2.5 top-2.5 rounded bg-bg/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-fg/50 backdrop-blur-sm">
            generation {stats.generation}
          </span>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="eyebrow">Learning curve — best distance / generation</span>
            <span className="font-mono text-[10px] text-fg/40">
              {stats.history.length} gens
            </span>
          </div>
          <div className="overflow-hidden rounded-lg border border-line bg-fg/[0.02]">
            <canvas ref={histRef} className="block h-[88px] w-full" aria-hidden />
          </div>
        </div>
      </div>

      {/* right: live network + stats + controls */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="eyebrow mb-1.5">Leading agent — live policy network</p>
          <div className="overflow-hidden rounded-lg border border-line bg-fg/[0.02]">
            <canvas ref={netRef} className="block h-[170px] w-full" aria-hidden />
          </div>
          <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-fg/40">
            5 inputs → 6 hidden (tanh) → 1 output (jump). Edge weight = |w| ×
            activation; warm = excitatory.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Metric label="Alive" value={`${stats.aliveCount}/${stats.total}`} />
          <Metric label="Best now" value={`${Math.round(stats.best)}`} />
          <Metric label="Record" value={`${Math.round(stats.bestEver)}`} />
          <Metric label="Speed" value={`${stats.speedMul}×`} />
        </div>

        <div className="flex flex-col gap-3.5">
          <Segmented
            label="Speed"
            value={speed}
            options={SPEEDS}
            format={(v) => `${v}×`}
            onChange={setSpeed}
          />
          <Segmented
            label="Population (resets)"
            value={population}
            options={POPULATIONS}
            format={(v) => `${v}`}
            onChange={(v) => {
              setPopulation(v);
              reconfigure({ populationSize: v });
            }}
          />
          <Segmented
            label="Mutation rate (resets)"
            value={mutation}
            options={MUTATIONS}
            format={(v) => `${Math.round(v * 100)}%`}
            onChange={(v) => {
              setMutation(v);
              reconfigure({ mutationRate: v });
            }}
          />

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={togglePause}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-fg/[0.03] px-4 py-2.5 text-sm text-fg/80 transition-colors hover:text-fg"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-fg/[0.03] px-4 py-2.5 text-sm text-fg/80 transition-colors hover:text-fg"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NeuroRunnerLab({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Portal to <body>: the widget sits inside a transform-animated ancestor,
  // which would otherwise become the containing block for our fixed overlay
  // and shrink it. Mounting on body pins the modal to the viewport.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const repo = profile.links.neuroRunner;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto px-4 py-[6vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="glass relative w-full max-w-5xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="proj-bar h-1 w-full bg-gradient-to-r from-accent to-transparent" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="proj-cat font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    Neuroevolution · live
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-normal text-fg">
                    Neuro-Runner Lab
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg/65">
                    A population of tiny neural networks learns to clear an
                    endless obstacle course — no training data, no labels. Each
                    generation keeps the elites and breeds the rest with
                    crossover + mutation. Watch it get better in real time.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {repo && (
                    <a
                      href={repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden items-center gap-2 rounded-lg border border-line bg-fg/[0.03] px-3 py-2 text-sm text-fg/80 transition-colors hover:text-fg sm:flex"
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-line bg-fg/[0.03] p-2 text-fg/60 transition-colors hover:text-fg"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-7">
                <LabContent />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
