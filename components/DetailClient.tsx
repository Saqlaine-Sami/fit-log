"use client";

import Link from "next/link";
import { useState } from "react";
import { Workout } from "@/lib/types";
import { usePlan } from "./PlanContext";
import Toast from "./Toast";
import Image from "next/image";

interface DetailClientProps {
  workout: Workout;
}

export default function DetailClient({ workout }: DetailClientProps) {
  const { plan, saved, addToPlan, saveWorkout } = usePlan();
  const [toast, setToast] = useState("");

  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  function handleAddToPlan() {
    const added = addToPlan(workout);

    if (added) {
      setToast("Added to today's plan.");
    } else if (inPlan) {
      setToast("Already in today's plan.");
    } else {
      setToast("Today's plan is full.");
    }
  }

  function handleSave() {
    if (isSaved) {
      setToast("Already saved.");
      return;
    }

    saveWorkout(workout);
    setToast("Saved for later.");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex text-sm font-bold text-zinc-400 transition hover:text-[#ccff00]"
      >
        ← Back to workouts
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
         <Image
  src={workout.image}
  alt={workout.name}
  width={1200}
  height={900}
  className="h-full max-h-[650px] w-full object-cover"
/>
        </div>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#ccff00]"
              >
                {group}
              </span>
            ))}
          </div>

          <h1 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            {workout.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            {workout.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-xs font-bold uppercase text-zinc-500">
                Duration
              </p>
              <p className="mt-2 text-xl font-black">{workout.duration} min</p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-xs font-bold uppercase text-zinc-500">
                Calories
              </p>
              <p className="mt-2 text-xl font-black">
                {workout.caloriesBurned}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-xs font-bold uppercase text-zinc-500">
                Sets
              </p>
              <p className="mt-2 text-xl font-black">{workout.sets}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-xs font-bold uppercase text-zinc-500">
                Reps
              </p>
              <p className="mt-2 text-xl font-black">{workout.reps}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleAddToPlan}
              className="rounded-full bg-[#ccff00] px-6 py-4 text-sm font-black uppercase text-black transition hover:scale-105"
            >
              {inPlan ? "In Today's Plan" : "Add to Today's Plan"}
            </button>

            <button
              onClick={handleSave}
              className="rounded-full border border-zinc-600 px-6 py-4 text-sm font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              {isSaved ? "Saved" : "Save for Later"}
            </button>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-black uppercase">Instructions</h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-black text-black">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-6 text-zinc-400">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast("")}
        />
      )}
    </div>
  );
}