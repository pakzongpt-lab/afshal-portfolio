"use client";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { SectionLabel, SplitLines } from "../Reveal";
import ProjectCover from "../ProjectCover";
import { projects, type Project } from "@/data/site";

const featured = projects.slice(0, 4);
const rest = projects.slice(4);

function StackCard({ p, i, total }: { p: Project; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.9 - (total - i) * 0.01]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 0.6]);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rx = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const ry = useSpring(tiltY, { stiffness: 150, damping: 20 });

  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
  };
  const leave = () => { tiltX.set(0); tiltY.set(0); };

  return (
    <div ref={ref} className="sticky top-20 h-[85vh] md:top-24" style={{ zIndex: i + 1 }}>
      <motion.div style={{ scale, transformOrigin: "50% 0%" }} className="h-full [perspective:1600px]">
        <Link href={`/work/${p.slug}`} data-cursor="View" onPointerMove={move} onPointerLeave={leave} className="group block h-full">
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-bg-2 shadow-[0_-20px_80px_rgba(0,0,0,.6)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-8">
              <div className="flex items-center gap-4">
                <span className="label">0{i + 1}</span>
                <span className="text-sm text-mute">{p.industry}{p.place ? ` · ${p.place}` : ""}</span>
              </div>
              <span className="label hidden md:block">{p.domain}</span>
            </div>
            <div className="grid flex-1 gap-6 overflow-hidden p-5 md:grid-cols-12 md:p-8">
              <div className="flex flex-col justify-between md:col-span-4">
                <div>
                  <h3 className="display text-[11vw] leading-[0.9] md:text-[4.2vw]">{p.name}</h3>
                  <p className="mt-5 max-w-sm text-base text-mute md:text-lg">{p.summary}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.role.map((r) => <span key={r} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/80">{r}</span>)}
                </div>
              </div>
              <div className="relative min-h-[220px] overflow-hidden rounded-2xl md:col-span-8">
                <div className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.04]">
                  <ProjectCover p={p} />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg opacity-100 transition-[opacity,transform] duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  View case study <span aria-hidden>→</span>
                </div>
              </div>
            </div>
            <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [hover, setHover] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  return (
    <section id="work" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel index="03">Selected projects</SectionLabel>
          <SplitLines className="display mt-8 text-[13vw] md:text-[7.5vw]" lines={["Websites that", <span key="w"><span className="serif font-normal text-accent">work</span> for a living.</span>]} />
        </div>
        <p className="self-end text-lg leading-relaxed text-mute md:col-span-4">
          Nine websites across legal, construction, EV, gaming, marketing, automotive, politics and pet care. Each one starts with what the business needs a visitor to do.
        </p>
      </div>

      <div className="relative mt-16 space-y-6 pb-10">
        {featured.map((p, i) => <StackCard key={p.slug} p={p} i={i} total={featured.length} />)}
      </div>

      <div
        className="relative mt-10 border-t border-line"
        onPointerMove={(e) => { x.set(e.clientX); y.set(e.clientY); }}
        onPointerLeave={() => setHover(null)}
      >
        {rest.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p)}
            className="group grid grid-cols-12 items-center gap-4 border-b border-line py-6 transition-colors duration-300 md:py-8"
          >
            <span className="label col-span-2 md:col-span-1">0{featured.length + i + 1}</span>
            <span className="display col-span-10 text-3xl transition-[transform,color] duration-500 group-hover:translate-x-3 group-hover:text-accent md:col-span-5 md:text-5xl">{p.name}</span>
            <span className="col-span-6 col-start-3 text-sm text-mute md:col-span-3 md:col-start-auto">{p.industry}</span>
            <span className="label col-span-6 text-right md:col-span-3">{p.domain} ↗</span>
          </Link>
        ))}
        <AnimatePresence>
          {hover && (
            <motion.div
              key="preview"
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 z-30 hidden h-60 w-96 overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:block"
              style={{ x: sx, y: sy, translateX: "-50%", translateY: "-110%" }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={hover.slug} className="h-full w-full" initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}>
                  <ProjectCover p={hover} sizes="thumb" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
