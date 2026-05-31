"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, Check } from "lucide-react";
import { THEMES, THEME_META, useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          role="menu"
          className="absolute bottom-full right-0 mb-3 w-40 overflow-hidden rounded-xl border border-line bg-bg/90 p-1 shadow-glass backdrop-blur-xl animate-fade-up"
        >
          {THEMES.map((t) => (
            <button
              key={t}
              role="menuitemradio"
              aria-checked={theme === t}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-fg/70 transition-colors hover:bg-fg/[0.06] hover:text-fg"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full ring-1 ring-line"
                style={{ backgroundColor: THEME_META[t].swatch }}
              />
              <span className="flex-1">{THEME_META[t].label}</span>
              {theme === t && <Check className="h-3.5 w-3.5 text-accent" />}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg/70 text-fg/70 shadow-glass backdrop-blur-xl transition-colors hover:border-accent/40 hover:text-accent"
        aria-label="Change color theme"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Lightbulb className="h-5 w-5" strokeWidth={1.7} />
      </button>
    </div>
  );
}
