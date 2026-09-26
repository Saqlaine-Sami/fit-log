export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">

        <div>
          <p className="text-lg font-black text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </p>

          <p className="mt-1 text-sm text-zinc-600">
            Train with purpose.
          </p>
        </div>

        <p className="text-xs uppercase tracking-wider text-zinc-600">
          © 2026 FitLog. All rights reserved.
        </p>

      </div>
    </footer>
  );
}