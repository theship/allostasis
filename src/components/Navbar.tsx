"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import siteCopy from "@/content/copy";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-ink-950/90 backdrop-blur-md border-b border-ink-800"
            : "bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10 py-5"
        >
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tightish text-paper-50 transition-opacity hover:opacity-80"
          >
            Allostasis
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-9 md:flex">
            {siteCopy.nav.map((item) => {
              if (item.external) {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-sm font-medium text-paper-300 transition-colors hover:text-paper-50"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-paper-400">
                        ↗
                      </span>
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </li>
                );
              }
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-sans text-sm font-medium transition-colors ${
                      active
                        ? "text-accent-text"
                        : "text-paper-300 hover:text-paper-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/contact" className="btn-primary btn-sm">
                {siteCopy.cta.primaryLabel}
              </Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 text-paper-100 transition-colors hover:text-accent-text"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-xs transform bg-ink-900 shadow-2xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-800 px-6 py-5">
          <span className="font-display text-xl font-semibold text-paper-50">Allostasis</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-paper-100 transition-colors hover:text-accent-text"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="px-6 py-8">
          <ul className="space-y-6">
            {siteCopy.nav.map((item) => {
              if (item.external) {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-lg font-medium text-paper-200 transition-colors hover:text-paper-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-paper-400">↗</span>
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </li>
                );
              }
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block font-sans text-lg font-medium transition-colors ${
                      active ? "text-accent-text" : "text-paper-200 hover:text-paper-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 border-t border-ink-800 pt-8">
            <Link
              href="/contact"
              className="btn-primary w-full"
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
