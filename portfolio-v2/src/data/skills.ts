// ---------------------------------------------------------------------------
// Skills grouped by area. Keep these keyword-rich for recruiter scanning + ATS.
// ---------------------------------------------------------------------------

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["C++", "Python", "TypeScript", "C", "SQL"] },
  { label: "ML / AI", items: ["PyTorch", "CUDA", "Autodiff", "Computer Vision", "LLMs"] },
  { label: "Systems", items: ["Performance", "Concurrency", "Embedded", "Data Pipelines"] },
  { label: "Tools", items: ["Git", "Linux", "AWS", "Docker", "ROS"] },
];

// Short "how I think" paragraph for the About section.
export const about =
  "I like working close to the metal and close to the problem — rebuilding ML primitives in C++ to understand what frameworks hide, then using that understanding to ship reliable, well-tested systems. I care about correctness, clear architecture, and code other people can actually maintain.";
