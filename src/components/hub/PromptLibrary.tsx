"use client";
import { useMemo, useState } from "react";
import Icon from "../ui/Icon";
import CopyButton from "./CopyButton";
import { promptCats } from "@/data/prompts";

/** Searchable, filterable prompt library. Every prompt is in the HTML for search engines. */
export default function PromptLibrary() {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return promptCats
      .filter((c) => cat === "all" || c.key === cat)
      .map((c) => ({ ...c, prompts: s ? c.prompts.filter((p) => (p.t + " " + p.p).toLowerCase().includes(s)) : c.prompts }))
      .filter((c) => c.prompts.length);
  }, [cat, q]);

  return (
    <div>
      <div className="sticky top-0 z-30 -mx-5 border-b border-line bg-bg/95 px-5 py-3 md:-mx-10 md:px-10">
        <label htmlFor="prompt-search" className="sr-only">Search prompts</label>
        <div className="flex items-center gap-3 rounded-full border border-line bg-bg-2 px-4">
          <Icon name="Search" className="h-4 w-4 shrink-0 text-mute" />
          <input id="prompt-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts, e.g. reel, caption, Urdu"
            className="h-11 w-full bg-transparent text-base text-ink outline-none placeholder:text-mute/60" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="tablist" aria-label="Prompt categories">
          {[{ key: "all", title: "All" }, ...promptCats].map((c) => (
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
            {c.prompts.map((p) => (
              <li key={p.t} className="flex flex-col rounded-[20px] border border-line bg-bg-2 p-5">
                <h3 className="text-lg font-semibold">{p.t}</h3>
                <p dir="auto" className="mt-2 flex-1 leading-relaxed text-mute">{p.p}</p>
                <CopyButton text={p.p} label="Copy prompt" className="mt-4 self-start" />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
