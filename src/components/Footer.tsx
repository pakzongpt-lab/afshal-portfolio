"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile, socials } from "@/data/site";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["40%", "0%"]);
  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line px-5 pt-14 md:px-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div className="space-y-2">
          <div className="label">Muhammad Afshal Amir</div>
          <p className="max-w-sm text-mute">{profile.role} · {profile.sub}</p>
        </div>
        <nav aria-label="Social" className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.filter((s) => s.url).map((s) => (
            <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="label transition-colors hover:text-ink">{s.label}</a>
          ))}
          <button onClick={toTop} className="label transition-colors hover:text-ink">Back to top ↑</button>
        </nav>
      </div>
      <motion.div style={{ y }} aria-hidden className="display mt-12 select-none whitespace-nowrap text-center text-[21.5vw] leading-[0.78] text-white/[0.06]">
        AFSHAL AMIR
      </motion.div>
      <div className="label flex justify-between border-t border-line py-5">
        <span>© 2026 Afshal Amir</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
