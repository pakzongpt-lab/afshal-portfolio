"use client";
import { FadeUp, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import { ContactButton } from "../ui/ContactModal";

/** One services list for everything: marketing, brand & content, and the build. */
const groups = [
  {
    title: "Marketing",
    items: ["Meta, Google & TikTok ads", "SEO and search marketing", "Social media management", "Influencer campaigns", "Campaign planning and reporting"],
  },
  {
    title: "Brand & content",
    items: ["Logos and identity systems", "Brand guidelines", "Packaging, print and billboards", "Reels, video and motion graphics", "Content strategy and calendars"],
  },
  {
    title: "Build",
    items: ["Websites — WordPress, Elementor or custom", "Shopify and WooCommerce stores", "Web portals, dashboards and CRMs", "SaaS products and mobile apps", "AI chatbots and automations"],
  },
];

const tools = ["WordPress", "Elementor", "Shopify", "WooCommerce", "React / Next.js", "n8n", "Figma", "Google Analytics", "Ahrefs", "SEMrush"];

export default function DevServices() {
  return (
    <section id="services" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-8 md:grid-cols-12">
        <SplitLines className="display text-[12vw] md:col-span-7 md:text-[5.6vw]" lines={["What I do"]} />
        <div className="self-end md:col-span-5">
          <p className="text-lg leading-relaxed text-mute">Most clients come to me for one of these and stay for two or three. Because one person handles all of it, the ads, the content and the website work from the same plan.</p>
        </div>
      </div>

      <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8">
        {groups.map((g, i) => (
          <FadeUp key={g.title} delay={i * 0.06}>
            <h3 className="display text-3xl">{g.title}</h3>
            <ul className="mt-5 space-y-3 text-lg text-mute">
              {g.items.map((it) => (
                <li key={it} className="flex gap-3"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{it}</li>
              ))}
            </ul>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-mute"><span className="text-ink">Tools I use:</span> {tools.join(" · ")}</p>
        <ContactButton topic="Website / software development" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-[#111] transition-transform active:scale-[0.97]">
          Start a project <Icon name="ArrowRight" className="h-4 w-4" />
        </ContactButton>
      </div>
    </section>
  );
}
