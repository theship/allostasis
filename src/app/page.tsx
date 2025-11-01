import { Metadata } from "next";
import Link from "next/link";
import siteCopy from "@/content/copy";
import DiagramLoop from "@/components/DiagramLoop";

export const metadata: Metadata = {
  title: siteCopy.meta.pages.home.title,
  description: siteCopy.meta.pages.home.description,
};

export default function HomePage() {
  const c = siteCopy.home;
  return (
    <>
      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 pt-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-crown/20 via-dark-950 to-roast/20 opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="block text-dark-50 leading-tight">{c.headline.line1}</span>
            <span className="block bg-gradient-to-r from-vapor via-winterberry to-vapor bg-clip-text text-transparent leading-relaxed pb-4">
              {c.headline.line2}
            </span>
            <span className="block text-dark-200 text-3xl md:text-5xl lg:text-6xl mt-6 leading-tight">
              {c.headline.line3}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-dark-200 max-w-4xl leading-relaxed mb-12">
            {c.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/contact" className="btn-primary">
              {siteCopy.cta.primaryLabel}
            </a>
            <a href="#principles" className="btn-secondary">
              Explore Our Approach
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Principles Section - Full Screen */}
      <section id="principles" className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-dark-50 mb-16">
            Core Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {c.bullets.map((b, index) => (
              <div 
                key={b.title} 
                className="bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 hover:bg-dark-900/70 hover:border-winterberry/30 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-winterberry text-6xl font-bold mb-4 opacity-30 group-hover:opacity-50 transition-opacity">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-semibold text-dark-50 mb-4">{b.title}</h3>
                <p className="text-dark-300 text-lg leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-dark-50 mb-16 text-center">
            Our Process
          </h2>
          <DiagramLoop />
          <p className="text-center text-dark-200 text-lg mt-12 max-w-3xl mx-auto">
            Every decision—data, labels, prompts, models—has a paper trail and a rollback plan. 
            We optimize for traceability and steady-state operations.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 md:px-12 lg:px-20 bg-gradient-to-r from-dark-900 via-dark-950 to-dark-900">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-dark-50 mb-8">
            {c.ctaSection.heading}
          </h2>
          <p className="text-xl text-dark-200 mb-12 max-w-2xl mx-auto">
            {c.ctaSection.subheading}
          </p>
          <Link href="/contact" className="btn-primary text-lg">
            {c.ctaSection.buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}