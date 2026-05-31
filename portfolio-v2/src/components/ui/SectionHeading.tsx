import { Reveal } from "./Reveal";

// Numbered section heading — the recurring structural motif (01 / Work, etc).
export function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="mb-8 sm:mb-10">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent/70">{index}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-5 font-display text-headline font-normal text-fg">{title}</h2>
    </Reveal>
  );
}
