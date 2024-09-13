import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

interface TableVisibilityButtonProps {
  isAllRowsVisible: boolean;
  showAllText?: string;
  showRecentText?: string;
}

export default function TableVisibilityButton({
  isAllRowsVisible,
  showAllText = "Show All",
  showRecentText = "Show Recent",
}: TableVisibilityButtonProps) {
  return (
    <div className="flex gap-2 items-center justify-between text-xs">
      {isAllRowsVisible ? (
        <>
          <ChevronUp width={20} height={20} />
          <p>{showRecentText}</p>
        </>
      ) : (
        <>
          <ChevronDown width={20} height={20} />
          <p>{showAllText}</p>
        </>
      )}
    </div>
  );
}
