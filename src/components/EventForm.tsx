"use client";

import { FormEvent, useState } from "react";
import Field from "./Field";
import { EVENT_TYPES, EventFormValues, FormErrors, validateEvent } from "@/lib/validation";

interface Props {
  initial: EventFormValues;
  submitLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
}

function localNow() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export function toLocalInput(date: string) {
  const value = new Date(date);
  value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
  return value.toISOString().slice(0, 16);
}

export default function EventForm({ initial, submitLabel, onSubmit }: Props) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FormErrors<EventFormValues>>({});
  const [busy, setBusy] = useState(false);
  const [minDate] = useState(localNow);

  const set = (key: keyof EventFormValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validateEvent(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await onSubmit({ ...values, eventDate: new Date(values.eventDate).toISOString() });
    setBusy(false);
  };

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-2xl space-y-5">
      <Field label="Title" htmlFor="title" error={errors.title}>
        <input id="title" className="input w-full" placeholder="Winter clothes distribution" value={values.title} onChange={(e) => set("title", e.target.value)} />
      </Field>
      <Field label="Description" htmlFor="description" error={errors.description}>
        <textarea id="description" rows={5} className="textarea w-full" placeholder="Who it helps, what to bring and where to meet" value={values.description} onChange={(e) => set("description", e.target.value)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Event type" htmlFor="eventType" error={errors.eventType}>
          <select id="eventType" className="select w-full" value={values.eventType} onChange={(e) => set("eventType", e.target.value)}>
            <option value="">Choose a type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Event date and time" htmlFor="eventDate" error={errors.eventDate}>
          <input id="eventDate" type="datetime-local" min={minDate} className="input w-full" value={values.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
        </Field>
      </div>
      <Field label="Location" htmlFor="location" error={errors.location}>
        <input id="location" className="input w-full" placeholder="Mirpur 10, Dhaka" value={values.location} onChange={(e) => set("location", e.target.value)} />
      </Field>
      <Field label="Thumbnail image URL" htmlFor="thumbnail" error={errors.thumbnail}>
        <input id="thumbnail" type="url" className="input w-full" placeholder="https://example.com/event.jpg" value={values.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} />
      </Field>
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
