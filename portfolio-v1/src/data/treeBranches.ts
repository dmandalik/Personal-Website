import {
  experiences,
  type Experience,
  type ExperienceSide,
} from "@/data/experiences";
import { branchTips, trunkPointAtY } from "@/data/treeStrands";

// ---------------------------------------------------------------------------
// Modular experience-branch layout.
//
// Everything visual about a branch (where it attaches to the trunk, how far it
// reaches, its curve, its wisps, its node + label position) is DERIVED here
// from the pure `experiences` content list. Adding or removing an experience
// re-distributes the whole side automatically — no hand-tuned coordinates.
//
// Coordinate space matches the tree SVG viewBox: 0..900 x, 0..980 y, with the
// trunk base near the bottom and the violet crown at the top.
// ---------------------------------------------------------------------------

export type BranchLabel = {
  x: number;
  y: number;
  align: "left" | "right" | "center";
};

export type BranchLayout = {
  id: string;
  experience: Experience;
  side: ExperienceSide;
  color: string; // accent colour — used for the orb that marks the experience
  bodyPath: string; // tapering filled ribbon — thick at the trunk, sharp at the tip
  corePath: string; // narrower white-hot ribbon down the branch centre
  node: { x: number; y: number };
  label: BranchLabel;
};

export type YearMarker = {
  year: string;
  x: number;
  y: number;
};

// --- tunables (the few knobs that shape the overall fan) -------------------
// The label columns are pulled in far enough that the longest (non-wrapping)
// role lines still fit inside the 0..900 viewBox, which clips overflow.
const NODE_Y_LOW = 628; // y of the lowest branch node (nearest the base)
const NODE_Y_HIGH = 76; // y of the highest branch node (nearest the crown)
const LEFT_NODE_X = 202; // base x of the left label column
const RIGHT_NODE_X = 706; // base x of the right label column
const LEFT_MIN_X = 168; // keep left labels from spilling off the left edge
const RIGHT_MAX_X = 720; // keep right labels from spilling off the right edge
const COLUMN_RISE = 18; // higher branches reach slightly further outward
const ATTACH_DROP_MIN = 44; // how far below its node a low branch meets the trunk
const ATTACH_DROP_GAIN = 56; // extra drop added for the highest branches
const LABEL_GAP = 13; // gap between node and the start of its label

// --- small deterministic helpers (no hydration mismatch) -------------------
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function hashSeed(id: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number };

function cubicAt(p0: Pt, p1: Pt, p2: Pt, p3: Pt, u: number): Pt {
  const v = 1 - u;
  const a = v * v * v;
  const b = 3 * v * v * u;
  const c = 3 * v * u * u;
  const d = u * u * u;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

const f2 = (n: number) => Math.round(n * 100) / 100;

// Sample a single cubic into a smooth centerline — ONE gentle, consistent arc.
// No sinusoidal wobble: the reference branches are subtly and evenly curved,
// not wavy. Curvature comes purely from the control points in buildBranch.
function smoothCenterline(p0: Pt, p1: Pt, p2: Pt, p3: Pt, n = 44): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) pts.push(cubicAt(p0, p1, p2, p3, i / n));
  return pts;
}

// Turn a centerline polyline into a filled ribbon whose half-width tapers from
// `wBase` (start) to `wTip` (end). Used for both the main branch and its twigs
// so everything reads thick where it sprouts and razor-thin at the tip.
function taperRibbon(pts: Pt[], wBase: number, wTip: number, ease = 0.72): string {
  const n = pts.length;
  if (n < 2) return "";
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n - 1, i + 1)];
    let nx = -(b.y - a.y);
    let ny = b.x - a.x;
    const nl = Math.hypot(nx, ny) || 1;
    nx /= nl;
    ny /= nl;
    const u = i / (n - 1);
    const half = (wBase + (wTip - wBase) * Math.pow(u, ease)) / 2;
    left.push({ x: pts[i].x + nx * half, y: pts[i].y + ny * half });
    right.push({ x: pts[i].x - nx * half, y: pts[i].y - ny * half });
  }
  let d = `M${f2(left[0].x)} ${f2(left[0].y)}`;
  for (let i = 1; i < n; i++) d += `L${f2(left[i].x)} ${f2(left[i].y)}`;
  for (let i = n - 1; i >= 0; i--) d += `L${f2(right[i].x)} ${f2(right[i].y)}`;
  return d + "Z";
}

