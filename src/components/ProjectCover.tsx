import type { Project } from "@/data/site";

/** Real screenshot or work image when we have one; otherwise a typographic cover in the project's accent colour. */
export default function ProjectCover({ p, className = "", sizes = "full" }: { p: Project; className?: string; sizes?: "full" | "thumb" }) {
  if (p.cover && !p.cover.includes("/logo-")) {
    return <img src={p.cover} alt={`${p.name} preview`} loading="lazy" decoding="async" className={`h-full w-full object-cover object-left-top ${className}`} />;
  }
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`} style={{ background: `radial-gradient(120% 90% at 20% 10%, ${p.accent}55, transparent 60%), linear-gradient(160deg, #15151c, #0a0a0e)` }}>
      <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />
      {p.logo ? (
        <div className={`relative grid place-items-center rounded-3xl bg-white p-6 shadow-2xl ${sizes === "thumb" ? "h-24 w-40" : "h-40 w-64 md:h-48 md:w-80"}`}>
          <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>
      ) : (
        <div className="relative text-center">
          <div className={`display ${sizes === "thumb" ? "text-3xl" : "text-5xl md:text-7xl"}`} style={{ color: p.accent }}>{p.name}</div>
          <div className="label mt-3">{p.domain}</div>
        </div>
      )}
    </div>
  );
}
