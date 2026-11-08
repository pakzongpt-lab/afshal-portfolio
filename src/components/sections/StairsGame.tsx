"use client";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionLabel, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import { ContactButton } from "../ui/ContactModal";
import { stairs } from "@/data/v2";

// Column k (0 = starting ground with the logo, 1..9 = stages). Positions in % of the board.
const N = stairs.length;
const colLeft = (k: number) => 1.5 + k * 9.75;
const colW = 9;
const colH = (k: number) => 6 + k * 8;

function Confetti() {
  const bits = Array.from({ length: 36 }, (_, i) => i);
  const colors = ["#4d8dff", "#8d6bff", "#ffd600", "#2fd06b", "#ffffff"];
  return (
    <div aria-hidden className="pointer-events-none absolute right-[6%] top-[6%] h-0 w-0">
      {bits.map((i) => {
        const a = (i / bits.length) * Math.PI * 2;
        const r = 80 + (i % 5) * 26;
        return (
          <motion.span key={i} className="absolute block h-2 w-1.5 rounded-sm" style={{ background: colors[i % colors.length] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: Math.cos(a) * r, y: Math.sin(a) * r + 60, opacity: 0, rotate: 360 + i * 20 }}
            transition={{ duration: 1.4 + (i % 4) * 0.15, ease: [0.23, 1, 0.32, 1] }} />
        );
      })}
    </div>
  );
}

