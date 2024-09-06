import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CategorySkeleton() {
  return (
    <>
      <div className="flex gap-4">
        {Array.from({ length: 14 }).map((_, index) => (
          <div className="flex flex-col space-y-3" key={index}>
            <Skeleton className="h-full w-[80px]  rounded-xl" />
          </div>
        ))}
      </div>
    </>
  );
}
