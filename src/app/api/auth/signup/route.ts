import { ADMIN_EMAIL, emailKey, hashPassword, json, limited, normEmail, sameOrigin, startSession, validEmail, type Member } from "@/lib/auth";
import { clean } from "@/lib/hub";
import { getJSON, putJSON } from "@/lib/store";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (limited(req, "signup", 5, 60 * 60 * 1000)) return json({ error: "Too many sign-ups from this network. Try again in an hour." }, 429);
  const b = await req.json().catch(() => ({}));
  if (b.company) return json({ ok: true }); // honeypot
  const name = clean(b.name, 80), email = normEmail(clean(b.email, 120)), whatsapp = clean(b.whatsapp, 20).replace(/[^\d+]/g, ""), password = String(b.password ?? "");
  if (name.length < 2) return json({ error: "Enter your name." }, 400);
  if (!validEmail(email)) return json({ error: "Enter a valid email address." }, 400);
  if (whatsapp.replace(/\D/g, "").length < 10) return json({ error: "Enter your WhatsApp number with country or city code." }, 400);
  if (password.length < 8 || password.length > 100) return json({ error: "Choose a password with at least 8 characters." }, 400);
  if (email === ADMIN_EMAIL) return json({ error: "This email can't be used here." }, 400);
  const p = `members/${emailKey(email)}.json`;
  if (await getJSON(p)) return json({ error: "An account with this email already exists. Sign in instead." }, 409);
  const m: Member = { name, email, whatsapp, consent: !!b.consent, pass: await hashPassword(password), role: "member", createdAt: new Date().toISOString(), door: clean(b.door, 20) || "prompts" };
  await putJSON(p, m, false).catch(() => null);
  await startSession(email);
  return json({ ok: true });
}
