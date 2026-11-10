"use client";
import { useState } from "react";
import Icon from "../ui/Icon";

export default function CopyButton({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch {
      const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
    }
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <button type="button" onClick={copy} aria-live="polite"
      className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors active:scale-[0.97] ${done ? "border-emerald-400/60 text-emerald-300" : "border-white/20 text-ink hover:border-white/50"} ${className}`}>
      <Icon name={done ? "Check" : "Copy"} className="h-4 w-4" />{done ? "Copied" : label}
    </button>
  );
}
