import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Experience />
      <Work />
      <Contact />
    </main>
  );
}
