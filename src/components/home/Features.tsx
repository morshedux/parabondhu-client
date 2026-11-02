import { FiCalendar, FiEdit3, FiMapPin, FiUsers } from "react-icons/fi";

const FEATURES = [
  { icon: FiEdit3, title: "Start an event", text: "Add the cause, place and date. Your event goes live for everyone right away." },
  { icon: FiMapPin, title: "Search near you", text: "Search by title or area and filter by cause to find what is close to home." },
  { icon: FiUsers, title: "Join in one click", text: "Open any event, read the details and add yourself to the participant list." },
  { icon: FiCalendar, title: "Keep track", text: "See every event you joined in date order, and edit the ones you created." },
];

export default function Features() {
  return (
    <section className="page-container py-16">
      <h2 className="section-title">Everything a neighbourhood event needs</h2>
      <p className="section-text">From the first idea to the day itself, plan and follow your events in one place.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="h-full rounded-box bg-base-200 p-6">
            <Icon className="text-2xl text-secondary" />
            <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed opacity-80">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
