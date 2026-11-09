"use client";
import { useEffect, useRef } from "react";

export type RobotMood = "idle" | "scan" | "happy" | "worried";

/**
 * An original robot mascot drawn in SVG. Its head tilts and its eyes follow
 * the pointer; while a check runs a scan line sweeps its visor.
 */
export default function Robot({ mood = "idle", className = "" }: { mood?: RobotMood; className?: string }) {
  const head = useRef<SVGGElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = root.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      eyes.current?.setAttribute("transform", `translate(${cur.x * 7} ${cur.y * 5})`);
      head.current?.setAttribute("transform", `rotate(${cur.x * 6} 120 120) translate(${cur.x * 3} ${cur.y * 2})`);
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.36;
      target.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight / 2)));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  const eyeColor = mood === "worried" ? "#ffb547" : mood === "happy" ? "#3ee6a0" : "#ffd400";

  return (
    <svg ref={root} viewBox="0 0 240 300" className={`robot ${mood === "scan" ? "robot-scan" : ""} ${className}`} role="img" aria-label="Website checker robot">
      <defs>
        <linearGradient id="rb-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3d4d" />
          <stop offset="1" stopColor="#15161e" />
        </linearGradient>
        <linearGradient id="rb-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b0f1d" />
          <stop offset="1" stopColor="#050609" />
        </linearGradient>
        <radialGradient id="rb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={eyeColor} stopOpacity="0.55" />
          <stop offset="1" stopColor={eyeColor} stopOpacity="0" />
        </radialGradient>
        <clipPath id="rb-visor-clip"><rect x="62" y="86" width="116" height="62" rx="28" /></clipPath>
      </defs>

      {/* floor shadow */}
      <ellipse cx="120" cy="290" rx="62" ry="7" fill="#000" opacity="0.45" className="robot-shadow" />

      <g className="robot-body">
        {/* body */}
        <rect x="70" y="186" width="100" height="84" rx="26" fill="url(#rb-metal)" stroke="rgba(255,255,255,.12)" />
        <rect x="96" y="208" width="48" height="30" rx="9" fill="#0b0d16" stroke="rgba(255,255,255,.1)" />
        <rect x="103" y="216" width="8" height="14" rx="2" fill="#ffd400" className="robot-bar b1" />
        <rect x="116" y="216" width="8" height="14" rx="2" fill="#ffd400" className="robot-bar b2" />
        <rect x="129" y="216" width="8" height="14" rx="2" fill="#3ee6a0" className="robot-bar b3" />
        {/* arms */}
        <rect x="44" y="196" width="22" height="58" rx="11" fill="url(#rb-metal)" stroke="rgba(255,255,255,.1)" className="robot-arm-l" />
        <rect x="174" y="196" width="22" height="58" rx="11" fill="url(#rb-metal)" stroke="rgba(255,255,255,.1)" className="robot-arm-r" />
        {/* neck */}
        <rect x="106" y="168" width="28" height="22" rx="6" fill="#20222d" />

        <g ref={head}>
          {/* antenna */}
          <line x1="120" y1="44" x2="120" y2="66" stroke="#565b70" strokeWidth="4" strokeLinecap="round" />
          <circle cx="120" cy="40" r="8" fill={eyeColor} className="robot-antenna" />
          {/* head */}
          <rect x="44" y="64" width="152" height="108" rx="44" fill="url(#rb-metal)" stroke="rgba(255,255,255,.14)" />
          <rect x="36" y="100" width="12" height="34" rx="6" fill="#262937" />
          <rect x="192" y="100" width="12" height="34" rx="6" fill="#262937" />
          {/* visor */}
          <rect x="62" y="86" width="116" height="62" rx="28" fill="url(#rb-visor)" stroke="rgba(127,178,255,.25)" />
          <g clipPath="url(#rb-visor-clip)">
            <rect x="62" y="86" width="116" height="10" fill={eyeColor} opacity="0.35" className="robot-scanline" />
            <g ref={eyes}>
              <circle cx="96" cy="117" r="22" fill="url(#rb-glow)" />
              <circle cx="144" cy="117" r="22" fill="url(#rb-glow)" />
              {mood === "happy" ? (
                <>
                  <path d="M86 121 q10 -12 20 0" stroke={eyeColor} strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M134 121 q10 -12 20 0" stroke={eyeColor} strokeWidth="5" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <rect x="88" y={mood === "worried" ? 112 : 106} width="16" height={mood === "worried" ? 12 : 22} rx="8" fill={eyeColor} className="robot-eye" />
                  <rect x="136" y={mood === "worried" ? 112 : 106} width="16" height={mood === "worried" ? 12 : 22} rx="8" fill={eyeColor} className="robot-eye" />
                </>
              )}
            </g>
          </g>
          {/* cheek lights */}
          <circle cx="70" cy="158" r="3" fill="#ffd400" opacity="0.7" />
          <circle cx="170" cy="158" r="3" fill="#ffd400" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
}
