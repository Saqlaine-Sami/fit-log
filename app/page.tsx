import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="library"
        className="min-h-screen bg-black px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">

          <h2 className="text-4xl font-black uppercase text-white md:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>

        </div>
      </section>
    </main>
  );
}