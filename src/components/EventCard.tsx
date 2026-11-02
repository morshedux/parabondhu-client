import Link from "next/link";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { EventItem, formatDate } from "@/lib/api";
import EventImage from "./EventImage";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="event-card flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="relative aspect-[16/10]">
        <EventImage src={event.thumbnail} alt={event.title} />
        <span className="badge badge-accent absolute left-3 top-3 font-semibold">
          {event.eventType}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-14 font-display text-xl font-bold leading-7">
          {event.title}
        </h3>
        <p className="flex items-start gap-2 text-sm">
          <FiMapPin className="mt-0.5 shrink-0 text-secondary" />
          <span className="line-clamp-1">{event.location}</span>
        </p>
        <p className="flex items-start gap-2 text-sm">
          <FiCalendar className="mt-0.5 shrink-0 text-secondary" />
          {formatDate(event.eventDate)}
        </p>
        <Link href={`/events/${event._id}`} className="btn btn-primary mt-auto">
          View Event
        </Link>
      </div>
    </article>
  );
}
