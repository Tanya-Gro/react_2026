'use client';

import { useEffect, useState, type JSX } from 'react';
import { useTheme } from 'context';

export const ThemeToggle = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  const iconColorClass =
    isMounted && theme === 'dark'
      ? 'text-xl text-indigo-400'
      : 'text-xl text-amber-500';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-lg border border-mist-400 bg-sky-100 transition-colors hover:bg-mist-200 dark:border-mist-700 dark:bg-teal-950 dark:hover:bg-mist-800"
      aria-label="Toggle theme"
    >
      <span className={iconColorClass}>
        {isMounted && theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
};
