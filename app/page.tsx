import HomeClient from "@/components/HomeClient";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return <HomeClient workouts={workouts} />;
}