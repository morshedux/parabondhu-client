import Image from "next/image";
import Link from "next/link";

const LARGE = "(min-width: 1024px) 25vw, 50vw";
const SMALL = "(min-width: 1024px) 13vw, 25vw";

export default function Banner() {
  return (
    <section className="bg-[#27318f] text-white">
      <div className="page-container grid items-center gap-10 py-12 lg:grid-cols-[1fr_1.1fr] lg:py-20">
        <div>
          <p className="font-semibold text-[#f4b223]" lang="bn">পাড়ার কাজ, পাড়ার মানুষ</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
            Good work starts on your own street.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Find a blanket drive, a canal cleanup or a tree planting near you. Join with one click,
            or gather your neighbours for an event of your own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn border-0 bg-[#f4b223] text-[#171b45] hover:bg-[#ffc640]">
              Find an event
            </Link>
            <Link href="/events/create" className="btn btn-outline border-white text-white hover:bg-white hover:text-[#27318f]">
              Create an event
            </Link>
          </div>
        </div>
        <div className="quilt" aria-hidden="true">
          <div className="quilt-patch col-span-2 row-span-2"><Image src="/gallery/food-boxes.jpg" alt="" fill sizes={LARGE} preload /></div>
          <div className="quilt-patch bg-[#f4b223]" />
          <div className="quilt-patch"><Image src="/gallery/hands-plant.jpg" alt="" fill sizes={SMALL} preload /></div>
          <div className="quilt-patch col-span-2"><Image src="/gallery/beach-cleanup.jpg" alt="" fill sizes={LARGE} preload /></div>
          <div className="quilt-patch"><Image src="/gallery/volunteer.jpg" alt="" fill sizes={SMALL} /></div>
          <div className="quilt-patch bg-[#a81f45]" />
          <div className="quilt-patch col-span-2"><Image src="/gallery/children.jpg" alt="" fill sizes={LARGE} /></div>
        </div>
      </div>
    </section>
  );
}
