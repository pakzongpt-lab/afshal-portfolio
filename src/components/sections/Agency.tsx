"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FadeUp, MaskImage, SectionLabel, SplitLines } from "../Reveal";
import Carousel from "../ui/Carousel";
import Icon from "../ui/Icon";
import LazyVideo from "../ui/LazyVideo";
import SocialIcon from "../SocialIcon";
import { ContactButton } from "../ui/ContactModal";
import { influencers, starx } from "@/data/v2";

export function StarX() {
  return (
    <section id="starx" className="relative py-14 md:py-24">
      <div className="grid gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <div className="flex items-center gap-5">
            <div className="grid h-20 w-28 place-items-center rounded-2xl bg-white p-3"><img src={starx.logo} alt="Star X Marketing logo" className="max-h-full max-w-full object-contain mix-blend-multiply" /></div>
            <div>
              <div className="text-sm text-mute">Afshal Amir · {starx.role}</div>
              <div className="display mt-1 text-2xl">Star X Marketing</div>
            </div>
          </div>
          <SplitLines className="display mt-10 text-[11vw] md:text-[5.4vw]" lines={["The agency I run"]} />
        </div>
        <div className="self-end md:col-span-5">
          <p className="text-lg leading-relaxed text-mute">Star X Marketing is the agency I lead. The team handles branding, social media, websites, ads, video and AI automations — the same services on this page, with more hands.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={starx.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-[#111] transition-transform active:scale-[0.97]">starxmarketing.com <Icon name="ArrowUpRight" className="h-4 w-4" /></a>
            <a href={starx.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm transition-colors hover:border-white/50"><SocialIcon name="instagram" className="h-4 w-4" color="#E4405F" />{starx.handle}</a>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="mb-6 px-5 text-sm text-mute md:px-10">Recent posts on {starx.handle}</div>
        <div className="[--slide-h:26rem] md:[--slide-h:30rem]">
          <Carousel
            label="Star X Marketing Instagram posts"
            items={starx.posts}
            slideWidth={300}
            autoplay={2800}
            render={(i, active) => (
              <a href={starx.instagram} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1} className={`block overflow-hidden rounded-[20px] border ${active ? "border-white/40" : "border-white/10"}`}>
                <img src={starx.posts[i].src} alt={starx.posts[i].alt} loading="lazy" className="aspect-[4/5] w-full bg-black object-contain" />
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
      <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-bg-2">
        <div className="overflow-hidden bg-black">
          <img src={f.image} alt={`Afshal Amir with ${f.name}`} loading="lazy" width={900} height={1130} className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.02]" />
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <span className="text-sm text-mute">{f.tag}</span>
          <h3 className="display mt-2 text-4xl md:text-5xl">{f.name}</h3>
          <p className="mt-3 max-w-md flex-1 text-mute">{f.blurb}</p>
          {f.video ? (
            <button onClick={() => setPlaying(true)} className="mt-5 inline-flex w-max items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.97]"><Icon name="Play" className="h-4 w-4" /> {f.videoLabel}</button>
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

/** Behind-the-scenes footage from both creator meetings, playing muted in phone frames. */
function MeetingReel() {
  const vids = influencers.filter((f) => f.video);
  if (!vids.length) return null;
  return (
    <FadeUp className="grid items-center gap-8 rounded-[30px] border border-line bg-bg-2 p-6 md:grid-cols-12 md:p-10">
      <div className="md:col-span-5">
                <h3 className="display mt-3 text-4xl md:text-5xl">Meetings and shoots</h3>
        <p className="mt-4 max-w-md text-mute">Planning the shoot, briefing the crew and shaping the content on the day — this is what a creator collaboration looks like before it hits the feed.</p>
      </div>
      <div className="flex justify-center gap-4 md:col-span-7 md:gap-6">
        {vids.map((v, i) => (
          <figure key={v.name} className={`w-[46%] max-w-[220px] ${i % 2 ? "md:translate-y-8" : ""}`}>
            <div className="relative overflow-hidden rounded-[30px] border-[5px] border-[#1c1c22] bg-black shadow-[0_30px_80px_rgba(0,0,0,.6)]">
              <LazyVideo src={v.video} poster={v.poster} className="aspect-[9/16] w-full object-cover" />
              <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] backdrop-blur"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />Behind the scenes</span>
            </div>
            <figcaption className="mt-3 text-center text-sm text-mute">Meeting with <span className="text-ink">{v.name}</span></figcaption>
          </figure>
        ))}
      </div>
    </FadeUp>
  );
}

export function Influencers() {
  const points = ["Creator partnerships", "Audience engagement", "Brand awareness", "Short-form campaigns"];
  return (
    <section id="influencers" className="relative px-5 py-14 md:px-10 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel>Influencer marketing</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[6.4vw]" lines={["Influencer campaigns"]} />
        </div>
        <div className="self-end md:col-span-5">
          <p className="text-lg text-mute">I plan creator campaigns end to end: picking a creator whose audience fits the brand, meeting them, briefing the shoot and editing the content so it feels like their own post, not an ad.</p>
          <div className="mt-6 flex flex-wrap gap-2">{points.map((p) => <span key={p} className="rounded-full border border-line px-3.5 py-1.5 text-sm">{p}</span>)}</div>
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {influencers.map((f, i) => <InfluencerCard key={f.name} f={f} i={i} />)}
      </div>
      <div className="mt-4"><MeetingReel /></div>
    </section>
  );
}

export function Awards() {
  return (
    <section id="awards" className="relative px-5 py-14 md:px-10 md:py-20">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel>Awards & recognition</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[5.6vw]" lines={["Awards"]} />
          <div className="mt-10 space-y-3">
            <div className="rounded-2xl border border-line p-5">
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
