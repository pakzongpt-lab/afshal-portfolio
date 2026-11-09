"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { FadeUp, SectionLabel, SplitLines } from "../Reveal";
import { creative, type Work } from "@/data/site";

export default function Creative() {
  const [tab, setTab] = useState(creative[1].key);
  const [open, setOpen] = useState<Work | null>(null);
  const reduce = useReducedMotion();
  const items = creative.find((c) => c.key === tab)!.items;

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", k);
    return () => { removeEventListener("keydown", k); window.__lenis?.start(); };
  }, [open]);

  return (
    <section id="creative" className="relative px-5 py-14 md:px-10 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel index="04">Creative portfolio</SectionLabel>
          <SplitLines className="display mt-8 text-[13vw] md:text-[7.5vw]" lines={["Design work"]} />
        </div>
        <p className="self-end text-lg leading-relaxed text-mute md:col-span-4">
          Logos, identities, social campaigns, packaging, billboards and interfaces — all from my own portfolio.
        </p>
      </div>

      <div role="tablist" aria-label="Creative categories" className="mt-14 flex gap-1 overflow-x-auto rounded-full border border-line p-1 [scrollbar-width:none] md:w-max">
        {creative.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={tab === c.key}
            onClick={() => setTab(c.key)}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${tab === c.key ? "text-bg" : "text-mute hover:text-ink"}`}
          >
            {tab === c.key && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((w, i) => (
            <motion.button
              key={tab + w.src}
              onClick={() => setOpen(w)}
              data-cursor="Open"
              layout
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-[22px] border border-line bg-white text-left ${items.length === 1 || (items.length % 2 === 1 && i === 0) ? "md:col-span-2" : ""}`}
            >
              <img src={w.src} alt={w.alt} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.04]" />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white backdrop-blur">{w.title}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              src={open.src}
              alt={open.alt}
              className="max-h-full max-w-full rounded-xl object-contain"
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            />
            <button autoFocus onClick={() => setOpen(null)} className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm">Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