export default function StairsGame() {
  const reduce = useReducedMotion();
  const board = useRef<HTMLDivElement>(null);
  const inView = useInView(board, { once: true, margin: "-15% 0px" });
  const [pos, setPos] = useState(0); // 0 = ground, 1..N = stage
  const [auto, setAuto] = useState(false);
  const [celebrate, setCelebrate] = useState(0);
  const done = pos === N;

  const go = useCallback((p: number) => {
    const next = Math.max(0, Math.min(N, p));
    setPos(next);
    if (next === N) setCelebrate((c) => c + 1);
  }, []);

  useEffect(() => {
    if (!auto) return;
    if (pos >= N) { setAuto(false); return; }
    const t = setTimeout(() => go(pos + 1), 1300);
    return () => clearTimeout(t);
  }, [auto, pos, go]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") { e.preventDefault(); go(pos + 1); }
    if (e.key === "ArrowDown" || e.key === "ArrowLeft") { e.preventDefault(); go(pos - 1); }
  };

  const stage = pos > 0 ? stairs[pos - 1] : null;
  const goatLeft = `${colLeft(pos) + colW / 2}%`;
  const goatBottom = `${colH(pos)}%`;

  return (
    <section id="growth-game" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/4 h-[60vh]" style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.10), transparent)" }} />
      <div className="relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel>The growth game</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[6.4vw]" lines={["Climb the", <span key="s">marketing <span className="serif font-normal text-accent">stairs</span>.</span>]} />
        </div>
        <p className="self-end text-lg text-mute md:col-span-5">Every brand climbs the same staircase. Where is yours today?</p>
      </div>

      <div className="relative mt-14 grid gap-6 lg:grid-cols-12">
        {/* board */}
        <div
          ref={board}
          tabIndex={0}
          onKeyDown={onKey}
          role="application"
          aria-label={`Marketing stairs game. Current step: ${stage ? stage.title : "Start"}. Use arrow keys to climb.`}
          className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#0c0d16,#07070b)] outline-none focus-visible:ring-2 focus-visible:ring-accent sm:aspect-[16/11] lg:col-span-8"
        >
          <div aria-hidden className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:44px_44px]" />

          {/* growth line following the step tops */}
          <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.polyline
              points={Array.from({ length: N + 1 }, (_, k) => `${colLeft(k) + colW / 2},${100 - colH(k) - 6}`).join(" ")}
              fill="none" stroke="url(#gline)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="1 0"
              animate={{ pathLength: pos / N }} initial={{ pathLength: 0 }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }} />
            <defs><linearGradient id="gline" x1="0" x2="1"><stop offset="0" stopColor="#4d8dff" /><stop offset="1" stopColor="#8d6bff" /></linearGradient></defs>
          </svg>

          {/* columns */}
          {Array.from({ length: N + 1 }, (_, k) => {
            const lit = k <= pos;
            const s = k > 0 ? stairs[k - 1] : null;
            return (
              <motion.button
                key={k}
                type="button"
                onClick={() => go(k)}
                aria-label={s ? `Step ${k}: ${s.title}` : "Start"}
                className="group absolute bottom-0 flex flex-col items-center"
                style={{ left: `${colLeft(k)}%`, width: `${colW}%`, height: `${colH(k)}%` }}
                initial={reduce ? false : { y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: k * 0.07 }}
              >
                <span className={`relative z-[1] -mb-px h-3 w-full rounded-t-md transition-colors duration-500 ${lit ? "bg-accent shadow-[0_0_24px_rgba(77,141,255,.7)]" : "bg-white/15 group-hover:bg-white/30"}`} />
                <span className={`flex w-full flex-1 flex-col items-center justify-start gap-1 rounded-b-sm border-x border-white/5 pt-2 transition-colors duration-500 ${lit ? "bg-gradient-to-b from-accent/30 to-accent/[0.03]" : "bg-gradient-to-b from-white/[0.07] to-transparent group-hover:from-white/[0.12]"}`}>
                  {s ? (
                    <>
                      <span className={`grid h-6 w-6 place-items-center rounded-lg sm:h-8 sm:w-8 ${lit ? "text-white" : "text-white/50"}`}>
                        <Icon name={s.icon} className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      </span>
                      <span className="hidden px-0.5 text-center text-[9px] leading-tight text-white/70 md:block xl:text-[10px]">{s.title}</span>
                    </>
                  ) : (
                    <span className="label text-[8px] sm:text-[9px]">Start</span>
                  )}
                </span>
              </motion.button>
            );
          })}

          {/* climber: the GOAT mark */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-10 -translate-x-1/2"
            animate={{ left: goatLeft, bottom: goatBottom }}
            initial={false}
            transition={reduce ? { duration: 0 } : { left: { duration: 0.55, ease: [0.45, 0, 0.55, 1] }, bottom: { type: "spring", stiffness: 260, damping: 14 } }}
          >
            <motion.img src="/brand/goat-white.png" alt="" className="h-12 w-auto drop-shadow-[0_6px_18px_rgba(77,141,255,.8)] sm:h-16"
              key={pos} initial={reduce ? false : { y: -14, scaleY: 0.9 }} animate={{ y: 0, scaleY: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }} />
          </motion.div>

          {/* summit flag */}
          <div className="absolute right-[3%] top-[3%] flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] backdrop-blur">
            <Icon name="Trophy" className="h-3.5 w-3.5 text-[#ffd600]" /> Summit: complete marketing
          </div>
          {done && <Confetti key={celebrate} />}
        </div>

        {/* panel */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <div className="rounded-[26px] border border-line bg-bg-2 p-6">
            <div className="flex items-center justify-between">
              <span className="label">Growth level</span>
              <span className="display text-2xl tabular-nums">{pos}<span className="text-mute">/{N}</span></span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-accent to-violet" animate={{ width: `${(pos / N) * 100}%` }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} />
            </div>
          </div>

          <div className="relative min-h-[15rem] flex-1 overflow-hidden rounded-[26px] border border-line bg-bg-2 p-6" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={pos} initial={{ opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
                {stage ? (
                  <>
                    <div className="flex items-center gap-3">
                      <motion.span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent" initial={{ rotate: -20, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14 }}>
                        <Icon name={stage.icon} className="h-6 w-6" />
                      </motion.span>
                      <span className="label">Step {pos}</span>
                    </div>
                    <h3 className="display mt-5 text-3xl">{stage.title}</h3>
                    <p className="mt-3 text-mute">{stage.text}</p>
                    {done && (
                      <div className="mt-5">
                        <p className="mb-4 text-ink">You made it to the top. We offer every step — logo to ads — as one complete solution.</p>
                        <ContactButton topic="Complete marketing" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bg">Start my climb <Icon name="ArrowRight" className="h-4 w-4" /></ContactButton>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <img src="/brand/goat-white.png" alt="" className="h-12 w-auto" />
                    <h3 className="display mt-5 text-3xl">Every brand starts at the bottom.</h3>
                    <p className="mt-3 text-mute">Nine steps between an idea and a brand that sells itself. Ready?</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => go(pos + 1)} disabled={done} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-bg transition-[transform,opacity] active:scale-[0.97] disabled:opacity-40">
              <Icon name="ChevronUp" className="h-4 w-4" /> {pos === 0 ? "Start climbing" : done ? "At the summit" : "Climb"}
            </button>
            <button onClick={() => { if (done) go(0); setAuto((a) => !a); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm transition-colors hover:border-white/40">
              <Icon name={auto ? "Pause" : "Play"} className="h-4 w-4" /> {auto ? "Pause" : "Auto-climb"}
            </button>
            <button onClick={() => { setAuto(false); go(0); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm transition-colors hover:border-white/40">
              <Icon name="RotateCcw" className="h-4 w-4" /> Restart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
