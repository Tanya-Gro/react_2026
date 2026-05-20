import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'components';
import { router } from 'app';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
