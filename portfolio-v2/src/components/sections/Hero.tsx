import Image from "next/image";
import { ArrowDown, Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { skills, about } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin } from "@/components/widgets/MapPin";
import { LocalClock } from "@/components/widgets/LocalClock";
import { NeuroRunner } from "@/components/widgets/neuro-runner/NeuroRunner";

// Theme-matched portraits. The default/Standard (dark) one is a transparent
// cut-out so the figure background shows through; the rest are themed shots.
const HEADSHOTS = [
  { theme: "dark", src: "/headshot.png" },
  { theme: "light", src: "/headshot-light.png" },
  { theme: "matte", src: "/headshot-matte.png" },
  { theme: "iris", src: "/headshot-iris.png" },
  { theme: "cobalt", src: "/headshot-cobalt.png" },
] as const;

export function Hero() {
  return (
    <section id="top" className="relative border-b border-line">
      <div className="shell pb-12 pt-20 lg:pb-14 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* Left: intro text */}
        <div className="min-w-0">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "0.05s" }}>
            {profile.subtitle} · {profile.location}
          </p>

          <h1
            className="mt-4 font-display text-display font-normal leading-[1.02] text-fg animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {profile.name}
          </h1>

          {/* Tagline — same serif as the name, editorial weight */}
          <p
            className="mt-5 max-w-xl font-display text-2xl leading-snug text-fg/75 animate-fade-up sm:text-[1.75rem]"
            style={{ animationDelay: "0.16s" }}
          >
            {profile.tagline}
          </p>

          <div
            className="mt-7 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.22s" }}
          >
            <a
              href="#work"
              className="group flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              View work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-line bg-fg/[0.02] px-4 py-2.5 text-sm text-fg/80 transition-colors hover:border-fg/20 hover:text-fg"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              className="flex items-center gap-2 rounded-lg border border-line bg-fg/[0.02] px-4 py-2.5 text-sm text-fg/80 transition-colors hover:border-fg/20 hover:text-fg"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>

        {/* Right: photo slot — drop an <Image> in here later. */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[14rem] overflow-hidden rounded-xl border border-line bg-fg/[0.02]">
            {/* subtle theme-tinted wash behind the cut-out portrait */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-accent/[0.06] to-transparent"
            />

            {/* One portrait per theme — only the active theme's is shown
                (toggled by CSS on <html data-theme>, so there's no flash). */}
            {HEADSHOTS.map((h) => (
              <Image
                key={h.theme}
                src={h.src}
                alt={profile.name}
                fill
                sizes="(min-width: 1024px) 14rem, 60vw"
                priority={h.theme === "dark"}
                className={`headshot-theme headshot-${h.theme} object-cover object-top`}
              />
            ))}

            {/* corner ticks for the technical / notebook feel */}
            <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-fg/20" />
            <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-fg/20" />
            <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-fg/20" />
            <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-fg/20" />
          </figure>
        </div>
        </div>

        {/* Instrument panel — small live widgets, set apart by a hairline rule. */}
        <div
          className="mt-8 grid gap-4 border-t border-line pt-6 animate-fade-up sm:grid-cols-3 lg:mt-10"
          style={{ animationDelay: "0.3s" }}
        >
          <MapPin />
          <LocalClock />
          <NeuroRunner />
        </div>

        {/* How I work + skills — the "about" detail, below the fold. */}
        <div className="mt-14 grid gap-10 border-t border-line pt-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="eyebrow">A bit about me</p>
            <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-fg sm:text-4xl">
              How I work
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg/70">{about}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass p-6">
              <ul className="space-y-5">
                {skills.map((group) => (
                  <li key={group.label}>
                    <p className="eyebrow mb-2.5">{group.label}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-line bg-fg/[0.03] px-2.5 py-1 font-mono text-xs text-fg/65"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
