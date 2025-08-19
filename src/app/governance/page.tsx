import { Metadata } from "next";
import siteCopy from "@/content/copy";

export const metadata: Metadata = {
  title: siteCopy.meta.pages.governance.title,
  description: siteCopy.meta.pages.governance.description,
};

export default function GovernancePage() {
  const c = siteCopy.governance;
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
          <ul className="space-y-4">
            {c.points.map((p) => (
              <li key={p} className="flex items-start">
                <span className="text-winterberry mr-3 mt-1">•</span>
                <span className="text-dark-100 text-lg">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 p-6 bg-dark-900/50 rounded-2xl border border-dark-700">
            <p className="text-dark-200 italic">{c.isolationNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}