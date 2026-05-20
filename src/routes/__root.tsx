import { createRootRoute } from '@tanstack/react-router';
import { ErrorBoundary } from 'components';
import { RootLayout } from 'components/RootLayout';
import { NotFound } from 'pages';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <ErrorBoundary>
      {((): React.JSX.Element => {
        throw error instanceof Error ? error : new Error(String(error));
      })()}
    </ErrorBoundary>
  ),
});
