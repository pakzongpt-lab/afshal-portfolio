"use client";
import { useEffect, useState } from "react";
import { btnCls, Field, ghostCls, inputCls } from "@/components/hub/ui";
import { useMe } from "@/components/hub/useMe";

const safeNext = () => { const n = new URLSearchParams(location.search).get("next") || "/prompts"; return /^\/[a-z0-9/_#-]*$/i.test(n) ? n : "/prompts"; };

export default function AccountForm() {
  const me = useMe();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => { if (new URLSearchParams(location.search).get("mode") === "login") setMode("login"); }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErr(""); setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, consent: f.consent === "on", door: safeNext().includes("pricing") ? "pricing" : "prompts" }) }).catch(() => null);
    const d = await res?.json().catch(() => ({}));
    if (!res?.ok) { setErr(d?.error || "Something went wrong. Check your connection and try again."); setBusy(false); return; }
    location.href = d.role === "admin" ? "/admin" : safeNext();
  };
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); location.reload(); };

  if (me === undefined) return <div className="h-64 animate-pulse rounded-[24px] bg-bg-2" />;
  if (me) return (
    <div className="rounded-[24px] border border-line bg-bg-2 p-6 md:p-8">
      <p className="text-sm text-mute">Signed in as</p>
      <p className="mt-1 text-2xl font-semibold">{me.name}</p>
      <p className="text-mute">{me.email}</p>
      <p className="mt-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${me.pro ? "bg-accent text-[#111]" : "border border-line"}`}>{me.role === "admin" ? "ADMIN" : me.pro ? "PRO" : "FREE"}</span></p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/prompts" className={btnCls}>Open prompt library</a>
        {me.role === "admin" ? <a href="/admin" className={ghostCls}>Admin panel</a> : !me.pro && <a href="/pricing" className={ghostCls}>Unlock Pro</a>}
        <button onClick={logout} className={ghostCls}>Sign out</button>
      </div>
    </div>
  );

  return (
    <div className="rounded-[24px] border border-line bg-bg-2 p-6 md:p-8">
      <div className="flex gap-2" role="tablist">
        {(["signup", "login"] as const).map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setErr(""); }} className={`h-11 rounded-full border px-5 text-sm ${mode === m ? "border-accent bg-accent font-semibold text-[#111]" : "border-line text-mute"}`}>{m === "signup" ? "Create account" : "Sign in"}</button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        {mode === "signup" && <Field label="Your name"><input name="name" required minLength={2} maxLength={80} autoComplete="name" className={inputCls} /></Field>}
        <Field label="Email"><input name="email" type="email" required autoComplete="email" className={inputCls} /></Field>
        {mode === "signup" && <Field label="WhatsApp number" hint="For your order updates. Example: 03001234567"><input name="whatsapp" type="tel" required inputMode="tel" autoComplete="tel" className={inputCls} /></Field>}
        <Field label="Password" hint={mode === "signup" ? "At least 8 characters." : undefined}><input name="password" type="password" required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} className={inputCls} /></Field>
        {mode === "signup" && (
          <>
            <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <label className="flex items-start gap-3 text-sm text-mute"><input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[#ffd400]" /> Send me new prompts and workshop dates on WhatsApp (optional).</label>
          </>
        )}
        {err && <p role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] p-3 text-sm text-amber-100">{err}</p>}
        <button disabled={busy} className={btnCls}>{busy ? "Please wait…" : mode === "signup" ? "Create free account" : "Sign in"}</button>
        {mode === "login" && <p className="text-sm text-mute">Forgot your password? Message me on WhatsApp from your registered number and I&apos;ll reset it.</p>}
      </form>
    </div>
  );
}
