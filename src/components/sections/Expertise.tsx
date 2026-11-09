"use client";
import { motion, useReducedMotion } from "motion/react";
import { SectionLabel, SplitLines } from "../Reveal";
import ServiceIcon from "../ServiceIcon";
import { services } from "@/data/site";

export default function Expertise() {
  const reduce = useReducedMotion();
  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="expertise" className="relative px-5 py-14 md:px-10 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel index="02">Expertise</SectionLabel>
          <SplitLines
            className="display mt-8 text-[13vw] md:text-[7.5vw]"
            lines={["One person,", <span key="b">the whole <span className="serif font-normal text-accent">stack</span>.</span>]}
          />
        </div>
        <p className="self-end text-lg leading-relaxed text-mute md:col-span-4 md:col-start-9">
          Most projects need a strategist, a designer, a developer and someone to run the campaign. I cover each of those roles, so nothing gets lost between them.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.article
            key={s.key}
            onPointerMove={spot}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: (i % 4) * 0.07 }}
            className="group relative flex min-h-[25rem] flex-col overflow-hidden rounded-[26px] border border-line bg-bg-2 p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20 md:p-7"
          >
            <div className="flex items-start justify-between">
              <span className="label">{s.title.split(" ")[0]}</span>
              <span className="text-ink/80 transition-colors duration-500 group-hover:text-ink"><ServiceIcon name={s.key} /></span>
            </div>
            <h3 className="display mt-auto pt-10 text-[2rem] leading-[0.95] md:text-[2.2rem]">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-snug text-mute">{s.line}</p>
            <ul className="mt-5 grid gap-1.5 border-t border-line pt-4 text-sm text-ink/80 lg:max-h-0 lg:overflow-hidden lg:border-t-0 lg:pt-0 lg:opacity-0 lg:transition-[max-height,opacity,padding] lg:duration-500 lg:group-hover:max-h-40 lg:group-hover:border-t lg:group-hover:pt-4 lg:group-hover:opacity-100 lg:group-focus-within:max-h-40 lg:group-focus-within:opacity-100">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" />{p}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
