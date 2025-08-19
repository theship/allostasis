import { PropsWithChildren } from "react";

export default function CardGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}