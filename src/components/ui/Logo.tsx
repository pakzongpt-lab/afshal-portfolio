/** Afshal's GOAT logo (white, transparent). */
export default function Logo({ className = "h-8 w-auto", mark = false }: { className?: string; mark?: boolean }) {
  return mark ? (
    <img src="/brand/goat-white.png" alt="Afshal Amir logo" className={className} width={367} height={400} />
  ) : (
    <img src="/brand/logo-white.png" alt="Afshal — GOAT logo" className={className} width={900} height={328} />
  );
}
