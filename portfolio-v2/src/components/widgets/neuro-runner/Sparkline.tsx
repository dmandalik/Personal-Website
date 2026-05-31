// Tiny inline SVG sparkline for the best-fitness history. Theme-aware via
// currentColor / var(--accent). No deps.

export function Sparkline({
  data,
  className = "",
  height = 28,
}: {
  data: number[];
  className?: string;
  height?: number;
}) {
  const W = 100; // viewBox width; stretched by the container
  const H = height;
  if (data.length < 2) {
    return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className={className}
        aria-hidden
      />
    );
  }

  const max = Math.max(...data, 1);
  const stepX = W / (data.length - 1);
  const yOf = (v: number) => H - 1 - (v / max) * (H - 2);
  const pts = data.map((v, i) => [i * stepX, yOf(v)] as const);

  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path d={area} fill="var(--accent)" fillOpacity={0.12} />
      <path
        d={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
