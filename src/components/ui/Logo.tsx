/** Afshal's GOAT logo (white, transparent). */
export default function Logo({ className = "h-8 w-auto", mark = false }: { className?: string; mark?: boolean }) {
  return mark ? (
    <img src="/brand/goat-white.webp" alt="Afshal Amir logo" className={className} width={160} height={174} />
  ) : (
    <img src="/brand/logo-white-sm.webp" srcSet="/brand/logo-white-sm.webp 360w, /brand/logo-white.webp 900w" sizes="180px" alt="Afshal — GOAT logo" className={className} width={360} height={131} />
  );
}
