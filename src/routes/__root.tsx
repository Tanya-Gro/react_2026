import { createRootRoute } from '@tanstack/react-router';
import { ErrorBoundary } from 'components';
import { App } from 'src/App';
import { NotFound } from 'pages';

export const Route = createRootRoute({
  component: App,
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <ErrorBoundary>
      {((): React.JSX.Element => {
        throw error instanceof Error ? error : new Error(String(error));
      })()}
    </ErrorBoundary>
  ),
});
