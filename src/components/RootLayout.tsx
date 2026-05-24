import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from 'components';

export const RootLayout = (): React.JSX.Element => {
  return (
    <>
      <header className="p-4 border-b-2 border-b-mist-300">
        <nav className="flex gap-x-8 text-xl">
          <Link to="/" className="[&.active]:font-bold [&.active]:underline">
            Home
          </Link>{' '}
          <Link
            to="/about"
            className="[&.active]:font-bold [&.active]:underline"
          >
            About
          </Link>
        </nav>
      </header>
      <Outlet />
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
};
