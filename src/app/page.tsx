import type { Metadata } from "next";
import Link from "next/link";
import Generator from "@/components/hub/Generator";
import WebsiteCheck from "@/components/sections/WebsiteCheck";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/Icon";
import LazyVideo from "@/components/ui/LazyVideo";
import { ContactButton } from "@/components/ui/ContactModal";
import { promptCats, promptCount } from "@/data/prompts";
import { aiReels, toolGroups } from "@/data/hub";
import { profile } from "@/data/site";

const title = "Afshal.ai — Free AI Reel Scripts, Prompts & Content Tools";
const description =
  "Free AI content generator for reels, hooks, captions and content plans in English and Urdu, a library of ready AI prompts, an AI tools directory and a free website check. By Afshal Amir, Lahore.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title, description, url: profile.site, siteName: "Afshal Amir" },
};

const toolCount = toolGroups.reduce((n, g) => n + g.tools.length, 0);

export default function Hub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Afshal.ai AI content generator",
    url: profile.site,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: ["en", "ur"],
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
    featureList: ["AI reel script generator", "Hook generator", "Caption generator", "7-day content plan", "AI video prompt generator", "AI prompt library", "Free website check"],
    author: { "@id": `${profile.site}/#person` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main">
        <section className="relative px-5 pb-6 pt-28 md:px-10 md:pb-10 md:pt-36">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-base text-mute">Afshal.ai · by Afshal Amir</p>
              <h1 className="display mt-4 text-[13vw] leading-[0.98] md:text-[6.4vw]">Grow your brand <span className="text-accent">with AI.</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute md:text-xl">
                Write reel scripts, hooks and captions in seconds, copy prompts that work, and check what&apos;s holding your website back. Free tools in English and Urdu, built by a marketer who uses them on real client work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#create" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-[#111] transition-transform active:scale-[0.97]"><Icon name="Sparkles" className="h-4 w-4" /> Create content free</a>
                <a href="#website-check" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 text-sm font-medium transition-colors hover:border-white/60"><Icon name="Gauge" className="h-4 w-4" /> Check my website</a>
              </div>
            </div>
            <Link href="/portfolio" className="group flex items-center gap-4 rounded-[24px] border border-line bg-bg-2 p-3 pr-5 transition-colors hover:border-white/30 md:col-span-4">
              <img src="/img/me-suit.webp" alt="Afshal Amir" width={96} height={120} className="h-28 w-24 rounded-2xl object-cover object-top" />
              <span>
                <span className="block text-lg font-semibold">Afshal Amir</span>
                <span className="mt-1 block text-sm leading-snug text-mute">Marketing Director, Star X Marketing. 50+ websites built.</span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-accent">See my work <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </span>
            </Link>
          </div>
        </section>

        <Generator />

        <section id="prompts" className="scroll-mt-20 px-5 py-14 md:px-10 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display text-[11vw] md:text-[5vw]">Prompt library</h2>
              <p className="mt-3 max-w-xl text-lg text-mute">{promptCount} ready prompts in {promptCats.length} categories. Copy, fill in the brackets, paste into ChatGPT, Claude or Gemini.</p>
            </div>
            <Link href="/prompts" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-[#111] transition-transform active:scale-[0.97]">Open the library <Icon name="ArrowRight" className="h-4 w-4" /></Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {promptCats.map((c) => (
              <li key={c.key}>
                <Link href={`/prompts#${c.key}`} className="group flex h-full flex-col rounded-[20px] border border-line bg-bg-2 p-5 transition-colors hover:border-accent">
                  <Icon name={c.icon} className="h-6 w-6 text-accent" />
                  <span className="mt-4 text-lg font-semibold leading-tight">{c.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-snug text-mute">{c.blurb}</span>
                  <span className="mt-4 text-sm text-mute group-hover:text-ink">{c.prompts.length} prompts →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {aiReels.length > 0 && (
          <section id="ai-reels" className="scroll-mt-20 px-5 py-14 md:px-10 md:py-20">
            <h2 className="display text-[11vw] md:text-[5vw]">Reels I made with AI</h2>
            <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {aiReels.map((r) => (
                <li key={r.video}>
                  <div className="overflow-hidden rounded-[20px] border border-line bg-black"><LazyVideo src={r.video} poster={r.poster} className="aspect-[9/16] w-full object-cover" /></div>
                  <p className="mt-2 font-semibold">{r.title}</p>
                  <p className="text-sm text-mute">Made with {r.tools}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section id="tools" className="scroll-mt-20 px-5 py-14 md:px-10 md:py-20">
          <div className="grid gap-6 rounded-[28px] border border-line bg-bg-2 p-6 md:grid-cols-12 md:p-10">
            <div className="md:col-span-7">
              <h2 className="display text-4xl md:text-5xl">AI tools I actually use</h2>
              <p className="mt-4 max-w-xl text-lg text-mute">{toolCount} tools for writing, images, video, voice and automation, with what each one is good for.</p>
              <Link href="/tools" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium transition-colors hover:border-white/60">See the tools <Icon name="ArrowRight" className="h-4 w-4" /></Link>
            </div>
            <ul className="flex flex-wrap content-center gap-2 md:col-span-5">
              {toolGroups.flatMap((g) => g.tools).slice(0, 14).map((t) => <li key={t.name} className="rounded-full border border-line px-4 py-2 text-sm">{t.name}</li>)}
            </ul>
          </div>
        </section>

        <WebsiteCheck />

        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="grid gap-6 rounded-[28px] bg-accent p-6 text-[#111] md:grid-cols-12 md:p-10">
            <div className="md:col-span-8">
              <h2 className="display text-4xl md:text-5xl">Want it done for you?</h2>
              <p className="mt-4 max-w-2xl text-lg">My agency, Star X Marketing, builds websites, runs social media and ads, and sets up AI chatbots and automations for businesses.</p>
            </div>
            <div className="flex flex-wrap items-end gap-3 md:col-span-4 md:justify-end">
              <ContactButton className="inline-flex items-center gap-2 rounded-full bg-[#111] px-6 py-4 text-sm font-semibold text-white transition-transform active:scale-[0.97]">Start a project <Icon name="ArrowRight" className="h-4 w-4" /></ContactButton>
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-black/40 px-6 py-4 text-sm font-semibold">See the portfolio</Link>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
