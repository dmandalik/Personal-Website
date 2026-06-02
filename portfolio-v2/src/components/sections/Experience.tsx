"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { experienceLogos, stackGroups } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";

// Subtle staggered reveal for a wall of marks: the container cascades its
// children, each fading + rising a touch. Plays once per load when scrolled
// into view (so a reload replays it). Kept gentle on purpose.
const logoWall: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const logoItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// A single floating mark: uniform height, auto aspect ratio, a glossy glaze
// clipped to its own silhouette, and a hover/focus popup. Used for both the
// company logos and the tech-stack icons so they share the exact same shine,
// lift, and matte-grayscale behaviour.
function LogoMark({
  name,
  src,
  w,
  h,
  blurb,
  href,
  imgClass = "h-14 w-auto object-contain sm:h-16",
}: {
  name: string;
  src: string;
  w: number;
  h: number;
  blurb?: string;
  href?: string;
  imgClass?: string;
}) {
  const markClass =
    "relative inline-flex rounded-md outline-none ring-accent/50 transition-transform duration-300 focus-visible:ring-2 group-hover:-translate-y-1.5 group-focus-within:-translate-y-1.5";
  const mark = (
    <>
      <Image
        src={src}
        alt=""
        width={w}
        height={h}
        className={`exp-logo ${imgClass}`}
      />
      {/* glossy glaze, clipped to the logo's own shape */}
      <span
        aria-hidden
        className="exp-glaze"
        style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
      />
    </>
  );

  return (
    <motion.li variants={logoItem} className="group relative flex justify-center">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} — visit website`}
          className={`${markClass} cursor-pointer`}
        >
          {mark}
        </a>
      ) : (
        <span tabIndex={0} role="img" aria-label={name} className={markClass}>
          {mark}
        </span>
      )}

      {/* hover/focus popup — sits *below* the mark. The transparent pt-3 acts as
          a hover bridge so moving the cursor down into the card doesn't drop the
          hover, and pointer-events flip to auto while open so the link is
          clickable. */}
      <div className="pointer-events-none absolute left-1/2 top-full z-20 w-52 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="relative rounded-lg border border-line bg-bg/95 p-3 text-center shadow-glass backdrop-blur-xl">
          <p className="text-sm font-semibold text-fg">{name}</p>
          {blurb &&
            (() => {
              // Subtly emphasise the role title. Roles are written ahead of an
              // em-dash ("Software Engineer — building …"); split on it so the
              // role reads a touch brighter/medium-weight and the detail stays
              // muted. Role-only blurbs (no dash, e.g. AIRLab) emphasise whole.
              const [role, ...rest] = blurb.split(" — ");
              const detail = rest.join(" — ");
              return (
                <p className="mt-1 text-xs leading-relaxed text-fg/55">
                  <span className="font-medium text-fg/85">{role}</span>
                  {detail && (
                    <>
                      {" — "}
                      {detail}
                    </>
                  )}
                </p>
              );
            })()}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent transition-colors hover:text-fg"
            >
              Visit site
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
          {/* caret pointing up toward the mark */}
          <span
            aria-hidden
            className="absolute bottom-full left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1 rotate-45 border-l border-t border-line bg-bg/95"
          />
        </div>
      </div>
    </motion.li>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="shell flex min-h-screen flex-col border-t border-line pb-12 pt-8 -scroll-mt-4"
    >
      {/* Section title on the left, jump-to-projects pinned to the far end. */}
      <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <h2 className="font-display text-headline font-normal text-fg">
          Experience
        </h2>
        <a
          href="#work"
          className="group flex shrink-0 items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          View Projects
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </a>
      </Reveal>

      {/* Where I've worked — uniform, auto-wrapping company marks, each with the
          glossy glaze and (matte-only) grayscale treatment. */}
      <Reveal>
        <h3 className="font-display text-2xl font-normal text-fg">Experience</h3>
      </Reveal>
      <motion.ul
        className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16"
        variants={logoWall}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {experienceLogos.map((logo) => (
          <LogoMark
            key={logo.key}
            name={logo.name}
            src={logo.src}
            w={logo.w}
            h={logo.h}
            blurb={logo.blurb}
            href={logo.href}
            {...(logo.imgClass ? { imgClass: logo.imgClass } : {})}
          />
        ))}
      </motion.ul>

      {/* Technical Skills — grouped tech marks sharing the same shine. */}
      <Reveal className="mt-10">
        <h3 className="font-display text-2xl font-normal text-fg">
          Technical Skills
        </h3>
      </Reveal>
      <div className="mt-6 flex flex-col gap-7">
        {stackGroups.map((group) => (
          <div key={group.title}>
            <Reveal>
              <p className="eyebrow mb-4">{group.title}</p>
            </Reveal>
            <motion.ul
              className="flex flex-wrap items-center gap-x-10 gap-y-6"
              variants={logoWall}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {group.logos.map((logo) => (
                <LogoMark
                  key={logo.key}
                  name={logo.name}
                  src={logo.src}
                  w={logo.w}
                  h={logo.h}
                  imgClass="h-10 w-auto object-contain sm:h-12"
                />
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </section>
  );
}
