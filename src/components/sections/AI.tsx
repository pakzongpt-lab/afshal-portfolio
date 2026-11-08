"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FadeUp, SectionLabel, SplitLines } from "../Reveal";

const steps = [
  { k: "01", t: "Research", d: "Market, audience and competitor research sped up with ChatGPT, Claude and Gemini — then checked by hand." },
  { k: "02", t: "Create", d: "Copy drafts, concepts and visuals. Higgsfield for AI imagery and video, finished in Photoshop and After Effects." },
  { k: "03", t: "Build", d: "Landing pages and prototypes in hours with Lovable and Antigravity, then production builds in WordPress." },
  { k: "04", t: "Automate", d: "Agent tools like Manus AI for repetitive tasks, plus connected workflows that remove copy-paste work." },
  { k: "05", t: "Launch & learn", d: "Campaigns go live on Meta, Google and TikTok. Results feed back into the next round." },
];

const tools = ["ChatGPT", "Claude", "Gemini", "Manus AI", "Higgsfield", "Antigravity", "Lovable"];

export default function AI() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <section id="ai" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.09), transparent)" }} />
      <div className="relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel index="05">AI & Automation</SectionLabel>
          <SplitLines className="display mt-8 text-[13vw] md:text-[7.5vw]" lines={["AI where it", <span key="a">earns its <span className="serif font-normal text-accent">place</span>.</span>]} />
        </div>
        <p className="self-end text-lg leading-relaxed text-mute md:col-span-4">
          AI is part of how I work every day — for speed, not as a gimmick. Here&apos;s where it fits in a project, from first research to live campaign.
        </p>
      </div>

      <div ref={ref} className="relative mt-20 md:mt-28">
        {/* connecting line */}
        <svg aria-hidden className="absolute left-[19px] top-0 h-full w-2 md:left-0 md:top-[38px] md:h-2 md:w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,.1)" strokeWidth="2" vectorEffect="non-scaling-stroke" className="md:hidden" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,.1)" strokeWidth="2" vectorEffect="non-scaling-stroke" className="hidden md:block" />
          <motion.line x1="50" y1="0" x2="50" y2="100" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} className="md:hidden" />
          <motion.line x1="0" y1="50" x2="100" y2="50" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} className="hidden md:block" />
        </svg>
        <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          {steps.map((s, i) => (
            <FadeUp key={s.k} delay={i * 0.08}>
              <li className="flex gap-5 md:block">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/50 bg-bg font-mono text-xs text-accent md:mb-8 md:h-[78px] md:w-[78px] md:text-sm">
                  <span className="absolute inset-0 animate-ping rounded-full border border-accent/30 [animation-duration:3s]" style={{ animationDelay: `${i * 0.6}s` }} />
                  {s.k}
                </span>
                <div>
                  <h3 className="display text-3xl">{s.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mute">{s.d}</p>
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>

      <FadeUp className="mt-20 rounded-[28px] border border-line bg-bg-2/60 p-6 md:mt-28 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="label">AI toolkit</div>
            <p className="mt-3 max-w-md text-mute">The models and builders I use day to day.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <motion.span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm"
                whileHover={reduce ? undefined : { y: -4, borderColor: "rgba(77,141,255,.6)" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
