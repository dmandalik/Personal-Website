// ---------------------------------------------------------------------------
// Experience timeline. Ordered latest -> earliest (top of the list shows first).
// ---------------------------------------------------------------------------

export type Role = {
  org: string;
  title: string;
  period: string;
  blurb: string;
  // Optional accent to tint the timeline dot.
  accent?: string;
};

export const experience: Role[] = [
  {
    org: "Investcorp × Cornell — Generative AI",
    title: "Software / AI Intern",
    period: "2026",
    blurb:
      "Building AI systems for finance-oriented workflows — turning ambiguous operational needs into reliable software and model-backed tools.",
    accent: "#f8d272",
  },
  {
    org: "Cornell AUV",
    title: "Robotics Engineer",
    period: "2025",
    blurb:
      "Robotics software for autonomous underwater systems — perception, sensors, and reliable engineering practices.",
    accent: "#a855f7",
  },
  {
    org: "Weill Cornell — Computational Biology Lab",
    title: "Research Software / ML",
    period: "2025",
    blurb:
      "Research software and ML tooling for comp-bio workflows where correctness and maintainability matter.",
    accent: "#60a5fa",
  },
  {
    org: "Virginia Tech — Vision Lab",
    title: "Research Assistant",
    period: "2023",
    blurb:
      "Supported computer vision research — experiments, analysis, and reproducible results.",
    accent: "#3b82f6",
  },
];
