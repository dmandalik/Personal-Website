// ---------------------------------------------------------------------------
// Neuro-Runner — canvas renderer. Pure drawing: it reads world/net state and a
// theme palette, and paints. No simulation or React lives here. Minimal
// geometric style — thin strokes, a faint swarm, the leader highlighted.
// ---------------------------------------------------------------------------

import type { Agent, Net, Palette, World } from "./types";
import { N_IN, N_HID } from "./engine";

const AGENT_W = 9;
const AGENT_H = 13;

/** Paint one frame of the simulation, scaling logical units to pixels. */
export function drawWorld(
  ctx: CanvasRenderingContext2D,
  world: World,
  pal: Palette,
  pxW: number,
  pxH: number,
): void {
  const sx = pxW / world.width;
  const sy = pxH / world.height;
  const groundPx = world.groundY * sy;

  ctx.clearRect(0, 0, pxW, pxH);

  // --- ground line --------------------------------------------------------
  ctx.strokeStyle = pal.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, groundPx + 0.5);
  ctx.lineTo(pxW, groundPx + 0.5);
  ctx.stroke();

  // faint tick marks scrolling with the world for a sense of motion
  ctx.strokeStyle = pal.dim;
  ctx.globalAlpha = 0.5;
  const tickSpacing = 26;
  const offset = world.distance % tickSpacing;
  ctx.beginPath();
  for (let x = -offset; x < world.width; x += tickSpacing) {
    const px = x * sx;
    ctx.moveTo(px, groundPx + 1);
    ctx.lineTo(px, groundPx + 4);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;

  // --- obstacles ----------------------------------------------------------
  ctx.fillStyle = pal.fg;
  for (let i = 0; i < world.obstacles.length; i++) {
    const o = world.obstacles[i];
    const ox = o.x * sx;
    const ow = o.w * sx;
    const oh = o.h * sy;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(ox, groundPx - oh, ow, oh);
  }
  ctx.globalAlpha = 1;

  // --- agents -------------------------------------------------------------
  // Find the current leader (alive, max fitness) to highlight.
  let leader: Agent | null = null;
  for (let i = 0; i < world.agents.length; i++) {
    const a = world.agents[i];
    if (a.alive && (!leader || a.fitness > leader.fitness)) leader = a;
  }

  const ax = world.agentX * sx;
  const aw = AGENT_W * sx;
  const ah = AGENT_H * sy;

  // swarm: faint accent squares so it reads as a population, not one dot
  ctx.fillStyle = pal.accent;
  for (let i = 0; i < world.agents.length; i++) {
    const a = world.agents[i];
    if (!a.alive || a === leader) continue;
    const ay = groundPx - a.y * sy - ah;
    ctx.globalAlpha = 0.16;
    ctx.fillRect(ax, ay, aw, ah);
  }
  ctx.globalAlpha = 1;

  // leader: solid, with a thin outline so it pops against the swarm
  if (leader) {
    const ly = groundPx - leader.y * sy - ah;
    ctx.fillStyle = pal.accent;
    ctx.globalAlpha = 1;
    ctx.fillRect(ax, ly, aw, ah);
    ctx.strokeStyle = pal.fg;
    ctx.lineWidth = 1;
    ctx.strokeRect(ax + 0.5, ly + 0.5, aw - 1, ah - 1);
  }
  ctx.globalAlpha = 1;
}

const IN_LABELS = ["dist", "width", "height", "speed", "vy"];

/**
 * Draw the best agent's network: input -> hidden -> output, with node fill
 * encoding activation and edge opacity encoding |weight| * upstream activity.
 * Used in the lab modal.
 */
