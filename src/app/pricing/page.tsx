import type { Metadata } from "next";
import Link from "next/link";
import Pay from "./Pay";
import Footer from "@/components/Footer";
import { promptCount } from "@/data/prompts";
import { proCount } from "@/data/prompts-pro";
import { profile } from "@/data/site";

const description = "Afshal.ai plans: free AI tools and prompts, or Pro for advanced workflow prompts, downloads and 12 months of new prompts. Pay by Easypaisa, JazzCash or bank transfer.";
export const metadata: Metadata = { title: { absolute: "Pricing — Afshal.ai Pro prompt library" }, description, alternates: { canonical: "/pricing" }, openGraph: { title: "Afshal.ai pricing", description, url: `${profile.site}/pricing` } };

const Li = ({ children }: { children: React.ReactNode }) => <li className="flex gap-3"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{children}</li>;

export default function PricingPage() {
  return (
    <>
      <main id="main" className="px-5 pb-16 pt-28 md:px-10 md:pt-36">
        <nav aria-label="Breadcrumb" className="text-sm text-mute"><Link href="/" className="hover:text-ink">Home</Link> / Pricing</nav>
        <h1 className="display mt-4 text-[12vw] md:text-[5.6vw]">Free, or Pro for life</h1>
        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div className="grid gap-4 lg:col-span-5">
            <div className="rounded-[24px] border border-line bg-bg-2 p-6">
              <h2 className="display text-2xl">Free</h2>
              <ul className="mt-4 space-y-2 text-mute"><Li>AI content generator and website check</Li><Li>{promptCount} prompts with a free account</Li><Li>AI tools directory</Li></ul>
              <Link href="/account" className="mt-5 inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-sm hover:border-white/50">Create free account</Link>
            </div>
            <div className="rounded-[24px] border border-accent bg-bg-2 p-6">
              <h2 className="display text-2xl">Pro <span className="text-base font-normal text-mute">· one payment</span></h2>
              <ul className="mt-4 space-y-2 text-mute"><Li>Everything in Free</Li><Li>{proCount} advanced workflow prompts (campaigns, funnels, shoot plans, chatbots)</Li><Li>Download the whole library as .txt, .md or .json</Li><Li>Every prompt added in the next 12 months</Li></ul>
            </div>
            <p className="text-sm text-mute"><strong className="text-ink">Refunds:</strong> within 7 days if Pro isn&apos;t what you expected; message me on WhatsApp. Payments are checked by hand, so unlocking can take a few hours.</p>
          </div>
          <div className="lg:col-span-7"><Pay /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
