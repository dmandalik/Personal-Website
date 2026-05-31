import { siteConfig, navItems } from "@/data/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070d]/78 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Go to top">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.85)]" />
          <span className="text-sm font-semibold tracking-wide text-zinc-100">{siteConfig.name}</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href={siteConfig.links.email}
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
