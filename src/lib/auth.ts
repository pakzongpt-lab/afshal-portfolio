import { createHash, createHmac, randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { getJSON } from "./store";

const scrypt = promisify(_scrypt) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

export const ADMIN_EMAIL = "afshalamir8@gmail.com";
const COOKIE = "sid";
const DAYS = 30;
// Session signing key is derived from the storage token, so no extra secret has to be managed.
const SECRET = createHash("sha256").update((process.env.BLOB_READ_WRITE_TOKEN || "local-dev-only") + ":session:v1").digest();

export type Member = { name: string; email: string; whatsapp: string; consent: boolean; pass: string; role: "member" | "admin"; createdAt: string; door?: string };
export type SessionUser = { name: string; email: string; role: "member" | "admin"; pro: boolean };

export const normEmail = (e: string) => e.trim().toLowerCase();
export const emailKey = (e: string) => createHash("sha256").update(normEmail(e)).digest("hex").slice(0, 32);
export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 120;

export async function hashPassword(pw: string) {
  const salt = randomBytes(16);
  return `${salt.toString("hex")}:${(await scrypt(pw, salt, 64)).toString("hex")}`;
}
export async function checkPassword(pw: string, stored: string) {
  const [s, h] = stored.split(":");
  if (!s || !h) return false;
  const a = await scrypt(pw, Buffer.from(s, "hex"), 64), b = Buffer.from(h, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

const sign = (v: string) => createHmac("sha256", SECRET).update(v).digest("base64url");

export async function startSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ e: normEmail(email), x: Date.now() + DAYS * 864e5 })).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, secure: !!process.env.VERCEL, sameSite: "lax", path: "/", maxAge: DAYS * 86400 });
}
export async function endSession() { (await cookies()).delete(COOKIE); }

export async function sessionEmail(): Promise<string | null> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig) return null;
  const good = sign(payload);
  if (sig.length !== good.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try { const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString()); return x > Date.now() ? e : null; } catch { return null; }
}

export async function currentUser(): Promise<SessionUser | null> {
  const email = await sessionEmail();
  if (!email) return null;
  const k = emailKey(email);
  const [m, pro] = await Promise.all([getJSON<Member>(`members/${k}.json`), getJSON<{ since: string }>(`pro/${k}.json`)]);
  if (!m) return null;
  return { name: m.name, email: m.email, role: m.role, pro: m.role === "admin" || !!pro };
}

export async function requireAdmin() { const u = await currentUser(); return u?.role === "admin" ? u : null; }

/** Same-origin check for state-changing requests. */
export function sameOrigin(req: Request) {
  const o = req.headers.get("origin");
  if (!o) return true; // non-browser clients; cookie is SameSite=Lax anyway
  try { return new URL(o).host === req.headers.get("host"); } catch { return false; }
}

const buckets = new Map<string, number[]>();
/** In-memory rate limit (per server instance). */
export function limited(req: Request, name: string, max: number, windowMs: number) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const key = `${name}:${ip}`, now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) return true;
  buckets.set(key, [...recent, now]);
  if (buckets.size > 10000) buckets.clear();
  return false;
}

export const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
