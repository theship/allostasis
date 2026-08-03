import type { MetadataRoute } from "next";
import siteCopy from "@/content/copy";

// Web app manifest — drives the Android/Chrome install icon and theme colour.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteCopy.meta.siteTitle,
    short_name: "Allostasis",
    description: siteCopy.meta.siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0c0a",
    theme_color: "#0d0c0a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/allostasis-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
