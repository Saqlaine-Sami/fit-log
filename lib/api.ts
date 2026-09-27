import { Workout } from "./types";

const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";
const FALLBACK_API = "https://api.api-store.workers.dev/api/fitlog";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getWorkouts(): Promise<Workout[]> {
  try {
    return await request<Workout[]>(PRIMARY_API);
  } catch {
    return await request<Workout[]>(FALLBACK_API);
  }
}

export async function getWorkout(id: string): Promise<Workout> {
  try {
    return await request<Workout>(`${PRIMARY_API}/${id}`);
  } catch {
    return await request<Workout>(`${FALLBACK_API}/${id}`);
  }
}