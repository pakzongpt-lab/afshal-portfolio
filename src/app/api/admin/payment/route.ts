import { json, requireAdmin, sameOrigin } from "@/lib/auth";
import { clean, type Payment, type PayStatus } from "@/lib/hub";
import { getJSON, putJSON, remove } from "@/lib/store";

/** Approve or reject a payment. Approving unlocks Pro for that member; rejecting (or undoing) removes it if this payment granted it. */
export async function POST(req: Request) {
  if (!sameOrigin(req) || !(await requireAdmin())) return json({ error: "forbidden" }, 403);
  const b = await req.json().catch(() => ({}));
  const id = String(b.id ?? ""), action = b.action === "approve" ? "approved" : b.action === "reject" ? "rejected" : null;
  if (!/^[a-z0-9-]{10,80}$/.test(id) || !action) return json({ error: "bad request" }, 400);
  const p = await getJSON<Payment>(`payments/${id}.json`);
  if (!p) return json({ error: "Payment not found." }, 404);
  const st: PayStatus = { status: action, at: new Date().toISOString(), note: clean(b.note, 200) || undefined };
  await putJSON(`paystatus/${id}.json`, st);
  if (action === "approved") await putJSON(`pro/${p.key}.json`, { since: st.at, paymentId: id });
  else {
    const pro = await getJSON<{ paymentId: string }>(`pro/${p.key}.json`);
    if (pro?.paymentId === id) await remove(`pro/${p.key}.json`);
  }
  return json({ ok: true });
}
