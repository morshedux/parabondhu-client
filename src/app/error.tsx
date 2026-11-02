"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-container py-24 text-center">
      <h1 className="section-title">This page could not load</h1>
      <p className="section-text mx-auto">Check your connection, then try again.</p>
      <button type="button" className="btn btn-primary mt-6" onClick={reset}>Try again</button>
    </div>
  );
}
