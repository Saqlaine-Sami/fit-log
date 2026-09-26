"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export default function WorkoutGrid({
  workouts,
}: {
  workouts: Workout[];
}) {
  const [sortBy, setSortBy] = useState("Duration");

  const sortedWorkouts = useMemo(() => {
    const copiedWorkouts = [...workouts];

    if (sortBy === "Duration") {
      copiedWorkouts.sort(
        (a, b) => a.duration - b.duration
      );
    }

    if (sortBy === "Calories") {
      copiedWorkouts.sort(
        (a, b) =>
          a.caloriesBurned - b.caloriesBurned
      );
    }

    if (sortBy === "Rating") {
      copiedWorkouts.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return copiedWorkouts;
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="bg-black px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              Workout Library
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
              The Library
            </h2>

            <p className="mt-3 text-sm text-zinc-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500"
            >
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="rounded-full border border-zinc-700 bg-zinc-950 px-5 py-3 text-sm font-bold text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="Duration">
                Duration
              </option>

              <option value="Calories">
                Calories
              </option>

              <option value="Rating">
                Rating
              </option>
            </select>
          </div>

        </div>

        {/* Workout Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">

        {/* Category Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-zinc-700 px-2.5 py-1 text-[10px] font-bold uppercase text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-xl font-black uppercase text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-500">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 border-t border-zinc-800 pt-4">

          <div>
            <p className="text-[10px] uppercase text-zinc-600">
              Duration
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-zinc-600">
              Calories
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              {workout.caloriesBurned} kcal
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-zinc-600">
              Rating
            </p>

            <p className="mt-1 text-sm font-bold text-[#ccff00]">
              ★ {workout.rating}
            </p>
          </div>

        </div>

      </div>
    </Link>
  );
}