import { getJSON } from "./store";

export type Settings = { pricePkr: number; easypaisa: string; jazzcash: string; bank: string; note: string };
export const defaultSettings: Settings = { pricePkr: 1499, easypaisa: "", jazzcash: "", bank: "", note: "" };
export async function getSettings(): Promise<Settings> { return { ...defaultSettings, ...((await getJSON<Partial<Settings>>("settings.json")) ?? {}) }; }

export type Payment = { id: string; key: string; email: string; name: string; whatsapp: string; method: string; txn: string; amount: number; shot: string; createdAt: string };
export type PayStatus = { status: "approved" | "rejected"; at: string; note?: string };
export const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
