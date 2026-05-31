import { Fragment, type CSSProperties } from "react";

import { lightningArcs } from "@/data/treeStrands";

// Occasional jagged bolts that flash off the trunk like an electric discharge.
// Visibility/timing lives in the `.lightning-bolt` CSS (globals.css). Each bolt
// is drawn as stacked strokes of the SAME jagged path so the glow hugs the bolt
// shape (rather than a fat circular halo): a crisp coloured halo, a brighter
// coloured body, then a thin white-hot core that reads as a sharp lightning
// filament. The colour is sampled from the trunk where the bolt originates.
export function LightningArcs() {
  return (
    <g aria-hidden="true">
      {lightningArcs.map((bolt) => {
        // Render the main bolt and (if present) its fork with identical layering.
        const segments = bolt.fork ? [bolt.d, bolt.fork] : [bolt.d];
        return (
          <g
            key={bolt.id}
            className="lightning-bolt"
            style={
              {
                animationDuration: `${bolt.dur.toFixed(2)}s`,
                animationDelay: `${bolt.delay.toFixed(2)}s`,
              } as CSSProperties
            }
          >
            {/* Small, crisp burst right where the bolt touches the trunk. */}
            <circle cx={bolt.ox} cy={bolt.oy} r={bolt.flashR} fill={bolt.color} opacity={0.55} filter="url(#flashGlow)" />
            <circle cx={bolt.ox} cy={bolt.oy} r={bolt.flashR * 0.5} fill="#ffffff" opacity={0.95} filter="url(#flashGlow)" />

            {segments.map((d, si) => (
              <Fragment key={si}>
                {/* Coloured halo hugging the bolt shape — crisp, not too wide. */}
                <path
                  d={d}
                  fill="none"
                  stroke={bolt.color}
                  strokeOpacity={0.5}
                  strokeWidth={bolt.width * 2.6}
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  filter="url(#boltGlow)"
                />
                {/* Vivid coloured body. */}
                <path
                  d={d}
                  fill="none"
                  stroke={bolt.color}
                  strokeWidth={bolt.width * 1.3}
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  filter="url(#filamentGlow)"
                />
                {/* Sharp white-hot core. */}
                <path
                  d={d}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={bolt.width * 0.6}
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                />
              </Fragment>
            ))}
          </g>
        );
      })}
    </g>
  );
}
