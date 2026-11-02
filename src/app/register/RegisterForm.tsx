"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Field from "@/components/Field";
import { authClient } from "@/lib/auth-client";
import { emailError, isHttpUrl, passwordError } from "@/lib/validation";

const EMPTY = { name: "", email: "", image: "", password: "" };

export default function RegisterForm() {
  const router = useRouter();
  const requested = useSearchParams().get("next");
  const next = requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY, string | null>>>({});
  const [busy, setBusy] = useState(false);

  const set = (key: keyof typeof EMPTY, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found = {
      name: values.name.trim().length < 2 ? "Name needs at least 2 characters." : null,
      email: emailError(values.email),
      image: isHttpUrl(values.image) ? null : "Enter a valid photo URL.",
      password: passwordError(values.password),
    };
    setErrors(found);
    if (found.password) toast.error(found.password);
    if (Object.values(found).some(Boolean)) return;

    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      image: values.image.trim(),
      password: values.password,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Registration did not finish. Try again.");
      return;
    }
    toast.success("Account created.");
    router.push(next);
    router.refresh();
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field label="Name" htmlFor="name" error={errors.name}>
        <input id="name" autoComplete="name" className="input w-full" value={values.name} onChange={(e) => set("name", e.target.value)} />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email}>
        <input id="email" type="email" autoComplete="email" className="input w-full" value={values.email} onChange={(e) => set("email", e.target.value)} />
      </Field>
      <Field label="Photo URL" htmlFor="image" error={errors.image}>
        <input id="image" type="url" className="input w-full" placeholder="https://example.com/photo.jpg" value={values.image} onChange={(e) => set("image", e.target.value)} />
      </Field>
      <Field label="Password" htmlFor="password" error={errors.password}>
        <input id="password" type="password" autoComplete="new-password" className="input w-full" value={values.password} onChange={(e) => set("password", e.target.value)} />
        <p className="mt-1.5 text-sm opacity-70">Use 6 or more characters with an uppercase and a lowercase letter.</p>
      </Field>
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? "Creating account..." : "Create account"}
      </button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="link font-semibold">
          Log in
        </Link>
      </p>
    </form>
  );
}
