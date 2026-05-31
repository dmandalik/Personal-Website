"use client";

import { useEffect, useState } from "react";
import { Github, Flame } from "lucide-react";
import { profile } from "@/data/profile";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; days: Day[] };

const WEEKS = 17;
const SPAN = WEEKS * 7;

const LEVEL = [
  "bg-fg/[0.05]",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function chunkWeeks(days: Day[]): Day[][] {
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

// Consecutive days (ending today) with at least one contribution.
function currentStreak(days: Day[]) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}

export function GithubPulse() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as { contributions: Day[] };
        setState({ status: "ready", days: json.contributions.slice(-SPAN) });
      } catch {
        if (!controller.signal.aborted) setState({ status: "error" });
      }
    })();
    return () => controller.abort();
  }, []);

  const days: Day[] =
    state.status === "ready"
      ? state.days
      : Array.from({ length: SPAN }, (_, i) => ({
          date: String(i),
          count: 0,
          level: 0 as const,
        }));

  const weeks = chunkWeeks(days);
  const total = state.status === "ready" ? days.reduce((a, d) => a + d.count, 0) : 0;
  const streak = state.status === "ready" ? currentStreak(days) : 0;

  // Month label appears on the first week where the month changes.
  let lastMonth = -1;
  const monthLabels = weeks.map((w) => {
    const d = w[0]?.date ? new Date(w[0].date) : null;
    if (!d || Number.isNaN(d.getTime())) return "";
    const mo = d.getMonth();
    if (mo !== lastMonth) {
      lastMonth = mo;
      return MONTHS[mo];
    }
    return "";
  });

  return (
    <div className="glass flex flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow">GitHub pulse</span>
        <Github className="h-3.5 w-3.5 text-fg/30" strokeWidth={1.5} />
      </div>

      {/* headline stats */}
      <div className="mt-3 flex items-baseline gap-4">
        <span className="font-display text-2xl leading-none text-fg">
          {state.status === "ready" ? total.toLocaleString() : "—"}
        </span>
        <span className="font-mono text-[11px] text-fg/45">
          contributions · {WEEKS}w
        </span>
        {streak > 0 && (
          <span className="gh-streak ml-auto flex items-center gap-1 font-mono text-[11px] text-amber-300/90">
            <Flame className="h-3.5 w-3.5" strokeWidth={1.8} />
            {streak}d
          </span>
        )}
      </div>

      {/* month labels */}
      <div className="mt-4 flex gap-[3px] pl-0">
        {monthLabels.map((label, i) => (
          <span
            key={i}
            className="w-2 font-mono text-[8px] uppercase tracking-wide text-fg/30"
          >
            {label}
          </span>
        ))}
      </div>

      {/* heatmap — one column per week */}
      <div className="mt-1 flex gap-[3px]" aria-hidden>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d, di) => (
              <span
                key={d.date + di}
                title={state.status === "ready" ? `${d.count} on ${d.date}` : undefined}
                className={`h-2 w-2 rounded-[2px] ${LEVEL[d.level]} ${
                  state.status === "loading" ? "animate-pulse" : ""
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* legend / status footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] text-fg/35">
          {state.status === "error"
            ? "activity unavailable"
            : state.status === "loading"
              ? "syncing…"
              : `@${profile.githubUsername}`}
        </span>
        <span className="flex items-center gap-[3px] font-mono text-[9px] text-fg/35">
          less
          {LEVEL.map((c, i) => (
            <span key={i} className={`h-2 w-2 rounded-[2px] ${c}`} />
          ))}
          more
        </span>
      </div>
    </div>
  );
}
