import { randomBytes } from "node:crypto";
import { emailKey, json, limited, sameOrigin, sessionEmail, type Member } from "@/lib/auth";
import { clean, getSettings, type Payment, type PayStatus } from "@/lib/hub";
import { getJSON, getMany, listPaths, putFile, putJSON } from "@/lib/store";

const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

/** Public payment details + this user's own payment history. */
export async function GET() {
  const s = await getSettings();
  const email = await sessionEmail();
  let mine: (Payment & { status: string })[] = [];
  if (email) {
    const k = emailKey(email);
    const pays = await getMany<Payment>(await listPaths(`payments/${k}-`, 10));
    mine = await Promise.all(pays.map(async (p) => ({ ...p, shot: "", status: (await getJSON<PayStatus>(`paystatus/${p.id}.json`))?.status ?? "pending" })));
  }
  return json({ settings: s, payments: mine.map(({ id, method, txn, amount, createdAt, status }) => ({ id, method, txn, amount, createdAt, status })) });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  const email = await sessionEmail();
  if (!email) return json({ error: "Sign in first." }, 401);
  if (limited(req, "pay", 5, 60 * 60 * 1000)) return json({ error: "Too many submissions. Try again later." }, 429);
  const k = emailKey(email);
  const m = await getJSON<Member>(`members/${k}.json`);
  if (!m) return json({ error: "Sign in first." }, 401);
  const f = await req.formData().catch(() => null);
  if (!f) return json({ error: "Could not read the form." }, 400);
  const method = clean(f.get("method"), 20), txn = clean(f.get("txn"), 40), amount = Math.round(Number(f.get("amount")));
  const file = f.get("shot");
  if (!["Easypaisa", "JazzCash", "Bank transfer"].includes(method)) return json({ error: "Choose how you paid." }, 400);
  if (txn.length < 4) return json({ error: "Enter the transaction ID from your payment receipt." }, 400);
  if (!(amount > 0 && amount < 10_000_000)) return json({ error: "Enter the amount you paid." }, 400);
  if (!(file instanceof File) || !TYPES[file.type]) return json({ error: "Attach a screenshot of the payment (JPG, PNG or WebP)." }, 400);
  if (file.size > 4 * 1024 * 1024) return json({ error: "The screenshot is larger than 4 MB. Crop it or send a smaller one." }, 400);
  const id = `${k}-${Date.now().toString(36)}${randomBytes(3).toString("hex")}`;
  const shot = `shots/${id}.${TYPES[file.type]}`;
  await putFile(shot, await file.arrayBuffer(), file.type);
  const p: Payment = { id, key: k, email: m.email, name: m.name, whatsapp: m.whatsapp, method, txn, amount, shot, createdAt: new Date().toISOString() };
  await putJSON(`payments/${id}.json`, p, false);
  return json({ ok: true, id });
}
