import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/site";
import { websites } from "@/data/v2";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-10");
  const img = (p: string) => `${profile.site}${p}`;
  return [
    {
      url: profile.site,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      images: [img("/img/me-suit.webp"), img("/influencers/ducky-bhai.webp"), img("/influencers/muhammad-abrar.webp"), img("/img/award-jolta-best-performance.webp"), ...websites.flatMap((w) => (w.desktop ? [img(w.desktop)] : []))],
      videos: [
        { title: "Afshal Amir meeting with Ducky Bhai", thumbnail_loc: img("/influencers/ducky-bhai-meeting.jpg"), description: "Behind the scenes of a creator collaboration with Ducky Bhai.", content_loc: img("/influencers/ducky-bhai-meeting.mp4") },
        { title: "Jolta Electric x Muhammad Abrar collaboration", thumbnail_loc: img("/influencers/muhammad-abrar-meeting.jpg"), description: "A Jolta Electric creator collaboration with Muhammad Abrar, planned by Afshal Amir.", content_loc: img("/influencers/muhammad-abrar-meeting.mp4") },
      ],
    },
    ...projects.map((p) => ({ url: `${profile.site}/work/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
