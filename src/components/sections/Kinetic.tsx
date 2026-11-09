"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { kinetic } from "@/data/v2";

/**
 * Big marketing lines that slide in opposite directions as you scroll,
 * with the middle row lit up. Pure transforms, so it stays smooth.
 */
export function KineticBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["5%", "-35%"]);
  const b = useTransform(scrollYProgress, [0, 1], reduce ? ["-20%", "-20%"] : ["-40%", "0%"]);
  const c = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-30%"]);
  const rows = [kinetic.slice(0, 4), kinetic.slice(3, 8), kinetic.slice(6)];

  return (
    <section ref={ref} aria-label="What good marketing does" className="relative overflow-hidden py-16 md:py-24">
      {[a, b, c].map((x, r) => (
        <motion.div key={r} style={{ x }} className="flex w-max gap-[4vw] whitespace-nowrap py-1">
          {[...rows[r], ...rows[r]].map((w, k) => (
            <span key={k} className={`display text-[13vw] leading-[1] md:text-[8vw] ${r === 1 ? (k % 2 ? "shine" : "text-ink") : "outline-text"}`}>
              {w}<span className="text-accent">.</span>
            </span>
          ))}
        </motion.div>
      ))}
    </section>
  );
}

const steps = ["Attention", "Interest", "Trust", "Action", "Loyalty"];

/** A word-by-word funnel headline that types itself out, step by step. */
export function MarketingLoop() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Digital marketing funnel" className="relative px-5 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <div className="label">Digital marketing, simply</div>
        <h2 className="display mt-6 text-[9vw] leading-[0.95] md:text-[5vw]">
          {"Good marketing turns strangers into".split(" ").map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-bottom">
              <motion.span className="inline-block" initial={reduce ? false : { y: "110%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: i * 0.06 }}>{w}</motion.span>
            </span>
          ))}
          <span className="serif font-normal text-accent">customers.</span>
        </h2>
        <ol className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {steps.map((s, i) => (
            <motion.li key={s} className="flex items-center gap-2 md:gap-3"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15, ease: [0.23, 1, 0.32, 1] }}>
              <span className="relative overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-base md:text-lg">
                <span className="relative z-10">{s}</span>
                {!reduce && <span aria-hidden className="absolute inset-0 -translate-x-full bg-accent/30" style={{ animation: `stepFill 5s ${i * 1}s ease-in-out infinite` }} />}
              </span>
              {i < steps.length - 1 && <span aria-hidden className="text-mute">→</span>}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
