"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

const MENU = [
  { href: "/events/create", label: "Create Event" },
  { href: "/events/manage", label: "Manage Events" },
  { href: "/events/joined", label: "Joined Events" },
  { href: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut();
    toast.success("Logged out.");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100">
      <nav className="page-container flex h-16 items-center gap-2 sm:gap-4">
        <Logo />
        <Link href="/events" className="ml-auto text-sm font-semibold hover:text-secondary sm:text-base">
          <span className="sm:hidden">Events</span>
          <span className="hidden sm:inline">Upcoming Events</span>
        </Link>
        <ThemeToggle />

        {isPending ? (
          <div className="skeleton size-10 rounded-full" />
        ) : session ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                aria-label={`Account menu for ${session.user.name}`}
                className="tooltip tooltip-bottom block cursor-pointer rounded-full"
                data-tip={session.user.name}
              >
                <UserAvatar name={session.user.name} image={session.user.image} />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                {MENU.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => (document.activeElement as HTMLElement)?.blur()}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" className="btn btn-outline btn-primary btn-sm" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
