import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import CreateEvent from "./CreateEvent";

export const metadata: Metadata = { title: "Create Event | Parabondhu" };

export default async function CreateEventPage() {
  await requireUser("/events/create");
  return (
    <div className="page-container py-12">
      <div className="mx-auto mb-8 max-w-2xl">
        <h1 className="section-title">Create an event</h1>
        <p className="section-text">Tell your neighbours what is happening, where and when.</p>
      </div>
      <CreateEvent />
    </div>
  );
}
