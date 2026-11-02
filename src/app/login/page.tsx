import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/AuthShell";
import { FormSkeleton } from "@/components/Skeletons";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Login | Parabondhu" };

export default function LoginPage() {
  return (
    <AuthShell title="Log in to Parabondhu">
      <Suspense fallback={<FormSkeleton />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
