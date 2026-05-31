import { ArrowDownRight, FileText, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/data/site";

const heroActions = [
  { label: "View Work", href: "#projects", icon: ArrowDownRight, primary: true },
  { label: "Resume", href: siteConfig.links.resume, icon: FileText },
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-blue-300/80">
            Cornell CS / CE
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
            {siteConfig.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">{siteConfig.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {heroActions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={
                    action.primary
                      ? "inline-flex items-center gap-2 rounded-full bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
                      : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {action.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["AI tools", "Applied model systems with careful evaluation and usable interfaces."],
            ["Robotics software", "Perception and autonomy work where software has to survive reality."],
            ["Research systems", "Clean pipelines, reproducible experiments, and maintainable lab tooling."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
