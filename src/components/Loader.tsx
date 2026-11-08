"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

declare global {
  interface Window { __introDone?: boolean }
}

export const INTRO_EVENT = "intro:done";
const finish = () => { window.__introDone = true; window.dispatchEvent(new Event(INTRO_EVENT)); };

/** Counts to 100, then lifts away. Plays once per session; skipped for reduced motion. */
export default function Loader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("intro") === "1"; } catch {}
    if (reduce || seen) { setShow(false); finish(); return; }
    window.__lenis?.stop();
    const start = performance.now();
    const D = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / D);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setShow(false); try { sessionStorage.setItem("intro", "1"); } catch {} }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => { window.__lenis?.start(); finish(); }}>
      {show && (
        <motion.div
          key="loader"
          aria-hidden
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-[#0a0a0e] p-6 md:p-10"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="label flex justify-between">
            <span>Afshal Amir — Portfolio</span>
            <span>Lahore, PK</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <motion.div className="relative" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}>
              <img src="/brand/logo-white.png" alt="" className="w-[72vw] max-w-[560px]" />
            </motion.div>
            <motion.p className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Marketing · Branding · Web · AI</motion.p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 overflow-hidden bg-white/10">
              <div className="h-full bg-accent" style={{ width: `${n}%` }} />
            </div>
            <span className="display tabular-nums text-[18vw] leading-none md:text-[10vw]">{n}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
