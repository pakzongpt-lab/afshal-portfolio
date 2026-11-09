"use client";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FadeUp, SectionLabel, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import { ContactButton } from "../ui/ContactModal";
import { automations, flows, salesMachine, siteIssues, type Flow } from "@/data/v2";

/* ---------- Website = sales machine ---------- */

function Funnel() {
  const reduce = useReducedMotion();
  // particle paths: most drop out at each stage, a few reach the bottom
  const paths = [
    "M150 10 C150 60 40 70 20 95",
    "M190 10 C190 60 280 75 300 100",
    "M120 10 C120 120 60 150 30 185",
    "M220 10 C220 120 260 150 290 190",
    "M170 10 C170 140 170 200 140 230 C120 250 110 270 120 290",
    "M160 10 C160 140 160 200 160 260 L160 330",
    "M140 10 C140 140 150 220 150 260 L158 330",
    "M200 10 C200 120 180 180 200 235 C210 255 230 265 250 280",
  ];
  const layers = [
    { y: 18, w: 300, label: "Visitors", icon: "MousePointerClick" },
    { y: 128, w: 220, label: "Leads", icon: "Filter" },
    { y: 238, w: 120, label: "Customers", icon: "Sparkles" },
  ];
  return (
    <svg viewBox="0 0 320 350" className="h-full w-full" role="img" aria-label="Animated sales funnel: visitors become leads, leads become customers">
      <defs>
        <linearGradient id="fnl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd400" stopOpacity=".35" /><stop offset="1" stopColor="#ffd400" stopOpacity=".55" /></linearGradient>
      </defs>
      {layers.map((l, i) => (
        <g key={l.label}>
          <path d={`M${160 - l.w / 2} ${l.y} L${160 + l.w / 2} ${l.y} L${160 + (l.w - 70) / 2} ${l.y + 92} L${160 - (l.w - 70) / 2} ${l.y + 92} Z`} fill="url(#fnl)" stroke="rgba(255,255,255,.18)" />
          <text x="160" y={l.y + 52} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="600" style={{ fontFamily: "var(--font-display)" }}>{l.label}</text>
          {i < 2 && <path d={`M160 ${l.y + 94} l0 14`} stroke="rgba(255,255,255,.3)" strokeDasharray="2 3" />}
        </g>
      ))}
      {!reduce && paths.map((d, i) => (
        <circle key={i} r={i >= 4 && i <= 6 ? 4 : 3} fill={i >= 4 && i <= 6 ? "#ffd400" : "#fff"} opacity=".9">
          <animateMotion dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
          <animate attributeName="opacity" values="0;1;1;0" dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="160" cy="336" r="9" fill="#ffd400" opacity=".9"><animate attributeName="r" values="7;10;7" dur="1.6s" repeatCount="indefinite" /></circle>
    </svg>
  );
}

function SiteScanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [fixed, setFixed] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setFixed((f) => (f >= siteIssues.length + 2 ? 0 : f + 1)), 900);
    return () => clearInterval(t);
  }, [inView]);
  const score = Math.round(38 + (Math.min(fixed, siteIssues.length) / siteIssues.length) * 60);
  return (
    <div ref={ref} className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0c13] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
        <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-mute">yourwebsite.com — health check</span>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-[auto,1fr] sm:items-center">
        <div className="relative mx-auto grid h-28 w-28 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90"><circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3" />
            <motion.circle cx="18" cy="18" r="15.5" fill="none" stroke={score > 80 ? "#2fd06b" : score > 60 ? "#ffd400" : "#ff5f57"} strokeWidth="3" strokeLinecap="round" pathLength={1} animate={{ pathLength: score / 100 }} transition={{ duration: 0.6 }} />
          </svg>
          <div className="text-center"><div className="display text-3xl tabular-nums">{score}</div><div className="label text-[9px]">health</div></div>
        </div>
        <ul className="grid gap-1.5 text-sm">
          {siteIssues.map((s, i) => {
            const ok = i < fixed;
            return (
              <li key={s} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2">
                <span>{s}</span>
                <motion.span key={String(ok)} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`rounded-full px-2 py-0.5 text-[11px] ${ok ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300"}`}>{ok ? "Fixed" : "Issue"}</motion.span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function SalesMachine() {
  return (
    <section id="sales-machine" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel>Websites</SectionLabel>
          <SplitLines className="display mt-8 text-[11vw] md:text-[5.6vw]" lines={["Your website isn't", "a digital presence.", <span key="s">It&apos;s your <span className="serif font-normal text-accent">sales machine</span>.</span>]} />
          <p className="mt-6 max-w-xl text-lg text-mute">A properly built website works the night shift: it answers questions, captures leads, books calls and takes orders — while you sleep. Every visitor is a chance; the site&apos;s job is not to waste any.</p>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {salesMachine.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.03}>
                <div className="flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5 text-sm transition-colors hover:border-accent/50"><Icon name={f.icon} className="h-4 w-4 shrink-0 text-accent" />{f.title}</div>
              </FadeUp>
            ))}
          </div>
        </div>
        <div className="mx-auto aspect-[32/35] w-full max-w-md md:col-span-5"><Funnel /></div>
      </div>

      <div className="mt-24 grid items-center gap-10 overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,95,87,.12),transparent_50%),#0a0a10] p-6 md:mt-32 md:grid-cols-12 md:p-12">
        <div className="md:col-span-6">
          <div className="label text-red-300">Website not performing?</div>
          <h3 className="display mt-5 text-4xl md:text-6xl">Is your website holding you <span className="serif font-normal text-accent">back</span>?</h3>
          <p className="mt-5 text-lg text-mute">Slow loading, broken pages, technical errors, forms that don&apos;t send, or visitors who never convert? Let&apos;s find the problem, fix what&apos;s holding your website back and turn it into a real growth tool.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ContactButton topic="Website fix / speed" className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-bg transition-transform active:scale-[0.97]">Contact me <Icon name="ArrowRight" className="h-4 w-4" /></ContactButton>
            <span className="text-sm text-mute">Free first look at what&apos;s wrong.</span>
          </div>
        </div>
        <div className="md:col-span-6"><SiteScanner /></div>
      </div>
    </section>
  );
}

