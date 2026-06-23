import { ImageResponse } from "next/og";

// On-brand static OG template applied site-wide (also used as the Twitter image
// fallback). Per-route variants can be added later; spec §6 permits one template.
// NOTE: uses ImageResponse's built-in font rather than the site display face —
// good enough for the card; revisit if a Fraunces OG is wanted later. // TODO

export const alt =
  "Allostasis — find where your meaning breaks, and make it legible to your AI";
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
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 600,
            color: "#ece6da",
            letterSpacing: "-0.02em",
          }}
        >
          Allostasis
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#ece6da",
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          Your AI gives wrong answers because your systems disagree on what your data means.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#bcb2a0",
            maxWidth: 900,
          }}
        >
          We find where your meaning breaks, and make it legible to your AI.
          Start with a two-week AI Readiness Audit.
        </div>
      </div>
    ),
    { ...size }
  );
}
