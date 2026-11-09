"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Icon from "./ui/Icon";

/** Floating "Test your website" button, bottom-left. Hides while the checker is on screen. */
export default function TestSiteFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const targets = ["website-check", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const near = new Set<Element>();
    const io = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target))); update(); }, { rootMargin: "0px 0px -20% 0px" });
    const update = () => setShow(scrollY > innerHeight * 0.8 && near.size === 0);
    targets.forEach((t) => io.observe(t));
    addEventListener("scroll", update, { passive: true });
    update();
    return () => { io.disconnect(); removeEventListener("scroll", update); };
  }, []);

  const go = () => {
    const el = document.getElementById("website-check");
    if (!el) { location.href = "/#website-check"; return; }
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => (document.getElementById("site-url") as HTMLInputElement | null)?.focus({ preventScroll: true }), 1500);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={go}
          aria-label="Test your website for free"
          className="fixed bottom-[5.25rem] right-5 z-[60] inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#1a1a1a] p-1.5 text-sm md:bottom-[6.75rem] md:right-7 md:pr-4 font-medium text-ink shadow-[0_14px_40px_rgba(0,0,0,.5)] "
          initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-accent text-[#111]">
            <Icon name="Gauge" className="h-5 w-5" />
          </span>
          <span className="hidden md:inline">Test your website</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
