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
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  toggleSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

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
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  function addToPlan(id: number) {
    setPlan((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter((workoutId) => workoutId !== id)
    );
  }

  function toggleSaved(id: number) {
    setSaved((current) => {
      if (current.includes(id)) {
        return current.filter(
          (workoutId) => workoutId !== id
        );
      }

      return [...current, id];
    });
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
        addToPlan,
        removeFromPlan,
        toggleSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
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