import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      colors: {
        ink: "#05070d",
        panel: "#0b1020",
      },
      boxShadow: {
        glow: "0 0 36px rgba(96, 165, 250, 0.22)",
      },
      keyframes: {
        "tree-pulse": {
          "0%, 100%": { opacity: "0.82", filter: "drop-shadow(0 0 10px rgba(96, 165, 250, 0.35))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 24px rgba(165, 180, 252, 0.55))" },
        },
        "branch-draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        "star-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)", opacity: "0.28" },
          "50%": { transform: "translate3d(10px, -12px, 0)", opacity: "0.58" },
        },
        "strand-shimmer": {
          "0%, 18%": { strokeDashoffset: "1", opacity: "0" },
          "42%": { opacity: "0.72" },
          "72%, 100%": { strokeDashoffset: "0", opacity: "0" },
        },
      },
      animation: {
        "tree-pulse": "tree-pulse 7s ease-in-out infinite",
        "star-drift": "star-drift 8s ease-in-out infinite",
      },
    },
  },
  plugins: [forms],
};

export default config;
