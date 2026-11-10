import { json, requireAdmin, sameOrigin } from "@/lib/auth";
import { clean, type Settings } from "@/lib/hub";
import { putJSON } from "@/lib/store";

export async function POST(req: Request) {
  if (!sameOrigin(req) || !(await requireAdmin())) return json({ error: "forbidden" }, 403);
  const b = await req.json().catch(() => ({}));
  const price = Math.round(Number(b.pricePkr));
  if (!(price >= 100 && price <= 1_000_000)) return json({ error: "Enter a price between Rs 100 and Rs 1,000,000." }, 400);
  const s: Settings = { pricePkr: price, easypaisa: clean(b.easypaisa, 120), jazzcash: clean(b.jazzcash, 120), bank: clean(b.bank, 240), note: clean(b.note, 240) };
  await putJSON("settings.json", s);
  return json({ ok: true, settings: s });
}
