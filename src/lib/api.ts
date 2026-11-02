import { authClient } from "./auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName: string;
  participants?: number;
}

interface ApiOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
}

export async function api<T>(path: string, { method = "GET", body, auth }: ApiOptions = {}) {
  const headers: Record<string, string> = {};
  if (body) headers["Content-Type"] = "application/json";

  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Your session has expired. Log in again.");
    headers.Authorization = `Bearer ${data.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result as T;
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something stopped this action. Try again.";
}

export function hasPassed(date: string) {
  return new Date(date).getTime() <= Date.now();
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  }).format(new Date(date));
}
