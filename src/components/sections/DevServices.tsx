"use client";
import { motion, useReducedMotion } from "motion/react";
import { SectionLabel, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import Marquee from "../ui/Marquee";
import { ContactButton } from "../ui/ContactModal";
import { techIcons } from "../techIcons";
import { devServices, techStack } from "@/data/v2";

export default function DevServices() {
  const reduce = useReducedMotion();
  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="development" className="relative overflow-hidden py-28 md:py-40">
      <div className="grid gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <SectionLabel>Development</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[6.4vw]" lines={["Websites, software", <span key="d">& <span className="serif font-normal text-accent">apps</span>.</span>]} />
        </div>
        <div className="self-end md:col-span-5">
          <p className="text-lg leading-relaxed text-mute">From a one-page launch site to a full SaaS product with a dashboard and mobile app — designed, built and connected to your marketing so it actually brings in business.</p>
          <ContactButton topic="Website / software development" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-transform active:scale-[0.97]">
            Start a build <Icon name="ArrowRight" className="h-4 w-4" />
          </ContactButton>
        </div>
      </div>

      <div className="mt-16 grid gap-3 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {devServices.map((d, i) => (
          <motion.article
            key={d.title}
            onPointerMove={spot}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: (i % 4) * 0.06 }}
            className="group relative overflow-hidden rounded-[24px] border border-line bg-bg-2 p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(360px_circle_at_var(--mx)_var(--my),rgba(77,141,255,.18),transparent_60%)]" />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <Icon name={d.icon} className="h-6 w-6" />
            </span>
            <h3 className="display relative mt-8 text-2xl leading-tight">{d.title}</h3>
            <p className="relative mt-2 text-[15px] leading-snug text-mute">{d.line}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-16">
        <div className="label mb-6 px-5 text-center md:px-10">Languages, frameworks & platforms I build with</div>
        <Marquee speed={40} gap="0.75rem">
          {techStack.map((k) => {
            const t = techIcons[k];
            if (!t) return null;
            const n = parseInt(t.hex.slice(1), 16);
            const lum = 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
            const light = lum < 60; // near-black brand colours would vanish on the dark page
            return (
              <span key={k} className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill={light ? "#ffffff" : t.hex} aria-hidden><path d={t.path} /></svg>
                {t.title}
              </span>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
