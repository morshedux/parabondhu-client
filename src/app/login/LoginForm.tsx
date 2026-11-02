"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Field from "@/components/Field";
import GoogleButton from "@/components/GoogleButton";
import { authClient } from "@/lib/auth-client";
import { emailError } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const requested = useSearchParams().get("next");
  const next = requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found = {
      email: emailError(email),
      password: password ? null : "Enter your password.",
    };
    setErrors(found);
    if (found.email || found.password) return;

    setBusy(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Email or password is incorrect.");
      return;
    }
    toast.success("Logged in.");
    router.push(next);
    router.refresh();
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field label="Email" htmlFor="email" error={errors.email}>
        <input id="email" type="email" autoComplete="email" className="input w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="Password" htmlFor="password" error={errors.password}>
        <input id="password" type="password" autoComplete="current-password" className="input w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? "Logging in..." : "Login"}
      </button>
      <div className="divider my-2">or</div>
      <GoogleButton next={next} />
      <p className="text-center text-sm">
        New to Parabondhu?{" "}
        <Link href={`/register?next=${encodeURIComponent(next)}`} className="link font-semibold">
          Create an account
        </Link>
      </p>
    </form>
  );
}
