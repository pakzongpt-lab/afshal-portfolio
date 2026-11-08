"use client";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { FadeUp, SectionLabel, SplitLines } from "../Reveal";
import { awards, education, experience, toolGroups } from "@/data/site";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });

  return (
    <>
      <section id="experience" className="relative px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <SectionLabel index="06">Experience</SectionLabel>
            <SplitLines className="display mt-8 text-[13vw] md:text-[7.5vw]" lines={["Five years,", <span key="e">many <span className="serif font-normal text-accent">hats</span>.</span>]} />
          </div>
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div ref={ref} className="relative md:col-span-8">
            <div aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
            <motion.div aria-hidden style={{ scaleY: reduce ? 1 : scrollYProgress }} className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-accent to-violet" />
            <ol className="space-y-12">
              {experience.map((e, i) => (
                <FadeUp key={e.company} delay={i * 0.04}>
                  <li className="group relative pl-12">
                    <span className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 ${i === 0 ? "glow-dot border-accent bg-accent" : "border-white/30 bg-bg"} transition-colors duration-300 group-hover:border-accent`} />
                    <div className="label">{e.period}</div>
                    <h3 className="display mt-3 text-3xl md:text-[2.75rem]">{e.company}</h3>
                    <div className="mt-2 text-ink/90">{e.role}</div>
                    <p className="mt-3 max-w-xl text-mute">{e.note}</p>
                  </li>
                </FadeUp>
              ))}
            </ol>
          </div>

          <aside className="md:col-span-4">
            <FadeUp>
              <div className="label mb-6">Education</div>
              <ul className="divide-y divide-line border-y border-line">
                {education.map((ed) => (
                  <li key={ed.title} className="flex items-baseline justify-between gap-4 py-4">
                    <div>
                      <div className="font-medium">{ed.title}</div>
                      {ed.place && <div className="text-sm text-mute">{ed.place}</div>}
                    </div>
                    {ed.period && <span className="label shrink-0">{ed.period}</span>}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </aside>
        </div>
      </section>

      <section id="skills" className="relative px-5 py-28 md:px-10 md:py-32">
        <SectionLabel index="07">Skills & tools</SectionLabel>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-4">
          {toolGroups.map((g, gi) => (
            <FadeUp key={g.group} delay={gi * 0.06} className="bg-bg p-6 md:p-8">
              <div className="display text-3xl">{g.group}</div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <li key={t} className="cursor-default rounded-full border border-line px-3.5 py-2 text-sm text-ink/85 transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent">{t}</li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
        <div aria-hidden className="mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap" style={{ ["--dur" as string]: "60s" }}>
            {[0, 1].map((k) => (
              <span key={k} className="display flex gap-10 text-[10vw] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.18)] md:text-[6vw]">
                {toolGroups.flatMap((g) => g.items).map((t) => <span key={t}>{t} ✦</span>)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="awards" className="relative px-5 py-28 md:px-10 md:py-32">
        <SectionLabel index="08">Achievements & certifications</SectionLabel>
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <FadeUp className="md:col-span-6 md:row-span-2">
            <figure className="group relative h-full overflow-hidden rounded-[28px] border border-line">
              <img src={awards[0].image} alt="Afshal receiving the Best Performance Award at Jolta Electric's Annual Appreciation Gala 2026" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.03]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                <div className="label text-accent">{awards[0].by}</div>
                <div className="display mt-2 text-3xl md:text-4xl">{awards[0].title}</div>
              </figcaption>
            </figure>
          </FadeUp>
          {awards.slice(1).map((a, i) => (
            <FadeUp key={a.title} delay={0.08 * (i + 1)} className="md:col-span-6">
              <div className="group flex h-full min-h-[12rem] flex-col justify-between rounded-[28px] border border-line bg-bg-2 p-6 transition-colors duration-500 hover:border-accent/50 md:p-8">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent transition-transform duration-500 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="label text-accent">{a.by}</div>
                  <div className="display mt-2 text-3xl md:text-4xl">{a.title}</div>
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.2} className="md:col-span-12">
            <div className="flex flex-col justify-between gap-4 rounded-[28px] border border-line p-6 md:flex-row md:items-center md:p-8">
              <div>
                <div className="label">Certification</div>
                <div className="display mt-2 text-3xl">Digital Marketing Innovations</div>
              </div>
              <div className="text-mute">Lahore University of Management Sciences (LUMS) · March 2023</div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
