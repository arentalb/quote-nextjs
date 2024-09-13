import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function TableSkeleton() {
  return (
    <div className="p-4 w-full">
      {/* Table header skeleton */}

      {/* Table rows skeleton */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div className=" flex gap-4 mb-2 " key={index}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-8 w-[200px] rounded-md" key={index} />
          ))}
        </div>
      ))}
    </div>
  );
}
