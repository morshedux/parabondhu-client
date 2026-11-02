export default function Newsletter() {
  return (
    <section className="page-container py-16">
      <div className="stitched rounded-box bg-[#27318f] px-6 py-12 text-center text-white sm:px-12">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight">
          Get new events in your inbox
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/85">
          One short email each week with the drives and cleanups coming up near you.
        </p>
        <form className="relative z-10 mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row" action="#">
          <input type="email" aria-label="Email address" placeholder="you@example.com" className="input w-full text-base-content" />
          <button type="button" className="btn border-0 bg-[#f4b223] text-[#171b45] hover:bg-[#ffc640]">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
