"use client";
import { useRef, useState } from "react";
import Icon from "../ui/Icon";
import CopyButton from "./CopyButton";
import { generators, generatorTasks, type GeneratorKey } from "@/data/hub";

const LANGS = [["english", "English"], ["roman-urdu", "Roman Urdu"], ["urdu", "اردو"]] as const;

/** Free AI content generator: reel scripts, hooks, captions, plans and AI video prompts. */
export default function Generator() {
  const [tool, setTool] = useState<GeneratorKey>("reel");
  const [lang, setLang] = useState<string>("english");
  const [topic, setTopic] = useState("");
  const [out, setOut] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [err, setErr] = useState<"" | "short" | "limit" | "off">("");
  const abort = useRef<AbortController | null>(null);
  const g = generators.find((x) => x.key === tool)!;
  const fallbackPrompt = `${generatorTasks[tool]}\nWrite in ${LANGS.find((l) => l[0] === lang)![1]}.\nTopic: ${topic.trim() || "[YOUR TOPIC]"}`;

  const run = async () => {
    if (topic.trim().length < 4) { setErr("short"); setState("error"); return; }
    abort.current?.abort();
    const ctl = new AbortController(); abort.current = ctl;
    setErr(""); setOut(""); setState("loading");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tool, topic, language: lang }), signal: ctl.signal });
      if (!res.ok || !res.body) { setErr(res.status === 429 ? "limit" : "off"); setState("error"); return; }
      const reader = res.body.getReader(); const dec = new TextDecoder();
      while (true) { const { done, value } = await reader.read(); if (done) break; setOut((o) => o + dec.decode(value, { stream: true })); }
      setState("done");
    } catch (e) {
      if ((e as Error).name !== "AbortError") { setErr("off"); setState("error"); }
    }
  };

  return (
    <section id="create" className="relative scroll-mt-20 px-5 py-14 md:px-10 md:py-20">
      <div className="grid gap-6 md:grid-cols-12">
        <h2 className="display text-[11vw] md:col-span-7 md:text-[5vw]">Create content with AI</h2>
        <p className="self-end text-lg leading-relaxed text-mute md:col-span-5">Type your business or topic. Get a reel script, hooks, captions, a week of content or AI video prompts in seconds. Free, no sign-up.</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="rounded-[24px] border border-line bg-bg-2 p-5 md:p-7 lg:col-span-5">
          <fieldset>
            <legend className="text-sm text-mute">What do you need?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {generators.map((x) => (
                <button key={x.key} type="button" aria-pressed={tool === x.key} onClick={() => setTool(x.key)}
                  className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${tool === x.key ? "border-accent bg-accent text-[#111]" : "border-line text-mute hover:text-ink"}`}>
                  <Icon name={x.icon} className="h-4 w-4" />{x.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label htmlFor="gen-topic" className="mt-6 block text-sm text-mute">Your business or topic</label>
          <textarea id="gen-topic" rows={3} maxLength={300} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={g.placeholder}
            className="mt-2 w-full resize-none rounded-2xl border border-line bg-bg px-4 py-3 text-lg text-ink outline-none placeholder:text-mute/60 focus:border-accent" />

          <fieldset className="mt-4">
            <legend className="text-sm text-mute">Language</legend>
            <div className="mt-2 flex gap-2">
              {LANGS.map(([k, l]) => (
                <button key={k} type="button" aria-pressed={lang === k} onClick={() => setLang(k)}
                  className={`h-10 rounded-full border px-4 text-sm transition-colors ${lang === k ? "border-white/60 text-ink" : "border-line text-mute hover:text-ink"}`}>{l}</button>
              ))}
            </div>
          </fieldset>

          <button type="submit" disabled={state === "loading"}
            className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-[#111] transition-transform active:scale-[0.98] disabled:opacity-60">
            {state === "loading" ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" /> Writing…</> : <><Icon name="Sparkles" className="h-4 w-4" /> Generate {g.label.toLowerCase()}</>}
          </button>
          {err === "short" && <p role="alert" className="mt-3 text-sm text-amber-200">Add a few words about your business or topic first.</p>}
        </form>

        <div className="flex min-h-[320px] flex-col rounded-[24px] border border-line bg-bg-2 p-5 md:p-7 lg:col-span-7" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-mute">{g.label}</span>
            {out && state !== "loading" && <CopyButton text={out} />}
          </div>
          {out ? (
            <div dir="auto" className="mt-4 whitespace-pre-wrap text-lg leading-relaxed">{out}{state === "loading" && <span className="ml-0.5 inline-block h-5 w-2 animate-pulse bg-accent align-middle" />}</div>
          ) : err === "limit" ? (
            <p role="alert" className="mt-4 text-lg text-mute">You&apos;ve used the free generator a lot in the last few minutes. Try again in 10 minutes, or copy a ready prompt from the <a href="/prompts" className="text-ink underline underline-offset-4">prompt library</a>.</p>
          ) : err === "off" ? (
            <div role="alert" className="mt-4">
              <p className="text-lg text-mute">The live generator isn&apos;t available right now. Copy this prompt into ChatGPT, Claude or Gemini and you&apos;ll get the same result:</p>
              <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-line bg-bg p-4 font-sans text-base">{fallbackPrompt}</pre>
              <CopyButton text={fallbackPrompt} label="Copy prompt" className="mt-3" />
            </div>
          ) : state === "loading" ? (
            <div className="mt-6 space-y-3" aria-hidden>{[90, 70, 82, 55].map((w) => <div key={w} className="h-4 animate-pulse rounded bg-white/10" style={{ width: `${w}%` }} />)}</div>
          ) : (
            <div className="m-auto max-w-sm py-10 text-center text-mute">
              <Icon name="Sparkles" className="mx-auto h-8 w-8 text-accent" />
              <p className="mt-4 text-lg">Your {g.label.toLowerCase()} will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
