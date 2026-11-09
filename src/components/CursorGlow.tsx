"use client";
import { useEffect, useRef } from "react";

/**
 * Soft light + a trailing ring that follows the pointer and grows over
 * links and buttons. The normal system cursor stays visible, so clicking and
 * typing work exactly as people expect. Desktop mouse only; off for reduced motion.
 */
export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = glow.current, r = ring.current, d = dot.current;
    if (!g || !r || !d) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringP = { ...pos }, glowP = { ...pos };
    let raf = 0;
    const loop = () => {
      ringP.x += (pos.x - ringP.x) * 0.22; ringP.y += (pos.y - ringP.y) * 0.22;
      glowP.x += (pos.x - glowP.x) * 0.1; glowP.y += (pos.y - glowP.y) * 0.1;
      r.style.transform = `translate3d(${ringP.x}px, ${ringP.y}px, 0)`;
      g.style.transform = `translate3d(${glowP.x - 300}px, ${glowP.y - 300}px, 0)`;
      raf = Math.abs(pos.x - glowP.x) + Math.abs(pos.y - glowP.y) > 0.4 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      d.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      g.style.opacity = r.style.opacity = d.style.opacity = "1";
      const t = e.target as HTMLElement;
      r.classList.toggle("is-text", !!t.closest("input, textarea, select, [contenteditable]"));
      r.classList.toggle("is-link", !!t.closest("a, button, [role=button], summary, label"));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => { g.style.opacity = r.style.opacity = d.style.opacity = "0"; };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={glow} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
        style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.09), rgba(141,107,255,.04) 55%, transparent)" }} />
      <div ref={ring} aria-hidden className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90] opacity-0" />
      <div ref={dot} aria-hidden className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] opacity-0" />
    </>
  );
}
