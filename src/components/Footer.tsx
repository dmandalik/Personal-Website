import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-100">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-zinc-500">Engineering across AI, robotics, and systems.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Email", href: siteConfig.links.email, icon: Mail },
            { label: "GitHub", href: siteConfig.links.github, icon: Github },
            { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:border-cyan-300/40 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
