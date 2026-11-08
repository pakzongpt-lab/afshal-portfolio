"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { profile, socials } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#creative", label: "Creative" },
  { href: "#ai", label: "AI & Automation" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const EASE = [0.77, 0, 0.175, 1] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const href = (h: string) => (home ? h : `/${h}`);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className={`mx-auto flex items-center justify-between px-5 py-4 transition-[background-color,backdrop-filter] duration-300 md:px-10 ${scrolled && !open ? "bg-bg/60 backdrop-blur-xl" : ""}`}>
          <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.name} — home`}>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 font-mono text-[11px] tracking-wider transition-colors duration-300 group-hover:border-accent group-hover:text-accent">AA</span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {profile.short}
              <span className="ml-2 inline-flex items-center gap-1.5 text-mute"><span className="glow-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />Open to projects</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:inline-block">
              <a href={href("#contact")} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-150 active:scale-[0.97]">
                Let&apos;s talk
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="site-menu"
                className="relative z-[60] flex h-11 items-center gap-3 rounded-full border border-white/15 bg-bg/40 px-5 text-sm backdrop-blur-md transition-transform duration-150 active:scale-[0.97]"
              >
                <span>{open ? "Close" : "Menu"}</span>
                <span className="relative block h-2.5 w-4">
                  <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#0b0b10] px-5 pb-8 pt-28 md:px-10"
            initial={{ clipPath: "circle(0% at calc(100% - 70px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 70px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 70px) 38px)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem]" style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.22), transparent)" }} />
            <ul className="relative">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={href(l.href)}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-1 md:gap-8"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.25 + i * 0.05 }}
                  >
                    <span className="label w-8 text-dim">0{i + 1}</span>
                    <span className="display text-[13vw] leading-[0.95] text-white/90 transition-[color,transform] duration-500 group-hover:translate-x-4 group-hover:text-accent md:text-[6.4vw]">
                      {l.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="relative mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }} exit={{ opacity: 0 }}
            >
              <a href={`mailto:${profile.email}`} className="text-lg text-mute transition-colors hover:text-ink">{profile.email}</a>
              <div className="flex flex-wrap gap-5">
                {socials.filter((s) => s.url).map((s) => (
                  <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="label transition-colors hover:text-ink">{s.label}</a>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
