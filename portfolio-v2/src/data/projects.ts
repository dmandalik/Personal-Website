// ---------------------------------------------------------------------------
// Projects = the conversion engine of the site. Each one expands into a full
// case study (Problem -> Approach -> Architecture -> Result).
//
// To add a project: copy a block, change the fields. `status` controls the
// little badge + demo button state, so unfinished work can ship as "mockup"
// and be filled in later without touching any components.
// ---------------------------------------------------------------------------

export type ProjectStatus = "live" | "wip" | "mockup" | "published";
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
    paper?: string; // published paper / writeup — shown as "Read paper"
    page?: string; // internal route to a dedicated project page (e.g. "/projects/foo")
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
    id: "intern-radar",
    title: "Intern Radar",
    blurb: "A local-first engine that scans, scores, and ranks internship listings.",
    category: "Systems",
    status: "wip",
    accent: "#f59e0b",
    metric: "Greenhouse + Lever → ranked local DB",
    tags: ["Python", "FastAPI", "Svelte", "SQLite"],
    links: { code: "https://github.com/dmandalik/Intern-Radar" },
    problem:
      "Tracking internships in a spreadsheet means manually checking dozens of career pages and guessing which roles actually fit. I wanted a personal command center that scans sources, normalizes the data, and surfaces the strongest opportunities automatically.",
    approach: [
      "Scrapes Greenhouse, Lever, and custom career pages into a normalized SQLite store",
      "Evidence-based role classification + eligibility parsing, with duplicate detection",
      "Opportunity scoring that bubbles up hidden gems via configurable domain packs",
      "CLI plus a Svelte dashboard with a review queue, notes, and multi-format export",
    ],
    architecture: ["Source Scan", "Normalize + Dedup", "Score + Classify", "CLI / Dashboard"],
    results: [
      "Local-first SQLite pipeline with scan history and persistent workflow states",
      "Exports polished lists to CSV, JSON, XLSX, HTML, and Markdown",
      "Runs entirely without paid APIs — generates its own search queries",
    ],
  },
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
    id: "tumor-diagnosis",
    title: "Brain Tumor Diagnosis",
    blurb: "Published study benchmarking diversified AI techniques on MRI brain-tumor diagnosis under distribution shift.",
    category: "Research",
    status: "published",
    accent: "#fde68a",
    metric: "98.2% accuracy on unseen MRI scans",
    tags: ["Medical AI", "CNN", "TensorFlow", "MRI"],
    links: {
      page: "/projects/brain-tumor-diagnosis",
      paper: "/papers/brain-tumor-diagnosis.pdf",
    },
    problem:
      "Up to 10% of brain or spinal-cord tumors are initially misdiagnosed, and a single model trained on one MRI dataset tends to collapse under distribution shift. The goal was a robust approach that holds up on scans it has never seen.",
    approach: [
      "Trained on three distinct Kaggle MRI datasets, then tested on a fully separate set to stress distribution shift",
      "Built and compared diversified models: logistic regression, an MLP, and a TensorFlow/Keras CNN",
      "Combined weaker classifiers via multiplicative weight update and boosting",
      "Resized scans to 150×150, normalized pixels, and evaluated with cross-validation",
    ],
    architecture: ["MRI Datasets", "Preprocessing", "Diversified Models", "Unseen-Set Eval"],
    results: [
      "CNN generalized best at 98.2% accuracy on unseen scans — vs 78.6% (LR) and 74.9% (MLP)",
      "Aggregation lifted the classical models: boosting 86.5%, multiplicative weight update 83.8%",
      "Published in the Journal of Student Research (Vol. 12, Issue 4, 2023)",
    ],
  },
];
