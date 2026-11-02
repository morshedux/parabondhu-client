import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy | Parabondhu" };

const SECTIONS = [
  {
    title: "What we store",
    text: "We store your name, email address and profile picture, the events you create and the events you join. Passwords are stored only in hashed form.",
  },
  {
    title: "Google login",
    text: "If you continue with Google, we receive your name, email address and profile picture from Google. We use them only to create your account and show your profile.",
  },
  {
    title: "Who can see your information",
    text: "Your name appears as the organiser on events you create. We do not sell your information or share it with advertisers.",
  },
  {
    title: "Contact",
    text: "To ask about your data or have your account removed, email morshedux@gmail.com.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="page-container py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="section-title">Privacy policy</h1>
        <div className="mt-8 space-y-6">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-bold">{section.title}</h2>
              <p className="mt-2 leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
