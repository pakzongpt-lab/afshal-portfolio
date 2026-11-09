"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import Robot, { type RobotMood } from "../ui/Robot";
import { useContact } from "../ui/ContactModal";
import { WHATSAPP_NUMBER } from "../WhatsAppFloat";

const EASE = [0.23, 1, 0.32, 1] as const;
const API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const KEY = process.env.NEXT_PUBLIC_PSI_KEY;

type Strategy = "mobile" | "desktop";
type Audit = { id: string; title: string; description: string; score: number | null; scoreDisplayMode: string; displayValue?: string; numericValue?: number; details?: { data?: string; overallSavingsMs?: number } };
type Category = { id: string; title: string; score: number | null; auditRefs: { id: string; weight: number; group?: string }[] };
type Field = { percentile: number; category: "FAST" | "AVERAGE" | "SLOW" };
type Report = {
  url: string;
  strategy: Strategy;
  scores: { key: string; label: string; score: number }[];
  lab: { label: string; value: string; score: number | null }[];
  field: { label: string; value: string; category: Field["category"] }[] | null;
  issues: { id: string; cat: string; title: string; detail: string; value?: string; severity: "high" | "medium" }[];
  passed: number;
  shot?: string;
};

const CATS = [
  { key: "performance", label: "Speed" },
  { key: "seo", label: "SEO" },
  { key: "accessibility", label: "Accessibility" },
  { key: "best-practices", label: "Best practices" },
];
const CAT_SHORT: Record<string, string> = { performance: "Speed", seo: "SEO", accessibility: "Accessibility", "best-practices": "Best practices" };
const STAGES = ["Opening your website", "Measuring load speed", "Checking SEO tags", "Testing accessibility", "Reviewing security & best practices", "Writing your report"];

