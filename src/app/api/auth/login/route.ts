import { checkPassword, emailKey, json, limited, normEmail, sameOrigin, startSession, type Member } from "@/lib/auth";
import { getJSON } from "@/lib/store";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (limited(req, "login", 10, 15 * 60 * 1000)) return json({ error: "Too many attempts. Try again in 15 minutes." }, 429);
  const b = await req.json().catch(() => ({}));
  const email = normEmail(String(b.email ?? "")), password = String(b.password ?? "");
  const m = email ? await getJSON<Member>(`members/${emailKey(email)}.json`) : null;
  if (!m || !(await checkPassword(password, m.pass))) return json({ error: "Email or password is incorrect." }, 401);
  await startSession(email);
  return json({ ok: true, role: m.role });
}
