import { Metadata } from "next";
import siteCopy from "@/content/copy";

export const metadata: Metadata = {
  title: siteCopy.meta.pages.results.title,
  description: siteCopy.meta.pages.results.description,
};

export default function ResultsPage() {
  const c = siteCopy.results;
  return (
    <>
      <section className="min-h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dark-50 mb-8">
            {c.headline}
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {c.cards.map((card, i) => (
              <div key={i} className="bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 hover:bg-dark-900/70 hover:border-winterberry/30 transition-all duration-300">
                <div className="mb-6">
                  <p className="text-sm text-winterberry font-semibold uppercase tracking-wider mb-2">Context</p>
                  <p className="text-dark-100">{card.context}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-winterberry font-semibold uppercase tracking-wider mb-2">What shipped</p>
                  <p className="text-dark-100">{card.shipped}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-winterberry font-semibold uppercase tracking-wider mb-2">Impact</p>
                  <p className="text-dark-100">{card.impact}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-winterberry font-semibold uppercase tracking-wider mb-2">Timeline & scale</p>
                  <p className="text-dark-100">{card.timelineScale}</p>
                </div>
                
                <div>
                  <p className="text-sm text-winterberry font-semibold uppercase tracking-wider mb-2">Delivered</p>
                  <p className="text-dark-100">{card.delivered}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}