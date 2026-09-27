export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#ccff00]" />

        <div className="h-4 w-4 animate-bounce rounded-full bg-[#ccff00] [animation-delay:150ms]" />

        <div className="h-4 w-4 animate-bounce rounded-full bg-[#ccff00] [animation-delay:300ms]" />

        <span className="ml-3 text-sm font-black uppercase tracking-widest text-zinc-400">
          Loading workouts…
        </span>
      </div>
    </div>
  );
}