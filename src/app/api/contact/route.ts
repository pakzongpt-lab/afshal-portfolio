// Sends contact-form messages through Resend (https://resend.com) when RESEND_API_KEY is set.
// Without it, returns 501 and the form falls back to opening the visitor's email app.

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string; services?: string[]; company?: string };
  try { body = await req.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }

  if (body.company) return Response.json({ ok: true }); // honeypot filled: quietly drop bots
  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);
  const services = Array.isArray(body.services) ? body.services.slice(0, 10).map(String) : [];
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return Response.json({ error: "Please fill in your name, a valid email and a message." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return Response.json({ error: "Email not configured" }, { status: 501 });

  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      html: `<p><b>${esc(name)}</b> (${esc(email)})</p><p>Interested in: ${esc(services.join(", ") || "—")}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!res.ok) return Response.json({ error: "Send failed" }, { status: 502 });
  return Response.json({ ok: true });
}
