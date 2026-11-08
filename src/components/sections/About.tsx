"use client";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FadeUp, MaskImage, ScrollText, SectionLabel } from "../Reveal";
import { logoWall, sectors, stats } from "@/data/site";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.23, 1, 0.32, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{v}{suffix}</span>;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["30%", "-30%"]);
  const rot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [6, -4]);

  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="01">About</SectionLabel>

      <ScrollText
        className="mt-10 max-w-6xl text-[clamp(1.75rem,4.4vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em]"
        text="I'm Afshal — a software engineer who ended up running brands. For five years I've moved between strategy, design, code and campaigns, so the teams I work with get one person who sees the whole picture and still ships the details."
      />

      <div ref={ref} className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-8">
        <div className="relative md:col-span-5">
          <motion.div style={{ y: y1 }} className="relative">
            <MaskImage src="/img/portrait.webp" alt="Portrait of Muhammad Afshal Amir" className="aspect-[4/5] rounded-[28px]" imgClass="object-top" />
            <div className="label absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur">Muhammad Afshal Amir</div>
          </motion.div>
          <motion.div style={{ y: y2, rotate: rot }} className="absolute -bottom-10 -right-4 w-[42%] md:-right-16">
            <MaskImage src="/img/candid-mug.webp" alt="Afshal at his desk" className="aspect-[3/4] rounded-2xl border-4 border-bg shadow-2xl" />
          </motion.div>
        </div>

        <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
          <FadeUp>
            <p className="text-lg leading-relaxed text-mute md:text-xl">
              I studied <span className="text-ink">Software Engineering at Superior University</span>, then spent my career where technology meets marketing. Today I run social media marketing, brand partnerships, events and execution at{" "}
              <span className="text-ink">Zaryan&apos;s Business Group</span>. Before that I was a brand manager at SA Corporation and SIMVAH, and a designer and social media manager at ESS Factor and Startup Buddies.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-mute md:text-xl">
              The thread through all of it: take an idea from <span className="serif text-ink">strategy</span> to <span className="serif text-ink">design</span> to <span className="serif text-ink">build</span> to <span className="serif text-ink">launch</span>, and make sure it works when real people use it.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="label mb-4">Industries</div>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <span key={s} className="rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 hover:border-accent hover:text-accent">{s}</span>
              ))}
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.06} className="bg-bg p-6 md:p-8">
                <div className="display text-6xl md:text-7xl"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="mt-3 text-sm text-mute">{s.label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* brand logos I've designed */}
      <div className="mt-28 md:mt-40">
        <div className="label mb-8 text-center">Logos I&apos;ve designed</div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track flex w-max gap-4" style={{ ["--dur" as string]: "50s" }}>
            {[...logoWall, ...logoWall].map((l, i) => (
              <div key={i} className="grid h-24 w-44 shrink-0 place-items-center rounded-2xl bg-white/95 p-3 grayscale transition-[filter] duration-500 hover:grayscale-0 md:h-28 md:w-52">
                <img src={`/work/logo-${l}.webp`} alt="" loading="lazy" className="max-h-full max-w-full object-contain mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
