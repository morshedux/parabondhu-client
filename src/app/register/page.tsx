import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/AuthShell";
import { FormSkeleton } from "@/components/Skeletons";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = { title: "Register | Parabondhu" };

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account">
      <Suspense fallback={<FormSkeleton />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
