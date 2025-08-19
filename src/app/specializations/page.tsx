import { Metadata } from "next";
import siteCopy from "@/content/copy";

export const metadata: Metadata = {
  title: siteCopy.meta.pages.specializations.title,
  description: siteCopy.meta.pages.specializations.description,
};

export default function SpecializationsPage() {
  const c = siteCopy.specializations;
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

      {/* Specializations Grid */}
      <section className="min-h-screen px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.cards.map((card, index) => (
              <div 
                key={card.title}
                className="card-dark group hover:border-winterberry/30 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-winterberry to-crown mb-6" />
                  <h2 className="text-2xl font-semibold text-dark-50 group-hover:text-winterberry transition-colors">
                    {card.title}
                  </h2>
                </div>
                <p className="text-dark-200 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-8 rounded-2xl bg-dark-900/50 border border-dark-800">
            <p className="text-lg text-dark-200 italic text-center">
              {c.loopNote}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}