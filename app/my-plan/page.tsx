"use client";

import { useEffect, useState } from "react";
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

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, toggleSaved } = useFitLog();

  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const ids = [...new Set([...plan, ...saved])];

        if (ids.length === 0) {
          setPlanWorkouts([]);
          setSavedWorkouts([]);
          setLoading(false);
          return;
        }

        const responses = await Promise.all(
          ids.map((id) =>
            fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
          )
        );

        const workouts = await Promise.all(
          responses.map((response) => {
            if (!response.ok) {
              return null;
            }

            return response.json();
          })
        );

        const validWorkouts = workouts.filter(
          (workout): workout is Workout => workout !== null
        );

        setPlanWorkouts(
          validWorkouts.filter((workout) =>
            plan.includes(workout.id)
          )
        );

        setSavedWorkouts(
          validWorkouts.filter((workout) =>
            saved.includes(workout.id)
          )
        );
      } catch (error) {
        console.error("Failed to load workouts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, [plan, saved]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Loading your plan...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            FitLog
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase text-white md:text-6xl">
            My Plan
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-500">
            Manage your workout plan and saved exercises in one place.
          </p>
        </div>

        {/* Today's Plan */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase text-white">
              Today&apos;s Plan
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {planWorkouts.length} workout
              {planWorkouts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {planWorkouts.length === 0 ? (
            <EmptyState
              title="Your plan is empty"
              description="Add workouts to today's plan from any workout details page."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {planWorkouts.map((workout) => (
                <PlanCard
                  key={workout.id}
                  workout={workout}
                  onRemove={() => removeFromPlan(workout.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Saved for Later */}
        <section className="mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase text-white">
              Saved for Later
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {savedWorkouts.length} saved workout
              {savedWorkouts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {savedWorkouts.length === 0 ? (
            <EmptyState
              title="Nothing saved yet"
              description="Save workouts you want to come back to later."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedWorkouts.map((workout) => (
                <SavedCard
                  key={workout.id}
                  workout={workout}
                  onRemove={() => toggleSaved(workout.id)}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

function PlanCard({
  workout,
  onRemove,
}: {
  workout: Workout;
  onRemove: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

      <Link href={`/workout/${workout.id}`}>
        <img
          src={workout.image}
          alt={workout.name}
          className="h-56 w-full object-cover transition duration-300 hover:scale-105"
        />
      </Link>

      <div className="p-5">

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

        <Link href={`/workout/${workout.id}`}>
          <h3 className="text-xl font-black uppercase text-white hover:text-[#ccff00]">
            {workout.name}
          </h3>
        </Link>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">

          <div>
            <p className="text-zinc-600">SETS</p>
            <p className="mt-1 font-bold text-white">
              {workout.sets}
            </p>
          </div>

          <div>
            <p className="text-zinc-600">REPS</p>
            <p className="mt-1 font-bold text-white">
              {workout.reps}
            </p>
          </div>

          <div>
            <p className="text-zinc-600">DURATION</p>
            <p className="mt-1 font-bold text-white">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-zinc-600">CALORIES</p>
            <p className="mt-1 font-bold text-white">
              {workout.caloriesBurned} kcal
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={onRemove}
          className="mt-6 w-full rounded-full border border-red-900 px-4 py-3 text-xs font-black uppercase text-red-400 transition hover:bg-red-950"
        >
          Remove from plan
        </button>

      </div>
    </article>
  );
}

function SavedCard({
  workout,
  onRemove,
}: {
  workout: Workout;
  onRemove: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

      <Link href={`/workout/${workout.id}`}>
        <img
          src={workout.image}
          alt={workout.name}
          className="h-56 w-full object-cover transition duration-300 hover:scale-105"
        />
      </Link>

      <div className="p-5">

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

        <Link href={`/workout/${workout.id}`}>
          <h3 className="text-xl font-black uppercase text-white hover:text-[#ccff00]">
            {workout.name}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-500">
          {workout.description}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs">

          <span className="text-zinc-500">
            {workout.difficulty}
          </span>

          <span className="font-bold text-[#ccff00]">
            ★ {workout.rating}
          </span>

        </div>

        <button
          type="button"
          onClick={onRemove}
          className="mt-6 w-full rounded-full border border-red-900 px-4 py-3 text-xs font-black uppercase text-red-400 transition hover:bg-red-950"
        >
          Remove from saved
        </button>

      </div>
    </article>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 px-6 py-16 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-xl text-[#ccff00]">
        +
      </div>

      <h3 className="mt-5 text-xl font-black uppercase text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black"
      >
        Browse Workouts
      </Link>

    </div>
  );
}