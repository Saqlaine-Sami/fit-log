"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
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
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, mounted]);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, mounted]);

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