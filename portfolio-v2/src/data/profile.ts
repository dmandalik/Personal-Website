// ---------------------------------------------------------------------------
// Profile / identity. Edit this to change the hero, nav brand, and contact.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Dhruv Mandalik",
  initials: "DM",
  // Shown under the name in the hero.
  subtitle: "CS + ECE @ Cornell",
  // One-line value proposition. Keep it sharp — this is the 7-second test.
  tagline:
    "I enjoy building robotics software and integrated AI/ML systems that work under real constraints. Check out some of my work below.",
  // Keyword chips in the hero. Recruiters scan these for stack matches.
  stack: ["PyTorch", "C++", "Python", "CUDA", "AWS", "ROS", "LLMs", "React"],
  location: "Ithaca, NY",
  // Drives the hero "based in" map pin + local-time widgets.
  geo: {
    label: "Ithaca, NY",
    place: "Cornell University",
    lat: 42.4477, // McGraw Tower (the clock tower)
    lng: -76.4849,
    timezone: "America/New_York",
  },
  // Used by the live GitHub pulse widget. Just the handle, no URL.
  githubUsername: "dmandalik",
  // Used for the footer + command palette + hero buttons.
  links: {
    email: "dhruvm2310@gmail.com",
    github: "https://github.com/dmandalik",
    linkedin: "https://www.linkedin.com/in/dhruv-mandalik-39864b244/",
    resume: "/resume.pdf",
    neuroRunner: "https://github.com/dmandalik/neuro-runner",
  },
} as const;
