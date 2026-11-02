import Image from "next/image";

const PHOTOS = [
  { src: "/gallery/food-boxes.jpg", alt: "Volunteers passing boxes of food from a truck" },
  { src: "/gallery/beach-cleanup.jpg", alt: "Two volunteers collecting waste on a beach" },
  { src: "/gallery/children.jpg", alt: "Smiling children waving at the camera" },
  { src: "/gallery/hands-plant.jpg", alt: "Hands holding a seedling in soil" },
  { src: "/gallery/volunteer.jpg", alt: "A volunteer in a bright jersey at a community event" },
  { src: "/gallery/care.jpg", alt: "Two people holding hands in support" },
];

export default function Gallery() {
  return (
    <section className="bg-base-200 py-16">
      <div className="page-container">
        <h2 className="section-title">Moments from community service</h2>
        <p className="section-text">Small groups, ordinary days and real help for the people nearby.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-box bg-base-300">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
