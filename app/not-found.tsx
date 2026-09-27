import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="text-sm font-black tracking-[0.3em] text-[#ccff00]">
          FITLOG
        </p>

        <h1 className="mt-4 text-7xl font-black uppercase tracking-tight sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-black uppercase">
          Workout Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-zinc-500">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:scale-105"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
}