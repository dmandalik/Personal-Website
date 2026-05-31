export type Project = {
  title: string;
  description: string;
  tags: string[];
  links?: {
    github?: string;
    demo?: string;
    writeup?: string;
  };
};

export const projects: Project[] = [
  {
    title: "Forecast Lab",
    description:
      "A focused time-series playground for testing forecasting approaches, model assumptions, and clean experiment reporting.",
    tags: ["ML", "Time Series", "Python"],
    links: { github: "#" },
  },
  {
    title: "Cornell AUV",
    description:
      "Robotics software for an autonomous underwater vehicle, spanning sensors, autonomy, and system reliability.",
    tags: ["Robotics", "C++", "Sensors"],
    links: { writeup: "#" },
  },
  {
    title: "Multi-Model Tumor Diagnosis",
    description:
      "Medical AI exploration combining multiple model signals into clearer diagnostic support and evaluation workflows.",
    tags: ["ML", "Medical AI", "Research"],
    links: { writeup: "#" },
  },
  {
    title: "C++ ML Library",
    description:
      "A from-scratch ML systems project for understanding tensors, autodiff, training loops, and performance fundamentals.",
    tags: ["C++", "ML Systems", "From Scratch"],
    links: { github: "#" },
  },
];
