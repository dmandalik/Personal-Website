"use client";

import { useMemo, useRef, useState } from "react";
import { TreeDefs } from "@/components/experience-tree/TreeDefs";
import {
  TRUNK_OFFSETS,
  TRUNK_CENTRE_X,
  branchControls,
  branchStrandFromControls,
  trunkCenterlinePath,
  trunkSpineFrom,
  type BranchControl,
  type Pt2,
} from "@/data/treeStrands";

// Dev-only drag-and-drop editor for the trunk centre-line offsets and the
// per-branch control points. Mounted only when the page URL has `?edit=1`.
// Nothing here ships into the static render — it only outputs copy-paste config
// (TRUNK_OFFSETS + BRANCH_OVERRIDES) to paste back into treeStrands.ts.

type OffsetPair = [number, number];
type DragTarget =
  | { kind: "trunk"; pi: number }
  | { kind: "branch"; bi: number; pi: number };

const round1 = (n: number) => Math.round(n * 10) / 10;

function clonePairs(src: ReadonlyArray<readonly [number, number]>): OffsetPair[] {
  return src.map((p) => [p[0], p[1]] as OffsetPair);
}

function cloneBranches(src: BranchControl[]): BranchControl[] {
  return src.map((b) => ({ ...b, points: b.points.map((p) => ({ ...p })) }));
}