// Build one branch: it leaves the trunk rising along the spine (so it reads as
// a continuation of the trunk, not something stuck on), then sweeps out to the
// node in a single gentle, consistent arc. Colour comes from the shared trunk
// gradients at render time, so a branch matches the spine where it joins it.
function buildBranch(experience: Experience, sideIndex: number, sideCount: number): BranchLayout {
  const rng = mulberry32(hashSeed(experience.id));
  const dir = experience.side === "left" ? -1 : 1;

  // Vertical fraction up this side's band (0 = bottom/earliest, 1 = top/latest).
  const f = sideCount <= 1 ? 0.5 : sideIndex / (sideCount - 1);

  // Evenly spaced nodes up the side. Only a hair of deterministic variation so
  // the fan reads ordered rather than mechanical — never random or jumbled.
  const vary = rng() - 0.5;
  const nodeY = clamp(NODE_Y_LOW - f * (NODE_Y_LOW - NODE_Y_HIGH) + vary * 8, 50, 720);

  // Branches reach a touch further out the higher they climb, then clamp so the
  // labels always stay inside the viewBox.
  const columnX = experience.side === "left" ? LEFT_NODE_X : RIGHT_NODE_X;
  const rawNodeX = columnX + dir * (COLUMN_RISE * f);
  const nodeX =
    experience.side === "left"
      ? clamp(rawNodeX, LEFT_MIN_X, columnX + 30)
      : clamp(rawNodeX, columnX - 30, RIGHT_MAX_X);
  // Snap the orb to the tip of the hand-tuned plasma branch so the orb + label
  // sit exactly at the end of the branch. Fall back to the procedural column
  // position if no tuned branch exists for this experience.
  const tip = branchTips[experience.id];
  const node: Pt = tip ? { x: tip.x, y: tip.y } : { x: nodeX, y: nodeY };

  // Attach below the node so the branch climbs along the spine before peeling
  // off — the key to making it look like part of the trunk.
  const drop = ATTACH_DROP_MIN + f * ATTACH_DROP_GAIN;
  const attach = trunkPointAtY(nodeY + drop);

  const dx = node.x - attach.x;
  const dy = attach.y - node.y; // > 0 (node sits above its attach point)

  // Control points for one smooth arc:
  //  - p1 rises almost straight up along the spine (tiny outward lean) so the
  //    base of the branch is tangent to the trunk and blends into it.
  //  - p2 approaches the node from slightly inboard/below for a gentle outward
  //    sweep. The bias is fixed (not random) so every branch curves the same way.
  const p0 = attach;
  const p1: Pt = { x: attach.x + dx * 0.06, y: attach.y - dy * 0.58 };
  const p2: Pt = { x: node.x - dx * 0.4, y: node.y + dy * 0.1 };
  const p3 = node;

  const center = smoothCenterline(p0, p1, p2, p3);
  const reach = Math.hypot(dx, dy);
  // Thick where it sprouts (to blend with the trunk body), razor-sharp at the
  // tip. A little extra base width for the longer sweeps.
  const baseW = 4.6 + Math.min(2, reach / 280);
  const bodyPath = taperRibbon(center, baseW, 0.1);
  const corePath = taperRibbon(center, baseW * 0.36, 0);

  const label: BranchLabel = {
    x: node.x + dir * LABEL_GAP,
    y: node.y - 4,
    align: experience.side === "left" ? "left" : "right",
  };

  return {
    id: experience.id,
    experience,
    side: experience.side,
    color: experience.color,
    bodyPath,
    corePath,
    node,
    label,
  };
}

function buildFoundation(experience: Experience): BranchLayout {
  const base = trunkPointAtY(916);
  return {
    id: experience.id,
    experience,
    side: "base",
    color: experience.color,
    bodyPath: "",
    corePath: "",
    node: base,
    label: { x: base.x, y: base.y + 14, align: "center" },
  };
}

function buildLayouts(): BranchLayout[] {
  // Array order decides each side's vertical order (first = nearest the base),
  // so re-ordering `experiences` re-stacks a side without touching geometry.
  const foundation = experiences.find((e) => e.side === "base");
  const left = experiences.filter((e) => e.side === "left");
  const right = experiences.filter((e) => e.side === "right");

  const layouts: BranchLayout[] = [];
  left.forEach((e, i) => layouts.push(buildBranch(e, i, left.length)));
  right.forEach((e, i) => layouts.push(buildBranch(e, i, right.length)));
  if (foundation) layouts.push(buildFoundation(foundation));
  return layouts;
}

// Year markers: one per distinct year, distributed monotonically up the trunk
// (earliest near the base, latest near the crown) so they always read in order,
// then nudged alternately to either side of the trunk so they don't sit on it.
const YEAR_Y_LOW = 866; // earliest year, near the base
const YEAR_Y_HIGH = 150; // latest year, near the crown

function buildYearMarkers(layouts: BranchLayout[]): YearMarker[] {
  const years = [...new Set(layouts.map((l) => l.experience.year))].sort(
    (a, b) => Number(a) - Number(b),
  );

  return years.map((year, i) => {
    const f = years.length <= 1 ? 0 : i / (years.length - 1);
    const y = YEAR_Y_LOW - f * (YEAR_Y_LOW - YEAR_Y_HIGH);
    const onTrunk = trunkPointAtY(y);
    const dir = i % 2 === 0 ? 1 : -1;
    return { year, x: f2(onTrunk.x + dir * 34), y: f2(y) };
  });
}

export const branchLayouts: BranchLayout[] = buildLayouts();
export const yearMarkers: YearMarker[] = buildYearMarkers(branchLayouts);
