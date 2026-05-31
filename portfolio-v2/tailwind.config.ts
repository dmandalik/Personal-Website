import type { Config } from "tailwindcss";

// Design tokens live here so the whole site re-themes from one place.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-driven tokens. Actual values live in CSS variables
        // (see globals.css) and swap per `data-theme`, so the whole site
        // re-themes from one place. RGB triplets let Tailwind's /opacity work.
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        fg: "rgb(var(--fg-rgb) / <alpha-value>)",
        // Hairline borders / muted dividers.
        line: "var(--line)",
        // Signature accent — shifts per theme (blue / violet / cobalt …).
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          soft: "rgb(var(--accent-soft-rgb) / <alpha-value>)",
          deep: "rgb(var(--accent-deep-rgb) / <alpha-value>)",
        },
        iris: "rgb(var(--iris-rgb) / <alpha-value>)",
        // Back-compat alias so any stray `ink-900` still themes to the bg.
        ink: { 900: "rgb(var(--bg-rgb) / <alpha-value>)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        // Display / foreground serif (Instrument Serif → swappable to Feature Display).
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        // Display scale — tuned for a high-contrast serif (looser tracking than a sans).
        "display": ["clamp(3rem, 6.5vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.01em" }],
        "headline": ["clamp(2rem, 3.4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.005em" }],
      },
      maxWidth: {
        shell: "72rem",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glass: "var(--shadow-glass)",
        glow: "0 0 0 1px rgb(var(--accent-rgb) / 0.25), 0 0 40px -8px rgb(var(--accent-rgb) / 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.06)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "drift": "drift 18s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
