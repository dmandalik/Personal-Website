"use client";

// ---------------------------------------------------------------------------
// useNeuroRunner — wires the pure engine to a canvas and React.
// Responsibilities: a DPR-scaled canvas, a fixed-timestep RAF loop, theme
// colours pulled live from CSS variables, auto-pause when offscreen / tab
// hidden / reduced-motion, throttled stats for the HUD, and full cleanup.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import type { Palette, World, WorldConfig } from "./types";
import { createWorld, DEFAULT_CONFIG, resetWorld, step } from "./engine";
import { drawWorld } from "./render";

const FIXED = 1 / 120; // physics step (s)
const MAX_FRAME = 0.05; // clamp huge gaps (tab refocus) to avoid spirals
const MAX_STEPS = 800; // safety cap per frame

export interface NeuroStats {
  generation: number;
  aliveCount: number;
  total: number;
  best: number;
  bestEver: number;
  history: number[];
  speedMul: number;
  running: boolean;
}

interface Options {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  configOverrides?: Partial<WorldConfig>;
  /** Extra per-frame draw (e.g. the NN diagram in the lab). */
  onFrame?: (world: World, pal: Palette) => void;
  /** Auto-start even under prefers-reduced-motion (the lab opts in). */
  autoPlay?: boolean;
}

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const triplet = (name: string, fallback: string) =>
    (cs.getPropertyValue(name).trim() || fallback);
  const accent = triplet("--accent-rgb", "110 168 254");
  const fg = triplet("--fg-rgb", "231 233 238");
  const bg = triplet("--bg-rgb", "8 10 15");
  const line = cs.getPropertyValue("--line").trim() || "rgba(255,255,255,0.08)";
  return {
    accent: `rgb(${accent})`,
    fg: `rgb(${fg})`,
    bg: `rgb(${bg})`,
    line,
    dim: `rgb(${fg} / 0.4)`,
  };
}

export function useNeuroRunner({
  canvasRef,
  configOverrides,
  onFrame,
  autoPlay,
}: Options) {
  const worldRef = useRef<World | null>(null);
  const paletteRef = useRef<Palette | null>(null);
  const speedMulRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const accRef = useRef(0);
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  // pause inputs — the loop runs only when all gates are open
  const visibleRef = useRef(true);
  const onScreenRef = useRef(true);
  const userPausedRef = useRef(false);

  const [stats, setStats] = useState<NeuroStats>({
    generation: 1,
    aliveCount: 0,
    total: 0,
    best: 0,
    bestEver: 0,
    history: [],
    speedMul: 1,
    running: false,
  });
  const lastStatsPush = useRef(0);

  // lazily create the world once
  if (!worldRef.current) {
    worldRef.current = createWorld({ ...DEFAULT_CONFIG, ...configOverrides });
  }

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [canvasRef]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const world = worldRef.current;
    if (!canvas || !world) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!paletteRef.current) paletteRef.current = readPalette();
    const pal = paletteRef.current;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    drawWorld(ctx, world, pal, canvas.width / dpr, canvas.height / dpr);
    onFrameRef.current?.(world, pal);
  }, [canvasRef]);

  const pushStats = useCallback((running: boolean) => {
    const w = worldRef.current;
    if (!w) return;
    setStats({
      generation: w.generation,
      aliveCount: w.aliveCount,
      total: w.agents.length,
      best: w.best,
      bestEver: w.bestEver,
      history: w.history.slice(),
      speedMul: speedMulRef.current,
      running,
    });
  }, []);

  const stop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const gatesOpen = useCallback(
    () => visibleRef.current && onScreenRef.current && !userPausedRef.current,
    [],
  );

  const loop = useCallback(
    (now: number) => {
      const world = worldRef.current;
      if (!world) return;
      const real = Math.min(MAX_FRAME, (now - lastRef.current) / 1000);
      lastRef.current = now;
      accRef.current += real * speedMulRef.current;

      let steps = 0;
      while (accRef.current >= FIXED && steps < MAX_STEPS) {
        step(world, FIXED);
        accRef.current -= FIXED;
        steps++;
      }
      draw();

      if (now - lastStatsPush.current > 120) {
        lastStatsPush.current = now;
        pushStats(true);
      }
      rafRef.current = requestAnimationFrame(loop);
    },
    [draw, pushStats],
  );

  const start = useCallback(() => {
    if (rafRef.current != null || !gatesOpen()) return;
    lastRef.current = performance.now();
    accRef.current = 0;
    rafRef.current = requestAnimationFrame(loop);
    pushStats(true);
  }, [gatesOpen, loop, pushStats]);

  // re-evaluate whether the loop should run
  const sync = useCallback(() => {
    if (gatesOpen()) start();
    else {
      stop();
      draw(); // keep a static frame visible while paused
      pushStats(false);
    }
  }, [gatesOpen, start, stop, draw, pushStats]);

  // --- public controls ----------------------------------------------------
  const setSpeedMul = useCallback(
    (m: number) => {
      speedMulRef.current = m;
      pushStats(rafRef.current != null);
    },
    [pushStats],
  );

  const setUserPaused = useCallback(
    (paused: boolean) => {
      userPausedRef.current = paused;
      sync();
    },
    [sync],
  );

  const reset = useCallback(
    (seed?: number) => {
      if (!worldRef.current) return;
      worldRef.current = resetWorld(worldRef.current, seed);
      accRef.current = 0;
      draw();
      pushStats(rafRef.current != null);
    },
    [draw, pushStats],
  );

  const reconfigure = useCallback(
    (overrides: Partial<WorldConfig>) => {
      const w = worldRef.current;
      if (!w) return;
      worldRef.current = createWorld({ ...w.config, ...overrides });
      accRef.current = 0;
      draw();
      pushStats(rafRef.current != null);
    },
    [draw, pushStats],
  );

  // --- lifecycle -----------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    sizeCanvas();
    paletteRef.current = readPalette();
    draw();

    // seed the visibility gate from real state (a tab can load hidden, where
    // requestAnimationFrame never fires — don't strand a started-but-dead loop)
    visibleRef.current = document.visibilityState === "visible";

    // reduced motion: start paused unless the caller opts in
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    userPausedRef.current = mql.matches && !autoPlay;

    const ro = new ResizeObserver(() => {
      sizeCanvas();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreenRef.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const onVis = () => {
      visibleRef.current = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    // re-read palette when the theme attribute flips
    const mo = new MutationObserver(() => {
      paletteRef.current = readPalette();
      draw();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    sync();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stats,
    worldRef,
    paletteRef,
    setSpeedMul,
    setUserPaused,
    reset,
    reconfigure,
    redraw: draw,
  };
}
