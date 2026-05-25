import { Link } from '@tanstack/react-router';
import { ThemeToggle } from 'components';

export const Header = (): React.JSX.Element => {
  return (
    <header className="flex items-center justify-between p-4 border-b-2 border-b-mist-300">
      <nav className="flex gap-x-8 text-xl text-mist-700">
        <Link to="/" className="[&.active]:font-bold [&.active]:underline">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold [&.active]:underline">
          About
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  );
};
