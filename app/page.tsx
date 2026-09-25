import Hero from "./components/Hero";
import WorkoutGrid from "./components/WorkoutGrid";

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="library"
        className="bg-black px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <h2 className="text-4xl font-black uppercase text-white md:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-3 text-zinc-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <WorkoutGrid />

        </div>
      </section>
    </main>
  );
}