"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const THEMES = ["dark", "light", "matte", "iris", "cobalt"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_META: Record<
  Theme,
  { label: string; swatch: string; isLight: boolean }
> = {
  dark: { label: "Standard", swatch: "#6ea8fe", isLight: false },
  light: { label: "Light", swatch: "#f4f5f7", isLight: true },
  matte: { label: "Matte", swatch: "#202020", isLight: false },
  iris: { label: "Iris", swatch: "#a882ff", isLight: false },
  cobalt: { label: "Cobalt", swatch: "#4078ff", isLight: false },
};

const STORAGE_KEY = "portfolio-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return !!value && (THEMES as readonly string[]).includes(value);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialised from the data-theme the inline boot script already applied,
  // so there's no flash and no hydration mismatch.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (isTheme(current)) setThemeState(current);
  }, []);

  const apply = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* storage unavailable — ignore */
    }
  }, []);

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t);
      apply(t);
    },
    [apply],
  );

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length];
      apply(next);
      return next;
    });
  }, [apply]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