export function drawNet(
  ctx: CanvasRenderingContext2D,
  net: Net,
  inputs: number[],
  hidden: number[],
  out: number[],
  pal: Palette,
  pxW: number,
  pxH: number,
  showLabels = true,
): void {
  ctx.clearRect(0, 0, pxW, pxH);

  const padX = showLabels ? 54 : 18;
  const padY = 16;
  const colX = [padX, pxW / 2, pxW - padX];
  const r = Math.min(7, (pxH - padY * 2) / (Math.max(N_IN, N_HID) * 2.2));

  const layout = (count: number, x: number) => {
    const pts: { x: number; y: number }[] = [];
    const span = pxH - padY * 2;
    const gap = count > 1 ? span / (count - 1) : 0;
    const startY = count > 1 ? padY : pxH / 2;
    for (let i = 0; i < count; i++) pts.push({ x, y: startY + gap * i });
    return pts;
  };

  const inPts = layout(N_IN, colX[0]);
  const hidPts = layout(N_HID, colX[1]);
  const outPts = layout(net.nOut, colX[2]);

  const act = (v: number) => Math.max(0, Math.min(1, v));

  // edges: input -> hidden
  for (let h = 0; h < N_HID; h++) {
    const base = h * N_IN;
    for (let i = 0; i < N_IN; i++) {
      const w = net.w1[base + i];
      const strength = Math.min(1, Math.abs(w) * act(Math.abs(inputs[i])));
      ctx.strokeStyle = w >= 0 ? pal.accent : pal.fg;
      ctx.globalAlpha = 0.06 + strength * 0.5;
      ctx.lineWidth = 0.5 + strength * 1.3;
      ctx.beginPath();
      ctx.moveTo(inPts[i].x, inPts[i].y);
      ctx.lineTo(hidPts[h].x, hidPts[h].y);
      ctx.stroke();
    }
  }
  // edges: hidden -> output
  for (let o = 0; o < net.nOut; o++) {
    const base = o * N_HID;
    for (let h = 0; h < N_HID; h++) {
      const w = net.w2[base + h];
      const strength = Math.min(1, Math.abs(w) * act(Math.abs(hidden[h])));
      ctx.strokeStyle = w >= 0 ? pal.accent : pal.fg;
      ctx.globalAlpha = 0.06 + strength * 0.5;
      ctx.lineWidth = 0.5 + strength * 1.3;
      ctx.beginPath();
      ctx.moveTo(hidPts[h].x, hidPts[h].y);
      ctx.lineTo(outPts[o].x, outPts[o].y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  // nodes
  const node = (
    x: number,
    y: number,
    value: number,
    signed: boolean,
  ) => {
    const a = signed ? act(Math.abs(value)) : act(value);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = pal.bg;
    ctx.fill();
    ctx.globalAlpha = 0.2 + a * 0.8;
    ctx.fillStyle = pal.accent;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = pal.line;
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  for (let i = 0; i < N_IN; i++) node(inPts[i].x, inPts[i].y, inputs[i], true);
  for (let h = 0; h < N_HID; h++) node(hidPts[h].x, hidPts[h].y, hidden[h], true);
  for (let o = 0; o < net.nOut; o++) node(outPts[o].x, outPts[o].y, out[o], false);

  // labels
  if (showLabels) {
    ctx.fillStyle = pal.dim;
    ctx.font = "9px ui-monospace, monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    for (let i = 0; i < N_IN; i++) {
      ctx.fillText(IN_LABELS[i] ?? "", inPts[i].x - r - 5, inPts[i].y);
    }
    ctx.textAlign = "left";
    for (let o = 0; o < net.nOut; o++) {
      ctx.fillText("jump", outPts[o].x + r + 5, outPts[o].y);
    }
  }
  ctx.globalAlpha = 1;
}

/** Learning curve: best fitness per completed generation. */
export function drawHistory(
  ctx: CanvasRenderingContext2D,
  history: number[],
  pal: Palette,
  pxW: number,
  pxH: number,
): void {
  ctx.clearRect(0, 0, pxW, pxH);
  if (history.length < 2) return;

  const pad = 4;
  const max = Math.max(...history, 1);
  const stepX = (pxW - pad * 2) / (history.length - 1);
  const yOf = (v: number) => pxH - pad - (v / max) * (pxH - pad * 2);

  // area fill
  ctx.beginPath();
  ctx.moveTo(pad, pxH - pad);
  for (let i = 0; i < history.length; i++) {
    ctx.lineTo(pad + i * stepX, yOf(history[i]));
  }
  ctx.lineTo(pad + (history.length - 1) * stepX, pxH - pad);
  ctx.closePath();
  ctx.fillStyle = pal.accent;
  ctx.globalAlpha = 0.12;
  ctx.fill();
  ctx.globalAlpha = 1;

  // line
  ctx.beginPath();
  for (let i = 0; i < history.length; i++) {
    const x = pad + i * stepX;
    const y = yOf(history[i]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = pal.accent;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = "round";
  ctx.stroke();
}
