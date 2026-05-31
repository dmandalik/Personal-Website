import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 border-t border-line py-16 sm:py-20">
      <SectionHeading index="01" eyebrow="Where I've worked" title="Experience" />

      <ol className="relative">
        {/* vertical rail */}
        <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line sm:left-[110px]" />

        {experience.map((role, i) => (
          <Reveal key={`${role.org}-${role.period}`} delay={i * 0.06}>
            <li className="relative grid gap-2 pb-10 pl-8 sm:grid-cols-[110px_1fr] sm:gap-6 sm:pl-0">
              {/* period + dot */}
              <div className="flex items-center gap-3 sm:block sm:pt-0.5 sm:text-right">
                <span
                  className="timeline-dot absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-bg sm:left-[105px]"
                  style={{
                    background: role.accent ?? "#6ea8fe",
                    boxShadow: `0 0 12px ${role.accent ?? "#6ea8fe"}`,
                  }}
                />
                <span className="font-mono text-sm text-fg/45">{role.period}</span>
              </div>

              <div className="sm:pl-8">
                <h3 className="text-base font-semibold text-fg">{role.title}</h3>
                <p className="text-sm text-fg/55">{role.org}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg/60">
                  {role.blurb}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
