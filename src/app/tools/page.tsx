import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/Icon";
import { skills, toolGroups } from "@/data/hub";
import { profile } from "@/data/site";

const title = "Best AI Tools for Content, Reels, Images & Automation";
const description = "A short, practical list of AI tools for writing, images, video and reels, voice, music and automation, plus Claude skills to start with. What each tool is good for.";

export const metadata: Metadata = { title: { absolute: `${title} — Afshal.ai` }, description, alternates: { canonical: "/tools" }, openGraph: { title, description, url: `${profile.site}/tools` } };

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "ItemList", name: title, description, url: `${profile.site}/tools`,
    itemListElement: toolGroups.flatMap((g) => g.tools).map((t, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "SoftwareApplication", name: t.name, url: t.url, description: t.use, applicationCategory: "AI tool" } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main" className="px-5 pb-16 pt-28 md:px-10 md:pt-36">
        <nav aria-label="Breadcrumb" className="text-sm text-mute"><Link href="/" className="hover:text-ink">Home</Link> / AI tools</nav>
        <h1 className="display mt-4 text-[12vw] md:text-[5.6vw]">AI tools &amp; skills</h1>
        <p className="mt-4 max-w-2xl text-lg text-mute">The tools I reach for in marketing and content work, grouped by job. Plans and prices change often, so check each tool&apos;s own site.</p>

        {toolGroups.map((g) => (
          <section key={g.title} className="pt-10">
            <h2 className="display text-2xl md:text-3xl">{g.title}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {g.tools.map((t) => (
                <li key={t.name}>
                  <a href={t.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-[20px] border border-line bg-bg-2 p-5 transition-colors hover:border-accent">
                    <span className="flex items-center justify-between text-lg font-semibold">{t.name}<Icon name="ArrowUpRight" className="h-4 w-4 text-mute group-hover:text-accent" /></span>
                    <span className="mt-2 leading-snug text-mute">{t.use}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="pt-10">
          <h2 className="display text-2xl md:text-3xl">Claude skills to start with</h2>
          <p className="mt-2 max-w-2xl text-mute">Skills are small instruction packs that teach Claude a specific job.</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {skills.map((t) => (
              <li key={t.name}>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-[20px] border border-line bg-bg-2 p-5 transition-colors hover:border-accent">
                  <span className="flex items-center justify-between text-lg font-semibold">{t.name}<Icon name="ArrowUpRight" className="h-4 w-4 text-mute group-hover:text-accent" /></span>
                  <span className="mt-2 leading-snug text-mute">{t.use}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-lg">Need prompts for these tools? <Link href="/prompts" className="text-accent underline underline-offset-4">Open the prompt library</Link>.</p>
      </main>
      <Footer />
    </>
  );
}
