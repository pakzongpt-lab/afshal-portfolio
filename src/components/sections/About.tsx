"use client";
import { animate, AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FadeUp, ScrollText, SectionLabel } from "../Reveal";
import Logo from "../ui/Logo";
import { sectors } from "@/data/site";
import { collage } from "@/data/v2";

// Only figures Afshal has stated or that are verifiable.
const stats = [
  { value: 5, suffix: "+", label: "Years in brand & marketing" },
  { value: 6, suffix: "", label: "Industries" },
  { value: 9, suffix: "", label: "Websites shipped" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.23, 1, 0.32, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{v}{suffix}</span>;
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-40">
      <SectionLabel>A note from me</SectionLabel>
      <ScrollText
        className="mt-10 max-w-6xl text-[clamp(1.75rem,4.2vw,4rem)] font-medium leading-[1.06] tracking-[-0.03em]"
        text="I don't just make designs or websites. I build the systems that make a business grow — the brand people remember, the website that sells while you sleep, the content that stops the scroll, and the automations that never forget to follow up."
      />
      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
        <FadeUp className="space-y-6 text-lg leading-relaxed text-mute md:col-span-6 md:text-xl">
          <p>
            I trained as a <span className="text-ink">software engineer</span>, then spent five years in marketing — running brands, social media, campaigns and websites across EV, fashion, IT, e-commerce, retail and corporate businesses.
          </p>
          <p>
            That mix is the point. I can sit with a founder on strategy in the morning, design the identity after lunch, build the website that evening and wire up the AI that answers their customers at midnight.
          </p>
          <p className="text-ink">If you want one person who sees the whole picture and still sweats the details — let&apos;s talk.</p>
          <div className="flex items-center gap-4 pt-2">
            <Logo className="h-10 w-auto opacity-90" />
            <span className="serif text-2xl text-ink">— Afshal</span>
          </div>
        </FadeUp>
        <div className="space-y-8 md:col-span-5 md:col-start-8">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.06} className="bg-bg p-5 md:p-7">
                <div className="display text-5xl md:text-6xl"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="mt-2 text-xs text-mute md:text-sm">{s.label}</div>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <div className="label mb-4">Industries</div>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => <span key={s} className="rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 hover:border-accent hover:text-accent">{s}</span>)}
            </div>
          </FadeUp>
        </div>
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
    <section id="life" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>Behind the brand</SectionLabel>
          <h2 className="display mt-6 text-[12vw] md:text-[6vw]">On set, <span className="serif font-normal text-accent">off script</span>.</h2>
        </div>
        <p className="max-w-sm text-mute">Shoots, studios, client days and the occasional road trip. Tap any photo.</p>
      </div>
      <div className="mt-14 columns-2 gap-4 md:columns-4 [&>*]:mb-4">
        {collage.map((c, i) => (
          <motion.button
            key={c.src}
            onClick={() => setOpen(i)}
            data-cursor="Open"
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-[22px] border border-white/10 bg-bg-2"
            initial={reduce ? false : { opacity: 0, y: 60, rotate: tilt[i] }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: (i % 4) * 0.08 }}
            whileHover={reduce ? undefined : { rotate: tilt[i] / 2, scale: 1.02 }}
          >
            <img src={c.src} alt={c.alt} loading="lazy" className={`w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-105 ${c.span === "wide" ? "aspect-[4/3]" : "aspect-[3/4]"}`} />
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
