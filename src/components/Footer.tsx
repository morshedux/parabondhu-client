import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

const SOCIALS = [
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://x.com", label: "X", icon: FaXTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="stitch-line" aria-hidden="true" />
      <div className="page-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm leading-relaxed opacity-80">
            Parabondhu means friend of the neighbourhood. Neighbours use it to plan cleanups,
            plantations and donation drives close to home.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">Explore</h2>
          <ul className="mt-4 space-y-2 opacity-80">
            <li><Link href="/events" className="hover:underline">Upcoming events</Link></li>
            <li><Link href="/events/create" className="hover:underline">Create an event</Link></li>
            <li><Link href="/events/joined" className="hover:underline">Joined events</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy policy</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">Contact</h2>
          <ul className="mt-4 space-y-2 opacity-80">
            <li>Mirpur 10, Dhaka, Bangladesh</li>
            <li><a href="mailto:morshedux@gmail.com" className="hover:underline">morshedux@gmail.com</a></li>
          </ul>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn btn-circle btn-sm border-neutral-content/30 bg-transparent text-neutral-content hover:bg-accent hover:text-accent-content"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-neutral-content/15 py-4 text-center text-sm opacity-70">
        © 2026 Parabondhu. All rights reserved.
      </p>
    </footer>
  );
}
