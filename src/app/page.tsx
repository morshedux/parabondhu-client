import Link from "next/link";
import { Suspense } from "react";
import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import RecentEvents from "@/components/home/RecentEvents";
import { EventGridSkeleton } from "@/components/Skeletons";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <section className="page-container pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Coming up next</h2>
            <p className="section-text">The six closest events on the calendar.</p>
          </div>
          <Link href="/events" className="btn btn-outline btn-primary">See all events</Link>
        </div>
        <div className="mt-8">
          <Suspense fallback={<EventGridSkeleton />}>
            <RecentEvents />
          </Suspense>
        </div>
      </section>
      <Gallery />
      <Newsletter />
    </>
  );
}
