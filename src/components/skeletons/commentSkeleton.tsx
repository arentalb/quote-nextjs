import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[120px]  rounded-xl" />
        </div>
      ))}
    </div>
  );
}
