import fs from "node:fs";
import path from "node:path";

/**
 * The brand mark, inlined as a data URI for next/og.
 *
 * Uses the SVG rather than allostasis-mark.png: the PNG has a white background
 * baked in, which reads as a white box on the dark OG card. The SVG has no
 * background rect, so it sits directly on the card.
 *
 * next/og cannot fetch relative URLs at build time, so the file is read from
 * public/ and embedded. Both OG routes are statically prerendered, so this runs
 * once at build on the Node runtime.
 */
export const markDataUri = `data:image/svg+xml;base64,${fs
  .readFileSync(path.join(process.cwd(), "public", "allostasis-mark.svg"))
  .toString("base64")}`;
