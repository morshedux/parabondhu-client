import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import JoinedEvents from "./JoinedEvents";

export const metadata: Metadata = { title: "Joined Events | Parabondhu" };

export default async function JoinedEventsPage() {
  await requireUser("/events/joined");
  return (
    <div className="page-container py-12">
      <h1 className="section-title">Events you joined</h1>
      <p className="section-text mb-8">Listed by event date, with the earliest first.</p>
      <JoinedEvents />
    </div>
  );
}
