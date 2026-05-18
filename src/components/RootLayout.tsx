import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from '../components';

export const RootLayout = (): React.JSX.Element => {
  return (
    <>
      <header className="p-4 flex gap-x-8 text-xl border-b-2 border-b-mist-300">
        <Link to="/" className="[&.active]:font-bold [&.active]:underline">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold [&.active]:underline">
          About
        </Link>
      </header>
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  );
};
