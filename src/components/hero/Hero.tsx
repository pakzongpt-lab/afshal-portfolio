"use client";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Magnetic from "../Magnetic";
import SocialIcon from "../SocialIcon";
import { INTRO_EVENT } from "../Loader";
import { brandIcons } from "../brandIcons";
import { profile, rotating, socials } from "@/data/site";

const Scene = dynamic(() => import("./Scene"), { ssr: false });
const EASE = [0.23, 1, 0.32, 1] as const;

// Where each floating social chip sits around the 3D object (% of the hero) and how far it drifts with the pointer.
const orbit = [
  { x: 48, y: 14, d: 40 }, { x: 60, y: 26, d: 70 }, { x: 71, y: 11, d: 30 }, { x: 82, y: 23, d: 60 },
  { x: 92, y: 12, d: 45 }, { x: 90, y: 38, d: 80 }, { x: 80, y: 60, d: 25 },
];

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

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={rotating[i]}
          className="serif inline-block whitespace-nowrap text-accent"
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {rotating[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" }).format(new Date()));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

export default function Hero() {
  const ready = useIntro();
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [canvas, setCanvas] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const m = matchMedia("(max-width: 767px)").matches;
    setMobile(m);
    // Mount the WebGL scene once the browser is idle so it never blocks the first paint.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const go = () => setCanvas(true);
    if (w.requestIdleCallback) w.requestIdleCallback(go); else setTimeout(go, 300);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set(e.clientX / innerWidth - 0.5);
    my.set(e.clientY / innerHeight - 0.5);
  };

  const show = ready || !!reduce;
  const name = ["AFSHAL", "AMIR"];

  return (
    <section ref={ref} id="top" onPointerMove={onMove} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pb-10">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[70vh] w-[70vh] -translate-x-1/2 md:left-[72%]" style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.13), transparent)" }} />
        <div className="absolute bottom-[-30%] left-[-10%] h-[60vh] w-[60vh]" style={{ background: "radial-gradient(closest-side, rgba(141,107,255,.13), transparent)" }} />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
      </div>

      {/* 3D object */}
      <motion.div
        aria-hidden
        style={{ y: sceneY, scale: sceneScale, opacity: fade }}
        className="absolute inset-x-0 top-[8%] h-[62vh] md:left-[38%] md:top-0 md:h-full"
      >
        <motion.div className="h-full w-full" initial={{ opacity: 0, scale: 0.9 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}>
          {canvas ? <Scene mobile={mobile} /> : <div className="mx-auto mt-[20%] h-64 w-64 rounded-full bg-[radial-gradient(circle_at_35%_30%,#3a4a8a,#12142a_60%,transparent_70%)] md:mt-[25vh] md:h-96 md:w-96" />}
        </motion.div>
      </motion.div>

      {/* floating social icons */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {socials.map((s, i) => {
          const o = orbit[i % orbit.length];
          return (
            <FloatingChip key={s.key} s={s} o={o} i={i} sx={sx} sy={sy} show={show} />
          );
        })}
      </div>

      {/* copy */}
      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
        <motion.div className="label mb-6 flex flex-wrap items-center gap-x-4 gap-y-2" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
          <span>Software Engineer</span><span className="text-dim">/</span>
          <span>Marketer</span><span className="text-dim">/</span>
          <span>Designer</span><span className="text-dim">/</span>
          <span>Technologist</span>
        </motion.div>

        <h1 aria-label={profile.name} className="display text-[19vw] text-ink md:text-[15.5vw] lg:text-[13.5vw]">
          {name.map((w, wi) => (
            <span key={w} className="block overflow-hidden">
              <span className="flex">
                {w.split("").map((c, ci) => (
                  <motion.span
                    key={ci}
                    aria-hidden
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={show ? { y: "0%" } : {}}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.05 + wi * 0.12 + ci * 0.035 }}
                  >
                    {c}
                  </motion.span>
                ))}
                {wi === 1 && (
                  <motion.span aria-hidden className="ml-[0.06em] inline-block text-accent" initial={{ scale: 0 }} animate={show ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.9 }}>.</motion.span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-xl text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.15] tracking-tight text-ink/90 md:col-span-6"
            initial={{ opacity: 0, y: 20 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            Where technology meets <span className="serif">creativity</span>. And strategy turns into <span className="serif">execution</span>.
            <span className="mt-3 block text-base text-mute md:text-lg">
              Currently building with <Rotator />
            </span>
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end" initial={{ opacity: 0, y: 20 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.85 }}>
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-medium text-bg transition-transform duration-150 active:scale-[0.97]">
                Explore my work
                <span className="grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-bg text-ink">
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-medium transition-[transform,border-color,background-color] duration-200 hover:border-accent hover:bg-accent/10 active:scale-[0.97]">
                Let&apos;s work together
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* social icons for small screens, floating in a row */}
        <motion.div className="mt-8 flex flex-wrap gap-2.5 md:hidden" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 0.8 }}>
          {socials.map((s, i) => {
            const chip = (
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md" style={{ animation: `bob ${4 + (i % 3)}s ease-in-out ${i * 0.3}s infinite` }}>
                <SocialIcon name={s.key} className="h-[18px] w-[18px]" color={brandIcons[s.key]?.hex} />
              </span>
            );
            return s.url ? <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{chip}</a> : <span key={s.key} aria-hidden>{chip}</span>;
          })}
        </motion.div>

        <motion.div className="label mt-10 flex items-center justify-between border-t border-line pt-5" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 1.1, duration: 0.8 }}>
          <span>{profile.location} · <Clock /> PKT</span>
          <span className="flex items-center gap-2">Scroll <span className="block h-6 w-px animate-pulse bg-white/40" /></span>
        </motion.div>
      </motion.div>
    </section>
  );
}

type MV = ReturnType<typeof useSpring>;
function FloatingChip({ s, o, i, sx, sy, show }: { s: (typeof socials)[number]; o: { x: number; y: number; d: number }; i: number; sx: MV; sy: MV; show: boolean }) {
  const x = useTransform(sx, (v) => v * -o.d);
  const y = useTransform(sy, (v) => v * -o.d);
  const color = brandIcons[s.key]?.hex;
  const inner = (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_30px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-md transition-[transform,border-color] duration-300 hover:scale-110 hover:border-white/30">
      <SocialIcon name={s.key} className="h-5 w-5" color={color} />
    </span>
  );
  return (
    <motion.div className="absolute" style={{ left: `${o.x}%`, top: `${o.y}%`, x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 1 + i * 0.08 }}
        style={{ animation: `bob ${5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite` }}
      >
        {s.url ? (
          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="pointer-events-auto block">{inner}</a>
        ) : (
          <span aria-hidden className="block">{inner}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
