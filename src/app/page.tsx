import { ArrowUpRight } from "lucide-react";
import { ExperienceTree } from "@/components/experience-tree/ExperienceTree";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { focusAreas } from "@/data/site";
import { notes } from "@/data/notes";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExperienceTree />

        <section id="projects" className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Selected Work"
              title="Featured Projects"
              subtitle="A small set of projects that show the range: model systems, robotics software, research tooling, and lower-level learning."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="focus" className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Technical Focus"
              title="What I keep returning to"
              subtitle="The common thread is building systems that are understandable, testable, and useful under real constraints."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <article key={area.title} className="rounded-2xl border border-white/10 bg-[#080b15]/76 p-6 backdrop-blur">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-zinc-50">{area.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-zinc-400">{area.description}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {area.items.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="notes" className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <SectionHeader
                eyebrow="Learning Log"
                title="Notes in progress"
                subtitle="A lightweight placeholder for future technical writing. The structure can grow into MDX without changing the rest of the site."
              />
              <div className="grid gap-4">
                {notes.map((note) => (
                  <article
                    key={note.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-violet-300/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/80">{note.status}</p>
                        <h3 className="mt-3 text-lg font-semibold text-zinc-50">{note.title}</h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 transition group-hover:text-violet-200" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-zinc-400">{note.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
