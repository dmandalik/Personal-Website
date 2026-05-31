import { BrainCircuit, Cpu, Microscope, Waves } from "lucide-react";

export const siteConfig = {
  name: "Dhruv Mandalik",
  title: "Engineering across models, machines, and systems.",
  description:
    "I'm a Cornell CS/CE student building AI tools, robotics software, and research systems with a focus on clarity, reliability, and performance.",
  links: {
    resume: "#resume",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:dhruv@example.com",
  },
};

export const navItems = [
  { label: "Tree", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Focus", href: "#focus" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

export const focusAreas = [
  {
    title: "AI / ML",
    description: "Model evaluation, computer vision, applied ML workflows, and generative AI systems.",
    icon: BrainCircuit,
    items: ["Python", "PyTorch", "LLMs", "Computer Vision"],
  },
  {
    title: "Systems / C++",
    description: "Performance-aware engineering, lower-level abstractions, and from-scratch ML tooling.",
    icon: Cpu,
    items: ["C++", "Data Structures", "Runtime Design", "Testing"],
  },
  {
    title: "Robotics / Embedded",
    description: "Reliable software for perception, autonomy, sensors, and real-world robotic systems.",
    icon: Waves,
    items: ["ROS", "Sensors", "Autonomy", "Controls"],
  },
  {
    title: "Research Software",
    description: "Clear tools and reproducible pipelines for labs, experiments, and analysis-heavy work.",
    icon: Microscope,
    items: ["Reproducibility", "Pipelines", "Data Analysis", "Documentation"],
  },
];
