export function TreeDefs() {
  return (
    <defs>
      <filter id="trunkGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feColorMatrix
          in="coloredBlur"
          type="matrix"
          values="0 0 0 0 0.28 0 0 0 0 0.42 0 0 0 0 1 0 0 0 0.95 0"
          result="blueGlow"
        />
        <feMerge>
          <feMergeNode in="blueGlow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="branchGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="threadGlow" x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="1.35" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="auraGlow" x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="18" result="wideGlow" />
        <feColorMatrix
          in="wideGlow"
          type="matrix"
          values="0 0 0 0 0.14 0 0 0 0 0.28 0 0 0 0 1 0 0 0 0.65 0"
          result="blueAura"
        />
        <feMerge>
          <feMergeNode in="blueAura" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="filamentAura" x="-140%" y="-140%" width="380%" height="380%">
        <feGaussianBlur stdDeviation="5.8" result="softFilament" />
        <feColorMatrix
          in="softFilament"
          type="matrix"
          values="0 0 0 0 0.24 0 0 0 0 0.36 0 0 0 0 1 0 0 0 0.78 0"
          result="electricAura"
        />
        <feMerge>
          <feMergeNode in="electricAura" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="filamentGlow" x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="1.65" result="tightFilament" />
        <feMerge>
          <feMergeNode in="tightFilament" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="filamentCore" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="0.45" result="coreSpark" />
        <feMerge>
          <feMergeNode in="coreSpark" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Crisp shading: a tight, soft-edged colored band hugging the spine/branch.
          Painted with the vertical life-gradient so it takes the local plasma
          colour at each height, then blurred just enough to fade quickly to the
          dark background — gives the tree a sharp, contoured body like the
          reference rather than a flat ribbon. */}
      <filter id="crispShade" x="-90%" y="-90%" width="280%" height="280%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
      {/* Crackle: warps smooth strands along a fractal-noise field so the edges
          break up into the fine, grainy, electric filaments of the reference. */}
      <filter id="filamentCrackle" x="-140%" y="-140%" width="380%" height="380%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.045"
          numOctaves="3"
          seed="7"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="7"
          xChannelSelector="R"
          yChannelSelector="G"
          result="disp"
        />
        <feGaussianBlur in="disp" stdDeviation="0.7" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="disp" />
        </feMerge>
      </filter>
      {/* Heavier crackle for the wide soft body filaments — coarser grain. */}
      <filter id="filamentCrackleSoft" x="-160%" y="-160%" width="420%" height="420%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009 0.03"
          numOctaves="3"
          seed="19"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="11"
          xChannelSelector="R"
          yChannelSelector="G"
          result="disp"
        />
        <feGaussianBlur in="disp" stdDeviation="1.4" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="disp" />
        </feMerge>
      </filter>
      {/* Neutral (un-tinted) bloom for lightning bolts so each keeps its colour. */}
      <filter id="boltGlow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="2.4" result="bloom" />
        <feMerge>
          <feMergeNode in="bloom" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Tight crisp bloom for the small flash where each bolt meets the trunk. */}
      <filter id="flashGlow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id="nodeGlow" x="-140%" y="-140%" width="380%" height="380%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="trunkGradient" x1="374" x2="548" y1="940" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#1d4ed8" stopOpacity="0.22" />
        <stop offset="0.17" stopColor="#60a5fa" stopOpacity="0.74" />
        <stop offset="0.43" stopColor="#e0e7ff" stopOpacity="0.95" />
        <stop offset="0.59" stopColor="#8b5cf6" stopOpacity="0.88" />
        <stop offset="0.77" stopColor="#60a5fa" stopOpacity="0.72" />
        <stop offset="1" stopColor="#7c3aed" stopOpacity="0.44" />
      </linearGradient>
      <linearGradient id="coreGradient" x1="402" x2="508" y1="926" y2="62" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#93c5fd" stopOpacity="0.25" />
        <stop offset="0.32" stopColor="#ffffff" stopOpacity="0.96" />
        <stop offset="0.58" stopColor="#c4b5fd" stopOpacity="0.98" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.62" />
      </linearGradient>
      <linearGradient id="hotLightning" x1="428" x2="520" y1="920" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#60a5fa" stopOpacity="0.2" />
        <stop offset="0.18" stopColor="#ffffff" stopOpacity="0.98" />
        <stop offset="0.45" stopColor="#dbeafe" stopOpacity="1" />
        <stop offset="0.68" stopColor="#a78bfa" stopOpacity="0.92" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.62" />
      </linearGradient>
      <linearGradient id="violetLightning" x1="320" x2="680" y1="870" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#60a5fa" stopOpacity="0.28" />
        <stop offset="0.52" stopColor="#818cf8" stopOpacity="0.72" />
        <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.92" />
      </linearGradient>
      <radialGradient id="rootGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#93c5fd" stopOpacity="0.45" />
        <stop offset="0.42" stopColor="#6366f1" stopOpacity="0.15" />
        <stop offset="1" stopColor="#05070d" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="branchMist" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0" stopColor="#60a5fa" stopOpacity="0.05" />
        <stop offset="0.5" stopColor="#bfdbfe" stopOpacity="0.38" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
      </linearGradient>

      {/* Trunk life-gradient: white-hot base -> icy blue -> saturated blue -> indigo -> violet crown */}
      <linearGradient id="trunkLife" x1="0" x2="0" y1="966" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.14" stopColor="#f2f7ff" />
        <stop offset="0.32" stopColor="#cfe4ff" />
        <stop offset="0.5" stopColor="#93c5fd" />
        <stop offset="0.66" stopColor="#60a5fa" />
        <stop offset="0.8" stopColor="#6366f1" />
        <stop offset="0.92" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#a78bfa" />
      </linearGradient>
      {/* Core gradient: keeps a white-hot heart for longer up the spine */}
      <linearGradient id="trunkCore" x1="0" x2="0" y1="966" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.5" stopColor="#eef5ff" />
        <stop offset="0.8" stopColor="#dbeafe" />
        <stop offset="1" stopColor="#ddd6fe" />
      </linearGradient>
      {/* Halo gradient: blue bloom low, shifting violet high */}
      <linearGradient id="trunkHalo" x1="0" x2="0" y1="966" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#bfdbfe" />
        <stop offset="0.45" stopColor="#3b82f6" />
        <stop offset="0.8" stopColor="#6d5cf0" />
        <stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  );
}
