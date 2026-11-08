"use client";
import type { ReactNode } from "react";

/** Endless, GPU-only carousel. Pauses on hover/focus; direction and speed configurable. */
export default function Marquee({ children, speed = 40, reverse = false, className = "", gap = "1rem" }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string; gap?: string }) {
  return (
    <div className={`group/mq relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] ${className}`}>
      <div
        className="marquee-track flex w-max group-hover/mq:[animation-play-state:paused] group-focus-within/mq:[animation-play-state:paused]"
        style={{ ["--dur" as string]: `${speed}s`, animationDirection: reverse ? "reverse" : "normal", gap }}
      >
        <div className="flex shrink-0" style={{ gap }}>{children}</div>
        <div className="flex shrink-0" style={{ gap }} aria-hidden>{children}</div>
      </div>
    </div>
  );
}
