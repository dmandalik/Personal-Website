"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

type Item = {
  id: string;
  label: string;
  hint: string;
  kind: "section" | "project" | "link";
  action: () => void;
};

const SECTIONS = [
  { id: "top", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (hash: string) => {
    setOpen(false);
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  };
  const openExternal = (url: string) => {
    setOpen(false);
    window.open(url, url.startsWith("http") ? "_blank" : "_self");
  };

  const items = useMemo<Item[]>(() => {
    const sectionItems: Item[] = SECTIONS.map((s) => ({
      id: `sec-${s.id}`,
      label: s.label,
      hint: "Jump to section",
      kind: "section",
      action: () => go(s.id),
    }));
    const projectItems: Item[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      label: p.title,
      hint: p.category,
      kind: "project",
      action: () => go("work"),
    }));
    const linkItems: Item[] = [
      { id: "lnk-gh", label: "GitHub", hint: "External", kind: "link", action: () => openExternal(profile.links.github) },
      { id: "lnk-li", label: "LinkedIn", hint: "External", kind: "link", action: () => openExternal(profile.links.linkedin) },
      { id: "lnk-rs", label: "Resume", hint: "PDF", kind: "link", action: () => openExternal(profile.links.resume) },
      { id: "lnk-em", label: "Email me", hint: profile.links.email, kind: "link", action: () => openExternal(`mailto:${profile.links.email}`) },
    ];
    return [...sectionItems, ...projectItems, ...linkItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Global ⌘K / Ctrl+K toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="glass relative w-full max-w-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-fg/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, project, or link…"
                className="h-12 w-full bg-transparent text-sm text-fg placeholder:text-fg/35 focus:outline-none"
              />
              <span className="kbd">esc</span>
            </div>
            <ul className="max-h-[46vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-fg/40">No matches.</li>
              )}
              {filtered.map((item, i) => (
                <li key={item.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={item.action}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      i === active ? "bg-fg/[0.06]" : "hover:bg-fg/[0.03]",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "font-mono text-[10px] uppercase tracking-wider",
                          item.kind === "project"
                            ? "text-accent/70"
                            : item.kind === "link"
                              ? "text-iris/70"
                              : "text-fg/35",
                        )}
                      >
                        {item.kind}
                      </span>
                      <span className="text-sm text-fg/90">{item.label}</span>
                    </span>
                    <span className="flex items-center gap-2 text-fg/35">
                      <span className="text-xs">{item.hint}</span>
                      {item.kind === "link" ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        i === active && <CornerDownLeft className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
