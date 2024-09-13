"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

export default function TableSkeleton() {
  const [columns, setColumns] = useState(getColumnCount());

  function getColumnCount() {
    if (window.innerWidth >= 1024) return 6;
    if (window.innerWidth >= 768) return 4;
    return 2;
  }

  useEffect(() => {
    function handleResize() {
      setColumns(getColumnCount());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 w-full">
      {/* Table header skeleton */}

      {/* Table rows skeleton */}
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <div className="flex gap-4 mb-2" key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              className="h-8 w-full rounded-md"
              key={colIndex}
              style={{
                flexBasis: `calc(100% / ${columns})`,
                maxWidth: `calc(100% / ${columns})`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
