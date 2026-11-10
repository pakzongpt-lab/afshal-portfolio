export const inputCls = "mt-2 h-12 w-full rounded-xl border border-line bg-bg px-4 text-base text-ink outline-none placeholder:text-mute/60 focus:border-accent";
export const btnCls = "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-[#111] transition-transform active:scale-[0.98] disabled:opacity-60";
export const ghostCls = "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm transition-colors hover:border-white/50 disabled:opacity-60";
export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="block text-sm text-mute">{label}{children}{hint && <span className="mt-1.5 block text-xs text-mute/80">{hint}</span>}</label>;
}
export const rs = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
