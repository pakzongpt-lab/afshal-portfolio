"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionLabel, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import { moreSites, websites, type Site } from "@/data/v2";

const EASE = [0.23, 1, 0.32, 1] as const;

/** A screenshot that slowly scrolls top-to-bottom inside its frame, like someone browsing. */
function Scroller({ src, alt, speed }: { src: string; alt: string; speed: number }) {
  return (
    <div className="scroll-frame relative h-full w-full overflow-hidden bg-white [container-type:size]">
      <img src={src} alt={alt} loading="lazy" className="scroll-shot absolute left-0 top-0 w-full" style={{ animationDuration: `${speed}s` }} />
    </div>
  );
}

function Browser({ s }: { s: Site }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#16161c] shadow-[0_40px_120px_rgba(0,0,0,.6)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" /></div>
        <div className="mx-auto flex min-w-0 max-w-sm flex-1 items-center justify-center gap-2 truncate rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs text-mute">
          <span className="text-emerald-400">●</span> https://{s.domain}
        </div>
      </div>
      <div className="aspect-[16/10]">
        {s.desktop ? (
          <Scroller src={s.desktop} alt={`${s.name} home page on desktop`} speed={18} />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,212,0,.25),transparent_60%),#0d0d14] p-8 text-center">
            <span className="label">Live site</span>
            <span className="display text-[8vw] leading-none md:text-6xl">{s.domain}</span>
            <span className="text-sm text-mute">{s.type}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Phone({ s }: { s: Site }) {
  if (!s.mobile) return null;
  return (
    <div className="w-[150px] overflow-hidden rounded-[28px] border-[5px] border-[#222228] bg-black shadow-[0_30px_80px_rgba(0,0,0,.7)] md:w-[190px]">
      <div className="relative aspect-[9/19]">
        <div aria-hidden className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <Scroller src={s.mobile} alt={`${s.name} home page on mobile`} speed={16} />
      </div>
    </div>
  );
}

export default function Websites() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const reduce = useReducedMotion();
  const s = websites[i];

  useEffect(() => {
    if (hold || reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % websites.length), 9000);
    return () => clearTimeout(t);
  }, [i, hold, reduce]);

  return (
    <section id="websites" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel>Website development</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[6.6vw]" lines={["Websites I've built"]} />
        </div>
        <p className="self-end text-lg leading-relaxed text-mute md:col-span-4">Real home pages, on desktop and mobile.</p>
      </div>

      <div className="relative mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" aria-label="Websites">
        {websites.map((w, k) => (
          <button key={w.domain} role="tab" aria-selected={k === i} onClick={() => { setI(k); setHold(true); }}
            className={`relative shrink-0 rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 ${k === i ? "border-transparent text-bg" : "border-line text-mute hover:border-white/30 hover:text-ink"}`}>
            {k === i && <motion.span layoutId="site-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{w.name}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-8 grid items-center gap-10 md:grid-cols-12" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
        <div className="md:col-span-4" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={s.domain} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }}>
              <div className="label">{s.type}</div>
              <h3 className="display mt-4 text-5xl md:text-6xl">{s.name}</h3>
              <div className="mt-6 flex flex-wrap gap-2">{s.stack.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/80">{t}</span>)}</div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-mute">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5"><Icon name="Monitor" className="h-3.5 w-3.5" /> Desktop</span>
                {s.mobile && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5"><Icon name="Smartphone" className="h-3.5 w-3.5" /> Mobile</span>}
              </div>
              <a href={`https://${s.domain}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-transform active:scale-[0.97]">
                Visit {s.domain} <Icon name="ArrowUpRight" className="h-4 w-4" />
              </a>
              {s.slug && (
                <a href={`/work/${s.slug}`} className="ml-2 mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white/5">
                  Case study <Icon name="ArrowRight" className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div key={s.domain} className="relative pb-10 pr-6 md:pr-16"
              initial={{ opacity: 0, y: 40, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: EASE }} style={{ transformPerspective: 1600 }}>
              <Browser s={s} />
              <motion.div className="absolute bottom-0 right-0" initial={{ opacity: 0, y: 40, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
                <Phone s={s} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {!hold && !reduce && (
            <div aria-hidden className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/10">
              <motion.div key={i} className="h-full bg-accent" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 9, ease: "linear" }} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-2">
        <span className="label mr-2">And more</span>
        {moreSites.map((m) => <a key={m.slug} href={`/work/${m.slug}`} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-mute transition-colors hover:border-white/30 hover:text-ink">{m.name}</a>)}
        <span className="rounded-full border border-dashed border-white/20 px-3.5 py-1.5 text-sm text-mute">50+ in total</span>
      </div>
    </section>
  );
}
