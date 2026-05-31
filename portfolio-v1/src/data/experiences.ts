export type ExperienceCategory =
  | "research"
  | "robotics"
  | "systems"
  | "ai"
  | "project"
  | "foundation";

// Which side of the trunk a branch fans out to. "base" is reserved for the
// single Foundations anchor at the bottom of the trunk.
export type ExperienceSide = "left" | "right" | "base";

// Pure content model. All geometry (branch paths, nodes, labels, year markers)
// is generated procedurally from this list in `treeBranches.ts`, so adding or
// removing an experience automatically re-spaces the tree — nothing here needs
// hand-tuned coordinates.
export type Experience = {
  id: string;
  title: string;
  year: string;
  role: string;
  category: ExperienceCategory;
  side: ExperienceSide;
  description: string;
  tags: string[];
  dateRange?: string;
  color: string;
  link?: string;
};

// Ordered earliest -> latest. The branch generator distributes each side's
// items up the trunk in this order (earliest nearest the base), so the array
// order also decides the vertical order within a side. The featured Investcorp
// role is last on the right so it lands at the violet crown.
export const experiences: Experience[] = [
  {
    id: "foundations-cornell",
    title: "Foundations / CS @ Cornell",
    year: "2022",
    role: "CS / CE Foundation",
    category: "foundation",
    side: "base",
    description:
      "Built the base across computer science, computer engineering, algorithms, systems, and mathematical thinking at Cornell.",
    tags: ["Cornell", "CS", "CE", "Algorithms"],
    color: "#60a5fa",
  },
  {
    id: "virginia-tech-vision-lab",
    title: "Virginia Tech Vision Lab",
    year: "2023",
    role: "Research Assistant",
    category: "research",
    side: "left",
    description:
      "Supported computer vision research workflows, experiments, and analysis with an emphasis on careful implementation and reproducible results.",
    tags: ["Research", "Computer Vision", "Python", "Experiments"],
    color: "#3b82f6",
  },
  {
    id: "cpp-ml-library",
    title: "C++ ML Library",
    year: "2026",
    role: "Systems / Learning Project",
    category: "systems",
    side: "right",
    description:
      "Rebuilding small ML primitives from scratch in C++ to understand tensors, autodiff, training loops, and performance tradeoffs below Python APIs.",
    tags: ["C++", "ML Systems", "Autodiff", "From Scratch"],
    color: "#5eead4",
  },
  {
    id: "tumor-diagnosis",
    title: "Multi-Model Tumor Diagnosis",
    year: "2024",
    role: "ML / Medical AI",
    category: "ai",
    side: "right",
    description:
      "Built a medical AI project combining multiple model perspectives for diagnosis support, with a focus on readable outputs and responsible evaluation.",
    tags: ["Medical AI", "ML", "Research", "Model Fusion"],
    color: "#fde68a",
  },
  {
    id: "deep-fake-ear",
    title: "Deep Fake Ear",
    year: "2024",
    role: "Computer Vision Project",
    category: "ai",
    side: "left",
    dateRange: "May 2025 - Present",
    description:
      "Explored visual signals for detecting generated or manipulated imagery, with attention to model behavior, data quality, and evaluation limits.",
    tags: ["Computer Vision", "Deep Learning", "Detection", "Evaluation"],
    color: "#facc15",
  },
  {
    id: "cornell-auv",
    title: "Cornell AUV",
    year: "2025",
    role: "Robotics Engineer",
    category: "robotics",
    side: "right",
    description:
      "Worked on robotics software for autonomous underwater systems, connecting perception, sensors, and reliable engineering practices.",
    tags: ["Robotics", "C++", "Sensors", "Autonomy"],
    color: "#a855f7",
  },
  {
    id: "weill-cornell-computational-biology",
    title: "Weill Cornell Computational Biology Lab",
    year: "2025",
    role: "Research Software / ML",
    category: "research",
    side: "left",
    description:
      "Contributed research software and machine learning tooling for computational biology workflows where correctness and maintainability matter.",
    tags: ["Research Software", "ML", "Biology", "Pipelines"],
    color: "#60a5fa",
  },
  {
    id: "investcorp-cornell-generative-ai",
    title: "Investcorp x Cornell Generative AI",
    year: "2026",
    role: "Software / AI Intern",
    category: "ai",
    side: "right",
    description:
      "Building AI systems for finance-oriented workflows, translating ambiguous operational needs into reliable software and model-backed tools.",
    tags: ["Generative AI", "LLMs", "Software", "Product Thinking"],
    color: "#f8d272",
    link: "#projects",
  },
];
