"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import SocialIcon from "../SocialIcon";
import Icon from "../ui/Icon";
import { ContactButton } from "../ui/ContactModal";
import { INTRO_EVENT } from "../Loader";
import { brandIcons } from "../brandIcons";
import { socials } from "@/data/site";

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

const LINES = [["I", "build", "websites"], ["and", "run", "marketing"], ["for", "brands", "that", "want", "to", "grow."]];

export default function Hero() {
  const ready = useIntro();
  const reduce = useReducedMotion();
  const show = ready || !!reduce;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden px-5 pb-10 pt-24 md:px-10 md:pb-16 md:pt-28">
      <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10">
        <div className="order-2 md:order-1 md:col-span-7">
          <motion.p className="text-base text-mute" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            Afshal Amir — Lahore, Pakistan
          </motion.p>

          <h1 className="display mt-5 text-[11.5vw] leading-[0.98] md:text-[5.2vw]">
            <span className="sr-only">I build websites and run marketing for brands that want to grow.</span>
            {LINES.map((line, li) => (
              <span key={li} aria-hidden className="block">
                {line.map((w, wi) => (
                  <span key={wi} className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span className={`inline-block ${w === "grow." ? "text-accent" : ""}`}
                      initial={{ y: "105%" }} animate={show ? { y: "0%" } : {}}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.05 + li * 0.12 + wi * 0.04 }}>
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p className="mt-7 max-w-xl text-lg leading-relaxed text-mute md:text-xl" initial={{ opacity: 0, y: 12 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}>
            I&apos;ve designed <span className="text-ink">50+ websites</span> and run marketing for an electric-motorcycle brand, a law firm in Glasgow and my own agency, Star X Marketing. I&apos;m a software engineer by degree, so I build what I design.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 12 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}>
            <a href="#websites" className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-[#111] transition-transform duration-150 active:scale-[0.97]">
              See the work
              <Icon name="ArrowDown" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <ContactButton className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 text-sm font-medium transition-colors duration-200 hover:border-white/60 active:scale-[0.97]">
              Start a project
            </ContactButton>
          </motion.div>

          <motion.div className="mt-10 flex items-center gap-2.5" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
            {socials.filter((s) => s.url).map((s) => (
              <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/40">
                <SocialIcon name={s.key} className="h-[18px] w-[18px]" color={brandIcons[s.key]?.hex} />
              </a>
            ))}
            <span className="ml-2 hidden text-sm text-mute sm:inline">Clients in Pakistan, the UK, the US, the UAE and Canada</span>
          </motion.div>
        </div>

        <div className="relative order-1 mx-auto w-[78%] max-w-[460px] md:order-2 md:col-span-5 md:w-full">
          <motion.div style={{ y: photoY }}>
            <motion.div
              className="group/hero relative aspect-[1034/1521] overflow-hidden rounded-[28px] bg-[#0a0a0a]"
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 28px)" }}
              animate={show ? { clipPath: "inset(0% 0% 0% 0% round 28px)" } : {}}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
            >
              <img src="/img/me-suit.webp" alt="Muhammad Afshal Amir" fetchPriority="high"
                className="h-full w-full object-cover object-top grayscale transition-[filter] duration-700 ease-out group-hover/hero:grayscale-0" />
            </motion.div>
            <p className="mt-3 text-sm text-mute">Muhammad Afshal Amir · Marketing Director, Star X Marketing</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
