"use client";

import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ next }: { next: string }) {
  const login = async () => {
    const separator = next.includes("?") ? "&" : "?";
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${next}${separator}welcome=1`,
    });
    if (error) toast.error(error.message || "Google login did not finish. Try again.");
  };

  return (
    <button type="button" className="btn btn-outline w-full" onClick={login}>
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
}