/* ---------- AI automation workflow (n8n-style) ---------- */

type Pt = { x: number; y: number };
function layout(n: number, cols: number): Pt[] {
  const rows = Math.ceil(n / cols);
  return Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / cols);
    const c = r % 2 === 0 ? i % cols : cols - 1 - (i % cols); // snake
    return { x: ((c + 0.5) / cols) * 100, y: ((r + 0.5) / rows) * 100 };
  });
}

function WorkflowCanvas({ flow, mobile }: { flow: Flow; mobile: boolean }) {
  const reduce = useReducedMotion();
  const cols = mobile ? 2 : Math.min(5, flow.nodes.length);
  const pts = useMemo(() => layout(flow.nodes.length, cols), [flow.nodes.length, cols]);
  const rows = Math.ceil(flow.nodes.length / cols);
  const [sel, setSel] = useState(0);
  const [run, setRun] = useState(-1); // index currently executing, -1 idle
  const [log, setLog] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setSel(0); setRun(-1); setLog([]); }, [flow.key]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const execute = () => {
    if (timer.current) clearTimeout(timer.current);
    setLog([]);
    const step = (i: number) => {
      setRun(i); setSel(i);
      const t = new Date(Date.now() + i * 1200).toLocaleTimeString("en-GB", { hour12: false });
      setLog((l) => [...l.slice(-5), `${t}  ✓ ${flow.nodes[i].title} — ${flow.nodes[i].sub}`]);
      if (i < flow.nodes.length - 1) timer.current = setTimeout(() => step(i + 1), 850);
      else timer.current = setTimeout(() => setRun(flow.nodes.length), 900);
    };
    step(0);
  };

  // bezier between consecutive nodes in % coordinates
  const link = (a: Pt, b: Pt) => {
    if (Math.abs(a.y - b.y) < 1) return `M${a.x} ${a.y} C${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`;
    const bend = a.x > 50 ? 8 : -8;
    return `M${a.x} ${a.y} C${a.x + bend} ${a.y}, ${b.x + bend} ${b.y}, ${b.x} ${b.y}`;
  };

  const node = flow.nodes[sel];
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#090a10] lg:col-span-8"
        style={{ aspectRatio: mobile ? `${cols * 1.15}/${rows}` : `${cols * 1.2}/${rows * 1.05}` }}>
        <div aria-hidden className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:18px_18px]" />
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {pts.slice(0, -1).map((a, i) => {
            const d = link(a, pts[i + 1]);
            const active = run > i;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={active ? "#ffd400" : "rgba(255,255,255,.18)"} strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ transition: "stroke .4s" }} />
                {!reduce && (
                  <circle r="0.9" fill="#8fb6ff">
                    <animateMotion dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
        {flow.nodes.map((n, i) => {
          const p = pts[i];
          const state = run === i ? "running" : run > i ? "done" : "idle";
          return (
            <button key={n.id} onClick={() => setSel(i)}
              className={`absolute flex w-[38%] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-2xl border bg-[#12131c] p-2 text-left shadow-[0_8px_30px_rgba(0,0,0,.5)] transition-[border-color,box-shadow,transform] duration-300 hover:scale-[1.04] sm:w-[17%] sm:min-w-[120px] sm:p-2.5 ${sel === i ? "border-accent shadow-[0_0_0_3px_rgba(255,212,0,.25),0_8px_30px_rgba(0,0,0,.5)]" : "border-white/12"}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: mobile ? "40%" : undefined }}
              aria-pressed={sel === i}
            >
              <span className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-xl ${state === "done" ? "bg-emerald-400/15 text-emerald-300" : state === "running" ? "bg-accent/20 text-accent" : "bg-white/[0.06] text-ink"}`}>
                <Icon name={n.icon} className="h-4 w-4" />
                {state === "running" && <span className="absolute inset-0 animate-ping rounded-xl border border-accent" />}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-medium leading-tight sm:text-xs">{n.title}</span>
                <span className="block truncate text-[9px] text-mute sm:text-[10px]">{n.sub}</span>
              </span>
              <span className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#090a10] ${state === "done" ? "bg-emerald-400" : state === "running" ? "bg-accent" : "bg-white/25"}`} />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 lg:col-span-4">
        <div className="rounded-[22px] border border-line bg-bg-2 p-5" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={flow.key + sel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"><Icon name={node.icon} className="h-5 w-5" /></span>
                <div><div className="label text-[10px]">Node {sel + 1} · {node.sub}</div><div className="display text-2xl">{node.title}</div></div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mute">{node.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={execute} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-[#111] transition-transform active:scale-[0.97]">
          <Icon name="Play" className="h-4 w-4" /> {run === flow.nodes.length ? "Run again" : "Run workflow"}
        </button>
        <div className="flex-1 rounded-[22px] border border-line bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-emerald-300/90">
          <div className="mb-2 text-mute">execution log</div>
          {log.length ? log.map((l, i) => <div key={i} className="truncate">{l}</div>) : <div className="text-mute">Idle</div>}
          {run === flow.nodes.length && <div className="mt-1 text-ink">✔ Workflow finished — no one had to lift a finger.</div>}
        </div>
      </div>
    </div>
  );
}

export function Automation() {
  const [tab, setTab] = useState(flows[0].key);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const m = matchMedia("(max-width: 639px)");
    const f = () => setMobile(m.matches);
    f(); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  const flow = flows.find((f) => f.key === tab)!;

  return (
    <section id="ai" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel>AI automation & agents</SectionLabel>
          <SplitLines className="display mt-8 text-[11vw] md:text-[6vw]" lines={["AI automation"]} />
        </div>
        <p className="self-end text-lg text-mute md:col-span-5">I design AI agents and automations that connect your website, WhatsApp, CRM and calendar — so leads get answered in seconds, followed up on time and handed to sales ready to buy.</p>
      </div>

      <div role="tablist" aria-label="Workflow examples" className="relative mt-12 flex w-max max-w-full gap-1 overflow-x-auto rounded-full border border-line p-1 [scrollbar-width:none]">
        {flows.map((f) => (
          <button key={f.key} role="tab" aria-selected={tab === f.key} onClick={() => setTab(f.key)} className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors ${tab === f.key ? "text-[#111]" : "text-mute hover:text-ink"}`}>
            {tab === f.key && <motion.span layoutId="flow-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>
      <div className="relative mt-6"><WorkflowCanvas flow={flow} mobile={mobile} /></div>

      <div className="relative mt-12 flex flex-wrap gap-2">
        {automations.map((a, i) => (
          <FadeUp key={a.title} delay={i * 0.03}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent/60"><Icon name={a.icon} className="h-4 w-4 text-accent" />{a.title}</span>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
