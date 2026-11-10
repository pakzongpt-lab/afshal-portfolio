import type { Metadata } from "next";
import AccountForm from "./AccountForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: { absolute: "Your account — Afshal.ai" }, robots: { index: false }, alternates: { canonical: "/account" } };

export default function AccountPage() {
  return (
    <>
      <main id="main" className="px-5 pb-16 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h1 className="display text-[11vw] md:text-[4vw]">Your free account</h1>
            <ul className="mt-6 space-y-3 text-lg text-mute">
              {["60 more prompts unlocked straight away", "New prompts as they're added", "One place to upgrade to Pro and download the library"].map((t) => <li key={t} className="flex gap-3"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{t}</li>)}
            </ul>
            <p className="mt-6 text-sm text-mute">Your details are used only for your account and, if you tick the box, WhatsApp updates. They are never sold.</p>
          </div>
          <AccountForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
