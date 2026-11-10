import { emailKey, json, requireAdmin, type Member } from "@/lib/auth";
import { getMany, listPaths } from "@/lib/store";

const cell = (v: unknown) => { let s = String(v ?? ""); if (/^[=+\-@\t]/.test(s)) s = "'" + s; return `"${s.replace(/"/g, '""')}"`; };

/** Members as CSV (opens in Excel / Google Sheets). */
export async function GET() {
  if (!(await requireAdmin())) return json({ error: "forbidden" }, 403);
  const [members, proPaths] = await Promise.all([getMany<Member>(await listPaths("members/", 5000)), listPaths("pro/", 5000)]);
  const pro = new Set(proPaths.map((p) => p.slice(4, -5)));
  const rows = [["Name", "Email", "WhatsApp", "WhatsApp updates OK", "Plan", "Joined", "Came from"], ...members.filter((m) => m.role !== "admin").sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((m) => [m.name, m.email, m.whatsapp, m.consent ? "Yes" : "No", pro.has(emailKey(m.email)) ? "Pro" : "Free", m.createdAt.slice(0, 10), m.door ?? ""])];
  return new Response("﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n"), { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="afshal-ai-members.csv"`, "cache-control": "no-store" } });
}
