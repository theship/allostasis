import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import siteCopy from "@/content/copy";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://allostasis.ai";

// Display: characterful serif. Body: highly readable serif tuned for long measures.
// Weights are pinned to what the design actually uses, so we ship static instances
// instead of full variable ranges — the font payload is the LCP driver on the long
// guide page. Display is only ever `font-semibold` (600); mono only ever 400.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "600",
});

// Body carries 400 (prose) and 500 (`font-medium` nav/buttons), plus real italic for
// taglines. Left variable: pinning these weights produced no payload win, since the
// static instances come back the same size as the variable faces.
const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  style: ["normal", "italic"],
});

// Mono kept only for small editorial labels (layer numbers, eyebrows).
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteCopy.meta.siteTitle,
    template: `%s · ${siteCopy.meta.siteTitle}`,
  },
  description: siteCopy.meta.siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteCopy.meta.siteTitle,
    url: SITE_URL,
    title: siteCopy.meta.siteTitle,
    description: siteCopy.meta.siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteCopy.meta.siteTitle,
    description: siteCopy.meta.siteDescription,
  },
};

// Tints the browser chrome on mobile to the page background.
export const viewport: Viewport = {
  themeColor: "#0d0c0a",
};

// JSON-LD: Person (the practitioner) + ProfessionalService (the practice).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#julee-burdekin`,
      name: "Julee Burdekin",
      jobTitle: "Knowledge Engineer",
      description:
        "Closes the vision gap — the distance between what leadership means and what a company's data objects actually say — so the agents reading those objects stop guessing.",
      url: `${SITE_URL}/about`,
      worksFor: { "@id": `${SITE_URL}/#allostasis` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#allostasis`,
      name: "Allostasis AI",
      url: SITE_URL,
      description: siteCopy.meta.siteDescription,
      email: "info@allostasis.ai",
      // Google reads `logo` for the knowledge panel / rich results.
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/icon-512.png`,
      founder: { "@id": `${SITE_URL}/#julee-burdekin` },
      areaServed: "Worldwide",
      knowsAbout: [
        "Agent-readiness",
        "Organizational legibility",
        "Data objects",
        "Data contracts",
        "Enterprise ontology",
        "Knowledge graph for AI",
        "Semantic layer",
        "Agent evals",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-body antialiased bg-ink-950 text-paper-100 min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
