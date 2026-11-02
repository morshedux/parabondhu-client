import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCalendar, FiMapPin, FiUser, FiUsers } from "react-icons/fi";
import EventImage from "@/components/EventImage";
import { API_URL, EventItem, formatDate, hasPassed } from "@/lib/api";
import JoinButton from "./JoinButton";

export const metadata: Metadata = { title: "Event Details | Parabondhu" };

export default async function EventDetailsPage({ params }: PageProps<"/events/[id]">) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("Event could not load");
  const event: EventItem = await response.json();
  const isPast = hasPassed(event.eventDate);

  return (
    <div className="page-container grid gap-8 py-12 lg:grid-cols-2 lg:items-start">
      <Link href="/events" className="link font-semibold lg:col-span-2">Back to upcoming events</Link>
      <div className="aspect-[16/10] overflow-hidden rounded-box">
        <EventImage src={event.thumbnail} alt={event.title} />
      </div>
      <div>
        <span className="badge badge-accent font-semibold">{event.eventType}</span>
        <h1 className="section-title mt-3">{event.title}</h1>
        <ul className="mt-5 space-y-2">
          <li className="flex items-start gap-2"><FiCalendar className="mt-1 shrink-0 text-secondary" />{formatDate(event.eventDate)}</li>
          <li className="flex items-start gap-2"><FiMapPin className="mt-1 shrink-0 text-secondary" />{event.location}</li>
          <li className="flex items-start gap-2"><FiUser className="mt-1 shrink-0 text-secondary" />Organised by {event.creatorName}</li>
          <li className="flex items-start gap-2"><FiUsers className="mt-1 shrink-0 text-secondary" />{event.participants ?? 0} joined so far</li>
        </ul>
        <div className="stitch-line my-6" aria-hidden="true" />
        <p className="whitespace-pre-line leading-relaxed">{event.description}</p>
        <div className="mt-6">
          <JoinButton eventId={event._id} isPast={isPast} />
        </div>
      </div>
    </div>
  );
}
