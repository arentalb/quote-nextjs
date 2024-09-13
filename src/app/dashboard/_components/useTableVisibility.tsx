import { useEffect, useState } from "react";

export default function useTableVisibility<T>(
  data: T[],
  numberOfVisibleRows: number = 5,
) {
  const [isAllRowsVisible, setIsAllRowsVisible] = useState<boolean>(false);
  const [displayedRows, setDisplayedRows] = useState<T[]>([]);

  useEffect(() => {
    setDisplayedRows(data.slice(0, numberOfVisibleRows));
  }, [data, numberOfVisibleRows]);

  function toggleRowVisibility() {
    setIsAllRowsVisible((prev) => !prev);
    setDisplayedRows((prev) =>
      isAllRowsVisible ? data.slice(0, numberOfVisibleRows) : data,
    );
  }

  return [
    displayedRows,
    isAllRowsVisible,
    toggleRowVisibility,
    setDisplayedRows,
  ] as const;
}
