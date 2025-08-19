import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg hover:border-accent/20">
      {children}
    </div>
  );
}