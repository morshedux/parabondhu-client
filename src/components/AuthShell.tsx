import type { ReactNode } from "react";

export default function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="page-container grid gap-8 py-10 lg:grid-cols-2 lg:items-center lg:py-16">
      <div className="quilt hidden lg:grid" aria-hidden="true">
        <div className="quilt-patch col-span-2 row-span-2"><img src="/gallery/beach-cleanup.jpg" alt="" /></div>
        <div className="quilt-patch col-span-2 bg-secondary" />
        <div className="quilt-patch bg-accent" />
        <div className="quilt-patch"><img src="/gallery/hands-plant.jpg" alt="" /></div>
      </div>
      <div className="mx-auto w-full max-w-md">
        <h1 className="section-title">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
