"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type FitLogContextType = {
  plan: number[];
  saved: number[];
  completed: number[];
  toast: string;
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  toggleSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  showToast: (message: string) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const FitLogContext = createContext<
  FitLogContextType | undefined
>(undefined);

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedCompleted =
      localStorage.getItem("fitlog-completed");

    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan);

        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      } catch {
        localStorage.removeItem("fitlog-plan");
      }
    }

    if (storedSaved) {
      try {
        const parsedSaved = JSON.parse(storedSaved);

        if (Array.isArray(parsedSaved)) {
          setSaved(parsedSaved);
        }
      } catch {
        localStorage.removeItem("fitlog-saved");
      }
    }

    if (storedCompleted) {
      try {
        const parsedCompleted =
          JSON.parse(storedCompleted);

        if (Array.isArray(parsedCompleted)) {
          setCompleted(parsedCompleted);
        }
      } catch {
        localStorage.removeItem("fitlog-completed");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan]);

  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved]);

  useEffect(() => {
    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  function showToast(message: string) {
    setToast(message);
  }

  function addToPlan(id: number) {
    setPlan((current) => {
      if (current.includes(id)) {
        showToast("Already in today's plan");
        return current;
      }

      if (current.length >= 5) {
        showToast("Today's plan is full");
        return current;
      }

      showToast("Added to today's plan");

      return [...current, id];
    });
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter((workoutId) => workoutId !== id)
    );

    showToast("Removed from today's plan");
  }

  function toggleSaved(id: number) {
    setSaved((current) => {
      if (current.includes(id)) {
        showToast("Removed from saved");
        return current.filter(
          (workoutId) => workoutId !== id
        );
      }

      showToast("Saved for later");

      return [...current, id];
    });
  }

  function markAsDone(id: number) {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });

    showToast("Workout marked as done");
  }

  function isInPlan(id: number) {
    return plan.includes(id);
  }

  function isSaved(id: number) {
    return saved.includes(id);
  }

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        completed,
        toast,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        markAsDone,
        showToast,
        isInPlan,
        isSaved,
      }}
    >
      {children}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="rounded-full border border-[#ccff00] bg-zinc-950 px-6 py-3 text-sm font-bold text-white shadow-2xl">
            {toast}
          </div>
        </div>
      )}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}