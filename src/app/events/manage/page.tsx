import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import ManageEvents from "./ManageEvents";

export const metadata: Metadata = { title: "Manage Events | Parabondhu" };

export default async function ManageEventsPage() {
  await requireUser("/events/manage");
  return (
    <div className="page-container py-12">
      <h1 className="section-title">Manage your events</h1>
      <p className="section-text mb-8">Update the details of events you created, or delete them.</p>
      <ManageEvents />
    </div>
  );
}
