"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Magnetic from "../Magnetic";
import SocialIcon from "../SocialIcon";
import { SectionLabel, SplitLines } from "../Reveal";
import { profile, socials } from "@/data/site";

type State = "idle" | "sending" | "sent" | "fallback" | "error";
const services = ["Website", "Branding", "Marketing & ads", "Social media", "AI & automation", "Video & motion", "Something else"];

export default function Contact() {
  const [state, setState] = useState<State>("idle");
  const [picked, setPicked] = useState<string[]>([]);
  const wa = profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : "";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { name: String(fd.get("name") || ""), email: String(fd.get("email") || ""), message: String(fd.get("message") || ""), services: picked, company: String(fd.get("company") || "") };
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setState("sent"); e.currentTarget?.reset?.(); setPicked([]); return; }
      if (res.status === 501) {
        // No mail service configured yet: hand the message to the visitor's email app instead of losing it.
        const body = `${data.message}\n\nInterested in: ${data.services.join(", ") || "—"}\n\n— ${data.name} (${data.email})`;
        location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Project enquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`;
        setState("fallback");
        return;
      }
      setState("error");
    } catch { setState("error"); }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(77,141,255,.13), transparent)" }} />
      <SectionLabel index="09">Contact</SectionLabel>
      <SplitLines className="display relative mt-8 text-[15vw] md:text-[10vw]" lines={["Let's build", <span key="n">what&apos;s <span className="serif font-normal text-accent">next</span>.</span>]} />

      <div className="relative mt-16 grid gap-14 md:grid-cols-12">
        <div className="space-y-8 md:col-span-5">
          <p className="max-w-md text-lg text-mute">
            Got a brand to grow, a site to build or a campaign to launch? Tell me what you&apos;re working on. I usually reply within a day.
          </p>
          <div className="space-y-3">
            <Magnetic strength={0.15}>
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 text-2xl md:text-3xl">
                <span className="relative">
                  {profile.email}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </a>
            </Magnetic>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="flex w-max items-center gap-3 rounded-full border border-[#25D366]/40 px-5 py-3 text-sm transition-colors hover:bg-[#25D366]/10">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" /> Chat on WhatsApp
              </a>
            )}
          </div>
          <div>
            <div className="label mb-4">Elsewhere</div>
            <div className="flex flex-wrap gap-2">
              {socials.filter((s) => s.url).map((s) => (
                <Magnetic key={s.key} strength={0.3}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-12 w-12 place-items-center rounded-full border border-line transition-[border-color,background-color] duration-300 hover:border-white/40 hover:bg-white/5">
                    <SocialIcon name={s.key} className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="relative space-y-6 rounded-[28px] border border-line bg-bg-2/70 p-6 backdrop-blur md:col-span-7 md:p-10">
          <fieldset>
            <legend className="label mb-4">I&apos;m interested in</legend>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => {
                const on = picked.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    aria-pressed={on}
                    onClick={() => setPicked((p) => (on ? p.filter((x) => x !== s) : [...p, s]))}
                    className={`rounded-full border px-4 py-2 text-sm transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${on ? "border-accent bg-accent text-white" : "border-line text-ink/80 hover:border-white/30"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className="grid gap-6 md:grid-cols-2">
            <Field name="name" label="Your name" autoComplete="name" required />
            <Field name="email" label="Email" type="email" autoComplete="email" required />
          </div>
          <Field name="message" label="Tell me about the project" textarea required />
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <AnimatePresence mode="wait">
              <motion.p key={state} role="status" className="text-sm text-mute" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                {state === "sent" && "Thanks — your message is on its way. I'll be in touch soon."}
                {state === "fallback" && "Your email app should open with your message ready to send."}
                {state === "error" && "Something went wrong. Please email me directly."}
                {(state === "idle" || state === "sending") && "No spam. Just a reply."}
              </motion.p>
            </AnimatePresence>
            <Magnetic>
              <button disabled={state === "sending"} className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-bg transition-[transform,opacity] duration-150 active:scale-[0.97] disabled:opacity-60">
                {state === "sending" ? "Sending…" : "Send message"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ name, label, textarea, ...rest }: { name: string; label: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const cls = "peer w-full border-0 border-b border-white/15 bg-transparent px-0 pb-3 pt-6 text-lg text-ink outline-none transition-colors placeholder:text-transparent focus:border-accent";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={4} placeholder={label} required={rest.required} className={`${cls} resize-none`} />
      ) : (
        <input name={name} placeholder={label} className={cls} {...rest} />
      )}
      <span className="pointer-events-none absolute left-0 top-6 text-lg text-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </span>
    </label>
  );
}
