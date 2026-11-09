import type { MetadataRoute } from "next";
import { profile } from "@/data/site";

// Open to search engines and AI answer engines (GEO); only the API is off-limits.
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiBots, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${profile.site}/sitemap.xml`,
    host: profile.site,
  };
}
