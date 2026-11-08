"use client";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { SectionLabel, SplitLines } from "../Reveal";
import Marquee from "../ui/Marquee";
import Icon from "../ui/Icon";
import { clients, jobs } from "@/data/v2";
import { awards, education } from "@/data/site";

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
    <section id="experience" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel>Experience</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[7vw]" lines={["The journey", <span key="j">so <span className="serif font-normal text-accent">far</span>.</span>]} />
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

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <div className="rounded-[26px] border border-line p-6 md:p-8">
          <div className="label mb-5">Education</div>
          <ul className="divide-y divide-line">
            {education.map((e) => (
              <li key={e.title} className="flex items-baseline justify-between gap-4 py-3">
                <span>{e.title}{e.place && <span className="text-mute"> · {e.place}</span>}</span>
                {e.period && <span className="label shrink-0">{e.period}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[26px] border border-line p-6 md:p-8">
          <div className="label mb-5">Recognition</div>
          <ul className="divide-y divide-line">
            {awards.map((a) => (
              <li key={a.title} className="flex items-baseline justify-between gap-4 py-3">
                <span>{a.title}</span><span className="text-sm text-mute">{a.by}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LogoBox({ c }: { c: (typeof clients)[number] }) {
  const inner = (
    <div className="group/logo flex h-36 w-60 shrink-0 flex-col items-center justify-center gap-3 rounded-[22px] border border-white/10 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,.35)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(77,141,255,.35)] md:h-44 md:w-72">
      <div className="flex h-full w-full items-center justify-center">
        <img src={c.logo} alt={`${c.name} logo`} loading="lazy" className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover/logo:scale-105" />
      </div>
    </div>
  );
  return c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>{inner}</a> : <div aria-label={c.name}>{inner}</div>;
}

export function Clients() {
  const half = Math.ceil(clients.length / 2);
  return (
    <section id="clients" className="relative overflow-hidden py-28 md:py-36">
      <div className="px-5 text-center md:px-10">
        <div className="flex justify-center"><SectionLabel>Clients & brands</SectionLabel></div>
        <SplitLines className="display mt-6 text-[11vw] md:text-[6vw]" lines={["Brands I've helped", <span key="c"><span className="serif font-normal text-accent">grow</span>.</span>]} />
        <p className="mx-auto mt-6 max-w-xl text-mute">Identities, websites and campaigns — from Glasgow law firms to Pakistan&apos;s EV makers. Hover to pause.</p>
      </div>
      <div className="mt-14 space-y-5">
        <Marquee speed={45}>{clients.slice(0, half).map((c) => <LogoBox key={c.name} c={c} />)}</Marquee>
        <Marquee speed={50} reverse>{clients.slice(half).map((c) => <LogoBox key={c.name} c={c} />)}</Marquee>
      </div>
    </section>
  );
}
