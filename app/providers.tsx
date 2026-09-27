"use client";

import { ReactNode } from "react";
import { PlanProvider } from "@/components/PlanContext";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PlanProvider>
      {children}
    </PlanProvider>
  );
}