import WorkoutActions from "../../components/WorkoutActions";

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

async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6">
        <div className="text-center">
          <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            404
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase text-white">
            Workout Not Found
          </h1>

          <p className="mt-3 text-zinc-500">
            The workout you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-14">

        {/* Image */}
        <div className="overflow-hidden rounded-2xl bg-zinc-950">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full min-h-[400px] w-full object-cover md:min-h-[650px]"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">

          {/* Categories */}
          <div className="mb-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ccff00]"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black uppercase leading-none text-white md:text-6xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">
            {workout.description}
          </p>

          {/* Key Specs */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-black uppercase text-white">
              Key Specs
            </h2>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800">

              <Spec
                label="Equipment"
                value={workout.equipment}
              />

              <Spec
                label="Difficulty"
                value={workout.difficulty}
              />

              <Spec
                label="Sets"
                value={String(workout.sets)}
              />

              <Spec
                label="Reps"
                value={workout.reps}
              />

              <Spec
                label="Duration"
                value={`${workout.duration} min`}
              />

              <Spec
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <Spec
                label="Rating"
                value={`★ ${workout.rating}`}
              />

            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-black uppercase text-white">
              Instructions
            </h2>

            <ol className="space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={instruction}
                  className="flex gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm leading-6 text-zinc-400">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Functional Buttons */}
          <WorkoutActions workoutId={workout.id} />

        </div>
      </div>
    </main>
  );
}

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-zinc-950 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}