export function TreeShapeEditor({ onClose }: { onClose?: () => void }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<DragTarget | null>(null);
  const [offsets, setOffsets] = useState<OffsetPair[]>(() => clonePairs(TRUNK_OFFSETS));
  const [branches, setBranches] = useState<BranchControl[]>(() => cloneBranches(branchControls));
  const [show, setShow] = useState<{ trunk: boolean; branches: boolean }>({ trunk: true, branches: true });
  const [copied, setCopied] = useState<string | null>(null);

  const trunkPath = useMemo(() => trunkCenterlinePath(offsets, 180), [offsets]);
  const branchStrands = useMemo(() => branches.map(branchStrandFromControls), [branches]);

  // Convert a client (screen) point into the SVG's viewBox coordinate space.
  const toSvg = (clientX: number, clientY: number): Pt2 => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };

  // Pointer handling lives directly on the <svg> with pointer capture, so a
  // drag keeps tracking even when the cursor leaves a tiny handle — no
  // window-listener race, no missed first move.
  const startDrag = (e: React.PointerEvent, target: DragTarget) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = target;
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const { x, y } = toSvg(e.clientX, e.clientY);
    if (drag.kind === "trunk") {
      setOffsets((prev) => {
        const next = prev.map((p) => [p[0], p[1]] as OffsetPair);
        // t (vertical) stays fixed per control point; dragging sets the
        // horizontal offset from the trunk centre.
        next[drag.pi][1] = round1(x - TRUNK_CENTRE_X);
        return next;
      });
    } else {
      setBranches((prev) => {
        const next = prev.map((b) => ({ ...b, points: b.points.map((q) => ({ ...q })) }));
        next[drag.bi].points[drag.pi] = { x: round1(x), y: round1(y) };
        return next;
      });
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    svgRef.current?.releasePointerCapture(e.pointerId);
  };

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied("clipboard blocked — see console");
      // eslint-disable-next-line no-console
      console.log(text);
      setTimeout(() => setCopied(null), 2400);
    }
  };

  const trunkConfig = () => {
    const lines = offsets.map((p) => `  [${p[0]}, ${round1(p[1])}],`).join("\n");
    return `const TRUNK_OFFSETS: ReadonlyArray<readonly [number, number]> = [\n${lines}\n];`;
  };

  const branchConfig = () => {
    const entries = branches
      .map((b) => {
        const pts = b.points.map((p) => `{ x: ${round1(p.x)}, y: ${round1(p.y)} }`).join(", ");
        return `  ${JSON.stringify(b.id)}: [${pts}],`;
      })
      .join("\n");
    return `const BRANCH_OVERRIDES: Record<string, Pt2[]> = {\n${entries}\n};`;
  };

  const reset = () => {
    setOffsets(clonePairs(TRUNK_OFFSETS));
    setBranches(cloneBranches(branchControls));
  };

  return (
    <div className="fixed inset-0 z-[60] flex bg-[#02040a] text-zinc-200">
      {/* Control panel */}
      <div className="flex w-72 shrink-0 flex-col gap-3 overflow-y-auto border-r border-white/10 bg-black/40 p-4 text-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-400">Shape Editor</p>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/5"
            >
              Close
            </button>
          )}
        </div>
        <p className="text-xs leading-5 text-zinc-400">
          Drag the orange dots to reshape the trunk and branches. Trunk dots move left/right only.
          Branch dots move freely. Then copy the config and paste it into{" "}
          <code className="text-blue-300">treeStrands.ts</code>.
        </p>

        <div className="mt-1 flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={show.trunk}
              onChange={(e) => setShow((s) => ({ ...s, trunk: e.target.checked }))}
            />
            Show trunk handles
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={show.branches}
              onChange={(e) => setShow((s) => ({ ...s, branches: e.target.checked }))}
            />
            Show branch handles
          </label>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <button
            onClick={() => copy("trunk", trunkConfig())}
            className="rounded-md border border-blue-300/30 bg-blue-300/10 px-3 py-2 text-xs font-semibold text-blue-100 hover:bg-blue-300/20"
          >
            Copy TRUNK_OFFSETS
          </button>
          <button
            onClick={() => copy("branches", branchConfig())}
            className="rounded-md border border-blue-300/30 bg-blue-300/10 px-3 py-2 text-xs font-semibold text-blue-100 hover:bg-blue-300/20"
          >
            Copy BRANCH_OVERRIDES
          </button>
          <button
            onClick={() => copy("all", `${trunkConfig()}\n\n${branchConfig()}`)}
            className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-300/20"
          >
            Copy both
          </button>
          <button
            onClick={reset}
            className="rounded-md border border-white/15 px-3 py-2 text-xs text-zinc-300 hover:bg-white/5"
          >
            Reset to current
          </button>
        </div>

        {copied && (
          <p className="rounded-md bg-emerald-400/15 px-3 py-2 text-xs text-emerald-200">
            Copied {copied} config to clipboard
          </p>
        )}

        <p className="mt-auto text-[11px] leading-5 text-zinc-500">
          This editor only appears with <code className="text-zinc-300">?edit=1</code> in the URL. It
          never changes the live site until you paste the config back into the source.
        </p>
      </div>

      {/* Canvas */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        <svg
          ref={svgRef}
          viewBox="0 0 900 980"
          className="h-full max-h-full w-auto"
          style={{ touchAction: "none" }}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <TreeDefs />
          <rect width="900" height="980" fill="#02040a" />
          <ellipse cx="462" cy="900" rx="210" ry="120" fill="url(#rootGlow)" opacity="0.55" />
          <ellipse cx="466" cy="470" rx="150" ry="430" fill="url(#rootGlow)" opacity="0.28" />

          {/* Live trunk preview (centre-line approximation) */}
          <path d={trunkPath} fill="none" stroke="url(#trunkHalo)" strokeWidth={26} strokeLinecap="round" opacity={0.28} filter="url(#auraGlow)" />
          <path d={trunkPath} fill="none" stroke="url(#trunkLife)" strokeWidth={9} strokeLinecap="round" opacity={0.85} filter="url(#filamentGlow)" />
          <path d={trunkPath} fill="none" stroke="url(#trunkCore)" strokeWidth={3} strokeLinecap="round" opacity={0.95} />

          {/* Live branch preview */}
          {branchStrands.map((b) => (
            <g key={b.id}>
              <path d={b.body} fill="url(#trunkHalo)" filter="url(#auraGlow)" opacity={0.32} />
              <path d={b.body} fill="url(#trunkLife)" filter="url(#filamentGlow)" opacity={0.9} />
              <path d={b.core} fill="url(#trunkCore)" opacity={0.92} />
            </g>
          ))}

          {/* Branch handles + control polylines */}
          {show.branches &&
            branches.map((b, bi) => (
              <g key={b.id}>
                <polyline
                  points={b.points.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={0.8}
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
                {b.points.map((p, pi) => (
                  <circle
                    key={pi}
                    cx={p.x}
                    cy={p.y}
                    r={pi === 0 ? 7 : 6}
                    fill={pi === 0 ? "#fbbf24" : "#fb923c"}
                    stroke="#0b0f1a"
                    strokeWidth={1.5}
                    style={{ cursor: "grab" }}
                    onPointerDown={(e) => startDrag(e, { kind: "branch", bi, pi })}
                  />
                ))}
              </g>
            ))}

          {/* Trunk handles */}
          {show.trunk &&
            offsets.map((p, pi) => {
              const pt = trunkSpineFrom(offsets, p[0]);
              return (
                <circle
                  key={pi}
                  cx={pt.x}
                  cy={pt.y}
                  r={8}
                  fill="#38bdf8"
                  stroke="#0b0f1a"
                  strokeWidth={1.5}
                  style={{ cursor: "ew-resize" }}
                  onPointerDown={(e) => startDrag(e, { kind: "trunk", pi })}
                />
              );
            })}
        </svg>
      </div>
    </div>
  );
}
