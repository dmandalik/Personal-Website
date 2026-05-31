import { branchFilaments, branchHaloPixels, branchStrands, trunkBraid, trunkHaloPixels, type TrunkBraidStrand } from "@/data/treeStrands";

const haloHue = {
  blue: "#60a5fa",
  cyan: "#67e8f9",
  violet: "#8b5cf6",
  white: "#eff6ff",
} as const;

// Grainy, pixel-like multicolored halo packed tightly around the core spine.
// A soft bloom pass blurs the sparks into a luminous body; the crisp pass keeps
// the individual "pixels" sharp so the trunk reads as dense plasma, not a tube.
function TrunkHaloPixels() {
  return (
    <g className="trunk-halo-grain" aria-hidden="true">
      {/* wide soft bloom — gives the trunk its luminous body/thickness */}
      <g filter="url(#auraGlow)" opacity={0.42}>
        {trunkHaloPixels.map((p, i) => (
          <circle key={`hw-${i}`} cx={p.x} cy={p.y} r={p.r * 3.0} fill={haloHue[p.hue]} opacity={p.opacity * 0.26} />
        ))}
      </g>
      {/* mid glow — blurs sparks into a continuous halo */}
      <g filter="url(#threadGlow)" opacity={0.7}>
        {trunkHaloPixels.map((p, i) => (
          <circle key={`hb-${i}`} cx={p.x} cy={p.y} r={p.r * 1.6} fill={haloHue[p.hue]} opacity={p.opacity * 0.5} />
        ))}
      </g>
      {/* crisp grain — keeps the individual pixels sharp */}
      <g>
        {trunkHaloPixels.map((p, i) => (
          <circle key={`hp-${i}`} cx={p.x} cy={p.y} r={p.r} fill={haloHue[p.hue]} opacity={p.opacity} />
        ))}
      </g>
    </g>
  );
}

function renderStrand(strand: TrunkBraidStrand) {
  // Wide soft bloom hugging the ribbon, brightest/widest at the white-hot base.
  if (strand.kind === "halo") {
    return (
      <path
        key={strand.id}
        d={strand.d}
        fill="none"
        stroke="url(#trunkHalo)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strand.width}
        filter="url(#auraGlow)"
        opacity={strand.opacity}
      />
    );
  }

  // Crisp colour shading hugging the spine — tight blur, local life-gradient.
  if (strand.kind === "shade") {
    return (
      <path
        key={strand.id}
        d={strand.d}
        fill="none"
        stroke="url(#trunkLife)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strand.width}
        filter="url(#crispShade)"
        opacity={strand.opacity}
      />
    );
  }

  const isHeart = strand.kind === "hot" || strand.kind === "core";
  const gradient = isHeart ? "url(#trunkCore)" : "url(#trunkLife)";
  const glow =
    strand.kind === "crackle"
      ? "url(#filamentCrackle)"
      : strand.kind === "crackleSoft"
        ? "url(#filamentCrackleSoft)"
        : strand.kind === "wrap"
          ? "url(#threadGlow)"
          : "url(#filamentGlow)";
  // Only the true heart goes white-hot; the surrounding strands keep their
  // blue/violet colour so they build the body of the trunk like the reference.
  const showWhiteCore = strand.kind === "hot" || strand.kind === "core";

  return (
    <g key={strand.id}>
      <path
        d={strand.d}
        fill="none"
        stroke={gradient}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strand.width}
        filter={glow}
        opacity={strand.opacity}
      />
      {showWhiteCore ? (
        <path
          d={strand.d}
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strand.width * 0.5}
          filter="url(#filamentCore)"
          opacity={Math.min(strand.opacity * 0.95, 0.98)}
        />
      ) : null}
    </g>
  );
}

// Experience branches grown from the live spine. Painted BEFORE the trunk
// body strands so the bright trunk core overlays each branch root, making the
// join seamless — the branch reads as growing out of the spine, not stuck on.
// Each branch is filled with the SAME vertical trunk gradients as the spine,
// so it samples the exact trunk colour at its height.
function BranchStrands() {
  return (
    <g className="tree-branch-strands" aria-hidden="true">
      {branchStrands.map((b) => {
        const grain = branchHaloPixels.find((g) => g.id === b.id)?.pixels ?? [];
        const filaments = branchFilaments.find((g) => g.id === b.id)?.strands ?? [];
        return (
          <g key={b.id}>
            {/* wide blue/violet bloom — the trunk's own halo gradient */}
            <path d={b.body} fill="url(#trunkHalo)" filter="url(#auraGlow)" opacity={0.34} />
            {/* crisp colour shading — tight, soft-edged body in the local branch
                colour that fades fast (same crispShade as the spine). Two stacked
                passes build a contoured body that's solid at the core and fades. */}
            <path d={b.body} fill="url(#trunkLife)" filter="url(#crispShade)" opacity={0.42} />
            <path d={b.core} fill="url(#trunkLife)" filter="url(#crispShade)" opacity={0.62} />
            {/* coloured body sampled from the vertical trunk life-gradient */}
            <path d={b.body} fill="url(#trunkLife)" filter="url(#filamentGlow)" opacity={0.92} />
            {/* grainy pixel halo — the same sparkling field as the spine */}
            <g filter="url(#auraGlow)" opacity={0.42}>
              {grain.map((p, i) => (
                <circle key={`bw-${i}`} cx={p.x} cy={p.y} r={p.r * 3.0} fill={haloHue[p.hue]} opacity={p.opacity * 0.26} />
              ))}
            </g>
            <g filter="url(#threadGlow)" opacity={0.7}>
              {grain.map((p, i) => (
                <circle key={`bb-${i}`} cx={p.x} cy={p.y} r={p.r * 1.6} fill={haloHue[p.hue]} opacity={p.opacity * 0.5} />
              ))}
            </g>
            <g>
              {grain.map((p, i) => (
                <circle key={`bp-${i}`} cx={p.x} cy={p.y} r={p.r} fill={haloHue[p.hue]} opacity={p.opacity} />
              ))}
            </g>
            {/* thin wispy filaments — a subtle echo of the spine's crackle strands */}
            {filaments.map((f, i) => (
              <path
                key={`bf-${i}`}
                d={f.d}
                fill="none"
                stroke="url(#trunkLife)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={f.width}
                filter={f.soft ? "url(#filamentCrackleSoft)" : "url(#filamentCrackle)"}
                opacity={f.opacity}
              />
            ))}
            {/* white-hot core — a soft bloom around the hot wire, then the crisp
                bright wire on top so the branch reads as a lightning filament */}
            <path d={b.core} fill="url(#trunkCore)" filter="url(#threadGlow)" opacity={0.6} />
            <path d={b.core} fill="url(#trunkCore)" filter="url(#filamentCore)" opacity={0.96} />
          </g>
        );
      })}
    </g>
  );
}

export function TrunkStrands() {
  // Soft bloom halos paint first (behind), then the grainy pixel halo, then the
  // branches, then the bright body/core strands on top so the white-hot spine
  // stays crisp and overlays the branch roots.
  const haloStrands = trunkBraid.filter((s) => s.kind === "halo");
  const bodyStrands = trunkBraid.filter((s) => s.kind !== "halo");
  return (
    <g className="tree-trunk-glow" aria-hidden="true">
      {haloStrands.map(renderStrand)}
      <TrunkHaloPixels />
      <BranchStrands />
      {bodyStrands.map(renderStrand)}
    </g>
  );
}
