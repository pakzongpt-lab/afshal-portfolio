"use client";
import Magnetic from "../Magnetic";
import SocialIcon from "../SocialIcon";
import ContactForm from "../ui/ContactForm";
import Icon from "../ui/Icon";
import { SectionLabel, SplitLines, FadeUp } from "../Reveal";
import { profile, socials } from "@/data/site";
import { faqs, starx } from "@/data/v2";

export function PortfolioPDF() {
  const pages = ["/work/logo-folio.webp", "/work/brand-gwb.webp", "/work/pack-herb-cabinet.webp", "/work/print-billboard-je125.webp", "/work/ui-lawyers.webp"];
  return (
    <section id="portfolio-pdf" className="relative px-5 py-20 md:px-10">
      <div className="grid items-center gap-10 overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(77,141,255,.16),transparent_55%),#0b0b11] p-6 md:grid-cols-12 md:p-12">
        <div className="md:col-span-5">
          <div className="label">Portfolio PDF</div>
          <h2 className="display mt-5 text-4xl md:text-6xl">The complete <span className="serif font-normal text-accent">portfolio</span>.</h2>
          <p className="mt-5 text-mute">27 pages of logos, branding, social media, packaging, print and UI/UX work.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href="/docs/afshal-amir-portfolio.pdf" target="_blank" rel="noopener" className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-bg transition-transform active:scale-[0.97]">
                <Icon name="FileText" className="h-4 w-4" /> View Complete Portfolio PDF
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="relative h-72 md:col-span-7 md:h-96">
          {pages.map((p, i) => (
            <a key={p} href="/docs/afshal-amir-portfolio.pdf" target="_blank" rel="noopener" aria-label="Open portfolio PDF"
              className="absolute top-1/2 w-[58%] overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl transition-transform duration-500 hover:z-10 hover:-translate-y-[60%] hover:scale-105"
              style={{ left: `${i * 10.5}%`, transform: `translateY(-50%) rotate(${(i - 2) * 4}deg)`, zIndex: i }}>
              <img src={p} alt="" loading="lazy" className="aspect-video w-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative px-5 py-24 md:px-10">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionLabel>Questions</SectionLabel>
          <h2 className="display mt-6 text-5xl md:text-6xl">Good to <span className="serif font-normal text-accent">know</span>.</h2>
        </div>
        <div className="md:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl md:text-2xl">
                <h3 className="font-medium">{f.q}</h3>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.14), transparent)" }} />
      <SectionLabel>Contact</SectionLabel>
      <SplitLines className="display relative mt-8 text-[14vw] md:text-[9vw]" lines={["Let's build", <span key="n">what&apos;s <span className="serif font-normal text-accent">next</span>.</span>]} />
      <div className="relative mt-16 grid gap-14 md:grid-cols-12">
        <FadeUp className="space-y-8 md:col-span-5">
          <p className="max-w-md text-lg text-mute">A brand to build, a website to fix, a campaign to launch or a process to automate — tell me about it. I reply within a day.</p>
          <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-3 text-2xl md:text-3xl">
            <Icon name="Mail" className="h-6 w-6 text-accent" />
            <span className="relative">{profile.email}<span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" /></span>
          </a>
          <div>
            <div className="label mb-4">Find me</div>
            <div className="flex flex-wrap gap-2">
              {socials.filter((s) => s.url).map((s) => (
                <Magnetic key={s.key} strength={0.3}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-12 w-12 place-items-center rounded-full border border-line transition-[border-color,background-color] duration-300 hover:border-white/40 hover:bg-white/5">
                    <SocialIcon name={s.key} className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              ))}
              <a href={starx.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-[#ffd600]/60">
                <SocialIcon name="instagram" className="h-4 w-4" /> {starx.handle}
              </a>
            </div>
          </div>
        </FadeUp>
        <div className="rounded-[28px] border border-line bg-bg-2/70 p-6 backdrop-blur md:col-span-7 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
