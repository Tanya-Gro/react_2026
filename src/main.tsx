import '@fontsource/material-symbols-outlined';
import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'components';
import { router } from 'app';
import { store } from 'app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'context';
import './index.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
