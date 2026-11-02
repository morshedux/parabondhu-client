"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/Skeletons";
import { api, errorMessage, EventItem } from "@/lib/api";

export default function JoinedEvents() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<EventItem[]>("/joins/mine", { auth: true })
      .then(setEvents)
      .catch((cause) => setError(errorMessage(cause)));
  }, []);

  if (error) return <p className="rounded-box bg-base-200 p-8 text-center">{error}</p>;
  if (!events) return <EventGridSkeleton count={3} />;
  if (events.length === 0) {
    return (
      <div className="rounded-box bg-base-200 p-8 text-center">
        <p>You have not joined any events yet.</p>
        <Link href="/events" className="btn btn-primary mt-4">Find an event</Link>
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
