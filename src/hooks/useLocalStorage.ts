import { useEffect, useState } from 'react';

function isValidType<T>(parsed: unknown, initialValue: T): parsed is T {
  if (typeof parsed === typeof initialValue) {
    if (
      typeof parsed === 'object' &&
      (parsed === null || initialValue === null)
    ) {
      return parsed === initialValue;
    }
    return true;
  }
  return false;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (!item) {
        return initialValue;
      }

      const parsed: unknown = JSON.parse(item);

      return isValidType(parsed, initialValue) ? parsed : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.error('Local Storage is unavailable');
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
