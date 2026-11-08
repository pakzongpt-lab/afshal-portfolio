"use client";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FadeUp, MaskImage, SectionLabel, SplitLines } from "../Reveal";
import Marquee from "../ui/Marquee";
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
        <div className="label mb-5 px-5 md:px-10">Recent work on {starx.handle}</div>
        <Marquee speed={55} gap="1rem">
          {starx.posts.map((p) => (
            <a key={p.src} href={starx.instagram} target="_blank" rel="noopener noreferrer" className="group block w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 md:w-64">
              <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function InfluencerCard({ f, i }: { f: (typeof influencers)[number]; i: number }) {
  const [playing, setPlaying] = useState(false);
  const has = !!(f.image || f.video);
  return (
    <FadeUp delay={i * 0.1} className="h-full">
      <article className="group relative flex h-full min-h-[34rem] flex-col justify-end overflow-hidden rounded-[30px] border border-white/10">
        {f.video && playing ? (
          <video src={f.video} poster={f.image} autoPlay controls playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : f.image ? (
          <img src={f.image} alt={`${f.name} — influencer collaboration`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
        ) : (
          <div aria-hidden className="absolute inset-0" style={{ background: i ? "radial-gradient(120% 80% at 80% 0%, #8d6bff55, transparent 60%), #0d0d14" : "radial-gradient(120% 80% at 20% 0%, #ff8a3d55, transparent 60%), #0d0d14" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="display select-none text-[22vw] text-white/[0.04] md:text-[11vw]">{f.name.split(" ")[0]}</span>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative p-6 md:p-8">
          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs backdrop-blur">{f.tag}</span>
          <h3 className="display mt-4 text-5xl md:text-6xl">{f.name}</h3>
          <p className="mt-3 max-w-md text-ink/80">{f.blurb}</p>
          {f.video && !playing && (
            <button onClick={() => setPlaying(true)} className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg"><Icon name="Play" className="h-4 w-4" /> Watch the collab</button>
          )}
          {!has && <p className="label mt-5 text-[10px]">Campaign media coming soon</p>}
        </div>
      </article>
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
