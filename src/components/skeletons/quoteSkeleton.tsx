import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function QuoteSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 14 }).map((_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[150px]  rounded-xl" />
        </div>
      ))}
    </div>
  );
}
