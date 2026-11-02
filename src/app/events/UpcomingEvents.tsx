"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/Skeletons";
import { api, errorMessage, EventItem } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/validation";

export default function UpcomingEvents() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      const query = new URLSearchParams();
      if (search.trim()) query.set("search", search.trim());
      if (type) query.set("type", type);
      try {
        const result = await api<EventItem[]>(`/events?${query}`);
        if (active) {
          setEvents(result);
          setError("");
        }
      } catch (cause) {
        if (active) setError(errorMessage(cause));
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search, type]);

  return (
    <>
      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_14rem]">
        <input
          type="search"
          aria-label="Search events"
          placeholder="Search by title or area"
          className="input w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select aria-label="Filter by event type" className="select w-full" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All event types</option>
          {EVENT_TYPES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="mt-8">
        {error ? (
          <p className="rounded-box bg-base-200 p-8 text-center">{error}</p>
        ) : !events ? (
          <EventGridSkeleton />
        ) : events.length === 0 ? (
          <p className="rounded-box bg-base-200 p-8 text-center">No upcoming events match. Try another area or event type.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
