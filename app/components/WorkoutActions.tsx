"use client";

import { useState } from "react";
import { useFitLog } from "../context/FitLogContext";

export default function WorkoutActions({
  workoutId,
}: {
  workoutId: number;
}) {
  const {
    addToPlan,
    removeFromPlan,
    toggleSaved,
    isInPlan,
    isSaved,
  } = useFitLog();

  const [message, setMessage] = useState("");

  const added = isInPlan(workoutId);
  const saved = isSaved(workoutId);

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function handlePlan() {
    if (added) {
      removeFromPlan(workoutId);
      showMessage("Removed from today's plan");
      return;
    }

    addToPlan(workoutId);
    showMessage("Added to today's plan");
  }

  function handleSave() {
    toggleSaved(workoutId);

    if (saved) {
      showMessage("Removed from saved");
    } else {
      showMessage("Saved for later");
    }
  }

  return (
    <>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">

        <button
          type="button"
          onClick={handlePlan}
          className={`flex flex-1 items-center justify-center rounded-full px-6 py-4 text-sm font-black uppercase transition hover:scale-[1.02] ${
            added
              ? "bg-zinc-800 text-white"
              : "bg-[#ccff00] text-black"
          }`}
        >
          {added
            ? "✓ Added to today's plan"
            : "+ Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          className={`flex flex-1 items-center justify-center rounded-full border px-6 py-4 text-sm font-black uppercase transition ${
            saved
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-zinc-700 text-white hover:border-[#ccff00] hover:text-[#ccff00]"
          }`}
        >
          {saved
            ? "♥ Saved"
            : "♡ Save for later"}
        </button>

      </div>

      {message && (
        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-sm font-bold text-white">
          {message}
        </div>
      )}
    </>
  );
}