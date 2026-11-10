"use client";
import { useEffect, useState } from "react";
import { btnCls, Field, ghostCls, inputCls, rs } from "@/components/hub/ui";

type Pay = { id: string; email: string; name: string; whatsapp: string; method: string; txn: string; amount: number; createdAt: string; status: "pending" | "approved" | "rejected" };
type Mem = { name: string; email: string; whatsapp: string; consent: boolean; role: string; createdAt: string; door?: string; pro: boolean };
type S = { pricePkr: number; easypaisa: string; jazzcash: string; bank: string; note: string };
type Data = { stats: { members: number; pro: number; pending: number; revenue: number }; payments: Pay[]; members: Mem[]; settings: S };

const when = (iso: string) => new Date(iso).toLocaleString("en-PK", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const waLink = (n: string) => { const d = n.replace(/\D/g, ""); return `https://wa.me/${d.startsWith("0") ? "92" + d.slice(1) : d}`; };

export default function Admin() {
  const [d, setD] = useState<Data | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "denied">("loading");
  const [tab, setTab] = useState<"payments" | "members" | "settings">("payments");
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const [shot, setShot] = useState("");
  const [confirm, setConfirm] = useState<{ p: Pay; action: "approve" | "reject" } | null>(null);

  const load = async () => {
    const r = await fetch("/api/admin/data").catch(() => null);
    if (!r?.ok) { setState("denied"); return; }
    setD(await r.json()); setState("ok");
  };
  useEffect(() => { load(); }, []);

  const act = async () => {
    if (!confirm) return;
    setBusy(confirm.p.id);
    const r = await fetch("/api/admin/payment", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: confirm.p.id, action: confirm.action }) }).catch(() => null);
    setBusy(""); setConfirm(null);
    setMsg(r?.ok ? (confirm.action === "approve" ? `Approved. ${confirm.p.name} now has Pro.` : `Rejected ${confirm.p.name}'s payment.`) : "That didn't save. Try again.");
    load();
  };
  const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setBusy("settings");
    const r = await fetch("/api/admin/settings", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))) }).catch(() => null);
    const j = await r?.json().catch(() => ({}));
    setBusy(""); setMsg(r?.ok ? "Settings saved. The pricing page now shows these details." : j?.error || "That didn't save. Try again."); if (r?.ok) load();
  };
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); location.href = "/"; };

  if (state === "loading") return <div className="h-80 animate-pulse rounded-[24px] bg-bg-2" />;
  if (state === "denied" || !d) return (
    <div className="rounded-[24px] border border-line bg-bg-2 p-8">
      <p className="text-xl font-semibold">Admin sign-in needed</p>
      <p className="mt-2 text-mute">Sign in with the admin account to open this panel.</p>
      <a href="/account?mode=login&next=/admin" className={`${btnCls} mt-5`}>Sign in</a>
    </div>
  );

  const stats = [["Members", d.stats.members], ["Pro members", d.stats.pro], ["Payments to check", d.stats.pending], ["Approved revenue", rs(d.stats.revenue)]] as const;
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([l, v]) => <li key={l} className="rounded-[20px] border border-line bg-bg-2 p-5"><span className="block text-sm text-mute">{l}</span><span className="display mt-1 block text-3xl tabular-nums">{v}</span></li>)}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {(["payments", "members", "settings"] as const).map((t) => <button key={t} onClick={() => { setTab(t); setMsg(""); }} aria-pressed={tab === t} className={`h-11 rounded-full border px-5 text-sm capitalize ${tab === t ? "border-accent bg-accent font-semibold text-[#111]" : "border-line text-mute"}`}>{t}{t === "payments" && d.stats.pending ? ` (${d.stats.pending})` : ""}</button>)}
        <span className="flex-1" />
        <button onClick={load} className={ghostCls}>Refresh</button>
        <button onClick={logout} className={ghostCls}>Sign out</button>
      </div>
      {msg && <p role="status" className="mt-4 rounded-xl border border-line bg-bg-2 p-3 text-sm">{msg}</p>}

      {tab === "payments" && (
        <div className="mt-4 grid gap-3">
          {d.payments.length === 0 && <p className="rounded-[20px] border border-line p-8 text-center text-mute">No payments yet. When someone uploads a payment proof it appears here.</p>}
          {d.payments.map((p) => (
            <div key={p.id} className="grid gap-4 rounded-[20px] border border-line bg-bg-2 p-5 md:grid-cols-12 md:items-center">
              <div className="md:col-span-4">
                <p className="font-semibold">{p.name}</p>
                <p className="break-all text-sm text-mute">{p.email}</p>
                {p.whatsapp && <a href={waLink(p.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-sm text-accent underline-offset-4 hover:underline">WhatsApp {p.whatsapp}</a>}
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm md:col-span-4">
                <dt className="text-mute">Amount</dt><dd className="font-semibold tabular-nums">{rs(p.amount)}</dd>
                <dt className="text-mute">Method</dt><dd>{p.method}</dd>
                <dt className="text-mute">Transaction ID</dt><dd className="break-all font-mono">{p.txn}</dd>
                <dt className="text-mute">Sent</dt><dd>{when(p.createdAt)}</dd>
              </dl>
              <div className="flex flex-wrap items-center gap-2 md:col-span-4 md:justify-end">
                <button onClick={() => setShot(p.id)} className={ghostCls}>Screenshot</button>
                {p.status === "pending" ? (
                  <>
                    <button disabled={busy === p.id} onClick={() => setConfirm({ p, action: "approve" })} className="inline-flex h-11 items-center rounded-full bg-emerald-400 px-5 text-sm font-semibold text-[#111]">Approve</button>
                    <button disabled={busy === p.id} onClick={() => setConfirm({ p, action: "reject" })} className={ghostCls}>Reject</button>
                  </>
                ) : (
                  <>
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${p.status === "approved" ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300"}`}>{p.status.toUpperCase()}</span>
                    <button onClick={() => setConfirm({ p, action: p.status === "approved" ? "reject" : "approve" })} className="text-sm text-mute underline underline-offset-4">Change</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "members" && (
        <div className="mt-4">
          <a href="/api/admin/export" className={ghostCls}>Download all members (CSV)</a>
          <div className="mt-3 overflow-x-auto rounded-[20px] border border-line">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-bg-2 text-mute"><tr>{["Name", "Email", "WhatsApp", "Plan", "Joined"].map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr></thead>
              <tbody>
                {d.members.map((m) => (
                  <tr key={m.email} className="border-t border-line">
                    <td className="px-4 py-3">{m.name}</td><td className="px-4 py-3">{m.email}</td>
                    <td className="px-4 py-3">{m.whatsapp ? <a href={waLink(m.whatsapp)} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{m.whatsapp}</a> : "—"}{m.consent && <span className="ml-2 text-xs text-emerald-300">updates OK</span>}</td>
                    <td className="px-4 py-3">{m.role === "admin" ? "Admin" : m.pro ? "Pro" : "Free"}</td><td className="px-4 py-3 text-mute">{when(m.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {d.stats.members > d.members.length && <p className="mt-2 text-sm text-mute">Showing the newest {d.members.length}. The CSV has everyone.</p>}
        </div>
      )}

      {tab === "settings" && (
        <form onSubmit={saveSettings} className="mt-4 grid max-w-2xl gap-4 rounded-[20px] border border-line bg-bg-2 p-6">
          <p className="text-mute">These details appear on the pricing page for buyers to pay into. Leave one empty to hide it.</p>
          <Field label="Pro price (Rs)"><input name="pricePkr" type="number" required min={100} defaultValue={d.settings.pricePkr} className={inputCls} /></Field>
          <Field label="Easypaisa" hint="Example: 0300 1234567 · Account title"><input name="easypaisa" defaultValue={d.settings.easypaisa} maxLength={120} className={inputCls} /></Field>
          <Field label="JazzCash"><input name="jazzcash" defaultValue={d.settings.jazzcash} maxLength={120} className={inputCls} /></Field>
          <Field label="Bank transfer" hint="Bank name · account title · account number or IBAN"><input name="bank" defaultValue={d.settings.bank} maxLength={240} className={inputCls} /></Field>
          <Field label="Note under the payment details (optional)"><input name="note" defaultValue={d.settings.note} maxLength={240} className={inputCls} /></Field>
          <button disabled={busy === "settings"} className={`${btnCls} justify-self-start`}>{busy === "settings" ? "Saving…" : "Save settings"}</button>
        </form>
      )}

      {confirm && (
        <div role="dialog" aria-modal="true" aria-label="Confirm" className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5" onClick={() => setConfirm(null)}>
          <div className="w-full max-w-md rounded-[24px] border border-line bg-bg-2 p-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-xl font-semibold">{confirm.action === "approve" ? "Approve this payment?" : "Reject this payment?"}</p>
            <p className="mt-2 text-mute">{confirm.action === "approve"
              ? <>Only approve after <span className="font-mono text-ink">{confirm.p.txn}</span> for {rs(confirm.p.amount)} shows in your {confirm.p.method} account. {confirm.p.name} gets Pro straight away.</>
              : <>{confirm.p.name} will not get Pro{confirm.p.status === "approved" ? ", and their current Pro access is removed" : ""}.</>}</p>
            <div className="mt-5 flex gap-3">
              <button onClick={act} className={btnCls}>{confirm.action === "approve" ? "Yes, approve" : "Yes, reject"}</button>
              <button onClick={() => setConfirm(null)} className={ghostCls}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {shot && (
        <div role="dialog" aria-modal="true" aria-label="Payment screenshot" className="fixed inset-0 z-[100] grid place-items-center overflow-auto bg-black/85 p-5" onClick={() => setShot("")}>
          <img src={`/api/admin/shot?id=${shot}`} alt="Payment screenshot" className="max-h-[90vh] max-w-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
