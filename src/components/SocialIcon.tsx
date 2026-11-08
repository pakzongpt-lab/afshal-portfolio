import { brandIcons } from "./brandIcons";

export default function SocialIcon({ name, className = "h-4 w-4", color }: { name: string; className?: string; color?: string }) {
  const icon = brandIcons[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill={color ?? "currentColor"}>
      <path d={icon.path} />
    </svg>
  );
}
