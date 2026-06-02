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

// ---------------------------------------------------------------------------
// Experience logos — shown as a uniform "seal" bar on the Experience screen.
// Ordered left -> right as they should appear. Popup copy is placeholder for
// now; swap `blurb` for the real role detail later.
// ---------------------------------------------------------------------------

export type ExperienceLogo = {
  key: string;
  name: string; // popup title
  src: string; // path under /public
  w: number; // intrinsic pixel width  (keeps aspect ratio at a uniform height)
  h: number; // intrinsic pixel height
  blurb: string; // popup body
  href?: string; // optional outbound link — makes the mark clickable
  imgClass?: string; // optional per-logo size override (defaults to uniform height)
};

export const experienceLogos: ExperienceLogo[] = [
  {
    key: "cornell",
    name: "Cornell University",
    src: "/logos/cornelllogo.png",
    w: 2048,
    h: 2048,
    blurb: "B.S. in Computer Science & Electrical and Computer Engineering.",
    href: "https://www.cornell.edu",
  },
  {
    key: "airlab",
    name: "AIRLab: Artificial Intelligence & Robotics Lab",
    src: "/logos/airlablogo.png",
    w: 1105,
    h: 954,
    blurb: "Robotics & AI Intern.",
    href: "https://liquetaylor.wixstudio.com/airlab",
  },
  {
    key: "investcorp",
    name: "Investcorp",
    src: "/logos/investcorplogo.jpeg",
    w: 200,
    h: 200,
    blurb:
      "Software Engineer Intern — building AI agents for Investcorp's Treasury team to extract bank deposit rate quotes from emails, structure them by tenor and ticket size, and support queries.",
    href: "https://www.investcorp.com",
  },
  {
    key: "cuauv",
    name: "Cornell Autonomous Underwater Vehicle",
    src: "/logos/cuauvlogo.png",
    w: 1082,
    h: 1037,
    blurb:
      "Software Engineer — writing C++/Python perception and autonomy systems for an underwater robot, from camera pipelines and mission logic to simulation and Jetson deployment.",
    href: "https://cuauv.org/vehicle",
  },
  {
    key: "cornellalgo",
    name: "Cornell Algo Trading",
    src: "/logos/cornellalgologo.png",
    w: 893,
    h: 895,
    blurb:
      "Software Engineer — building SEC data pipelines to structure financial filings for signal research, forecasting, and event-based backtesting.",
    href: "https://www.cornellalgo.com/",
    // Square PNG whose circular mark fills ~98% of the frame. Framed with a 2px
    // circular border in the exact navy of the logo's own lettering; the box is
    // nudged up a few px so the inside-the-box border doesn't shrink the mark
    // below the AUV logo's visible height.
    imgClass:
      "h-[60px] w-auto rounded-full border-2 border-[#1e336d] object-contain sm:h-[68px]",
  },
  {
    key: "weillcornell",
    name: "Weill Cornell Medicine: Sboner Lab",
    src: "/logos/weillcornelllogo.png",
    w: 1071,
    h: 312,
    blurb:
      "ML Intern — built deep learning UNet and Vision Transformer models to automate microscopy analysis for cancer organoid research.",
    href: "https://icb.med.cornell.edu/faculty/sboner/lab/",
  },
  {
    key: "genai",
    name: "Cornell Generative AI",
    src: "/logos/cornellgenailogo.svg",
    w: 1024,
    h: 1024,
    blurb:
      "AI Engineer — building AI agents and automation tools for clients and internal projects, focusing on data extraction, workflow automation, and natural language interfaces.",
  },
  {
    key: "virginiatech",
    name: "Virginia Tech: Data Management Lab",
    src: "/logos/vtechlogo.png",
    w: 1710,
    h: 1037,
    blurb:
      "Software Engineer Intern — built real-time vision inference and data logging tools for lab scientists to classify nematode species and support GPS-based field analysis.",
  },
  {
    key: "robocup",
    name: "RoboCup",
    src: "/logos/robocuplogo.png",
    w: 1184,
    h: 680,
    blurb:
      "Team Captain & Software Lead — 1st Maze (+ Best Engineering Design) & 2nd Line at USA Nationals (2023 - 2024); represented the USA at Internationals. Architected the software stack for an autonomous rescue robot — Dijkstra navigation, C++ KNN victim detection, IMU/ToF odometry, obstacle avoidance, and Raspberry Pi/MegaPi deployment.",
  },
];

// ---------------------------------------------------------------------------
// Tech stack — grouped tool/framework marks shown under the experience logos.
// Icons live in /public/logos/stack (transparent SVGs). To add a tool, drop its
// SVG into that folder and append an entry to the relevant group — the wall
// auto-wraps and the uniform height / aspect-ratio is handled for you.
// ---------------------------------------------------------------------------

export type StackLogo = {
  key: string;
  name: string;
  src: string;
  w: number; // intrinsic width  (most marks ship on a square 128 viewBox)
  h: number; // intrinsic height
};

export type StackGroup = {
  title: string;
  logos: StackLogo[];
};

export const stackGroups: StackGroup[] = [
  {
    title: "Languages",
    logos: [
      { key: "cpp", name: "C++", src: "/logos/stack/cplusplus.svg", w: 128, h: 128 },
      { key: "python", name: "Python", src: "/logos/stack/python.svg", w: 128, h: 128 },
      { key: "java", name: "Java", src: "/logos/stack/java.svg", w: 128, h: 128 },
      { key: "postgresql", name: "PostgreSQL", src: "/logos/stack/postgresql.svg", w: 128, h: 128 },
    ],
  },
  {
    title: "Frameworks & Tools",
    logos: [
      // ML / deep-learning frameworks
      { key: "pytorch", name: "PyTorch", src: "/logos/stack/pytorch.svg", w: 128, h: 128 },
      { key: "tensorflow", name: "TensorFlow", src: "/logos/stack/tensorflow.svg", w: 128, h: 128 },
      { key: "scikitlearn", name: "scikit-learn", src: "/logos/stack/scikitlearn.svg", w: 128, h: 128 },
      // Data / scientific computing
      { key: "numpy", name: "NumPy", src: "/logos/stack/numpy.svg", w: 128, h: 128 },
      { key: "pandas", name: "pandas", src: "/logos/stack/pandas.svg", w: 128, h: 128 },
      { key: "matplotlib", name: "Matplotlib", src: "/logos/stack/matplotlib.svg", w: 128, h: 128 },
      // Vision + apps
      { key: "opencv", name: "OpenCV", src: "/logos/stack/opencv.svg", w: 128, h: 128 },
      { key: "streamlit", name: "Streamlit", src: "/logos/stack/streamlit.svg", w: 128, h: 128 },
      { key: "arduino", name: "Arduino", src: "/logos/stack/arduino.svg", w: 128, h: 128 },
      // Infra / cloud
      { key: "docker", name: "Docker", src: "/logos/stack/docker.svg", w: 128, h: 128 },
      { key: "aws", name: "AWS", src: "/logos/stack/aws.svg", w: 128, h: 128 },
      { key: "linux", name: "Linux", src: "/logos/stack/linux.svg", w: 24, h: 24 },
      // Version control
      { key: "git", name: "Git", src: "/logos/stack/git.svg", w: 128, h: 128 },
      { key: "github", name: "GitHub", src: "/logos/stack/github.svg", w: 128, h: 128 },
    ],
  },
];
