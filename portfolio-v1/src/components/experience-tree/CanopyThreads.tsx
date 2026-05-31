import {
  crownThreads,
  sideThreads,
  hairlineThreads,
  microCrackleThreads,
  rootThreads,
  sparkPoints,
  fineFilaments,
  type TreeThread,
} from "@/data/treeStrands";

const hueColor = {
  blue: "#60a5fa",
  cyan: "#67e8f9",
  violet: "#8b5cf6",
  white: "#dbeafe",
};

function renderThread(thread: TreeThread) {
  const color = hueColor[thread.hue ?? "blue"];
  const width = thread.width ?? 0.6;
  const opacity = thread.opacity ?? 0.42;

  return (
    <g key={thread.id}>
      <path
        d={thread.d}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={width * 3.4}
        filter="url(#threadGlow)"
        opacity={opacity * 0.55}
      />
      <path
        d={thread.d}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={width * 1.25}
        filter="url(#filamentGlow)"
        opacity={Math.min(opacity * 1.15, 1)}
      />
      <path
        d={thread.d}
        fill="none"
        stroke="#eff6ff"
        strokeLinecap="round"
        strokeWidth={width * 0.4}
        opacity={Math.min(opacity * 0.95, 1)}
      />
    </g>
  );
}

export function CanopyThreads() {
  return (
    <g className="tree-canopy" aria-hidden="true">
      <g>{rootThreads.map(renderThread)}</g>
      <g>{sideThreads.map(renderThread)}</g>
      <g>{crownThreads.map(renderThread)}</g>
      <g>{hairlineThreads.map(renderThread)}</g>
      <g>{microCrackleThreads.map(renderThread)}</g>

      {/* Hair-fine fractal spray: a wide soft bloom + a mid glow + crisp cores.
          The stacked passes let the dense filament field read as a luminous,
          bushy crown (like the reference) instead of separate hairlines. */}
      <g filter="url(#threadGlow)" opacity={0.85}>
        {fineFilaments.map((thread) => (
          <path
            key={`${thread.id}-bloom`}
            d={thread.d}
            fill="none"
            stroke={hueColor[thread.hue ?? "blue"]}
            strokeLinecap="round"
            strokeWidth={(thread.width ?? 0.2) * 3.2}
            opacity={(thread.opacity ?? 0.2) * 0.6}
          />
        ))}
      </g>
      <g filter="url(#filamentGlow)" opacity={0.95}>
        {fineFilaments.map((thread) => (
          <path
            key={`${thread.id}-glow`}
            d={thread.d}
            fill="none"
            stroke={hueColor[thread.hue ?? "blue"]}
            strokeLinecap="round"
            strokeWidth={(thread.width ?? 0.2) * 1.5}
            opacity={Math.min((thread.opacity ?? 0.2) * 1.1, 0.6)}
          />
        ))}
      </g>
      <g>
        {fineFilaments.map((thread) => (
          <path
            key={`${thread.id}-core`}
            d={thread.d}
            fill="none"
            stroke={thread.hue === "white" ? "#eff6ff" : hueColor[thread.hue ?? "blue"]}
            strokeLinecap="round"
            strokeWidth={thread.width ?? 0.2}
            opacity={Math.min((thread.opacity ?? 0.2) * 1.5, 0.7)}
          />
        ))}
      </g>

      <g>
        {sparkPoints.map(([x, y, opacity], index) => (
          <circle
            key={`spark-${index}`}
            cx={x}
            cy={y}
            r={1.5}
            fill="#eff6ff"
            filter="url(#nodeGlow)"
            opacity={opacity}
          />
        ))}
      </g>
    </g>
  );
}
