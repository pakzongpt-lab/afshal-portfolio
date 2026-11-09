"use client";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "./Icon";

/**
 * A real slide carousel: the active slide sits in the centre at full size, neighbours
 * shrink and fade either side. Autoplays, pauses on hover/focus, swipes on touch,
 * and has arrows, dots and keyboard support.
 */
export default function Carousel({
  items, slideWidth = 300, gap = 24, autoplay = 2600, label, render, visible = 2,
}: {
  items: unknown[];
  slideWidth?: number;
  gap?: number;
  autoplay?: number;
  label: string;
  visible?: number;
  render: (i: number, active: boolean) => ReactNode;
}) {
  const n = items.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [w, setW] = useState(slideWidth);
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);

  const go = useCallback((d: number) => setIdx((v) => (v + d + n) % n), [n]);

  // Shrink slides on narrow screens so the neighbours still peek in.
  useEffect(() => {
    const fit = () => setW(Math.min(slideWidth, Math.round((box.current?.clientWidth ?? innerWidth) * 0.68)));
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, [slideWidth]);

  useEffect(() => {
    if (paused || reduce || !autoplay) return;
    const t = setInterval(() => go(1), autoplay);
    return () => clearInterval(t);
  }, [paused, reduce, autoplay, go]);

  const offset = (i: number) => {
    let d = i - idx;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <div
      ref={box}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative outline-none"
    >
      <motion.div
        className="relative mx-auto touch-pan-y"
        style={{ height: "var(--slide-h, 22rem)", perspective: 1400 }}
        onPanEnd={(_, info) => { if (Math.abs(info.offset.x) > 40) go(info.offset.x < 0 ? 1 : -1); }}
      >
        {items.map((_, i) => {
          const d = offset(i);
          const show = Math.abs(d) <= visible;
          const active = d === 0;
          return (
            <motion.div
              key={i}
              aria-hidden={!active}
              className="absolute left-1/2 top-1/2"
              style={{ width: w, zIndex: 10 - Math.abs(d), pointerEvents: show ? "auto" : "none" }}
              initial={false}
              animate={{
                x: `calc(-50% + ${d * (w * 0.78 + gap)}px)`,
                y: "-50%",
                scale: active ? 1 : Math.max(0.62, 0.84 - (Math.abs(d) - 1) * 0.12),
                opacity: show ? (active ? 1 : Math.abs(d) === 1 ? 0.85 : 0.5) : 0,
                rotateY: reduce ? 0 : d * -14,
                filter: active ? "blur(0px)" : "blur(1.5px)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.9 }}
              onClick={() => !active && go(d)}
            >
              <div style={{ transformStyle: "preserve-3d" }}>{render(i, active)}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button onClick={() => go(-1)} aria-label="Previous slide" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] transition-[transform,border-color,background-color] duration-200 hover:border-white/40 hover:bg-white/10 active:scale-95">
          <Icon name="ChevronLeft" className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === idx}
              className="group/dot grid h-6 min-w-6 place-items-center">
              <span className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${i === idx ? "w-7 bg-accent" : "w-2 bg-white/25 group-hover/dot:bg-white/50"}`} />
            </button>
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next slide" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] transition-[transform,border-color,background-color] duration-200 hover:border-white/40 hover:bg-white/10 active:scale-95">
          <Icon name="ChevronRight" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
