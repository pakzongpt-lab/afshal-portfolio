"use client";
import { useEffect, useState } from "react";

export type Me = { name: string; email: string; role: "member" | "admin"; pro: boolean } | null;

/** Current signed-in user (undefined while loading). */
export function useMe() {
  const [me, setMe] = useState<Me | undefined>(undefined);
  useEffect(() => { fetch("/api/me").then((r) => r.json()).then((d) => setMe(d.user ?? null)).catch(() => setMe(null)); }, []);
  return me;
}
