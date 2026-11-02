"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventForm from "@/components/EventForm";
import { api, errorMessage } from "@/lib/api";
import { EventFormValues } from "@/lib/validation";

const EMPTY = { title: "", description: "", eventType: "", thumbnail: "", location: "", eventDate: "" };

export default function CreateEvent() {
  const router = useRouter();

  const create = async (values: EventFormValues) => {
    try {
      await api("/events", { method: "POST", body: values, auth: true });
      toast.success("Event created.");
      router.push("/events");
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  return <EventForm initial={EMPTY} submitLabel="Create event" onSubmit={create} />;
}
