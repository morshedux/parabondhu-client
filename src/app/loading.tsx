import { EventGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="page-container py-12">
      <div className="skeleton mb-8 h-10 w-64" />
      <EventGridSkeleton />
    </div>
  );
}
