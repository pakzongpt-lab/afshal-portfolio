"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Logo from "./ui/Logo";
import { profile, socials } from "@/data/site";
import { starx } from "@/data/v2";

const links = [["About", "#about"], ["Experience", "#experience"], ["Work", "#work"], ["Star X", "#starx"], ["Growth game", "#growth-game"], ["AI automation", "#ai"], ["Contact", "#contact"]];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["30%", "0%"]);
  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line px-5 pt-16 md:px-10">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-12 w-auto" />
          <p className="mt-5 max-w-sm text-mute">{profile.role} · {profile.sub} · Marketing Director at Star X Marketing.</p>
          <a href={`mailto:${profile.email}`} className="mt-4 inline-block text-ink underline-offset-4 hover:underline">{profile.email}</a>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 md:col-span-3">
          {links.map(([l, h]) => <a key={h} href={h.startsWith("#") ? `/${h}` : h} className="text-mute transition-colors hover:text-ink">{l}</a>)}
          <a href="/docs/afshal-amir-portfolio.pdf" target="_blank" rel="noopener" className="text-mute transition-colors hover:text-ink">Portfolio PDF</a>
        </nav>
        <div className="flex flex-col gap-2 md:col-span-4 md:items-end">
          {socials.filter((s) => s.url).map((s) => <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="label transition-colors hover:text-ink">{s.label}</a>)}
          <a href={starx.instagram} target="_blank" rel="noopener noreferrer" className="label transition-colors hover:text-ink">Star X Marketing</a>
          <button onClick={toTop} className="label mt-2 transition-colors hover:text-ink">Back to top ↑</button>
        </div>
      </div>
      <motion.div style={{ y }} aria-hidden className="mt-14 flex select-none justify-center opacity-[0.07]">
        <img src="/brand/logo-white.png" alt="" className="w-[92vw] max-w-none" />
      </motion.div>
      <div className="label flex flex-wrap justify-between gap-2 border-t border-line py-5">
        <span>© 2026 Muhammad Afshal Amir</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
