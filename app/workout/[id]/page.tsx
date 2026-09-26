import Link from "next/link";
import { notFound } from "next/navigation";

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

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workouts = await getWorkouts();

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-bold uppercase tracking-wider text-zinc-500 transition hover:text-[#ccff00]"
        >
          ← Back to workouts
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 lg:grid-cols-2">

          {/* Image */}
          <div className="min-h-[400px]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[400px] w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-7 md:p-10">

            {/* Muscle Groups */}
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] font-bold uppercase text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-4xl font-black uppercase leading-tight text-white md:text-5xl">
              {workout.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-lg font-black text-[#ccff00]">
                ★ {workout.rating}
              </span>

              <span className="text-sm text-zinc-600">
                {workout.difficulty}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-zinc-400">
              {workout.description}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-[10px] uppercase text-zinc-600">
                  Equipment
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  {workout.equipment}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-[10px] uppercase text-zinc-600">
                  Duration
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-[10px] uppercase text-zinc-600">
                  Calories
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-[10px] uppercase text-zinc-600">
                  Sets × Reps
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  {workout.sets} × {workout.reps}
                </p>
              </div>

            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h2 className="text-xl font-black uppercase text-white">
                Instructions
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={instruction}
                      className="flex gap-4 text-sm leading-6 text-zinc-400"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-3">

              <button
                type="button"
                className="rounded-full border border-zinc-700 px-6 py-3 text-xs font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
              >
                Save for later
              </button>

              <button
                type="button"
                className="rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black"
              >
                Add to today&apos;s plan
              </button>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}