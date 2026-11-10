import type { Metadata } from "next";
import Link from "next/link";
import PromptLibrary from "@/components/hub/PromptLibrary";
import Footer from "@/components/Footer";
import { FREE_OPEN, promptCats, promptCount } from "@/data/prompts";
import { proCount, proPrompts } from "@/data/prompts-pro";
import { profile } from "@/data/site";

const total = promptCount + proCount;
const title = `${total} AI Prompts for Reels, Content, Ads & Business`;
const description = `${total} ready-to-copy AI prompts (${promptCount} free) for ChatGPT, Claude and Gemini: reel scripts, AI video, product photos, hooks, captions, ads, SEO, sales, freelancing and Urdu content.`;

export const metadata: Metadata = { title: { absolute: `${title} — Afshal.ai` }, description, alternates: { canonical: "/prompts" }, openGraph: { title, description, url: `${profile.site}/prompts` } };

export default function PromptsPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: `${profile.site}/prompts`, inLanguage: ["en", "ur"],
    author: { "@id": `${profile.site}/#person` },
    hasPart: promptCats.map((c) => ({ "@type": "ItemList", name: c.title, numberOfItems: c.prompts.length, itemListElement: c.prompts.slice(0, FREE_OPEN).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.t })) })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main" className="px-5 pb-16 pt-28 md:px-10 md:pt-36">
        <nav aria-label="Breadcrumb" className="text-sm text-mute"><Link href="/" className="hover:text-ink">Home</Link> / Prompt library</nav>
        <h1 className="display mt-4 text-[12vw] md:text-[5.6vw]">AI prompt library</h1>
        <p className="mb-6 mt-4 max-w-2xl text-lg text-mute">{total} prompts I use for client work: {promptCats.length * FREE_OPEN} open to everyone, {promptCount - promptCats.length * FREE_OPEN} more with a free account and {proCount} advanced ones in Pro. Copy one, replace the [BRACKETS] and paste it into ChatGPT, Claude or Gemini.</p>
        <PromptLibrary cats={promptCats.map((c) => ({ key: c.key, title: c.title, blurb: c.blurb, icon: c.icon, open: c.prompts.slice(0, FREE_OPEN), memberTitles: c.prompts.slice(FREE_OPEN).map((p) => p.t), proTitles: (proPrompts[c.key] ?? []).map((p) => p.t) }))} />
      </main>
      <Footer />
    </>
  );
}
