"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "./PlanContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
  src="/logo.png"
  alt="FitLog"
  width={40}
  height={40}
  className="h-10 w-10 object-contain"
/>

          <span className="text-xl font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-sm font-bold uppercase tracking-wide transition ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-bold uppercase tracking-wide transition ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-4 py-2 text-xs font-black uppercase text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}