const clean = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`/g, "").replace(/\s*Learn (more|how).*$/i, "").trim();
const tone = (s: number) => (s >= 90 ? "#3ee6a0" : s >= 50 ? "#ffb547" : "#ff5c6c");
const verdict = (s: number) => (s >= 90 ? "Good" : s >= 50 ? "Needs work" : "Poor");

function normalise(raw: string): string | null {
  let u = raw.trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  try {
    const p = new URL(u);
    if (!p.hostname.includes(".")) return null;
    return p.toString();
  } catch { return null; }
}

function parse(json: any, strategy: Strategy): Report {
  const lh = json.lighthouseResult;
  const audits: Record<string, Audit> = lh.audits;
  const cats: Record<string, Category> = lh.categories;
  const scores = CATS.filter((c) => cats[c.key]).map((c) => ({ key: c.key, label: c.label, score: Math.round((cats[c.key].score ?? 0) * 100) }));

  const lab = [
    ["largest-contentful-paint", "Largest content shows"],
    ["first-contentful-paint", "First content shows"],
    ["total-blocking-time", "Page blocked"],
    ["cumulative-layout-shift", "Layout shift"],
    ["speed-index", "Speed index"],
  ].filter(([id]) => audits[id]).map(([id, label]) => ({ label, value: audits[id].displayValue ?? "—", score: audits[id].score }));

  const m = json.loadingExperience?.metrics;
  const field = m && (m.LARGEST_CONTENTFUL_PAINT_MS || m.INTERACTION_TO_NEXT_PAINT)
    ? ([
        ["LARGEST_CONTENTFUL_PAINT_MS", "Real-user load (LCP)", (v: number) => `${(v / 1000).toFixed(1)} s`],
        ["INTERACTION_TO_NEXT_PAINT", "Real-user response (INP)", (v: number) => `${v} ms`],
        ["CUMULATIVE_LAYOUT_SHIFT_SCORE", "Real-user layout shift", (v: number) => (v / 100).toFixed(2)],
      ] as const)
        .filter(([k]) => m[k])
        .map(([k, label, f]) => ({ label, value: f(m[k].percentile), category: m[k].category }))
    : null;

  const seen = new Set<string>();
  const issues: Report["issues"] = [];
  let passed = 0;
  for (const c of CATS) {
    const cat = cats[c.key];
    if (!cat) continue;
    for (const ref of cat.auditRefs) {
      const a = audits[ref.id];
      if (!a || ref.group === "metrics" || seen.has(a.id)) continue;
      if (["notApplicable", "manual", "informative", "error"].includes(a.scoreDisplayMode) || a.score === null) continue;
      seen.add(a.id);
      if (a.score >= 0.9) { passed++; continue; }
      const savings = a.details?.overallSavingsMs ?? 0;
      issues.push({
        id: a.id,
        cat: c.key,
        title: clean(a.title),
        detail: clean(a.description).split(/(?<=\.)\s/)[0],
        value: a.displayValue && !/^0\b/.test(a.displayValue) ? a.displayValue : undefined,
        severity: a.score < 0.5 || ref.weight >= 3 || savings > 800 ? "high" : "medium",
        // sort key
        ...({ _w: ref.weight * 10 + savings / 100 + (1 - a.score) * 5 } as object),
      });
    }
  }
  issues.sort((x: any, y: any) => y._w - x._w);

  return {
    url: lh.finalDisplayedUrl || lh.finalUrl || json.id,
    strategy,
    scores,
    lab,
    field,
    issues: issues.slice(0, 10),
    passed,
    shot: audits["final-screenshot"]?.details?.data,
  };
}

function Ring({ label, score, delay }: { label: string; score: number; delay: number }) {
  const reduce = useReducedMotion();
  const r = 34, c = 2 * Math.PI * r;
  const [n, setN] = useState(reduce ? score : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0; const t0 = performance.now() + delay * 1000;
    const step = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - t0) / 1100));
      setN(Math.round(score * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score, delay, reduce]);
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white/[0.02] p-4">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,.08)" strokeWidth="7" fill="none" />
          <circle cx="40" cy="40" r={r} stroke={tone(score)} strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - n / 100)} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-2xl font-semibold tabular-nums" style={{ color: tone(score) }}>{n}</span>
      </div>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs" style={{ color: tone(score) }}>{verdict(score)}</span>
    </div>
  );
}

const fieldTone = { FAST: "#3ee6a0", AVERAGE: "#ffb547", SLOW: "#ff5c6c" } as const;
const fieldWord = { FAST: "Good", AVERAGE: "Needs work", SLOW: "Poor" } as const;

export default function WebsiteCheck() {
  const [input, setInput] = useState("");
  const [strategy, setStrategy] = useState<Strategy>("mobile");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [stage, setStage] = useState(0);
  const [err, setErr] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const { open } = useContact();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (state !== "loading") return;
    setStage(0);
    const t = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 5200);
    return () => clearInterval(t);
  }, [state]);

  useEffect(() => () => abort.current?.abort(), []);

  const run = async (target?: string, strat: Strategy = strategy) => {
    const url = normalise(target ?? input);
    if (!url) { setErr("Enter a full website address, like yourbrand.com"); setState("error"); inputRef.current?.focus(); return; }
    abort.current?.abort();
    const ctl = new AbortController(); abort.current = ctl;
    setErr(""); setState("loading"); setReport(null);
    const q = new URLSearchParams({ url, strategy: strat });
    CATS.forEach((c) => q.append("category", c.key.toUpperCase().replace("-", "_")));
    if (KEY) q.set("key", KEY);
    try {
      const res = await fetch(`${API}?${q}`, { signal: ctl.signal });
      const json = await res.json();
      if (!res.ok || !json.lighthouseResult) {
        const msg: string = json?.error?.message ?? "";
        if (res.status === 429 || /quota/i.test(msg)) throw new Error("busy");
        if (/FAILED_DOCUMENT_REQUEST|ERRORED_DOCUMENT_REQUEST|DNS|NO_FCP|unreachable/i.test(msg)) throw new Error("unreachable");
        throw new Error("generic");
      }
      setReport(parse(json, strat));
      setState("done");
      requestAnimationFrame(() => {
        const el = resultRef.current;
        if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.2 });
        else el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      const k = (e as Error).message;
      setErr(
        k === "busy" ? "Google's free checker is busy right now. Wait a minute and try again, or open the full report on PageSpeed Insights."
        : k === "unreachable" ? "That website couldn't be opened. Check the address is right and the site is online."
        : "The check didn't finish. Try again, or open the full report on PageSpeed Insights."
      );
      setState("error");
    }
  };

  const mood: RobotMood = state === "loading" ? "scan" : state === "error" ? "worried" : state === "done" && report ? (Math.min(...report.scores.map((s) => s.score)) >= 80 ? "happy" : "worried") : "idle";
  const psiLink = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(normalise(input) ?? "")}`;
  const waText = report
    ? `Hi Afshal, I checked ${report.url} on your website checker (${report.strategy}): ${report.scores.map((s) => `${s.label} ${s.score}`).join(", ")}. Can you help me improve it?`
    : "";

  return (
    <section id="website-check" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_80%_20%,rgba(77,141,255,.14),transparent_70%)]" />
      <div className="relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel>Free website check</SectionLabel>
          <SplitLines className="display mt-8 text-[12vw] md:text-[6.2vw]" lines={["Is your website", <span key="s">a <span className="serif font-normal text-accent">sales machine</span>?</span>]} />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            A good website loads fast, ranks on Google, works for every visitor and turns them into enquiries. Enter your address and get real scores from Google&apos;s Lighthouse — speed, SEO, accessibility and best practices — with the exact issues holding it back.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); run(); }}
            className="mt-9 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,.35)] sm:flex-row sm:items-center"
          >
            <label htmlFor="site-url" className="sr-only">Your website address</label>
            <div className="flex flex-1 items-center gap-3 px-3">
              <Icon name="Globe" className="h-5 w-5 shrink-0 text-mute" />
              <input
                ref={inputRef}
                id="site-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                spellCheck={false}
                placeholder="yourbrand.com"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-12 w-full bg-transparent text-lg text-ink outline-none placeholder:text-mute/60"
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-ink px-6 text-sm font-semibold text-bg transition-transform active:scale-[0.97] disabled:opacity-60"
            >
              {state === "loading" ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" /> Checking…</> : <>Check my website <Icon name="ArrowRight" className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            {(["mobile", "desktop"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={strategy === s}
                onClick={() => { setStrategy(s); if (report) run(report.url, s); }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors ${strategy === s ? "border-accent/60 bg-accent/15 text-ink" : "border-line text-mute hover:text-ink"}`}
              >
                <Icon name={s === "mobile" ? "Smartphone" : "Monitor"} className="h-4 w-4" /> {s === "mobile" ? "Mobile" : "Desktop"}
              </button>
            ))}
            <span className="ml-1 inline-flex items-center gap-1.5 text-xs text-mute"><Icon name="BadgeCheck" className="h-4 w-4 text-accent" /> Powered by Google PageSpeed Insights</span>
          </div>

          <AnimatePresence mode="wait">
            {state === "loading" && (
              <motion.ol key="stages" className="mt-8 grid gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-live="polite">
                {STAGES.map((s, i) => (
                  <li key={s} className={`flex items-center gap-3 text-sm transition-colors duration-500 ${i < stage ? "text-ink" : i === stage ? "text-ink" : "text-mute/50"}`}>
                    <span className={`grid h-5 w-5 place-items-center rounded-full border ${i < stage ? "border-emerald-400 bg-emerald-400/15 text-emerald-300" : i === stage ? "border-accent" : "border-line"}`}>
                      {i < stage ? <Icon name="Check" className="h-3 w-3" /> : i === stage ? <span className="h-1.5 w-1.5 animate-ping rounded-full bg-accent" /> : null}
                    </span>
                    {s}
                  </li>
                ))}
              </motion.ol>
            )}
            {state === "error" && (
              <motion.div key="err" role="alert" className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] p-4 text-sm text-amber-100" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {err}
                {normalise(input) && <a href={psiLink} target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-4">Open on PageSpeed Insights</a>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative flex items-end justify-center md:col-span-5">
          <motion.div className="relative w-[230px] md:w-[300px]" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <Robot mood={mood} className="w-full drop-shadow-[0_30px_60px_rgba(77,141,255,.25)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={mood}
                className="absolute -left-4 top-2 max-w-[200px] rounded-2xl rounded-bl-sm border border-white/10 bg-[#11131c]/90 px-4 py-3 text-sm shadow-xl backdrop-blur md:-left-16"
                initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
              >
                {mood === "scan" ? "Scanning your site…" : mood === "happy" ? "Looking great!" : mood === "worried" ? (state === "error" ? "Hmm, I couldn't finish." : "Found a few things to fix.") : "Give me a website to check."}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div ref={resultRef} className="relative">
        <AnimatePresence>
          {state === "done" && report && (
            <motion.div key={report.url + report.strategy} className="mt-14 grid gap-4 lg:grid-cols-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <div className="rounded-[28px] border border-line bg-bg-2 p-5 md:p-7 lg:col-span-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="label">Report · {report.strategy}</div>
                  <a href={report.url} target="_blank" rel="noopener noreferrer" className="truncate text-sm text-mute hover:text-ink">{report.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {report.scores.map((s, i) => <Ring key={s.key} label={s.label} score={s.score} delay={i * 0.12} />)}
                </div>

                <h3 className="mt-8 text-lg font-semibold">Speed numbers</h3>
                <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                  {report.lab.map((l) => (
                    <div key={l.label} className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm">
                      <dt className="text-mute">{l.label}</dt>
                      <dd className="font-semibold tabular-nums" style={{ color: l.score === null ? undefined : tone(Math.round(l.score * 100)) }}>{l.value}</dd>
                    </div>
                  ))}
                </dl>
                {report.field && (
                  <>
                    <h3 className="mt-8 text-lg font-semibold">What real visitors experience <span className="text-sm font-normal text-mute">· last 28 days, Chrome users</span></h3>
                    <dl className="mt-3 grid gap-2 sm:grid-cols-3">
                      {report.field.map((f) => (
                        <div key={f.label} className="rounded-xl border border-line px-4 py-3 text-sm">
                          <dt className="text-mute">{f.label}</dt>
                          <dd className="mt-1 flex items-baseline justify-between font-semibold tabular-nums"><span>{f.value}</span><span className="text-xs" style={{ color: fieldTone[f.category] }}>{fieldWord[f.category]}</span></dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}

                <h3 className="mt-8 text-lg font-semibold">
                  {report.issues.length ? `What to fix first (${report.issues.length})` : "No major issues found"}
                  <span className="ml-2 text-sm font-normal text-mute">{report.passed} checks passed</span>
                </h3>
                <ul className="mt-3 grid gap-2">
                  {report.issues.map((it, i) => (
                    <motion.li key={it.id} className="rounded-xl border border-line bg-white/[0.02] px-4 py-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: EASE }}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${it.severity === "high" ? "bg-[#ff5c6c]" : "bg-[#ffb547]"}`} />
                        <span className="font-medium">{it.title}</span>
                        <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-mute">{CAT_SHORT[it.cat]}</span>
                        {it.value && <span className="ml-auto text-xs tabular-nums text-mute">{it.value}</span>}
                      </div>
                      {it.detail && <p className="mt-1.5 pl-4 text-sm leading-snug text-mute">{it.detail}</p>}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 lg:col-span-4">
                {report.shot && (
                  <div className="mx-auto w-[220px] overflow-hidden rounded-[30px] border-[6px] border-[#1c1c22] bg-black shadow-[0_30px_80px_rgba(0,0,0,.6)] lg:w-full lg:max-w-[260px]">
                    <img src={report.shot} alt={`How ${report.url} looks to Google on ${report.strategy}`} className="w-full" />
                  </div>
                )}
                <div className="rounded-[28px] border border-accent/30 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(77,141,255,.22),transparent_60%),#0c0d14] p-6">
                  <div className="label">Want these fixed?</div>
                  <p className="mt-3 text-lg leading-snug">I&apos;ll turn this report into a faster, better-ranking website that brings in more enquiries.</p>
                  <div className="mt-5 grid gap-2">
                    <button type="button" onClick={() => open("Website fix / improvement")} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bg transition-transform active:scale-[0.97]">
                      Fix my website <Icon name="ArrowRight" className="h-4 w-4" />
                    </button>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/5">
                      <Icon name="MessageCircle" className="h-4 w-4" /> Send report on WhatsApp
                    </a>
                    <a href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(report.url)}`} target="_blank" rel="noopener noreferrer" className="text-center text-xs text-mute underline-offset-4 hover:text-ink hover:underline">Full report on PageSpeed Insights</a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
