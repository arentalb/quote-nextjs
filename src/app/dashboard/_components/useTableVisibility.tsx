import { useState } from "react";

export default function useTableVisibility<T>(
  data: T[],
  numberOfVisibleRow: number = 5,
) {
  const [isAllRowsVisible, setIsAllRowsVisible] = useState<boolean>(false);
  const [displayedRows, setDisplayedRows] = useState<T[]>(
    data.slice(0, numberOfVisibleRow),
  );

  function toggleRowVisibility() {
    setIsAllRowsVisible(!isAllRowsVisible);
    if (isAllRowsVisible) {
      setDisplayedRows(data.slice(0, numberOfVisibleRow));
    } else {
      setDisplayedRows(data);
    }
  }

  return [displayedRows, isAllRowsVisible, toggleRowVisibility] as const;
}
