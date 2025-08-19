"use client";

import { useState } from "react";
import siteCopy from "@/content/copy";

// Define types for method sections
interface MethodSubsection {
  title: string;
  text: string;
  isCode?: boolean;
}

interface MethodSection {
  heading: string;
  content?: string;
  bullets?: string[];
  subsections?: MethodSubsection[];
}

export default function MethodsPage() {
  const [openMethod, setOpenMethod] = useState<string | null>(null);
  const c = siteCopy.methods;

  const toggleMethod = (methodId: string) => {
    setOpenMethod(openMethod === methodId ? null : methodId);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dark-50 mb-8">
            {c.headline}
          </h1>
          <p className="text-xl text-dark-100 max-w-4xl">
            {c.intro}
          </p>
        </div>
      </section>

      {/* Methods Accordion */}
      <section className="min-h-[60vh] px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {c.articles.map((method) => (
              <div
                key={method.id}
                className="border border-dark-700 rounded-xl overflow-hidden bg-dark-900/50 backdrop-blur-sm hover:border-dark-600 transition-all duration-300"
              >
                <button
                  onClick={() => toggleMethod(method.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left transition-all duration-300 hover:bg-dark-800/50"
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-dark-50 mb-2">
                      {method.title}
                    </h2>
                    <p className="text-dark-300">
                      {method.summary}
                    </p>
                  </div>
                  <svg
                    className={`w-6 h-6 text-winterberry transition-transform duration-300 ${
                      openMethod === method.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openMethod === method.id && (
                  <div className="px-8 py-8 border-t border-dark-700">
                    {method.sections.map((section: MethodSection, idx: number) => (
                      <div key={idx} className={idx > 0 ? "mt-10" : ""}>
                        <h3 className="text-xl font-semibold text-winterberry mb-4">
                          {section.heading}
                        </h3>
                        
                        {section.content && (
                          <p className="text-dark-100 text-lg leading-relaxed mb-4">
                            {section.content}
                          </p>
                        )}
                        
                        {section.bullets && (
                          <ul className="space-y-3 mb-6">
                            {section.bullets.map((bullet: string, bidx: number) => (
                              <li key={bidx} className="text-dark-100 text-lg pl-8 relative">
                                <span className="absolute left-0 text-winterberry font-bold">▸</span>
                                <span dangerouslySetInnerHTML={{ 
                                  __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark-50">$1</strong>')
                                }} />
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {section.subsections && (
                          <div className="space-y-6">
                            {section.subsections.map((sub: MethodSubsection, sidx: number) => (
                              <div key={sidx}>
                                <h4 className="text-lg font-medium text-dark-50 mb-2">
                                  {sub.title}
                                </h4>
                                {sub.isCode ? (
                                  <pre className="bg-dark-900 border border-dark-700 rounded-lg p-4 text-sm text-dark-200 overflow-x-auto">
                                    {sub.text}
                                  </pre>
                                ) : (
                                  <p className="text-dark-200 leading-relaxed">
                                    {sub.text}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}