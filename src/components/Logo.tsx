import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-block font-display text-xl font-bold tracking-tight max-sm:text-lg sm:text-2xl">
      Parabondhu
      <span className="stitch-line mt-0.5 block" aria-hidden="true" />
    </Link>
  );
}
