import type { MetadataRoute } from "next";
import siteCopy from "@/content/copy";

const SITE_URL = "https://allostasis.ai";

// The four built routes. Writing remains an external link and is not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteCopy.fieldGuide.updatedISO);
  const routes = ["/", "/agent-readiness", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/agent-readiness" ? 0.9 : 0.8,
  }));
}
