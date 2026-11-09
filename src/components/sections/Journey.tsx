"use client";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { SectionLabel, SplitLines } from "../Reveal";
import Carousel from "../ui/Carousel";
import Icon from "../ui/Icon";
import { clients, jobs } from "@/data/v2";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="experience" className="relative px-5 py-14 md:px-10 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel>Experience</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[7vw]" lines={["Experience"]} />
        </div>
        <p className="self-end text-lg leading-relaxed text-mute md:col-span-4">EV, gaming, automotive, legal, construction and agency work — strategy, creative and the build.</p>
      </div>

      <ol ref={ref} className="relative mt-16 space-y-5 md:pl-16">
        <div aria-hidden className="absolute bottom-0 left-[22px] top-0 hidden w-px bg-line md:block" />
        <motion.div aria-hidden style={{ scaleY: reduce ? 1 : scrollYProgress }} className="absolute bottom-0 left-[22px] top-0 hidden w-px origin-top bg-gradient-to-b from-accent via-violet to-accent md:block" />
        {jobs.map((j, i) => (
          <motion.li
            key={j.company}
            onPointerMove={spot}
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
            className="group relative overflow-hidden rounded-[26px] border border-line bg-bg-2 p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20 md:p-8"
            style={{ ["--c" as string]: j.accent }}
          >
            <span aria-hidden className="absolute -left-[46px] top-10 hidden h-4 w-4 rounded-full border-2 border-[var(--c)] bg-bg md:block" />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(500px circle at var(--mx) var(--my), ${j.accent}22, transparent 60%)` }} />
            <div className="relative grid items-center gap-6 md:grid-cols-12">
              <div className="flex items-center gap-5 md:col-span-5">
                <div className="grid h-20 w-28 shrink-0 place-items-center rounded-2xl bg-white p-3 shadow-lg transition-transform duration-500 group-hover:scale-105">
                  {j.logo ? <img src={j.logo} alt={`${j.company} logo`} loading="lazy" className="max-h-full max-w-full object-contain mix-blend-multiply" /> : <span className="display text-center text-lg leading-tight text-black">{j.company.split(" ")[0]}</span>}
                </div>
                <div>
                  <h3 className="display text-3xl leading-none md:text-4xl">{j.company}</h3>
                  <div className="mt-2 text-sm" style={{ color: j.accent }}>{j.role}</div>
                </div>
              </div>
              <p className="text-mute md:col-span-4">{j.summary}</p>
              <div className="flex flex-col gap-3 md:col-span-3 md:items-end">
                <div className="flex flex-wrap gap-1.5 md:justify-end">
                  {j.work.slice(0, 4).map((w) => <span key={w} className="rounded-full border border-line px-3 py-1 text-xs text-ink/80">{w}</span>)}
                </div>
                <div className="flex gap-2">
                  {j.slug && <a href={`/work/${j.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-[0.97]">Case study</a>}
                  {j.url && <a href={j.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-xs transition-colors hover:border-white/40">Visit <Icon name="ArrowUpRight" className="h-3 w-3" /></a>}
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>

    </section>
  );
}

export function Clients() {
  return (
    <section id="clients" className="relative overflow-hidden py-12 md:py-24">
      <div className="relative px-5 text-center md:px-10">
        <div className="flex justify-center"><SectionLabel>Clients & brands</SectionLabel></div>
        <SplitLines className="display mt-6 text-[11vw] md:text-[6vw]" lines={["Clients"]} />
        <p className="mx-auto mt-6 max-w-xl text-mute">Brands I&apos;ve designed for, built websites for or run marketing for.</p>
      </div>
      <div className="relative mt-14 [--slide-h:17rem] md:[--slide-h:20rem]">
        <Carousel
          label="Client logos"
          items={clients}
          slideWidth={340}
          render={(i, active) => {
            const c = clients[i];
            const card = (
              <div className={`flex h-56 flex-col items-center justify-center gap-4 rounded-[28px] border bg-white p-7 transition-shadow duration-500 md:h-64 ${active ? "border-accent shadow-[0_20px_60px_rgba(0,0,0,.5)]" : "border-white/10 shadow-[0_10px_40px_rgba(0,0,0,.35)]"}`}>
                <div className="flex h-full w-full items-center justify-center">
                  <img src={c.logo} alt={`${c.name} logo`} decoding="async" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <span className={`text-sm font-medium text-black/70 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}>{c.name}</span>
              </div>
            );
            return active && c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.name} website`}>{card}</a> : card;
          }}
        />
      </div>
    </section>
  );
}
