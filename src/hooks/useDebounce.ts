import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<string>();

  useEffect(() => {
    const debouncSubId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(debouncSubId);
  }, [value, delay]);

  return debouncedValue;
};
