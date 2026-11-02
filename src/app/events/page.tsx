import type { Metadata } from "next";
import UpcomingEvents from "./UpcomingEvents";

export const metadata: Metadata = { title: "Upcoming Events | Parabondhu" };

export default function EventsPage() {
  return (
    <div className="page-container py-12">
      <h1 className="section-title">Upcoming events</h1>
      <p className="section-text">Choose a cause near you and show up. Past events are removed from this list automatically.</p>
      <UpcomingEvents />
    </div>
  );
}
