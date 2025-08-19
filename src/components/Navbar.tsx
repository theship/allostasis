"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import siteCopy from "@/content/copy";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-dark-950/95 backdrop-blur-lg border-b border-dark-800" : "bg-transparent"
      }`}>
        <a 
          href="#main" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-winterberry focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20 py-6">
          <Link 
            href="/" 
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <Image 
              src="/logo.svg" 
              alt={siteCopy.meta.siteTitle}
              width={140}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 lg:flex">
            {siteCopy.nav.slice(1, -1).map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-medium transition-all duration-300 hover:text-winterberry ${
                      active ? "text-winterberry" : "text-dark-300 hover:text-dark-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-dark-300 hover:text-dark-50 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-winterberry text-white text-sm font-medium rounded-lg hover:bg-winterberry/90 transition-all duration-300 hover:shadow-lg"
            >
              {siteCopy.cta.primaryLabel}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-dark-50 hover:text-winterberry transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-dark-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-dark-950 shadow-2xl transform transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-dark-800">
          <Link 
            href="/" 
            className="flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image 
              src="/logo.svg" 
              alt={siteCopy.meta.siteTitle}
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-dark-50 hover:text-winterberry transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-6 py-8">
          <ul className="space-y-6">
            {siteCopy.nav.slice(1).map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block text-lg font-medium transition-all duration-300 hover:text-winterberry ${
                      active ? "text-winterberry" : "text-dark-200 hover:text-dark-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-8 border-t border-dark-800">
            <Link
              href="/contact"
              className="block w-full px-6 py-4 bg-winterberry text-white text-center font-medium rounded-lg hover:bg-winterberry/90 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {siteCopy.cta.primaryLabel}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}