import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">

        <div className="flex items-center gap-3">
          <Image
  src="/logo.png"
  alt="FitLog"
  width={32}
  height={32}
  className="h-8 w-8 object-contain"
/>

          <span className="font-black tracking-wide text-white">
            FITLOG
          </span>
        </div>

        <p className="text-center text-xs text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}