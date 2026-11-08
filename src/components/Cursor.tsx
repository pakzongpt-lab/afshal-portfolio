"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Two-part cursor: an exact dot (no lag, so clicking stays precise) and a ring that eases behind it.
 * The ring grows over anything interactive and shows a label for elements with data-cursor="View".
 * It never captures pointer events, and only runs on precise pointers without reduced motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduce) setEnabled(true);
  }, []);

  // Listeners attach only after the cursor elements exist.
  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { x: pos.x, y: pos.y, s: 1 };
    let target = 1;
    let visible = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      if (!visible) { visible = true; r.x = pos.x; r.y = pos.y; dot.current!.style.opacity = "1"; ring.current!.style.opacity = "1"; }
      dot.current!.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [role='button'], [data-cursor], input, textarea, select, label");
      const text = el?.closest("input, textarea, select");
      const l = el?.dataset.cursor ?? "";
      setLabel(l);
      target = text ? 0 : l ? 2.6 : el ? 1.8 : 1;
      ring.current!.dataset.active = el && !text ? "1" : "0";
      dot.current!.style.opacity = text ? "0" : "1";
    };
    const leave = () => { visible = false; dot.current!.style.opacity = "0"; ring.current!.style.opacity = "0"; };
    const down = () => { target *= 0.8; if (!raf) raf = requestAnimationFrame(loop); };
    const up = () => { target /= 0.8; if (!raf) raf = requestAnimationFrame(loop); };

    // Runs only while the ring is still catching up, then sleeps until the pointer moves again.
    const loop = () => {
      r.x += (pos.x - r.x) * 0.18;
      r.y += (pos.y - r.y) * 0.18;
      r.s += (target - r.s) * 0.2;
      ring.current!.style.transform = `translate3d(${r.x}px,${r.y}px,0) translate(-50%,-50%) scale(${r.s})`;
      const settled = Math.abs(pos.x - r.x) < 0.1 && Math.abs(pos.y - r.y) < 0.1 && Math.abs(target - r.s) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(loop);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(loop); };
    addEventListener("pointermove", wake, { passive: true });
    addEventListener("pointerover", wake, { passive: true });
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointermove", wake);
      removeEventListener("pointerover", wake);
      removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-9 w-9 items-center justify-center rounded-full border border-white/50 opacity-0 shadow-[0_0_0_1px_rgba(0,0,0,.25)] transition-[opacity,background-color,border-color] duration-200 data-[active='1']:border-accent data-[active='1']:bg-accent/10"
      >
        <span className="text-[5px] font-semibold uppercase tracking-[0.1em] text-white">{label}</span>
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-white opacity-0 shadow-[0_0_0_1px_rgba(0,0,0,.4)]" />
    </>
  );
}
