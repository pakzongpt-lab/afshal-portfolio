"use client";
import { useState } from "react";
import { btnCls, Field, inputCls } from "@/components/hub/ui";

export default function Setup() {
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErr("");
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (f.password !== f.again) { setErr("The two passwords don't match."); return; }
    setBusy(true);
    const token = new URLSearchParams(location.search).get("token") ?? "";
    const r = await fetch("/api/admin/setup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token, name: f.name, password: f.password }) }).catch(() => null);
    const j = await r?.json().catch(() => ({}));
    if (!r?.ok) { setErr(j?.error || "Something went wrong. Try again."); setBusy(false); return; }
    location.href = "/admin";
  };
  return (
    <form onSubmit={submit} className="grid max-w-md gap-4 rounded-[24px] border border-line bg-bg-2 p-6">
      <p className="text-mute">Admin email: <span className="text-ink">afshalamir8@gmail.com</span></p>
      <Field label="Your name"><input name="name" defaultValue="Afshal Amir" required className={inputCls} /></Field>
      <Field label="Choose a password" hint="At least 10 characters. Only you will know it."><input name="password" type="password" required minLength={10} autoComplete="new-password" className={inputCls} /></Field>
      <Field label="Type it again"><input name="again" type="password" required minLength={10} autoComplete="new-password" className={inputCls} /></Field>
      {err && <p role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] p-3 text-sm text-amber-100">{err}</p>}
      <button disabled={busy} className={btnCls}>{busy ? "Setting up…" : "Create admin account"}</button>
    </form>
  );
}
