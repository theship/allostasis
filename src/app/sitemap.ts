import type { MetadataRoute } from "next";

const SITE_URL = "https://allostasis.ai";

// Covers the three built routes only (spec §6). Writing/Point of View are external.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/contact"];
  const lastModified = new Date("2026-05-29");
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
