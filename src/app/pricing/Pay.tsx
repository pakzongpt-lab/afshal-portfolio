"use client";
import { useEffect, useState } from "react";
import { btnCls, Field, ghostCls, inputCls, rs } from "@/components/hub/ui";
import { useMe } from "@/components/hub/useMe";
import CopyButton from "@/components/hub/CopyButton";
import { WHATSAPP_NUMBER } from "@/components/WhatsAppFloat";

type S = { pricePkr: number; easypaisa: string; jazzcash: string; bank: string; note: string };
type Pay = { id: string; method: string; txn: string; amount: number; createdAt: string; status: string };

export default function Pay() {
  const me = useMe();
  const [s, setS] = useState<S | null>(null);
  const [pays, setPays] = useState<Pay[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState<{ txn: string } | null>(null);
  const load = () => fetch("/api/pay").then((r) => r.json()).then((d) => { setS(d.settings); setPays(d.payments ?? []); }).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErr(""); setBusy(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/pay", { method: "POST", body: fd }).catch(() => null);
    const d = await res?.json().catch(() => ({}));
    setBusy(false);
    if (!res?.ok) { setErr(d?.error || "Upload failed. Check your connection and try again."); return; }
    setSent({ txn: String(fd.get("txn")) }); load();
  };

  const methods = s ? ([["Easypaisa", s.easypaisa], ["JazzCash", s.jazzcash], ["Bank transfer", s.bank]] as const).filter(([, v]) => v) : [];
  const pending = pays.find((p) => p.status === "pending");
  const wa = (t: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;

  if (me === undefined || !s) return <div className="h-80 animate-pulse rounded-[24px] bg-bg-2" />;
  if (me?.pro) return (
    <div className="rounded-[24px] border border-accent bg-bg-2 p-6 md:p-8">
      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[#111]">PRO ACTIVE</span>
      <p className="mt-4 text-2xl font-semibold">You have Pro, {me.name.split(" ")[0]}.</p>
      <a href="/prompts" className={`${btnCls} mt-6`}>Open the full library</a>
    </div>
  );

  return (
    <div className="rounded-[24px] border border-line bg-bg-2 p-6 md:p-8">
      <h2 className="display text-3xl">Unlock Pro · {rs(s.pricePkr)}</h2>
      <ol className="mt-6 space-y-6">
        <li>
          <p className="font-semibold"><span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full bg-accent text-sm text-[#111]">1</span>Send {rs(s.pricePkr)} to one of these</p>
          {methods.length ? (
            <ul className="mt-3 grid gap-2">
              {methods.map(([k, v]) => (
                <li key={k} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-bg p-3">
                  <span><span className="block text-xs text-mute">{k}</span><span className="text-base">{v}</span></span>
                  <CopyButton text={v} />
                </li>
              ))}
            </ul>
          ) : (
            <a href={wa(`Hi Afshal, I want to unlock Afshal.ai Pro (${rs(s.pricePkr)}). Please send payment details.`)} target="_blank" rel="noopener noreferrer" className={`${ghostCls} mt-3`}>Get payment details on WhatsApp</a>
          )}
          {s.note && <p className="mt-2 text-sm text-mute">{s.note}</p>}
        </li>
        <li>
          <p className="font-semibold"><span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full bg-accent text-sm text-[#111]">2</span>Upload your payment proof</p>
          {!me ? (
            <a href="/account?next=/pricing" className={`${btnCls} mt-3`}>Create a free account first</a>
          ) : sent || pending ? (
            <div className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.07] p-4">
              <p className="font-semibold text-emerald-200">Payment proof received.</p>
              <p className="mt-1 text-sm text-mute">I check each payment against my account before unlocking, usually within a few hours. Pro then shows up in your account automatically.</p>
              <a href={wa(`Hi Afshal, I paid for Afshal.ai Pro. Email: ${me.email}. Transaction ID: ${sent?.txn ?? pending?.txn}.`)} target="_blank" rel="noopener noreferrer" className={`${ghostCls} mt-3`}>Tell me on WhatsApp for faster approval</a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-3 grid gap-4">
              <Field label="How did you pay?"><select name="method" required className={inputCls} defaultValue="">{["", "Easypaisa", "JazzCash", "Bank transfer"].map((m) => <option key={m} value={m} disabled={!m}>{m || "Choose"}</option>)}</select></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Transaction ID" hint="From your receipt or SMS."><input name="txn" required minLength={4} maxLength={40} className={inputCls} /></Field>
                <Field label="Amount paid (Rs)"><input name="amount" type="number" inputMode="numeric" required min={1} defaultValue={s.pricePkr} className={inputCls} /></Field>
              </div>
              <Field label="Payment screenshot" hint="JPG, PNG or WebP, up to 4 MB."><input name="shot" type="file" required accept="image/jpeg,image/png,image/webp" className="mt-2 block w-full text-sm text-mute file:mr-4 file:h-11 file:rounded-full file:border-0 file:bg-white/10 file:px-5 file:text-sm file:text-ink" /></Field>
              {err && <p role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] p-3 text-sm text-amber-100">{err}</p>}
              <button disabled={busy} className={btnCls}>{busy ? "Uploading…" : "Submit payment proof"}</button>
            </form>
          )}
        </li>
      </ol>
      {pays.some((p) => p.status === "rejected") && !pending && !sent && <p className="mt-4 rounded-xl border border-amber-400/30 p-3 text-sm text-amber-100">Your last payment proof couldn&apos;t be matched to a payment. Check the transaction ID and submit again, or message me on WhatsApp.</p>}
    </div>
  );
}
