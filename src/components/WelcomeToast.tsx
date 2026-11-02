"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Google sign-in leaves the app, so its success toast is shown on return.
export default function WelcomeToast() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (params.get("welcome") !== "1") return;
    toast.success("Logged in with Google.", { id: "welcome" });
    const rest = new URLSearchParams(params);
    rest.delete("welcome");
    router.replace(rest.size ? `${pathname}?${rest}` : pathname);
  }, [params, pathname, router]);

  return null;
}
