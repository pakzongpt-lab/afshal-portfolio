import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/**
 * Quick technical + SEO check of a public web page. Used when Google
 * PageSpeed Insights is unavailable. Fetches the page from the server,
 * measures it and inspects the HTML. Only public http(s) hosts are allowed.
 */

const MAX_BYTES = 4 * 1024 * 1024;
const UA = "Mozilla/5.0 (compatible; AfshalSiteCheck/1.0; +https://afshal-portfolio.vercel.app)";

function privateIp(ip: string) {
  if (isIP(ip) === 6) {
    const l = ip.toLowerCase();
    return l === "::1" || l.startsWith("fc") || l.startsWith("fd") || l.startsWith("fe80") || l.startsWith("::ffff:127.") || l.startsWith("::ffff:10.") || l.startsWith("::ffff:192.168.");
  }
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

async function safeUrl(raw: string): Promise<URL> {
  const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  if (!["http:", "https:"].includes(u.protocol)) throw new Error("bad-url");
  if (/^(localhost|.*\.local|.*\.internal)$/i.test(u.hostname)) throw new Error("bad-url");
  const addrs = isIP(u.hostname) ? [{ address: u.hostname }] : await lookup(u.hostname, { all: true }).catch(() => { throw new Error("unreachable"); });
  if (!addrs.length || addrs.some((a) => privateIp(a.address))) throw new Error("bad-url");
  return u;
}

async function fetchSafe(url: URL, ms: number, redirects = 5): Promise<{ res: Response; url: URL; hops: number }> {
  let cur = url;
  for (let hop = 0; hop <= redirects; hop++) {
    const res = await fetch(cur, { redirect: "manual", headers: { "user-agent": UA, accept: "text/html,*/*" }, signal: AbortSignal.timeout(ms) });
    const loc = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && loc) {
      cur = await safeUrl(new URL(loc, cur).toString());
      continue;
    }
    return { res, url: cur, hops: hop };
  }
  throw new Error("redirects");
}

async function readCapped(res: Response) {
  const reader = res.body?.getReader();
  if (!reader) return { text: "", bytes: 0 };
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > MAX_BYTES) { reader.cancel(); break; }
    chunks.push(value);
  }
  return { text: new TextDecoder().decode(Buffer.concat(chunks)), bytes };
}

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];
const metaContent = (html: string, key: string) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const t = tags.find((m) => new RegExp(`(name|property)\\s*=\\s*["']${key}["']`, "i").test(m));
  return t ? attr(t, "content") : undefined;
};

type Check = { id: string; cat: "Speed" | "SEO" | "Accessibility" | "Security" | "Social"; ok: boolean; title: string; detail: string; value?: string; weight: number };

