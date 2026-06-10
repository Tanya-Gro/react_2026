import { useTheme } from 'context';

export const ThemeToggle = (): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-mist-400 bg-sky-100 transition-colors hover:bg-mist-200 dark:border-mist-700 dark:bg-teal-950 dark:hover:bg-mist-800"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <span className="text-xl text-amber-500">☀️</span>
      ) : (
        <span className="text-xl text-indigo-400">🌙</span>
      )}
    </button>
  );
};
