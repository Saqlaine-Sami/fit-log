export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />

        <p className="mt-5 text-xs font-black uppercase tracking-[0.25em] text-[#ccff00]">
          Loading FitLog…
        </p>

      </div>
    </main>
  );
}