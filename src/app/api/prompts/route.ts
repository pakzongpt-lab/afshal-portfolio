import { currentUser, json } from "@/lib/auth";
import { FREE_OPEN, promptCats } from "@/data/prompts";
import { proPrompts } from "@/data/prompts-pro";

/** Returns the prompts this visitor has unlocked beyond the open ones. `?download=txt|md|json` (Pro) returns the whole library as a file. */
export async function GET(req: Request) {
  const u = await currentUser();
  if (!u) return json({ tier: "guest", member: {}, pro: {} });
  const member = Object.fromEntries(promptCats.map((c) => [c.key, c.prompts.slice(FREE_OPEN)]));
  if (!u.pro) return json({ tier: "member", member, pro: {} });
  const dl = new URL(req.url).searchParams.get("download");
  if (dl) {
    const all = promptCats.map((c) => ({ category: c.title, prompts: [...c.prompts, ...(proPrompts[c.key] ?? [])] }));
    const stamp = `Afshal.ai prompt library — licensed to ${u.email}`;
    const body = dl === "json" ? JSON.stringify({ license: stamp, categories: all }, null, 2)
      : dl === "md" ? `# Afshal.ai prompt library\n\n_${stamp}_\n\n` + all.map((c) => `## ${c.category}\n\n` + c.prompts.map((p) => `### ${p.t}\n\n${p.p}\n`).join("\n")).join("\n")
      : `${stamp}\n\n` + all.map((c) => `== ${c.category} ==\n\n` + c.prompts.map((p) => `${p.t}\n${p.p}\n`).join("\n")).join("\n");
    const ext = dl === "json" ? "json" : dl === "md" ? "md" : "txt";
    return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "content-disposition": `attachment; filename="afshal-ai-prompts.${ext}"`, "cache-control": "no-store" } });
  }
  return json({ tier: "pro", member, pro: proPrompts });
}
