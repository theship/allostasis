import { Metadata } from "next";
import siteCopy from "@/content/copy";

export const metadata: Metadata = {
  title: siteCopy.meta.pages.approach.title,
  description: siteCopy.meta.pages.approach.description,
};

export default function ApproachPage() {
  const c = siteCopy.approach;
  return (
    <>
      <section className="min-h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-dark-50 mb-8">
            {c.headline}
          </h1>
          <p className="text-xl text-dark-100 max-w-4xl">
            {c.framing}
          </p>
        </div>
      </section>

      <section className="min-h-screen px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {c.loops.map((loop) => (
              <div key={loop.title} className="bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 hover:bg-dark-900/70 hover:border-winterberry/30 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-dark-50 mb-4">{loop.title}</h2>
                <p className="text-dark-200">{loop.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}