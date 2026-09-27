"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";

interface HomeClientProps {
  workouts: Workout[];
}

type SortOption = "duration" | "caloriesBurned" | "rating";

export default function HomeClient({ workouts }: HomeClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => a[sortBy] - b[sortBy]);
  }, [workouts, sortBy]);

  return (
    <div>
      <section className="overflow-hidden border-b border-zinc-800">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-black tracking-[0.3em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-8xl">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-4 text-sm font-black text-black transition hover:scale-105"
            >
              BROWSE WORKOUTS <span>↓</span>
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/banner.png"
              alt="FitLog workout"
              width={1200}
              height={800}
              className="w-full max-w-xl object-contain"
            />
          </div>
        </div>
      </section>

      <section id="library" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black tracking-[0.25em] text-[#ccff00]">
              WORKOUTS
            </p>

            <h2 className="mt-2 text-4xl font-black uppercase">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-zinc-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm font-bold text-zinc-400">
            Sort By

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="rounded-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {workouts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 p-10 text-center text-zinc-500">
            No workouts found.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}