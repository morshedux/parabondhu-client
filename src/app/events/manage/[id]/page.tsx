import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import UpdateEvent from "./UpdateEvent";

export const metadata: Metadata = { title: "Update Event | Parabondhu" };

export default async function UpdateEventPage({ params }: PageProps<"/events/manage/[id]">) {
  const { id } = await params;
  await requireUser(`/events/manage/${id}`);
  return (
    <div className="page-container py-12">
      <h1 className="section-title mx-auto mb-8 max-w-2xl">Update event</h1>
      <UpdateEvent id={id} />
    </div>
  );
}
