import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container py-24 text-center">
      <h1 className="section-title">This page does not exist</h1>
      <p className="section-text mx-auto">The event may have been deleted, or the link may be wrong.</p>
      <Link href="/events" className="btn btn-primary mt-6">See upcoming events</Link>
    </div>
  );
}
