"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Field from "./Field";
import { imageToDataUrl } from "@/lib/image";
import { EVENT_TYPES, EventFormValues, FormErrors, isHttpUrl, validateEvent } from "@/lib/validation";

interface Props {
  initial: EventFormValues;
  submitLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
}

const NOT_AN_IMAGE = "This link does not open an image. Use a direct image URL or upload one.";

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
  const [brokenThumbnail, setBrokenThumbnail] = useState("");
  const [minDate] = useState(localNow);

  const set = (key: keyof EventFormValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const uploaded = values.thumbnail.startsWith("data:image/");

  const chooseThumbnail = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      set("thumbnail", await imageToDataUrl(file, 800, 500));
      setErrors((current) => ({ ...current, thumbnail: undefined }));
    } catch {
      setErrors((current) => ({ ...current, thumbnail: "Choose a JPG, PNG or WebP image." }));
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validateEvent(values);
    if (!found.thumbnail && brokenThumbnail === values.thumbnail) {
      found.thumbnail = NOT_AN_IMAGE;
    }
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
      <Field label="Upload a thumbnail" htmlFor="thumbnailFile">
        <input id="thumbnailFile" type="file" accept="image/jpeg,image/png,image/webp" className="file-input w-full" onChange={chooseThumbnail} />
      </Field>
      <Field label="Or use a thumbnail image URL" htmlFor="thumbnail" error={errors.thumbnail}>
        <input id="thumbnail" type="url" className="input w-full" placeholder={uploaded ? "Using your uploaded image" : "https://example.com/event.jpg"} value={uploaded ? "" : values.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} />
      </Field>
      {values.thumbnail && (uploaded || isHttpUrl(values.thumbnail)) && (
        <img
          src={values.thumbnail}
          alt="Thumbnail preview"
          className={`aspect-[16/10] w-full rounded-box object-cover ${brokenThumbnail === values.thumbnail ? "hidden" : ""}`}
          onLoad={() => setBrokenThumbnail("")}
          onError={() => {
            setBrokenThumbnail(values.thumbnail);
            setErrors((current) => ({ ...current, thumbnail: NOT_AN_IMAGE }));
          }}
        />
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
