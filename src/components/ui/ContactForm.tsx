"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { profile } from "@/data/site";

export const SERVICES = ["Website development", "Website fix / speed", "Branding & logo", "Social media marketing", "Content & video", "SEO & GEO", "Paid ads", "AI automation & chatbots", "Complete marketing", "Something else"];
type State = "idle" | "sending" | "sent" | "error";

/**
 * Sends to Afshal's inbox through FormSubmit (no account or API key).
 * First submission triggers a one-time activation email to the inbox.
 */
export default function ContactForm({ defaultService, compact = false }: { defaultService?: string; compact?: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("_honey")) return; // bot
    const v = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!v.name?.trim()) errs.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email ?? "")) errs.email = "Please add a valid email.";
    if ((v.details ?? "").trim().length < 10) errs.details = "A sentence or two about the project, please.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: v.name, email: v.email, company: v.company || "—", service: v.service, details: v.details,
          _subject: `New enquiry from ${v.name} — ${v.service}`, _template: "table", _captcha: "false", _replyto: v.email,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
        <div className="display text-3xl">Message sent.</div>
        <p className="mt-3 text-mute">Thanks — I&apos;ll get back to you within a day.</p>
        <button onClick={() => setState("idle")} className="mt-6 text-sm text-accent underline-offset-4 hover:underline">Send another</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className={`grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
        <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
        <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
        <Field name="company" label="Company (optional)" autoComplete="organization" />
        <label className="relative block">
          <span className="label mb-2 block">Service required</span>
          <select name="service" defaultValue={defaultService && SERVICES.includes(defaultService) ? defaultService : SERVICES[0]} className="w-full appearance-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-ink outline-none transition-colors focus:border-accent">
            {SERVICES.map((s) => <option key={s} className="bg-[#0c0c12]">{s}</option>)}
          </select>
          <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 text-mute">▾</span>
        </label>
      </div>
      <Field name="details" label="Project details" textarea error={errors.details} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.p key={state} role="status" className="text-sm text-mute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {state === "error" ? <>Couldn&apos;t send — email me at <a className="text-accent" href={`mailto:${profile.email}`}>{profile.email}</a>.</> : "Goes straight to my inbox. No spam."}
          </motion.p>
        </AnimatePresence>
        <button disabled={state === "sending"} className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-bg transition-[transform,opacity] duration-150 active:scale-[0.97] disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send enquiry"}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </form>
  );
}

function Field({ name, label, textarea, error, ...rest }: { name: string; label: string; textarea?: boolean; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const cls = `w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-dim focus:border-accent ${error ? "border-red-400/70" : "border-white/15"}`;
  return (
    <label className="block">
      <span className="label mb-2 block">{label}</span>
      {textarea ? <textarea name={name} rows={4} className={`${cls} resize-none`} aria-invalid={!!error} /> : <input name={name} className={cls} aria-invalid={!!error} {...rest} />}
      {error && <span className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
