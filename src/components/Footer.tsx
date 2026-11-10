"use client";
import Logo from "./ui/Logo";
import SocialIcon from "./SocialIcon";
import { brandIcons } from "./brandIcons";
import { techIcons } from "./techIcons";
import { WHATSAPP_NUMBER } from "./WhatsAppFloat";
import { profile, socials } from "@/data/site";
import { starx } from "@/data/v2";

const links = [["AI content generator", "/#create"], ["Prompt library", "/prompts"], ["AI tools", "/tools"], ["Pricing", "/pricing"], ["My account", "/account"], ["Website check", "/#website-check"], ["Portfolio", "/portfolio"], ["Websites", "/portfolio#websites"], ["Services", "/portfolio#services"], ["Star X", "/portfolio#starx"], ["Contact", "/#contact"]];

// Shown in full on white cards, the way the issuers present them.
const credentials = [
  { logo: "/creds/superior.webp", title: "Software Engineer", by: "BS Software Engineering · Superior University, Lahore", w: 186, h: 55 },
  { logo: "/creds/lums.webp", title: "Digital Marketing", by: "Lahore University of Management Sciences (LUMS)", w: 88, h: 88 },
  { logo: "/creds/google.svg", title: "Google certified", by: "Google certification", w: 56, h: 56 },
  { logo: "/creds/aws-ai-practitioner.webp", title: "AWS Certified", by: "AI Practitioner · Foundational", w: 73, h: 82 },
];

export default function Footer() {
  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer className="relative overflow-hidden border-t border-line px-5 pt-16 md:px-10">
      <div>
        <div className="mb-6 text-sm text-mute">Education & certifications</div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c) => (
            <li key={c.title} className="group flex items-center gap-4 rounded-[22px] border border-line bg-bg-2 p-3 pr-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/25">
              <div className="grid h-24 w-32 shrink-0 place-items-center rounded-2xl bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,.35)]">
                <img src={c.logo} alt={`${c.title} — ${c.by}`} width={c.w} height={c.h} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <div className="display text-xl leading-tight">{c.title}</div>
                <div className="mt-1 text-[13px] leading-snug text-mute">{c.by}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-10 border-t border-line pt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-mute">Afshal Amir — digital marketer and web developer in Lahore, Pakistan. Marketing Director at Star X Marketing.</p>
          <a href={`mailto:${profile.email}`} className="mt-4 block text-ink underline-offset-4 hover:underline">{profile.email}</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-ink underline-offset-4 hover:underline">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill={techIcons.whatsapp.hex} aria-hidden><path d={techIcons.whatsapp.path} /></svg>
            0342 0757848
          </a>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 md:col-span-3">
          {links.map(([l, h]) => <a key={h} href={h} className="text-mute transition-colors hover:text-ink">{l}</a>)}
          <a href="/docs/afshal-amir-portfolio.pdf" target="_blank" rel="noopener" className="text-mute transition-colors hover:text-ink">Portfolio PDF</a>
        </nav>
        <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
          <div className="flex gap-2.5">
            {socials.filter((s) => s.url).map((s) => (
              <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/30">
                <SocialIcon name={s.key} className="h-[18px] w-[18px]" color={brandIcons[s.key]?.hex} />
              </a>
            ))}
          </div>
          <a href={starx.instagram} target="_blank" rel="noopener noreferrer" className="label transition-colors hover:text-ink">Star X Marketing ↗</a>
          <button onClick={toTop} className="label transition-colors hover:text-ink">Back to top ↑</button>
        </div>
      </div>
      <div className="label mt-12 flex flex-wrap justify-between gap-2 border-t border-line py-5">
        <span>© 2026 Muhammad Afshal Amir</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
