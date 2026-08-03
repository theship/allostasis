import { ImageResponse } from "next/og";
import siteCopy from "@/content/copy";
import { markDataUri } from "../og-mark";

// Route-specific OG card for the Field Guide (spec §7). Reuses the site-wide
// template approach; text is the guide title + "Field Guide · Allostasis".
// NOTE: uses ImageResponse's built-in font rather than the Fraunces display
// face — good enough for the card; revisit if a Fraunces OG is wanted. // TODO

export const alt = `${siteCopy.fieldGuide.title} — Field Guide · Allostasis`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0c0a",
          padding: "80px",
          backgroundImage:
            "radial-gradient(60% 60% at 18% 0%, rgba(192,68,92,0.18), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={markDataUri} width={64} height={64} alt="" />
          <span
            style={{
              fontSize: 30,
              color: "#e68a9b",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Field Guide
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#ece6da",
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {siteCopy.fieldGuide.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#bcb2a0",
          }}
        >
          Field Guide · Allostasis
        </div>
      </div>
    ),
    { ...size }
  );
}
