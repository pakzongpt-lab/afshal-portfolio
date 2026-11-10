import type { Metadata } from "next";
import Setup from "./Setup";

export const metadata: Metadata = { title: { absolute: "Admin setup — Afshal.ai" }, robots: { index: false, follow: false }, referrer: "no-referrer" };

export default function SetupPage() {
  return (
    <main id="main" className="px-5 pb-24 pt-28 md:px-10 md:pt-32">
      <h1 className="display mb-6 text-4xl md:text-5xl">Set up your admin account</h1>
      <Setup />
    </main>
  );
}
