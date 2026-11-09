"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { FadeUp, ScrollText, SectionLabel } from "../Reveal";
import Logo from "../ui/Logo";
import { sectors } from "@/data/site";
import { collage } from "@/data/v2";

export default function About() {
  return (
    <section id="about" className="relative px-5 py-14 md:px-10 md:py-24">
      <SectionLabel>About</SectionLabel>
      <ScrollText
        className="mt-8 max-w-5xl text-[clamp(1.6rem,3.6vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.02em]"
        text="I studied software engineering, then spent five years in marketing. Today I run Star X Marketing, and I still do much of the work myself — the brand, the website, the social content and the ads."
      />
      <div className="mt-10 grid gap-12 md:mt-20 md:grid-cols-12">
        <FadeUp className="space-y-6 text-lg leading-relaxed text-mute md:col-span-6 md:text-xl">
          <p>
            Before Star X, I handled brand and social media for Zaryan&apos;s Business Group, SA Corporation and SIMVAH, and led marketing and creative for Jolta Electric.
          </p>
          <p>
            Because I can code, a client doesn&apos;t need to brief a designer, a developer and an ads person separately. The person who plans the campaign also builds the landing page it points to.
          </p>
          <p>
            <span className="text-ink">How I work:</span> research the audience first, build the brand and the site, automate the repetitive parts, launch, then check the numbers every month and adjust.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Logo className="h-9 w-auto opacity-90" />
            <span className="text-lg text-ink">— Afshal</span>
          </div>
        </FadeUp>
        <FadeUp className="md:col-span-5 md:col-start-8">
          <div className="grid grid-cols-2 gap-3">
            {[{ src: "/img/me-car.webp", alt: "Afshal Amir on the road" }, { src: "/img/me-desk.webp", alt: "Afshal Amir at his desk" }].map((p, i) => (
              <div key={p.src} className={`group overflow-hidden rounded-[20px] bg-bg-2 ${i ? "mt-10" : ""}`}>
                <img src={p.src} alt={p.alt} loading="lazy" width={900} height={1599} className="h-auto w-full grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
              </div>
            ))}
          </div>
          <div className="mb-4 mt-10 text-sm text-mute">Industries I&apos;ve worked in</div>
          <div className="flex flex-wrap gap-2">
            {sectors.map((s) => <span key={s} className="rounded-full border border-line px-4 py-2 text-sm">{s}</span>)}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/** Interactive collage of every other photo; click any to open it large. */
export function Collage() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    window.__lenis?.stop();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % collage.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + collage.length) % collage.length));
    };
    addEventListener("keydown", k);
    return () => { removeEventListener("keydown", k); window.__lenis?.start(); };
  }, [open]);

  const tilt = [-4, 3, -2, 5, -3, 2, -5];
  return (
    <section id="life" className="relative overflow-hidden px-5 py-14 md:px-10 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>Behind the brand</SectionLabel>
          <h2 className="display mt-6 text-[10vw] md:text-[4.6vw]">Behind the scenes</h2>
        </div>
        <p className="max-w-sm text-mute">Me, on the road and with the creators I work with.</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {collage.map((c, i) => (
          <motion.button
            key={c.src}
            aria-label={`Open photo: ${c.alt}`}
            onClick={() => setOpen(i)}
            data-cursor="Open"
            className={`group relative block w-full self-start overflow-hidden rounded-[22px] border border-white/10 bg-bg-2 ${i % 2 ? "md:mt-16" : ""} ${i === collage.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            initial={reduce ? false : { opacity: 0, y: 60, rotate: tilt[i] }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: (i % 4) * 0.08 }}
            whileHover={reduce ? undefined : { rotate: tilt[i] / 2, scale: 1.02 }}
          >
            <img src={c.src} alt={c.alt} loading="lazy" className={`aspect-[3/4] w-full object-cover object-top grayscale transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-105 group-hover:grayscale-0 ${i === collage.length - 1 ? "max-md:aspect-[16/10]" : ""}`} />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div role="dialog" aria-modal="true" aria-label={collage[open].alt} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img key={open} src={collage[open].src} alt={collage[open].alt} className="max-h-[86svh] max-w-full rounded-2xl object-contain" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} />
            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-3" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen((o) => (o! - 1 + collage.length) % collage.length)} className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm">← Prev</button>
              <button onClick={() => setOpen(null)} autoFocus className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm">Close</button>
              <button onClick={() => setOpen((o) => (o! + 1) % collage.length)} className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm">Next →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
