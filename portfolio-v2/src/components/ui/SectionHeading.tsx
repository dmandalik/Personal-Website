import { Reveal } from "./Reveal";

// Section title — a single editorial headline per section (no numbered eyebrow).
export function SectionHeading({ title }: { title: string }) {
  return (
    <Reveal className="mb-8 sm:mb-10">
      <h2 className="font-display text-headline font-normal text-fg">{title}</h2>
    </Reveal>
  );
}
