"use client";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Magnetic from "../Magnetic";
import SocialIcon from "../SocialIcon";
import Icon from "../ui/Icon";
import { ContactButton } from "../ui/ContactModal";
import { INTRO_EVENT } from "../Loader";
import { brandIcons } from "../brandIcons";
import { rotating, socials } from "@/data/site";
import { heroStats, remoteCountries } from "@/data/v2";

const EASE = [0.23, 1, 0.32, 1] as const;

function useIntro() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.__introDone) { setDone(true); return; }
    const on = () => setDone(true);
    addEventListener(INTRO_EVENT, on);
    return () => removeEventListener(INTRO_EVENT, on);
  }, []);
  return done;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=/<>";

/** Cycles through what I do, decoding each phrase with a quick text scramble. */
function Rotator() {
  const [i, setI] = useState(0);
  const [text, setText] = useState(rotating[0]);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2600);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const target = rotating[i];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(target); return; }
    let frame = 0;
    const total = 18;
    const id = setInterval(() => {
      frame++;
      const done = Math.floor((frame / total) * target.length);
      setText(target.split("").map((c, k) => (k < done || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""));
      if (frame >= total) { clearInterval(id); setText(target); }
    }, 34);
    return () => clearInterval(id);
  }, [i]);
  return <span className="serif whitespace-nowrap text-accent" aria-live="off">{text}</span>;
}

/** Counts up once when the hero appears. */
function Count({ to, suffix, go }: { to: number; suffix: string; go: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, to]);
  return <span className="tabular-nums">{v}{suffix}</span>;
}

/** A small card with bars and a trend line that grow on load and keep breathing. */
function GrowthCard({ show }: { show: boolean }) {
  const bars = [28, 40, 34, 52, 61, 58, 76, 88];
  return (
    <div className="w-56 rounded-2xl border border-white/10 bg-[#0d0f18]/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="label text-[10px]">Brand growth</span>
        <span className="flex items-center gap-1 text-[11px] text-emerald-400"><Icon name="TrendingUp" className="h-3.5 w-3.5" /> rising</span>
      </div>
      <div className="relative mt-3 flex h-24 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span key={i} className="flex-1 origin-bottom rounded-t-[3px] bg-gradient-to-t from-accent/30 to-accent"
            style={{ height: `${h}%` }}
            initial={{ scaleY: 0 }} animate={show ? { scaleY: [0, 1, 0.92, 1] } : {}}
            transition={{ duration: 1.6, delay: 0.6 + i * 0.08, ease: EASE, times: [0, 0.6, 0.8, 1] }} />
        ))}
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <motion.path d="M2 80 L15 66 L28 70 L41 52 L54 42 L67 46 L80 26 L96 10" fill="none" stroke="#fff" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={show ? { pathLength: 1 } : {}} transition={{ duration: 1.8, delay: 1, ease: EASE }} />
        </svg>
      </div>
    </div>
  );
}

const floaters = [
  { icon: "Megaphone", x: "-9%", y: "6%", d: 26 },
  { icon: "Bot", x: "91%", y: "58%", d: 40 },
  { icon: "Search", x: "93%", y: "30%", d: 30 },
  { icon: "Globe", x: "-8%", y: "38%", d: 46 },
];

