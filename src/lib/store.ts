import { del, get, list, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Small document store on a private Vercel Blob store (one JSON file per record).
 * Good for the launch volume; swap for a database when records pass a few thousand.
 * Without a token (local development) it falls back to ./.data on disk.
 */
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const DEV_DIR = path.join(process.cwd(), ".data");
const dev = !TOKEN;
if (dev && process.env.VERCEL) throw new Error("BLOB_READ_WRITE_TOKEN is missing");

const safe = (p: string) => { if (!/^[a-z0-9/_.-]+$/i.test(p) || p.includes("..")) throw new Error("bad path"); return p; };

export async function getJSON<T>(p: string): Promise<T | null> {
  safe(p);
  if (dev) { try { return JSON.parse(await fs.readFile(path.join(DEV_DIR, p), "utf8")); } catch { return null; } }
  const r = await get(p, { access: "private", useCache: false });
  if (!r || !r.stream) return null;
  return JSON.parse(await new Response(r.stream).text());
}

export async function putJSON(p: string, data: unknown, overwrite = true) {
  safe(p);
  if (dev) {
    const f = path.join(DEV_DIR, p); await fs.mkdir(path.dirname(f), { recursive: true });
    if (!overwrite) { try { await fs.access(f); throw new Error("exists"); } catch (e) { if ((e as Error).message === "exists") throw e; } }
    await fs.writeFile(f, JSON.stringify(data)); return;
  }
  await put(p, JSON.stringify(data), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: overwrite, cacheControlMaxAge: 60 });
}

export async function putFile(p: string, body: ArrayBuffer, contentType: string) {
  safe(p);
  if (dev) { const f = path.join(DEV_DIR, p); await fs.mkdir(path.dirname(f), { recursive: true }); await fs.writeFile(f, Buffer.from(body)); return; }
  await put(p, Buffer.from(body), { access: "private", contentType, addRandomSuffix: false, allowOverwrite: false });
}

export async function getFile(p: string): Promise<{ body: ReadableStream | Buffer; contentType: string } | null> {
  safe(p);
  if (dev) { try { return { body: await fs.readFile(path.join(DEV_DIR, p)), contentType: p.endsWith(".png") ? "image/png" : p.endsWith(".webp") ? "image/webp" : "image/jpeg" }; } catch { return null; } }
  const r = await get(p, { access: "private", useCache: false });
  if (!r || !r.stream) return null;
  return { body: r.stream, contentType: r.blob.contentType || "application/octet-stream" };
}

/** Paths under a prefix, newest first (up to `max`). */
export async function listPaths(prefix: string, max = 1000): Promise<string[]> {
  safe(prefix);
  if (dev) {
    try {
      const dir = path.join(DEV_DIR, prefix);
      const names = await fs.readdir(dir);
      const withTime = await Promise.all(names.map(async (n) => ({ n, t: (await fs.stat(path.join(dir, n))).mtimeMs })));
      return withTime.sort((a, b) => b.t - a.t).slice(0, max).map((x) => prefix + x.n);
    } catch { return []; }
  }
  const out: { pathname: string; uploadedAt: Date }[] = [];
  let cursor: string | undefined;
  do {
    const r = await list({ prefix, cursor, limit: 1000 });
    out.push(...r.blobs); cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor && out.length < 5000);
  return out.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt)).slice(0, max).map((b) => b.pathname);
}

export async function remove(p: string) {
  safe(p);
  if (dev) { await fs.rm(path.join(DEV_DIR, p), { force: true }); return; }
  await del(p);
}

/** Read many JSON docs with limited concurrency. */
export async function getMany<T>(paths: string[]): Promise<T[]> {
  const out: (T | null)[] = new Array(paths.length).fill(null);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(12, paths.length) }, async () => {
    while (i < paths.length) { const k = i++; out[k] = await getJSON<T>(paths[k]).catch(() => null); }
  }));
  return out.filter(Boolean) as T[];
}
