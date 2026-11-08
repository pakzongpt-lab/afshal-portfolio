"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FadeUp, MaskImage, SectionLabel, SplitLines } from "../Reveal";
import Carousel from "../ui/Carousel";
import Icon from "../ui/Icon";
import SocialIcon from "../SocialIcon";
import { ContactButton } from "../ui/ContactModal";
import { influencers, starx } from "@/data/v2";

export function StarX() {
  const reduce = useReducedMotion();
  return (
    <section id="starx" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(255,214,0,.10), transparent)" }} />
      <div className="relative grid gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <SectionLabel>My agency</SectionLabel>
          <div className="mt-8 flex items-center gap-5">
            <div className="grid h-20 w-28 place-items-center rounded-2xl bg-white p-3"><img src={starx.logo} alt="Star X Marketing logo" className="max-h-full max-w-full object-contain mix-blend-multiply" /></div>
            <div>
              <div className="display text-4xl md:text-5xl">Star X Marketing</div>
              <div className="mt-1 text-[#ffd600]">Afshal Amir · {starx.role}</div>
            </div>
          </div>
          <SplitLines className="display mt-10 text-[11vw] md:text-[5.4vw]" lines={["Complete digital", <span key="g"><span className="serif font-normal text-[#ffd600]">growth</span>, one team.</span>]} />
          <p className="mt-6 max-w-xl text-lg text-mute">{starx.pitch}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={starx.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#ffd600] px-6 py-3.5 text-sm font-semibold text-black transition-transform active:scale-[0.97]">starxmarketing.com <Icon name="ArrowUpRight" className="h-4 w-4" /></a>
            <a href={starx.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm transition-colors hover:border-white/50"><SocialIcon name="instagram" className="h-4 w-4" color="#E4405F" />{starx.handle} · {starx.followers} followers</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 self-end md:col-span-5">
          {starx.services.map((s, i) => (
            <motion.div key={s.title}
              initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-bg-2 p-3.5 transition-[border-color,background-color] duration-300 hover:border-[#ffd600]/50 hover:bg-[#ffd600]/[0.06]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#ffd600]/10 text-[#ffd600] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"><Icon name={s.icon} className="h-[18px] w-[18px]" /></span>
              <span className="text-sm leading-tight">{s.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="label mb-8 px-5 text-center md:px-10">Recent work on {starx.handle}</div>
        <div className="[--slide-h:26rem] md:[--slide-h:30rem]">
          <Carousel
            label="Star X Marketing Instagram posts"
            items={starx.posts}
            slideWidth={300}
            autoplay={2400}
            render={(i, active) => (
              <a href={starx.instagram} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1} className={`block overflow-hidden rounded-[22px] border ${active ? "border-[#ffd600]/60 shadow-[0_30px_80px_rgba(255,214,0,.18)]" : "border-white/10"}`}>
                <img src={starx.posts[i].src} alt={starx.posts[i].alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </a>
            )}
          />
        </div>
      </div>
    </section>
  );
}

function InfluencerCard({ f, i }: { f: (typeof influencers)[number]; i: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <FadeUp delay={i * 0.1} className="h-full">
      <article className="group relative flex h-full min-h-[36rem] flex-col justify-end overflow-hidden rounded-[30px] border border-white/10 md:min-h-[42rem]">
        <img src={f.image} alt={`Afshal Amir with ${f.name}`} loading="lazy" style={{ objectPosition: f.focus }} className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-105 group-hover:grayscale-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative p-6 md:p-8">
          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs backdrop-blur">{f.tag}</span>
          <h3 className="display mt-4 text-5xl md:text-6xl">{f.name}</h3>
          <p className="mt-3 max-w-md text-ink/80">{f.blurb}</p>
          {f.video ? (
            <button onClick={() => setPlaying(true)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.97]"><Icon name="Play" className="h-4 w-4" /> {f.videoLabel}</button>
          ) : null}
        </div>
      </article>
      <AnimatePresence>
        {playing && f.video && (
          <motion.div role="dialog" aria-modal="true" aria-label={f.videoLabel} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(false)}>
            <motion.video src={f.video} poster={f.poster} autoPlay controls playsInline className="max-h-[86svh] max-w-full rounded-2xl" initial={{ scale: 0.92 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setPlaying(false)} autoFocus className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm">Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeUp>
  );
}

/** The Ducky Bhai meeting footage, playing muted in a phone frame. */
function MeetingReel() {
  const v = influencers.find((f) => f.video);
  if (!v) return null;
  return (
    <FadeUp className="flex flex-col items-center gap-6 rounded-[30px] border border-line bg-bg-2 p-6 md:flex-row md:p-10">
      <div className="relative w-[230px] shrink-0 overflow-hidden rounded-[34px] border-[6px] border-[#1c1c22] bg-black shadow-[0_30px_80px_rgba(0,0,0,.6)]">
        <video src={v.video} poster={v.poster} muted loop playsInline autoPlay preload="none" className="aspect-[9/16] w-full object-cover" />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] backdrop-blur"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />Behind the scenes</span>
      </div>
      <div>
        <div className="label">On set</div>
        <h3 className="display mt-3 text-4xl md:text-5xl">Meeting with {v.name}</h3>
        <p className="mt-4 max-w-lg text-mute">Planning the shoot, briefing the crew and shaping the content on the day — this is what a creator collaboration looks like before it hits the feed.</p>
      </div>
    </FadeUp>
  );
}

export function Influencers() {
  const points = ["Creator partnerships", "Audience engagement", "Brand awareness", "Short-form campaigns"];
  return (
    <section id="influencers" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel>Influencer marketing</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[6.4vw]" lines={["Borrowed trust,", <span key="i">real <span className="serif font-normal text-accent">results</span>.</span>]} />
        </div>
        <div className="self-end md:col-span-5">
          <p className="text-lg text-mute">People trust people more than ads. I match brands with creators whose audience already fits, then shape content that feels native to their channel — so the message lands as a recommendation, not an interruption.</p>
          <div className="mt-6 flex flex-wrap gap-2">{points.map((p) => <span key={p} className="rounded-full border border-line px-3.5 py-1.5 text-sm">{p}</span>)}</div>
        </div>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {influencers.map((f, i) => <InfluencerCard key={f.name} f={f} i={i} />)}
      </div>
      <div className="mt-4"><MeetingReel /></div>
    </section>
  );
}

export function Awards() {
  return (
    <section id="awards" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel>Awards & recognition</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[5.6vw]" lines={["Recognised", <span key="a">for the <span className="serif font-normal text-accent">work</span>.</span>]} />
          <div className="mt-10 space-y-3">
            <div className="rounded-2xl border border-accent/40 bg-accent/[0.06] p-5">
              <div className="flex items-center gap-3"><Icon name="Trophy" className="h-6 w-6 text-accent" /><span className="display text-2xl">Best Performance Award</span></div>
              <div className="mt-2 text-sm text-mute">Jolta Electric · November 2025</div>
            </div>
            <div className="rounded-2xl border border-line p-5"><span className="display text-2xl">Employee of the Year</span><div className="mt-2 text-sm text-mute">SA Corporation</div></div>
            <div className="rounded-2xl border border-line p-5"><span className="display text-2xl">Final Project Excellence Award</span><div className="mt-2 text-sm text-mute">LUMS</div></div>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <MaskImage src="/img/award-jolta-best-performance.webp" alt="Afshal Amir receiving the Best Performance Award from Jolta Electric" className="rounded-[28px] border border-white/10" imgClass="!h-auto" />
        </div>
      </div>
    </section>
  );
}

export function FixWebsiteCTA() {
  return <ContactButton topic="Website fix / speed" className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-bg transition-transform active:scale-[0.97]">Contact me <Icon name="ArrowRight" className="h-4 w-4" /></ContactButton>;
}
