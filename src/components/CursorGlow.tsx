"use client";
import { useEffect, useRef } from "react";

/**
 * A soft light that follows the pointer. The normal system cursor stays visible,
 * so links, buttons and text fields behave exactly as people expect.
 * Desktop mouse only; off for reduced motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { ...pos };
    let raf = 0;
    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.14;
      cur.y += (pos.y - cur.y) * 0.14;
      el.style.transform = `translate3d(${cur.x - 300}px, ${cur.y - 300}px, 0)`;
      raf = Math.abs(pos.x - cur.x) + Math.abs(pos.y - cur.y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => { el.style.opacity = "0"; };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.09), rgba(141,107,255,.04) 55%, transparent)" }}
    />
  );
}
