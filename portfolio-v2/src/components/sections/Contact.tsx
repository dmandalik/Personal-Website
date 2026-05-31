import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";

const SOCIALS = [
  { label: "GitHub", href: profile.links.github, icon: Github },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.links.email}`, icon: Mail },
];

export function Contact() {
  return (
    <footer id="contact" className="relative scroll-mt-24 border-t border-line py-14 sm:py-16">
      <div className="shell relative z-10 text-center">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-headline font-normal text-fg">
            Want to get in touch? Let&apos;s Talk.
          </h2>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.links.email}`}
              className="group flex items-center gap-2 rounded-xl bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              {profile.links.email}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-xl border border-line bg-fg/[0.03] p-3 text-fg/60 transition-colors hover:border-accent/40 hover:text-fg"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <p className="mt-12 font-mono text-xs text-fg/30">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js + Tailwind.
        </p>
      </div>
    </footer>
  );
}
