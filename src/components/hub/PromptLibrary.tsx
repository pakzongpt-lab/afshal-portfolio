"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "../ui/Icon";
import CopyButton from "./CopyButton";

type P = { t: string; p: string };
export type LibCat = { key: string; title: string; blurb: string; icon: string; open: P[]; memberTitles: string[]; proTitles: string[] };
type Unlocked = { tier: "guest" | "member" | "pro"; member: Record<string, P[]>; pro: Record<string, P[]> };

/** Searchable prompt library. Open prompts are in the page; member and Pro prompts load after sign-in. */
export default function PromptLibrary({ cats }: { cats: LibCat[] }) {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const [u, setU] = useState<Unlocked>({ tier: "guest", member: {}, pro: {} });
  useEffect(() => { fetch("/api/prompts").then((r) => r.json()).then(setU).catch(() => {}); }, []);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    const hit = (t: string, p = "") => !s || (t + " " + p).toLowerCase().includes(s);
    return cats.filter((c) => cat === "all" || c.key === cat).map((c) => {
      const member = u.member[c.key], pro = u.pro[c.key];
      return {
        ...c,
        items: [
          ...c.open.filter((p) => hit(p.t, p.p)).map((p) => ({ ...p, lock: "" })),
          ...(member ? member.filter((p) => hit(p.t, p.p)).map((p) => ({ ...p, lock: "" })) : c.memberTitles.filter((t) => hit(t)).map((t) => ({ t, p: "", lock: "member" }))),
          ...(pro ? pro.filter((p) => hit(p.t, p.p)).map((p) => ({ ...p, lock: "", pro: true })) : c.proTitles.filter((t) => hit(t)).map((t) => ({ t, p: "", lock: "pro" }))),
        ] as (P & { lock: string; pro?: boolean })[],
      };
    }).filter((c) => c.items.length);
  }, [cat, q, u, cats]);

  return (
    <div>
      {u.tier === "guest" && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-accent/50 bg-bg-2 p-4">
          <p className="text-base"><span className="font-semibold">Free account:</span> unlock 60 more prompts. No payment needed.</p>
          <Link href="/account?next=/prompts" className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[#111]">Sign up free <Icon name="ArrowRight" className="h-4 w-4" /></Link>
        </div>
      )}
      {u.tier === "member" && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-accent/50 bg-bg-2 p-4">
          <p className="text-base"><span className="font-semibold">Pro:</span> 50 advanced workflow prompts, downloads and every new prompt for 12 months.</p>
          <Link href="/pricing" className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[#111]">Unlock Pro <Icon name="ArrowRight" className="h-4 w-4" /></Link>
        </div>
      )}
      {u.tier === "pro" && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-[20px] border border-line bg-bg-2 p-4">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[#111]">PRO</span>
          <span className="text-base">Download the full library:</span>
          {["txt", "md", "json"].map((f) => <a key={f} href={`/api/prompts?download=${f}`} className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-sm hover:border-white/50">.{f}</a>)}
        </div>
      )}

      <div className="sticky top-0 z-30 -mx-5 border-b border-line bg-bg/95 px-5 py-3 md:-mx-10 md:px-10">
        <label htmlFor="prompt-search" className="sr-only">Search prompts</label>
        <div className="flex items-center gap-3 rounded-full border border-line bg-bg-2 px-4">
          <Icon name="Search" className="h-4 w-4 shrink-0 text-mute" />
          <input id="prompt-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts, e.g. reel, caption, Urdu"
            className="h-11 w-full bg-transparent text-base text-ink outline-none placeholder:text-mute/60" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="tablist" aria-label="Prompt categories">
          {[{ key: "all", title: "All" }, ...cats].map((c) => (
            <button key={c.key} role="tab" aria-selected={cat === c.key} onClick={() => setCat(c.key)}
              className={`h-10 shrink-0 rounded-full border px-4 text-sm transition-colors ${cat === c.key ? "border-accent bg-accent text-[#111]" : "border-line text-mute hover:text-ink"}`}>{c.title}</button>
          ))}
        </div>
      </div>

      {shown.length === 0 && <p className="py-16 text-center text-lg text-mute">No prompts match “{q}”. Try a shorter word.</p>}

      {shown.map((c) => (
        <section key={c.key} id={c.key} className="scroll-mt-36 pt-10">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-[#111]"><Icon name={c.icon} className="h-5 w-5" /></span>
            <div>
              <h2 className="display text-2xl md:text-3xl">{c.title}</h2>
              <p className="text-sm text-mute">{c.blurb}</p>
            </div>
          </div>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {c.items.map((p) => (
              <li key={p.t} className={`flex flex-col rounded-[20px] border bg-bg-2 p-5 ${p.lock ? "border-dashed border-white/15" : "border-line"}`}>
                <h3 className="flex items-start justify-between gap-3 text-lg font-semibold">
                  {p.t}
                  {(p.lock === "pro" || p.pro) && <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-[#111]">PRO</span>}
                </h3>
                {p.lock ? (
                  <>
                    <p aria-hidden className="mt-2 flex-1 select-none leading-relaxed text-mute/40 blur-[5px]">Write a detailed, ready-to-use prompt for this exact job, with the brackets you fill in and the output format you get back.</p>
                    <Link href={p.lock === "pro" ? "/pricing" : "/account?next=/prompts"} className="mt-4 inline-flex h-10 items-center gap-2 self-start rounded-full border border-white/20 px-4 text-sm hover:border-accent">
                      <Icon name="Lock" className="h-4 w-4" />{p.lock === "pro" ? "Unlock with Pro" : "Free with an account"}
                    </Link>
                  </>
                ) : (
                  <>
                    <p dir="auto" className="mt-2 flex-1 leading-relaxed text-mute">{p.p}</p>
                    <CopyButton text={p.p} label="Copy prompt" className="mt-4 self-start" />
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
