import { timingSafeEqual } from "node:crypto";
import { ADMIN_EMAIL, emailKey, hashPassword, json, limited, sameOrigin, startSession, type Member } from "@/lib/auth";
import { clean } from "@/lib/hub";
import { getJSON, putJSON } from "@/lib/store";

/** One-time admin setup: works once, with the setup token, while no admin account exists. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (limited(req, "setup", 5, 60 * 60 * 1000)) return json({ error: "Too many attempts." }, 429);
  const b = await req.json().catch(() => ({}));
  const want = process.env.ADMIN_SETUP_TOKEN || "", got = String(b.token ?? "");
  const p = `members/${emailKey(ADMIN_EMAIL)}.json`;
  if (await getJSON(p)) return json({ error: "The admin account is already set up. Sign in instead." }, 409);
  if (want.length < 20 || got.length !== want.length || !timingSafeEqual(Buffer.from(got), Buffer.from(want))) return json({ error: "This setup link is not valid." }, 403);
  const password = String(b.password ?? "");
  if (password.length < 10 || password.length > 100) return json({ error: "Choose a password with at least 10 characters." }, 400);
  const m: Member = { name: clean(b.name, 80) || "Afshal Amir", email: ADMIN_EMAIL, whatsapp: "", consent: false, pass: await hashPassword(password), role: "admin", createdAt: new Date().toISOString() };
  await putJSON(p, m, false);
  await startSession(ADMIN_EMAIL);
  return json({ ok: true });
}
