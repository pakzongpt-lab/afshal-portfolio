/* Small looping motion graphics, one per service. Pure SVG + CSS, so they cost almost nothing to run. */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export default function ServiceIcon({ name, className = "h-20 w-20" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`svc ${className}`} aria-hidden>
      {icons[name]}
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  ai: (
    <g {...S}>
      {[[14, 22], [14, 40], [14, 58]].map(([x, y], i) => [[40, 30], [40, 50]].map(([x2, y2], j) => (
        <line key={`a${i}${j}`} x1={x} y1={y} x2={x2} y2={y2} className="opacity-25" />
      )))}
      {[[40, 30], [40, 50]].map(([x, y], i) => <line key={`b${i}`} x1={x} y1={y} x2={66} y2={40} className="opacity-25" />)}
      {[[14, 22, 40, 30], [14, 58, 40, 50], [40, 30, 66, 40], [14, 40, 40, 50], [40, 50, 66, 40]].map(([x, y, x2, y2], i) => (
        <line key={`p${i}`} x1={x} y1={y} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth={2} pathLength={1} className="svc-pulse" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      {[[14, 22], [14, 40], [14, 58], [40, 30], [40, 50]].map(([x, y], i) => <circle key={`n${i}`} cx={x} cy={y} r={4} fill="var(--bg)" />)}
      <circle cx={66} cy={40} r={6} fill="var(--accent)" stroke="none" className="svc-beat" />
    </g>
  ),
  marketing: (
    <g {...S}>
      <line x1={10} y1={66} x2={70} y2={66} className="opacity-40" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={16 + i * 14} y={30} width={8} height={36} rx={2} className="svc-bar" style={{ animationDelay: `${i * 0.15}s`, transformOrigin: `${20 + i * 14}px 66px` }} />
      ))}
      <path d="M12 52 L30 40 L44 46 L66 18" stroke="var(--accent)" strokeWidth={2} className="svc-draw" pathLength={1} />
      <path d="M58 18 H66 V26" stroke="var(--accent)" strokeWidth={2} />
    </g>
  ),
  social: (
    <g {...S}>
      <path d="M16 20 h40 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 H32 l-10 9 v-9 h-6 a6 6 0 0 1 -6 -6 V26 a6 6 0 0 1 6 -6z" />
      <path d="M36 44 c-6 -4 -10 -7 -10 -11 a5 5 0 0 1 10 -1 a5 5 0 0 1 10 1 c0 4 -4 7 -10 11z" fill="var(--accent)" stroke="none" className="svc-beat" style={{ transformOrigin: "36px 36px" }} />
      <g className="svc-spin" style={{ transformOrigin: "40px 38px" }}>
        <circle cx={70} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={10} cy={38} r={2} fill="var(--violet)" stroke="none" />
      </g>
    </g>
  ),
  brand: (
    <g {...S}>
      <circle cx={40} cy={40} r={30} strokeDasharray="3 6" className="svc-spin opacity-50" style={{ transformOrigin: "40px 40px" }} />
      <path d="M40 16 L62 40 L40 64 L18 40 Z" className="svc-draw" pathLength={1} />
      <path d="M40 28 L52 40 L40 52 L28 40 Z" fill="var(--accent)" stroke="none" className="svc-beat" style={{ transformOrigin: "40px 40px" }} />
    </g>
  ),
  design: (
    <g {...S}>
      <path d="M10 60 C 24 20, 46 70, 70 22" stroke="var(--accent)" strokeWidth={2} className="svc-draw" pathLength={1} />
      <circle cx={10} cy={60} r={3} fill="var(--bg)" />
      <circle cx={70} cy={22} r={3} fill="var(--bg)" />
      <line x1={10} y1={60} x2={24} y2={30} className="opacity-40" />
      <line x1={70} y1={22} x2={52} y2={62} className="opacity-40" />
      <rect x={21} y={27} width={6} height={6} fill="currentColor" />
      <rect x={49} y={59} width={6} height={6} fill="currentColor" />
    </g>
  ),
  motion: (
    <g {...S}>
      <rect x={10} y={18} width={60} height={40} rx={6} />
      <path d="M35 29 L48 38 L35 47 Z" fill="var(--accent)" stroke="none" className="svc-beat" style={{ transformOrigin: "40px 38px" }} />
      <line x1={10} y1={66} x2={70} y2={66} className="opacity-30" />
      <line x1={10} y1={66} x2={70} y2={66} stroke="var(--accent)" strokeWidth={2} className="svc-scrub" pathLength={1} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={13 + i * 10} y={12} width={5} height={3} rx={1} fill="currentColor" stroke="none" className="opacity-40" />)}
    </g>
  ),
  web: (
    <g {...S}>
      <rect x={8} y={14} width={64} height={50} rx={6} />
      <line x1={8} y1={24} x2={72} y2={24} />
      {[14, 19, 24].map((x) => <circle key={x} cx={x} cy={19} r={1.5} fill="currentColor" stroke="none" />)}
      <rect x={16} y={31} width={22} height={14} rx={2} fill="var(--accent)" stroke="none" className="svc-slide" />
      <line x1={44} y1={33} x2={64} y2={33} className="svc-type" pathLength={1} />
      <line x1={44} y1={39} x2={58} y2={39} className="svc-type" pathLength={1} style={{ animationDelay: ".4s" }} />
      <line x1={16} y1={53} x2={64} y2={53} className="svc-type opacity-50" pathLength={1} style={{ animationDelay: ".8s" }} />
      <line x1={66} y1={50} x2={66} y2={56} stroke="var(--accent)" className="svc-blink" />
    </g>
  ),
  commerce: (
    <g {...S}>
      <path d="M18 30 h44 l-4 34 H22 Z" />
      <path d="M30 30 v-6 a10 10 0 0 1 20 0 v6" />
      <rect x={34} y={6} width={12} height={12} rx={2} fill="var(--accent)" stroke="none" className="svc-drop" />
      <path d="M32 46 l6 6 l12 -12" stroke="var(--accent)" strokeWidth={2} className="svc-draw" pathLength={1} />
    </g>
  ),
};
