import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="text-center">

        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#ccff00]">
          FitLog
        </p>

        <h1 className="mt-5 text-7xl font-black text-white md:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-black uppercase text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#ccff00] px-7 py-3 text-xs font-black uppercase text-black"
        >
          Back Home
        </Link>

      </div>
    </main>
  );
}