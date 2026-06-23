import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import siteCopy from "@/content/copy";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://allostasis.ai";

// Display: characterful serif. Body: highly readable serif tuned for long measures.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

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
        "Finds where a company's meaning breaks — conflicting definitions, missing authority — and makes it legible, so the business and its AI can trust the same answers.",
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
      founder: { "@id": `${SITE_URL}/#julee-burdekin` },
      areaServed: "Worldwide",
      knowsAbout: [
        "AI readiness",
        "Data semantics",
        "Authoritative definitions",
        "Data contracts",
        "Semantic layer",
        "Data catalog",
        "Enterprise ontology",
        "Knowledge graph for AI",
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
