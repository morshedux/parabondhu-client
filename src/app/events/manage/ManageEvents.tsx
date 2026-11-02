"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import EventImage from "@/components/EventImage";
import { EventGridSkeleton } from "@/components/Skeletons";
import { api, errorMessage, EventItem, formatDate } from "@/lib/api";

export default function ManageEvents() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<EventItem | null>(null);
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    api<EventItem[]>("/events/mine", { auth: true })
      .then(setEvents)
      .catch((cause) => setError(errorMessage(cause)));
  }, []);

  const askDelete = (event: EventItem) => {
    setTarget(event);
    dialog.current?.showModal();
  };

  const confirmDelete = async () => {
    if (!target) return;
    setBusy(true);
    try {
      await api(`/events/${target._id}`, { method: "DELETE", auth: true });
      setEvents((current) => current?.filter((item) => item._id !== target._id) ?? null);
      toast.success("Event deleted.");
    } catch (cause) {
      toast.error(errorMessage(cause));
    } finally {
      setBusy(false);
      dialog.current?.close();
    }
  };

  if (error) return <p className="rounded-box bg-base-200 p-8 text-center">{error}</p>;
  if (!events) return <EventGridSkeleton count={3} />;
  if (events.length === 0) {
    return (
      <div className="rounded-box bg-base-200 p-8 text-center">
        <p>You have not created any events yet.</p>
        <Link href="/events/create" className="btn btn-primary mt-4">Create an event</Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <article key={event._id} className="flex h-full flex-col overflow-hidden rounded-box border border-base-300">
            <div className="aspect-[16/10]">
              <EventImage src={event.thumbnail} alt={event.title} />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h2 className="line-clamp-2 min-h-14 font-display text-xl font-bold leading-7">{event.title}</h2>
              <p className="line-clamp-1 text-sm">{event.location}</p>
              <p className="text-sm">{formatDate(event.eventDate)}</p>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
                <Link href={`/events/manage/${event._id}`} className="btn btn-primary">Update</Link>
                <button type="button" className="btn btn-outline btn-error" onClick={() => askDelete(event)}>Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <dialog ref={dialog} className="modal">
        <div className="modal-box">
          <h2 className="font-display text-xl font-bold">Delete this event?</h2>
          <p className="mt-3">
            {target?.title} and its participant list will be removed. This cannot be undone.
          </p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => dialog.current?.close()}>Keep event</button>
            <button type="button" className="btn btn-error" disabled={busy} onClick={confirmDelete}>
              {busy ? "Deleting..." : "Delete event"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
