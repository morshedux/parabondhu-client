import Link from "next/link";
import EventCard from "@/components/EventCard";
import { API_URL, EventItem } from "@/lib/api";

export default async function RecentEvents() {
  let events: EventItem[] | null = null;
  try {
    const response = await fetch(`${API_URL}/events?limit=6`, { cache: "no-store" });
    if (response.ok) events = await response.json();
  } catch {
    events = null;
  }

  if (!events) {
    return <p className="rounded-box bg-base-200 p-8 text-center">Events could not load. Refresh the page to try again.</p>;
  }
  if (events.length === 0) {
    return (
      <div className="rounded-box bg-base-200 p-8 text-center">
        <p>No upcoming events yet. Create the first one for your area.</p>
        <Link href="/events/create" className="btn btn-primary mt-4">Create an event</Link>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
