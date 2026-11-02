"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EventForm, { toLocalInput } from "@/components/EventForm";
import { FormSkeleton } from "@/components/Skeletons";
import { api, errorMessage, EventItem } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { EventFormValues } from "@/lib/validation";

export default function UpdateEvent({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<EventItem>(`/events/${id}`)
      .then(setEvent)
      .catch((cause) => setError(errorMessage(cause)));
  }, [id]);

  const update = async (values: EventFormValues) => {
    try {
      await api(`/events/${id}`, { method: "PUT", body: values, auth: true });
      toast.success("Event updated.");
      router.push("/events/manage");
    } catch (cause) {
      toast.error(errorMessage(cause));
    }
  };

  if (error) return <p className="mx-auto max-w-2xl rounded-box bg-base-200 p-8 text-center">{error}</p>;
  if (!event || !session) return <FormSkeleton />;
  if (event.creatorEmail !== session.user.email.toLowerCase()) {
    return (
      <div className="mx-auto max-w-2xl rounded-box bg-base-200 p-8 text-center">
        <p>You can only update events you created.</p>
        <Link href="/events/manage" className="btn btn-primary mt-4">Go to your events</Link>
      </div>
    );
  }

  return (
    <EventForm
      initial={{
        title: event.title,
        description: event.description,
        eventType: event.eventType,
        thumbnail: event.thumbnail,
        location: event.location,
        eventDate: toLocalInput(event.eventDate),
      }}
      submitLabel="Update event"
      onSubmit={update}
    />
  );
}
