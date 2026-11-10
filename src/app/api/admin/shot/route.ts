import { json, requireAdmin } from "@/lib/auth";
import type { Payment } from "@/lib/hub";
import { getFile, getJSON } from "@/lib/store";

export async function GET(req: Request) {
  if (!(await requireAdmin())) return json({ error: "forbidden" }, 403);
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[a-z0-9-]{10,80}$/.test(id)) return json({ error: "bad request" }, 400);
  const p = await getJSON<Payment>(`payments/${id}.json`);
  const f = p && (await getFile(p.shot));
  if (!f) return json({ error: "not found" }, 404);
  return new Response(f.body as BodyInit, { headers: { "content-type": f.contentType, "cache-control": "private, no-store", "x-content-type-options": "nosniff", "content-security-policy": "default-src 'none'" } });
}