export default function Hero() {
  const ready = useIntro();
  const reduce = useReducedMotion();
  const show = ready || !!reduce;
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set(e.clientX / innerWidth - 0.5);
    my.set(e.clientY / innerHeight - 0.5);
  };

  const lineA = ["I", "don't", "just", "market", "brands."];
  const lineB = ["I", "build", "growth", "machines."];

  return (
    <section ref={ref} id="top" onPointerMove={onMove} className="relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-10%] h-[80vh] w-[80vh]" style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.16), transparent)" }} />
        <div className="absolute bottom-[-25%] left-[-15%] h-[70vh] w-[70vh]" style={{ background: "radial-gradient(closest-side, rgba(141,107,255,.13), transparent)" }} />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_60%_40%,black,transparent_72%)]" />
      </div>

      <div className="relative grid items-center gap-12 md:grid-cols-12 md:gap-8">
        {/* copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 order-2 md:order-1 md:col-span-7">
          <h1 className="display text-[13.5vw] leading-[0.92] md:text-[6.4vw]">
            <span className="sr-only">Afshal Amir — I don&apos;t just market brands. I build growth machines.</span>
            {[lineA, lineB].map((line, li) => (
              <span key={li} aria-hidden className={`block ${li === 1 ? "mt-1" : ""}`}>
                {line.map((w, wi) => (
                  <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-bottom">
                    <motion.span className={`inline-block ${li === 1 && (w === "growth" || w === "machines.") ? "text-gradient" : ""} ${li === 0 ? "text-white/55" : ""}`}
                      initial={{ y: "110%", rotate: 4 }} animate={show ? { y: "0%", rotate: 0 } : {}}
                      transition={{ duration: 1, ease: EASE, delay: 0.1 + li * 0.25 + wi * 0.06 }}>
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p className="mt-7 max-w-xl text-lg leading-relaxed text-mute md:text-xl" initial={{ opacity: 0, y: 16 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.8 }}>
            I&apos;m <span className="text-ink">Afshal Amir</span> — marketer, software engineer and Marketing Director at Star X Marketing. Brand, website, content, ads and AI automation, built as one system that brings in customers.
          </motion.p>
          <motion.p className="mt-3 text-base text-mute" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 1 }}>
            Right now: <Rotator />
          </motion.p>

          <motion.dl className="mt-8 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10" initial={{ opacity: 0, y: 16 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.95 }}>
            {heroStats.map((st) => (
              <div key={st.label} className="bg-bg/90 px-4 py-4 backdrop-blur md:px-5">
                <dt className="sr-only">{st.label}</dt>
                <dd className="display text-3xl leading-none md:text-4xl"><Count to={st.value} suffix={st.suffix} go={show} /></dd>
                <dd className="mt-1.5 text-[11px] leading-tight text-mute md:text-xs">{st.label}</dd>
              </div>
            ))}
          </motion.dl>
          <motion.div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-mute" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}>
            <Icon name="MapPin" className="h-3.5 w-3.5 text-accent" /> Remote work with companies in
            {remoteCountries.map((c, k) => (
              <motion.span key={c} className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-ink" initial={{ opacity: 0, y: 8 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.2 + k * 0.08, ease: EASE }}>{c}</motion.span>
            ))}
          </motion.div>

          <motion.div className="mt-8 flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 16 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 1 }}>
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-medium text-bg transition-transform duration-150 active:scale-[0.97]">
                Explore my work
                <span className="grid h-6 w-6 place-items-center rounded-full bg-bg text-ink transition-transform duration-300 group-hover:rotate-45"><Icon name="ArrowUpRight" className="h-3.5 w-3.5" /></span>
              </a>
            </Magnetic>
            <Magnetic>
              <ContactButton className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-medium transition-[transform,border-color,background-color] duration-200 hover:border-accent hover:bg-accent/10 active:scale-[0.97]">
                Let&apos;s work together
              </ContactButton>
            </Magnetic>
          </motion.div>

          <motion.div className="mt-10 flex items-center gap-2.5" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
            {socials.filter((s) => s.url).map((s, i) => (
              <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/30"
                style={{ animation: reduce ? undefined : `bob ${5 + i}s ease-in-out ${i * 0.4}s infinite` }}>
                <SocialIcon name={s.key} className="h-[18px] w-[18px]" color={brandIcons[s.key]?.hex} />
              </a>
            ))}
            <span className="label ml-2 hidden sm:inline">Lahore · working worldwide</span>
          </motion.div>
        </motion.div>

        {/* the one hero image */}
        <div className="relative order-1 mx-auto w-[78%] max-w-[480px] md:order-2 md:col-span-5 md:w-full">
          <motion.div style={{ y: photoY }} className="relative">
            <motion.div
              className="group/hero relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-[#050505] shadow-[0_40px_120px_rgba(77,141,255,.18)]"
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 32px)" }}
              animate={show ? { clipPath: "inset(0% 0% 0% 0% round 32px)" } : {}}
              transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
            >
              <motion.img src="/img/me-suit.webp" alt="Muhammad Afshal Amir in a black suit" fetchPriority="high"
                className="h-full w-full object-cover object-top grayscale transition-[filter] duration-700 ease-out group-hover/hero:grayscale-0" initial={reduce ? false : { scale: 1.25 }} animate={show ? { scale: 1 } : {}} transition={{ duration: 1.8, ease: EASE, delay: 0.15 }} />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs backdrop-blur">Muhammad Afshal Amir · Hover for colour</span>
                
              </div>
            </motion.div>

            {/* floating growth chart */}
            <motion.div className="absolute -left-10 bottom-[12%] hidden sm:block md:-left-24" style={{ x: useTransform(sx, (v) => v * -30), y: useTransform(sy, (v) => v * -30) }}
              initial={{ opacity: 0, x: -20 }} animate={show ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.9 }}>
              <div style={{ animation: reduce ? undefined : "bob 6s ease-in-out infinite" }}><GrowthCard show={show} /></div>
            </motion.div>

            {/* automation status pill */}
            <motion.div className="absolute -right-4 top-[10%] md:-right-12" initial={{ opacity: 0, y: 10 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.2, duration: 0.8 }}>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0f18]/85 px-4 py-2.5 text-xs shadow-xl backdrop-blur-md" style={{ animation: reduce ? undefined : "bob 7s ease-in-out 1s infinite" }}>
                <Icon name="Workflow" className="h-4 w-4 text-accent" /> AI workflow running
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              </div>
            </motion.div>

            {/* floating marketing icons */}
            {floaters.map((f, i) => (
              <FloatIcon key={f.icon} f={f} i={i} sx={sx} sy={sy} show={show} reduce={!!reduce} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type MV = ReturnType<typeof useSpring>;
function FloatIcon({ f, i, sx, sy, show, reduce }: { f: (typeof floaters)[number]; i: number; sx: MV; sy: MV; show: boolean; reduce: boolean }) {
  const x = useTransform(sx, (v) => v * -f.d);
  const y = useTransform(sy, (v) => v * -f.d);
  return (
    <motion.div aria-hidden className="absolute hidden md:block" style={{ left: f.x, top: f.y, x, y }}
      initial={{ opacity: 0, scale: 0.6 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: EASE, delay: 1.1 + i * 0.1 }}>
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-ink shadow-[0_10px_30px_rgba(0,0,0,.4)] backdrop-blur-md"
        style={{ animation: reduce ? undefined : `bob ${5 + (i % 3)}s ease-in-out ${i * 0.5}s infinite` }}>
        <Icon name={f.icon} className="h-5 w-5" />
      </div>
    </motion.div>
  );
}
