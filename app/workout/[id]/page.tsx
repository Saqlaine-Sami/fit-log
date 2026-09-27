import { notFound } from "next/navigation";
import DetailClient from "@/components/DetailClient";
import { getWorkout } from "@/lib/api";

interface WorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutPage({
  params,
}: WorkoutPageProps) {
  const { id } = await params;

  try {
    const workout = await getWorkout(id);

    if (!workout) {
      notFound();
    }

    return <DetailClient workout={workout} />;
  } catch {
    notFound();
  }
}