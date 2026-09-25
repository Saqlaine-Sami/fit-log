export default function Hero() {
  return (
    <section className="border-b border-zinc-800 bg-black">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">

        {/* Left Content */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-tight text-white md:text-7xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:scale-105"
          >
            BROWSE WORKOUTS
            <span className="text-lg">→</span>
          </a>
        </div>

        {/* Right Banner */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/banner.png"
            alt="FitLog workout"
            className="w-full max-w-lg object-contain"
          />
        </div>

      </div>
    </section>
  );
}