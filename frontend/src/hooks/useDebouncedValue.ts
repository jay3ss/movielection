import { useState, useRef, useEffect } from "react";

export const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    console.log("Value received in hook:", value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      console.log("Updating debounced value:", value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log("Cleanup for value:", value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
