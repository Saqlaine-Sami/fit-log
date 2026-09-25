import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

export default function WorkoutCard({
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
      <div className="aspect-square overflow-hidden bg-zinc-900">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ccff00]"
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
        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-xs text-zinc-400">
          <span>⏱ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>

          <span>★ {workout.rating}</span>
        </div>

      </div>
    </Link>
  );
}