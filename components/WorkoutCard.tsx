"use client";

import Link from "next/link";
import { Workout } from "@/lib/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-[#ccff00]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-zinc-900">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-zinc-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-black uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          {workout.equipment}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-xs font-bold text-zinc-400">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}