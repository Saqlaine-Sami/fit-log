"use client";

import Link from "next/link";
import { useState } from "react";
import { usePlan } from "./PlanContext";
import Toast from "./Toast";

type Tab = "plan" | "saved";

export default function PlanClient() {
  const {
    plan,
    saved,
    done,
    removeFromPlan,
    removeSaved,
    markAsDone,
  } = usePlan();

  const [tab, setTab] = useState<Tab>("plan");
  const [toast, setToast] = useState("");

  const minutes = plan.reduce((total, workout) => total + workout.duration, 0);
  const calories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const workouts = tab === "plan" ? plan : saved;

  function handleDone(id: number) {
    markAsDone(id);
    setToast("Workout marked as done.");
  }

  function handleRemovePlan(id: number) {
    removeFromPlan(id);
    setToast("Workout removed from today's plan.");
  }

  function handleRemoveSaved(id: number) {
    removeSaved(id);
    setToast("Workout removed from saved.");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div>
        <p className="text-sm font-black tracking-[0.3em] text-[#ccff00]">
          YOUR WORKOUT LOG
        </p>

        <h1 className="mt-3 text-5xl font-black uppercase tracking-tight sm:text-6xl">
          MY PLAN
        </h1>

        <p className="mt-4 text-zinc-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
            Exercises
          </p>
          <p className="mt-3 text-4xl font-black">{plan.length}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
            Minutes
          </p>
          <p className="mt-3 text-4xl font-black">{minutes}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
            Calories
          </p>
          <p className="mt-3 text-4xl font-black">{calories}</p>
        </div>
      </div>

      <div className="mt-12 flex gap-2 border-b border-zinc-800">
        <button
          onClick={() => setTab("plan")}
          className={`border-b-2 px-5 py-4 text-sm font-black uppercase ${
            tab === "plan"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-zinc-500"
          }`}
        >
          Today's Plan
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`border-b-2 px-5 py-4 text-sm font-black uppercase ${
            tab === "saved"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-zinc-500"
          }`}
        >
          Saved
        </button>
      </div>

      <div className="mt-8">
        {workouts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 px-6 py-16 text-center">
            <h2 className="text-2xl font-black uppercase">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 text-zinc-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {workouts.map((workout) => {
              const isDone = done.includes(String(workout.id));

              return (
                <div
                  key={workout.id}
                  className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-32 w-full rounded-xl object-cover sm:h-28 sm:w-40"
                  />

                  <div className="min-w-0 flex-1">
                    <h2
                      className={`text-xl font-black uppercase ${
                        isDone ? "text-zinc-600 line-through" : "text-white"
                      }`}
                    >
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-zinc-400">
                      <span>◷ {workout.duration} min</span>
                      <span>🔥 {workout.caloriesBurned} kcal</span>
                      <span>★ {workout.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-white hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      View Details
                    </Link>

                    {tab === "plan" && (
                      <button
                        onClick={() => handleDone(workout.id)}
                        disabled={isDone}
                        className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isDone ? "Done" : "✓ Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        tab === "plan"
                          ? handleRemovePlan(workout.id)
                          : handleRemoveSaved(workout.id)
                      }
                      className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-zinc-400 hover:border-red-500 hover:text-red-400"
                    >
                      × Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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