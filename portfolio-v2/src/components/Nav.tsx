"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { CommandPalette } from "./CommandPalette";

const LINKS = [
  { id: "top", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view for the active underline.
  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-line bg-bg/60 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-fg/[0.03] font-mono text-xs font-medium text-fg/80 transition-colors group-hover:border-accent/40 group-hover:text-accent">
              {profile.initials}
            </span>
            <span
              className="status-led"
              role="status"
              aria-label="All systems operational"
              title="All systems operational"
            />
          </a>

          <div className="flex items-center gap-1">
            <ul className="mr-2 hidden items-center gap-1 sm:flex">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      active === l.id ? "text-fg" : "text-fg/55 hover:text-fg",
                    )}
                  >
                    {l.label}
                    {active === l.id && (
                      <span className="absolute inset-x-3 -bottom-px h-px bg-accent" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-line bg-fg/[0.03] px-2.5 py-1.5 text-fg/50 transition-colors hover:border-accent/40 hover:text-fg"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="hidden font-mono text-[11px] sm:inline">K</span>
            </button>

            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 rounded-lg bg-fg px-3.5 py-1.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
