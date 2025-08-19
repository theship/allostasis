import { PropsWithChildren } from "react";

export default function Section({ children }: PropsWithChildren) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      {children}
    </section>
  );
}