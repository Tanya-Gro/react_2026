import { createRootRoute } from '@tanstack/react-router';
import { NotFound } from '../pages';
import { RootLayout } from '../components';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
