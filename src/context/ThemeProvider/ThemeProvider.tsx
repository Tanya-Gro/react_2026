import { useEffect, type ReactNode, type JSX } from 'react';
import { useLocalStorage } from 'hooks';
import { ThemeContext, type Theme } from './ThemeContext';

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [theme, setTheme] = useLocalStorage<Theme>('app-theme', 'light');

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
