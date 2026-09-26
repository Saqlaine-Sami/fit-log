"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useFitLog } from "../context/FitLogContext";

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

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    completed,
    removeFromPlan,
    toggleSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] =
    useState<Tab>("plan");

  const [workouts, setWorkouts] = useState<Workout[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(
          "Failed to load workouts:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const planWorkouts = useMemo(() => {
    return plan
      .map((id) =>
        workouts.find((workout) => workout.id === id)
      )
      .filter(
        (workout): workout is Workout =>
          workout !== undefined
      );
  }, [plan, workouts]);

  const savedWorkouts = useMemo(() => {
    return saved
      .map((id) =>
        workouts.find((workout) => workout.id === id)
      )
      .filter(
        (workout): workout is Workout =>
          workout !== undefined
      );
  }, [saved, workouts]);

  const currentWorkouts =
    activeTab === "plan"
      ? planWorkouts
      : savedWorkouts;

  const totalMinutes = planWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = planWorkouts.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-black px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            FitLog
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase text-white md:text-6xl">
            My Plan
          </h1>

          <p className="mt-4 text-zinc-500">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">

          <MetricCard
            label="Exercises"
            value={planWorkouts.length}
          />

          <MetricCard
            label="Minutes"
            value={totalMinutes}
          />

          <MetricCard
            label="Calories"
            value={totalCalories}
          />

        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3 border-b border-zinc-800 pb-4">

          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-3 text-xs font-black uppercase transition ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-zinc-700 text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-3 text-xs font-black uppercase transition ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-zinc-700 text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Loading */}
        {loading ? (
          <LoadingState />
        ) : currentWorkouts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">

            {currentWorkouts.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                activeTab={activeTab}
                isDone={completed.includes(workout.id)}
                onDone={() =>
                  markAsDone(workout.id)
                }
                onRemove={() => {
                  if (activeTab === "plan") {
                    removeFromPlan(workout.id);
                  } else {
                    toggleSaved(workout.id);
                  }
                }}
              />
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-600">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-20 text-center">

      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />

      <p className="mt-5 text-sm font-bold uppercase tracking-wider text-[#ccff00]">
        Loading workouts…
      </p>

    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 px-6 py-20 text-center">

      <h2 className="text-2xl font-black uppercase text-white">
        Nothing Here Yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
        Browse the library and add a lift to get
        today moving.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex rounded-full bg-[#ccff00] px-7 py-3 text-xs font-black uppercase text-black"
      >
        Go to workouts
      </Link>

    </div>
  );
}

function PlanWorkoutCard({
  workout,
  activeTab,
  isDone,
  onDone,
  onRemove,
}: {
  workout: Workout;
  activeTab: Tab;
  isDone: boolean;
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-zinc-950 ${
        isDone
          ? "border-[#ccff00]"
          : "border-zinc-800"
      }`}
    >
      <img
        src={workout.image}
        alt={workout.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-6">

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] font-bold uppercase text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black uppercase text-white">
          {workout.name}
        </h2>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-500">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-zinc-800 py-5">

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

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-3">

          <Link
            href={`/workout/${workout.id}`}
            className="flex-1 rounded-full border border-zinc-700 px-4 py-3 text-center text-xs font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            View Details
          </Link>

          {activeTab === "plan" && (
            <button
              type="button"
              onClick={onDone}
              disabled={isDone}
              className={`rounded-full px-4 py-3 text-xs font-black uppercase ${
                isDone
                  ? "cursor-default bg-[#ccff00] text-black"
                  : "border border-zinc-700 text-white hover:border-[#ccff00] hover:text-[#ccff00]"
              }`}
            >
              {isDone ? "✓ Done" : "✓ Mark as Done"}
            </button>
          )}

          <button
            type="button"
            onClick={onRemove}
            className="rounded-full border border-red-900 px-4 py-3 text-xs font-black uppercase text-red-400 transition hover:bg-red-950"
          >
            X
          </button>

        </div>

      </div>
    </article>
  );
}