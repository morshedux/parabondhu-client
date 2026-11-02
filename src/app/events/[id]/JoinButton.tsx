"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, errorMessage } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function JoinButton({ eventId, isPast }: { eventId: string; isPast: boolean }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);
  const email = session?.user.email;

  useEffect(() => {
    if (!email) return;
    api<{ joined: boolean }>(`/events/${eventId}/join-status`, { auth: true })
      .then((result) => setJoined(result.joined))
      .catch(() => setJoined(false));
  }, [email, eventId]);

  if (isPast) return <p className="badge badge-neutral badge-lg font-semibold">This event has ended</p>;
  if (joined) return <p className="badge badge-success badge-lg font-semibold">You joined this event</p>;

  const join = async () => {
    if (!session) {
      toast("Log in to join this event.");
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    setBusy(true);
    try {
      await api(`/events/${eventId}/join`, { method: "POST", auth: true });
      setJoined(true);
      toast.success("You joined this event.");
      router.refresh();
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" className="btn btn-primary" disabled={busy || isPending} onClick={join}>
      {busy ? "Joining..." : "Join Event"}
    </button>
  );
}
