import type { Metadata } from "next";
import Admin from "./Admin";

export const metadata: Metadata = { title: { absolute: "Admin — Afshal.ai" }, robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <main id="main" className="px-5 pb-24 pt-28 md:px-10 md:pt-32">
      <h1 className="display mb-6 text-4xl md:text-5xl">Admin</h1>
      <Admin />
    </main>
  );
}
