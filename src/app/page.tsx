import Loader from "@/components/Loader";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Creative from "@/components/sections/Creative";
import AI from "@/components/sections/AI";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { rotating } from "@/data/site";

function Band() {
  return (
    <div aria-hidden className="overflow-hidden py-10">
    <div className="relative -mx-10 -rotate-2 border-y border-line bg-accent py-4 text-white">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap" style={{ ["--dur" as string]: "28s" }}>
        {[0, 1].map((k) => (
          <span key={k} className="display flex gap-8 text-3xl md:text-5xl">
            {rotating.map((r) => <span key={r} className="flex items-center gap-8">{r} <span className="text-white/50">✦</span></span>)}
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Loader />
      <main id="main">
        <Hero />
        <Band />
        <About />
        <Expertise />
        <Projects />
        <Creative />
        <AI />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
