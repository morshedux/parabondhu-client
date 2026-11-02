import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = { title: "My Profile | Parabondhu" };

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  return (
    <div className="page-container py-12">
      <h1 className="section-title mx-auto mb-8 max-w-lg">My profile</h1>
      <ProfileForm name={user.name} email={user.email} image={user.image ?? ""} />
    </div>
  );
}
