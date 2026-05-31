// ---------------------------------------------------------------------------
// Projects = the conversion engine of the site. Each one expands into a full
// case study (Problem -> Approach -> Architecture -> Result).
//
// To add a project: copy a block, change the fields. `status` controls the
// little badge + demo button state, so unfinished work can ship as "mockup"
// and be filled in later without touching any components.
// ---------------------------------------------------------------------------

export type ProjectStatus = "live" | "wip" | "mockup";
export type ProjectCategory = "AI / ML" | "Systems" | "Robotics" | "Research";

export type Project = {
  id: string;
  title: string;
  // One-line hook shown on the card.
  blurb: string;
  category: ProjectCategory;
  status: ProjectStatus;
  // Accent hue for this project (hex). Used for tags, glow, diagram strokes.
  accent: string;
  // Headline metric shown on the card with an arrow. Keep it quantified.
  metric: string;
  tags: string[];
  links: {
    demo?: string; // hosted link — leave undefined for mockups
    code?: string;
  };
  // --- Case study (shown when the card is opened) ---
  problem: string;
  approach: string[];
  // Architecture diagram: an ordered pipeline of stages rendered as a flow.
  architecture: string[];
  // Result bullets — quantified wherever possible.
  results: string[];
};

export const projects: Project[] = [
  {
    id: "neuro-runner",
    title: "Neuro-Runner",
    blurb: "A swarm of tiny neural nets learns to run — live in your browser.",
    category: "AI / ML",
    status: "live",
    accent: "#7c9fff",
    metric: "80 agents · evolving in real time",
    tags: ["Neuroevolution", "Genetic Algorithm", "Canvas", "TypeScript"],
    links: { code: "https://github.com/dmandalik/neuro-runner" },
    problem:
      "Reinforcement learning usually means heavy frameworks and opaque training. I wanted a self-contained demo that shows a policy actually improving — no training data, no labels, no dependencies — running smoothly inside a portfolio page.",
    approach: [
      "Hand-rolled feedforward nets (5→6→1) evaluated with plain loops — no TensorFlow, tiny bundle",
      "Neuroevolution instead of backprop: fitness = distance survived",
      "Each generation keeps elites, then breeds via fitness-weighted crossover + Gaussian mutation",
      "Deterministic seeded PRNG; fixed-timestep loop; auto-pauses offscreen and respects reduced-motion",
    ],
    architecture: ["Sensors", "Policy Net", "Population", "Selection + Mutation"],
    results: [
      "Agents reliably learn to clear obstacles within a handful of generations",
      "Whole population simulated per frame on pure canvas 2D — no jank, zero network calls",
      "Framework-agnostic core lifts straight into a standalone repo + vanilla demo",
    ],
  },
  {
    id: "ai-architecture",
    title: "AI Architecture Engine",
    blurb: "A from-scratch system for composing and serving model architectures.",
    category: "AI / ML",
    status: "wip",
    accent: "#6ea8fe",
    metric: "Designing the core graph + serving layer",
    tags: ["Python", "PyTorch", "Inference", "Systems"],
    links: {},
    problem:
      "Most model code mixes architecture definition, training, and serving into one tangle. I wanted a clean separation where an architecture is a declarative graph that can be trained, swapped, and served independently.",
    approach: [
      "Declarative graph IR describing layers, shapes, and data flow",
      "Pluggable execution backends (eager for debugging, compiled for speed)",
      "A thin serving layer that loads a graph + weights and exposes an endpoint",
    ],
    architecture: ["Graph IR", "Compiler / Planner", "Execution Backend", "Serving API"],
    results: [
      "In progress — building the graph IR and planner first",
      "Goal: define, train, and serve an architecture from one spec file",
    ],
  },
  {
    id: "cpp-ml-library",
    title: "C++ ML Library",
    blurb: "Tensors, reverse-mode autodiff, and training loops rebuilt from scratch.",
    category: "Systems",
    status: "wip",
    accent: "#5eead4",
    metric: "Targeting 3x+ over a naive baseline",
    tags: ["C++", "CUDA", "Autodiff", "SIMD"],
    links: { code: "https://github.com/dmandalik" },
    problem:
      "Python ML frameworks hide what actually happens during a backward pass. I'm rebuilding the primitives in C++ to understand tensors, autodiff, and the performance tradeoffs underneath the API.",
    approach: [
      "Tape-based reverse-mode automatic differentiation",
      "Cache-friendly tensor storage with broadcasting",
      "SIMD-optimized elementwise + matmul kernels",
    ],
    architecture: ["Tensor", "Op Graph (tape)", "Backward Pass", "Optimizer"],
    results: [
      "Forward + backward working for core ops",
      "Benchmarking against a naive implementation next",
    ],
  },
  {
    id: "cornell-auv",
    title: "Cornell AUV — Perception",
    blurb: "Real-time perception software for an autonomous underwater vehicle.",
    category: "Robotics",
    status: "wip",
    accent: "#a855f7",
    metric: "Real-time perception on embedded hardware",
    tags: ["C++", "ROS", "Computer Vision", "Sensors"],
    links: {},
    problem:
      "An AUV has to perceive and react underwater with limited compute and noisy sensors. The perception stack needs to be reliable and fast on embedded hardware.",
    approach: [
      "Sensor fusion across cameras and inertial data",
      "Lightweight detection tuned for the embedded target",
      "ROS nodes wired into the control loop",
    ],
    architecture: ["Sensors", "Fusion", "Detection", "Control Loop"],
    results: [
      "Contributing to the perception subsystem",
      "Focus on real-time performance under compute limits",
    ],
  },
  {
    id: "tumor-diagnosis",
    title: "Multi-Model Tumor Diagnosis",
    blurb: "Combining model perspectives for diagnosis support with readable outputs.",
    category: "AI / ML",
    status: "mockup",
    accent: "#fde68a",
    metric: "Model-fusion pipeline for medical imaging",
    tags: ["Medical AI", "PyTorch", "Model Fusion", "Evaluation"],
    links: {},
    problem:
      "Single models can be brittle on medical imaging. The goal was a fusion approach that combines multiple model perspectives while keeping outputs interpretable and responsibly evaluated.",
    approach: [
      "Train multiple complementary models",
      "Fuse predictions with calibrated confidence",
      "Surface readable, auditable outputs",
    ],
    architecture: ["Imaging Data", "Model Ensemble", "Fusion + Calibration", "Report"],
    results: [
      "Prototype fusion pipeline",
      "Emphasis on evaluation limits and interpretability",
    ],
  },
  {
    id: "deepfake-detection",
    title: "Deepfake Detection",
    blurb: "Visual signals for detecting generated or manipulated imagery.",
    category: "AI / ML",
    status: "mockup",
    accent: "#facc15",
    metric: "Detection + evaluation harness",
    tags: ["Computer Vision", "Deep Learning", "Detection"],
    links: {},
    problem:
      "Generated imagery is increasingly convincing. I explored which visual signals reliably distinguish manipulated images, with attention to where detectors fail.",
    approach: [
      "Curate real vs. generated datasets",
      "Train detectors on frequency + spatial features",
      "Stress-test against unseen generators",
    ],
    architecture: ["Image", "Feature Extraction", "Detector", "Confidence + Audit"],
    results: [
      "Exploratory detection models",
      "Honest reporting of generalization limits",
    ],
  },
  {
    id: "comp-bio-tooling",
    title: "Computational Biology Tooling",
    blurb: "Research software + ML tooling for comp-bio workflows at Weill Cornell.",
    category: "Research",
    status: "mockup",
    accent: "#60a5fa",
    metric: "Reproducible ML pipelines for research",
    tags: ["Research SW", "ML", "Pipelines", "Python"],
    links: {},
    problem:
      "Research workflows break when tooling isn't reproducible or maintainable. I built software and ML tooling where correctness and clarity matter as much as results.",
    approach: [
      "Reproducible, versioned data pipelines",
      "ML tooling wrapped for researcher use",
      "Tests + docs so results are trustworthy",
    ],
    architecture: ["Raw Data", "Pipeline", "ML Models", "Results"],
    results: [
      "Tooling used in active research workflows",
      "Reproducibility and maintainability as first-class goals",
    ],
  },
];
