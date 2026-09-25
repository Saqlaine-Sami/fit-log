"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="FitLog logo"
            className="h-9 w-9"
          />

          <span className="text-xl font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className={`text-sm font-bold tracking-wide transition ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-bold tracking-wide transition ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            MY PLAN
          </Link>

        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2">

          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black tracking-wide text-black"
          >
            PLAN 0
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-4 py-2 text-xs font-black tracking-wide text-white"
          >
            SAVED 0
          </Link>

        </div>

      </div>
    </nav>
  );
}