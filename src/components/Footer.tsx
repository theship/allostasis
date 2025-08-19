import Image from "next/image";
import siteCopy from "@/content/copy";

export default function Footer() {
  return (
    <footer className="border-t border-dark-800 bg-dark-900/50">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <Image 
              src="/logo.svg" 
              alt={siteCopy.meta.siteTitle}
              width={120}
              height={36}
              className="h-8 w-auto opacity-60"
            />
            <div>
              <p className="text-xs text-dark-400">
                {siteCopy.footer.disclaimer}
              </p>
              <p className="text-xs text-dark-400 mt-2">
                © {new Date().getFullYear()} {siteCopy.footer.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}