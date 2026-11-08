"use client";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FadeUp, SectionLabel, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import { contentSteps, formats, method } from "@/data/v2";

function HookDemo() {
  const [strong, setStrong] = useState(true);
  return (
    <div className="rounded-[26px] border border-white/10 bg-bg-2 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="label">The first second</div>
        <div role="tablist" className="flex gap-1 rounded-full border border-line p-1 text-sm">
          {[false, true].map((v) => (
            <button key={String(v)} role="tab" aria-selected={strong === v} onClick={() => setStrong(v)} className={`relative rounded-full px-4 py-1.5 transition-colors ${strong === v ? "text-bg" : "text-mute"}`}>
              {strong === v && <motion.span layoutId="hook-pill" className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative">{v ? "Strong hook" : "Weak hook"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-6 grid min-h-[13rem] place-items-center overflow-hidden rounded-2xl bg-black p-6">
        <AnimatePresence mode="wait">
          {strong ? (
            <motion.div key="s" className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="display text-4xl md:text-5xl">
                {"GROWTH ISN'T".split(" ").map((w, i) => (
                  <motion.span key={i} className="mr-3 inline-block" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 18, delay: i * 0.12 }}>{w}</motion.span>
                ))}
              </div>
              <motion.div className="display relative mt-2 inline-block text-4xl text-[#ffd600] md:text-5xl" initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.35 }}>
                ADDED.
                <motion.span className="absolute left-[-4%] top-1/2 h-1.5 w-[108%] origin-left bg-white" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.4 }} />
              </motion.div>
              <p className="mt-4 text-sm text-mute">Pattern break + tension. Thumbs stop.</p>
            </motion.div>
          ) : (
            <motion.div key="w" className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-lg text-white/60">Hello everyone, today we will talk about our marketing services…</div>
              <p className="mt-4 text-sm text-mute">No tension, no reason to stay. Scrolled past in 0.4 seconds.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <ol className="mt-12 grid gap-3 md:grid-cols-3">
        {contentSteps.map((s, i) => <StepCard key={s.title} s={s} i={i} />)}
      </ol>
    );
  }
  return (
    <>
      {/* desktop: horizontal scroll pinned to the viewport */}
      <div ref={ref} className="relative mt-12 hidden h-[260vh] md:block">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="mb-8 flex items-center gap-4">
            <span className="label">Idea</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"><motion.div style={{ width: bar }} className="h-full bg-gradient-to-r from-accent to-violet" /></div>
            <span className="label">Reality</span>
          </div>
          <motion.ol style={{ x }} className="flex w-max gap-4">
            {contentSteps.map((s, i) => <StepCard key={s.title} s={s} i={i} wide />)}
          </motion.ol>
        </div>
      </div>
      {/* mobile: simple stack */}
      <ol className="mt-12 grid gap-3 md:hidden">
        {contentSteps.map((s, i) => <StepCard key={s.title} s={s} i={i} />)}
      </ol>
    </>
  );
}

function StepCard({ s, i, wide = false }: { s: (typeof contentSteps)[number]; i: number; wide?: boolean }) {
  return (
    <li className={`group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-line bg-bg-2 p-6 transition-colors duration-500 hover:border-accent/50 ${wide ? "h-[22rem] w-[22rem] shrink-0" : "min-h-[11rem]"}`}>
      <div className="flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"><Icon name={s.icon} className="h-7 w-7" /></span>
        <span className="label">Stage {i + 1}</span>
      </div>
      <div>
        <h3 className="display text-3xl">{s.title}</h3>
        <p className="mt-2 text-mute">{s.text}</p>
      </div>
    </li>
  );
}

function FormatCard({ f, i }: { f: (typeof formats)[number]; i: number }) {
  const vid = useRef<HTMLVideoElement>(null);
  return (
    <FadeUp delay={i * 0.06}>
      <div className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white"
        onMouseEnter={() => vid.current?.play().catch(() => {})} onMouseLeave={() => vid.current?.pause()}>
        {f.video ? (
          <video ref={vid} src={f.video} poster={f.src} muted loop playsInline preload="none" className="aspect-[4/5] w-full object-cover" aria-label={`${f.title} example`} />
        ) : (
          <img src={f.src} alt={`${f.title} example from Afshal's work`} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-3 py-1.5 text-xs text-white backdrop-blur">{f.title}</span>
      </div>
    </FadeUp>
  );
}

export function ContentEngine() {
  return (
    <section id="content" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel>Content creation</SectionLabel>
          <SplitLines className="display mt-8 text-[11vw] md:text-[6vw]" lines={["From idea", <span key="r">to <span className="serif font-normal text-accent">reality</span>.</span>]} />
        </div>
        <p className="self-end text-lg text-mute md:col-span-5">Great content isn&apos;t luck. It&apos;s a process — and it starts with a hook strong enough to earn the next second of attention.</p>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7"><HookDemo /></div>
        <FadeUp className="md:col-span-5">
          <div className="h-full rounded-[26px] border border-line p-6 md:p-8">
            <div className="label">One idea, many formats</div>
            <p className="mt-4 text-lg">A single strong idea becomes a post, a carousel, a reel, a 3D product shot, a campaign, an influencer brief and a conversion ad — each cut for its platform.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Post", "Carousel", "Reel", "3D", "Campaign", "Influencer", "Ad"].map((t) => <span key={t} className="rounded-full bg-white/[0.05] px-3 py-1.5 text-sm">{t}</span>)}
            </div>
          </div>
        </FadeUp>
      </div>
      <Pipeline />
      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {formats.map((f, i) => <FormatCard key={f.title} f={f} i={i} />)}
      </div>
    </section>
  );
}

export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % method.length), 1800);
    return () => clearInterval(t);
  }, [inView, reduce]);

  return (
    <section id="method" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="text-center">
        <div className="flex justify-center"><SectionLabel>How I work</SectionLabel></div>
        <SplitLines className="display mt-6 text-[11vw] md:text-[5.6vw]" lines={["Research. Build. Automate.", <span key="l">Launch. <span className="serif font-normal text-accent">Learn</span>.</span>]} />
      </div>
      <div ref={ref} className="relative mt-16 grid gap-3 md:grid-cols-5">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-[52px] hidden h-px bg-line md:block" />
        <motion.div aria-hidden className="absolute left-[10%] top-[52px] hidden h-px bg-gradient-to-r from-accent to-violet md:block" animate={{ width: `${(active / (method.length - 1)) * 80}%` }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} />
        {method.map((m, i) => (
          <button key={m.title} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="relative flex flex-col items-center rounded-[24px] p-4 text-center">
            <motion.span className={`relative grid h-[104px] w-[104px] place-items-center rounded-[30px] border transition-colors duration-500 ${i <= active ? "border-accent/60 bg-accent/10 text-accent" : "border-line bg-bg-2 text-mute"}`}
              animate={i === active && !reduce ? { y: [0, -8, 0] } : { y: 0 }} transition={{ duration: 1.2, repeat: i === active ? Infinity : 0 }}>
              <Icon name={m.icon} className="h-10 w-10" />
              {i === active && <span className="absolute inset-0 animate-ping rounded-[30px] border border-accent/40 [animation-duration:2s]" />}
            </motion.span>
            <h3 className="display mt-6 text-3xl">{m.title}</h3>
            <p className="mt-2 max-w-[16rem] text-sm text-mute">{m.text}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