export async function POST(req: Request) {
  let raw = "";
  try { raw = String((await req.json()).url ?? ""); } catch {}
  let url: URL;
  try { url = await safeUrl(raw); } catch (e) {
    return Response.json({ error: (e as Error).message === "unreachable" ? "unreachable" : "bad-url" }, { status: 400 });
  }

  const t0 = performance.now();
  let res: Response, finalUrl: URL, hops: number;
  try { ({ res, url: finalUrl, hops } = await fetchSafe(url, 15000)); } catch {
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
  const ttfb = Math.round(performance.now() - t0);
  const { text: html, bytes } = await readCapped(res);
  const total = Math.round(performance.now() - t0);
  const h = res.headers;

  const origin = `${finalUrl.protocol}//${finalUrl.host}`;
  const [robots, sitemap] = await Promise.all(
    ["/robots.txt", "/sitemap.xml"].map((p) => fetch(origin + p, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(6000), redirect: "follow" }).then((r) => r.ok).catch(() => false)),
  );

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
  const desc = metaContent(html, "description") ?? "";
  const viewport = metaContent(html, "viewport") ?? "";
  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const noAlt = imgs.filter((i) => !/\balt\s*=/i.test(i)).length;
  const lang = attr(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang");
  const canonical = /<link\b[^>]*rel\s*=\s*["']canonical["']/i.test(html);
  const og = !!metaContent(html, "og:title") && !!metaContent(html, "og:image");
  const schema = /application\/ld\+json/i.test(html);
  const favicon = /<link\b[^>]*rel\s*=\s*["'][^"']*icon[^"']*["']/i.test(html);
  const scripts = (html.match(/<script\b[^>]*\bsrc=/gi) ?? []).length;
  const noindex = /noindex/i.test(metaContent(html, "robots") ?? "") || /noindex/i.test(h.get("x-robots-tag") ?? "");
  const enc = h.get("content-encoding") ?? "";
  const https = finalUrl.protocol === "https:";
  const hsts = !!h.get("strict-transport-security");
  const kb = Math.round(bytes / 1024);

  const checks: Check[] = [
    { id: "https", cat: "Security", ok: https, title: "Secure HTTPS connection", detail: https ? "Visitors get the padlock and Google's trust signal." : "The site isn't served over HTTPS — browsers warn visitors and rankings suffer.", weight: 5 },
    { id: "ttfb", cat: "Speed", ok: ttfb < 800, title: "Server response time", value: `${ttfb} ms`, detail: ttfb < 800 ? "The server answers quickly." : "The server takes too long to start sending the page. Better hosting or caching would help.", weight: 4 },
    { id: "size", cat: "Speed", ok: kb < 300, title: "HTML page size", value: `${kb} KB`, detail: kb < 300 ? "The page's HTML is lean." : "The HTML alone is heavy. Trim inline code, page builders' extra markup or embedded data.", weight: 2 },
    { id: "compress", cat: "Speed", ok: /br|gzip|zstd/i.test(enc), title: "Text compression", value: enc || "none", detail: /br|gzip|zstd/i.test(enc) ? "Files are compressed before sending." : "Turn on gzip or Brotli compression to cut download size.", weight: 3 },
    { id: "scripts", cat: "Speed", ok: scripts <= 20, title: "External scripts", value: String(scripts), detail: scripts <= 20 ? "A reasonable number of scripts." : "Lots of separate scripts slow the page down. Remove unused plugins and tracking tags.", weight: 2 },
    { id: "redirects", cat: "Speed", ok: hops <= 1, title: "Redirect chain", value: `${hops} hop${hops === 1 ? "" : "s"}`, detail: hops <= 1 ? "Visitors reach the page directly." : "Several redirects before the page loads waste time. Link straight to the final address.", weight: 2 },
    { id: "title", cat: "SEO", ok: title.length >= 10 && title.length <= 65, title: "Page title", value: title ? `${title.length} chars` : "missing", detail: !title ? "No <title> — Google has nothing to show as the headline." : title.length > 65 ? "The title is too long and will be cut off in Google." : title.length < 10 ? "The title is too short to describe the business." : `“${title.slice(0, 70)}”`, weight: 5 },
    { id: "desc", cat: "SEO", ok: desc.length >= 50 && desc.length <= 170, title: "Meta description", value: desc ? `${desc.length} chars` : "missing", detail: !desc ? "No meta description — Google will pick random text for the search snippet." : desc.length > 170 ? "Too long; Google will cut it off." : desc.length < 50 ? "Too short to persuade someone to click." : "A clear search snippet is in place.", weight: 4 },
    { id: "h1", cat: "SEO", ok: h1s === 1, title: "Main heading (H1)", value: String(h1s), detail: h1s === 1 ? "One clear main heading." : h1s === 0 ? "No H1 heading — search engines can't tell what the page is about." : "Several H1 headings confuse the page's main topic.", weight: 3 },
    { id: "canonical", cat: "SEO", ok: canonical, title: "Canonical URL", detail: canonical ? "Duplicate versions of the page point to one address." : "Add a canonical link so Google doesn't split rankings across duplicate URLs.", weight: 2 },
    { id: "robots", cat: "SEO", ok: robots, title: "robots.txt", detail: robots ? "Search engines get crawl instructions." : "No robots.txt found.", weight: 1 },
    { id: "sitemap", cat: "SEO", ok: sitemap, title: "XML sitemap", detail: sitemap ? "A sitemap helps Google find every page." : "No sitemap.xml found — new pages are slower to get indexed.", weight: 2 },
    { id: "schema", cat: "SEO", ok: schema, title: "Structured data", detail: schema ? "Schema markup is present for rich results and AI search." : "Add schema (business, products, FAQ) to stand out in Google and AI answers.", weight: 2 },
    { id: "index", cat: "SEO", ok: !noindex, title: "Indexable by Google", detail: noindex ? "The page tells search engines NOT to index it." : "Search engines are allowed to index this page.", weight: 5 },
    { id: "viewport", cat: "Accessibility", ok: /width\s*=\s*device-width/i.test(viewport), title: "Mobile-friendly viewport", detail: /width\s*=\s*device-width/i.test(viewport) ? "The page scales correctly on phones." : "Missing mobile viewport — the site will look zoomed-out on phones.", weight: 5 },
    { id: "alt", cat: "Accessibility", ok: noAlt === 0, title: "Image descriptions (alt text)", value: imgs.length ? `${noAlt}/${imgs.length} missing` : "no images", detail: noAlt === 0 ? "Images are described for screen readers and Google Images." : `${noAlt} image${noAlt === 1 ? " has" : "s have"} no alt text.`, weight: 3 },
    { id: "lang", cat: "Accessibility", ok: !!lang, title: "Page language", value: lang || "missing", detail: lang ? "Screen readers know which language to use." : "Set the page language (<html lang>) for screen readers and translation.", weight: 1 },
    { id: "og", cat: "Social", ok: og, title: "Social share preview", detail: og ? "Links shared on WhatsApp, Facebook and LinkedIn show a proper preview." : "Add Open Graph title and image so shared links show a rich preview.", weight: 2 },
    { id: "favicon", cat: "Social", ok: favicon, title: "Favicon", detail: favicon ? "The site has a browser-tab icon." : "No favicon — the tab and bookmarks look generic.", weight: 1 },
    { id: "hsts", cat: "Security", ok: !https || hsts, title: "HSTS security header", detail: hsts ? "Browsers are told to always use HTTPS." : "Add the Strict-Transport-Security header to force HTTPS.", weight: 1 },
  ];

  const by = (cat: Check["cat"]) => {
    const cs = checks.filter((c) => c.cat === cat);
    const w = cs.reduce((s, c) => s + c.weight, 0);
    return Math.round((cs.reduce((s, c) => s + (c.ok ? c.weight : 0), 0) / w) * 100);
  };

  return Response.json({
    url: finalUrl.toString(),
    status: res.status,
    timing: { ttfb, total },
    scores: [
      { key: "speed", label: "Speed", score: by("Speed") },
      { key: "seo", label: "SEO", score: by("SEO") },
      { key: "accessibility", label: "Accessibility", score: by("Accessibility") },
      { key: "security", label: "Security", score: by("Security") },
    ],
    checks,
  }, { headers: { "cache-control": "no-store" } });
}
