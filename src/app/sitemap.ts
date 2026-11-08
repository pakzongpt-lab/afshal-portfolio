import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${profile.site}/work/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
