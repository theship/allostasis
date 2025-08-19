import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import siteCopy from "@/content/copy";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteCopy.meta.siteTitle,
  description: siteCopy.meta.siteDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-dark-950 text-dark-100 min-h-screen flex flex-col">
        <Navbar />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}