import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header, Footer } from 'layouts';

export const App = (): React.JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
};
