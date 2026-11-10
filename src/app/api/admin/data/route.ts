import { ADMIN_EMAIL, emailKey as emailKeyOf, json, requireAdmin, type Member } from "@/lib/auth";
import { getSettings, type Payment, type PayStatus } from "@/lib/hub";
import { getJSON, getMany, listPaths } from "@/lib/store";

export async function GET() {
  if (!(await requireAdmin())) return json({ error: "forbidden" }, 403);
  const [memberPaths, proPaths, payPaths, settings] = await Promise.all([listPaths("members/", 2000), listPaths("pro/", 5000), listPaths("payments/", 300), getSettings()]);
  const proKeys = new Set(proPaths.map((p) => p.slice(4, -5)));
  const [members, pays] = await Promise.all([getMany<Member>(memberPaths.slice(0, 500)), getMany<Payment>(payPaths)]);
  const payments = await Promise.all(pays.map(async (p) => ({ ...p, ...((await getJSON<PayStatus>(`paystatus/${p.id}.json`)) ?? { status: "pending" as const }) })));
  payments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const approved = payments.filter((p) => p.status === "approved");
  return json({
    stats: { members: memberPaths.filter((p) => p !== `members/${emailKeyOf(ADMIN_EMAIL)}.json`).length, pro: proPaths.length, pending: payments.filter((p) => p.status === "pending").length, revenue: approved.reduce((n, p) => n + p.amount, 0) },
    payments,
    members: members.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(({ pass: _p, ...m }) => ({ ...m, pro: proKeys.has(emailKeyOf(m.email)) })),
    settings,
  });
}
