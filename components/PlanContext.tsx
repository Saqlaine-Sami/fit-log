"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

import { Workout } from "@/lib/types";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  done: string[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const loadedRef = useRef(false);

useEffect(() => {
  const storedPlan = localStorage.getItem("fitlog-plan");
  const storedSaved = localStorage.getItem("fitlog-saved");
  const storedDone = localStorage.getItem("fitlog-done");

  const savedPlan = storedPlan ? JSON.parse(storedPlan) : [];
  const savedWorkouts = storedSaved ? JSON.parse(storedSaved) : [];
  const completedWorkouts = storedDone ? JSON.parse(storedDone) : [];

  const timeout = setTimeout(() => {
    setPlan(savedPlan);
    setSaved(savedWorkouts);
    setDone(completedWorkouts);
    loadedRef.current = true;
  }, 0);

  return () => clearTimeout(timeout);
}, []);

  useEffect(() => {
  if (!loadedRef.current) return;
  localStorage.setItem("fitlog-plan", JSON.stringify(plan));
}, [plan]);

  useEffect(() => {
  if (!loadedRef.current) return;
  localStorage.setItem("fitlog-saved", JSON.stringify(saved));
}, [saved]);

useEffect(() => {
  if (!loadedRef.current) return;
  localStorage.setItem("fitlog-done", JSON.stringify(done));
}, [done]);
  function addToPlan(workout: Workout) {
    if (plan.length >= 5) {
      return false;
    }

    const alreadyExists = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      return false;
    }

    setPlan((current) => [...current, workout]);

    return true;
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function saveWorkout(workout: Workout) {
    const alreadyExists = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      return;
    }

    setSaved((current) => [...current, workout]);
  }

  function removeSaved(id: number) {
    setSaved((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function markAsDone(id: number) {
    const workoutId = String(id);

    setDone((current) =>
      current.includes(workoutId)
        ? current
        : [...current, workoutId]
    );
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        done,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}