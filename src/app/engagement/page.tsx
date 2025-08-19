import { Metadata } from "next";
import siteCopy from "@/content/copy";

export const metadata: Metadata = {
  title: siteCopy.meta.pages.engagement.title,
  description: siteCopy.meta.pages.engagement.description,
};

export default function EngagementPage() {
  const c = siteCopy.engagement;
  return (
    <>
      <section className="min-h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dark-50 mb-8">
            {c.headline}
          </h1>
        </div>
      </section>

      <section className="min-h-[60vh] px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {c.models.map((m) => (
              <div key={m.title} className="bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 hover:bg-dark-900/70 hover:border-winterberry/30 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-dark-50 mb-4">{m.title}</h2>
                <p className="text-dark-200">{m.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 rounded-2xl bg-dark-900/50 border border-dark-800">
            <p className="text-lg text-dark-100 text-center">
              {c.firstTwoWeeks}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}