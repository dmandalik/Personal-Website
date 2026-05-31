"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { profile } from "@/data/profile";

const tz = profile.geo.timezone;

// Pull hour/minute/second *in the target timezone* so the hands are correct
// regardless of where the visitor is.
function parts(date: Date) {
  const p = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
  let h = get("hour");
  if (h === 24) h = 0;
  return { h, m: get("minute"), s: get("second") };
}

function readout(date: Date) {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
  const zone =
    new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" })
      .formatToParts(date)
      .find((x) => x.type === "timeZoneName")?.value ?? "";
  return { time, day, zone };
}

const C = 50; // svg center
const tick = (i: number, r1: number, r2: number) => {
  const a = (i * 30 - 90) * (Math.PI / 180);
  return {
    x1: C + r1 * Math.cos(a),
    y1: C + r1 * Math.sin(a),
    x2: C + r2 * Math.cos(a),
    y2: C + r2 * Math.sin(a),
  };
};

export function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { h, m, s } = now ? parts(now) : { h: 0, m: 0, s: 0 };
  const { time, day, zone } = now
    ? readout(now)
    : { time: "--:--", day: " ", zone: "" };

  const hourAngle = (h % 12) * 30 + m * 0.5;
  const minAngle = m * 6 + s * 0.1;
  const secAngle = s * 6;
  const isDay = h >= 7 && h < 19;

  return (
    <div className="glass flex flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Local time</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-fg/40">
          {isDay ? (
            <Sun className="daynight-icon h-3.5 w-3.5 text-amber-300/80" strokeWidth={1.6} />
          ) : (
            <Moon className="daynight-icon h-3.5 w-3.5 text-indigo-300/80" strokeWidth={1.6} />
          )}
          {isDay ? "DAY" : "NIGHT"}
        </span>
      </div>

      <div className="my-5 flex flex-1 items-center gap-5">
        {/* analog face — strokes inherit currentColor (text-fg) so they theme */}
        <svg viewBox="0 0 100 100" className="h-32 w-32 shrink-0 text-fg">
          <circle cx="50" cy="50" r="47" fill="currentColor" fillOpacity={0.02} stroke="currentColor" strokeOpacity={0.12} strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const major = i % 3 === 0;
            const t = tick(i, major ? 38 : 41, 44);
            return (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="currentColor"
                strokeOpacity={0.35}
                strokeWidth={major ? 1.6 : 0.8}
                strokeLinecap="round"
              />
            );
          })}
          {/* hour hand */}
          <line
            x1="50" y1="50" x2="50" y2="28"
            stroke="currentColor" strokeOpacity={0.9} strokeWidth="2.6" strokeLinecap="round"
            transform={`rotate(${hourAngle} 50 50)`}
          />
          {/* minute hand */}
          <line
            x1="50" y1="50" x2="50" y2="18"
            stroke="currentColor" strokeOpacity={0.9} strokeWidth="1.8" strokeLinecap="round"
            transform={`rotate(${minAngle} 50 50)`}
          />
          {/* second hand */}
          <line
            x1="50" y1="56" x2="50" y2="14"
            stroke="var(--accent)" strokeWidth="1" strokeLinecap="round"
            transform={`rotate(${secAngle} 50 50)`}
          />
          <circle cx="50" cy="50" r="2.4" fill="var(--accent)" />
        </svg>

        {/* digital readout */}
        <div className="min-w-0">
          <p className="font-mono text-3xl tabular-nums tracking-tight text-fg">
            {time}
          </p>
          <p className="mt-1.5 font-mono text-xs text-fg/45">{zone}</p>
        </div>
      </div>

      <p className="font-mono text-[11px] text-fg/45">{day}</p>
    </div>
  );
}
