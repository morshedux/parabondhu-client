export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Health Camp",
  "Education",
  "Relief",
];

export interface EventFormValues {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export function isHttpUrl(value: string) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function passwordError(password: string) {
  if (password.length < 6) return "Password needs at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password needs an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password needs a lowercase letter.";
  return null;
}

export function emailError(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? null : "Enter a valid email address.";
}

export function validateEvent(values: EventFormValues) {
  const errors: FormErrors<EventFormValues> = {};
  if (values.title.trim().length < 5) errors.title = "Title needs at least 5 characters.";
  if (values.description.trim().length < 20) {
    errors.description = "Description needs at least 20 characters.";
  }
  if (!EVENT_TYPES.includes(values.eventType)) errors.eventType = "Choose an event type.";
  if (!values.thumbnail.startsWith("data:image/") && !isHttpUrl(values.thumbnail)) {
    errors.thumbnail = "Upload an image or enter a valid image URL.";
  }
  if (values.location.trim().length < 3) errors.location = "Location needs at least 3 characters.";
  if (!values.eventDate) {
    errors.eventDate = "Choose the event date and time.";
  } else if (new Date(values.eventDate).getTime() <= Date.now()) {
    errors.eventDate = "Event date must be in the future.";
  }
  return errors;
}
