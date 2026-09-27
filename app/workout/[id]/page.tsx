import { notFound } from "next/navigation";
import DetailClient from "@/components/DetailClient";
import { getWorkout } from "@/lib/api";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  if (!workout) {
    notFound();
  }

  return <DetailClient workout={workout} />;
}