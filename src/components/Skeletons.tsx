export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading events">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-box border border-base-300">
          <div className="skeleton aspect-[16/10] rounded-none" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-6 w-4/5" />
            <div className="skeleton h-4 w-3/5" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="page-container grid gap-8 py-12 lg:grid-cols-2" aria-label="Loading event">
      <div className="skeleton aspect-[16/10]" />
      <div className="space-y-4">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-10 w-4/5" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-28 w-full" />
        <div className="skeleton h-12 w-40" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-5" aria-label="Loading form">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="skeleton h-12 w-full" />
      ))}
    </div>
  );
}
