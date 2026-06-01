import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router';
import { render, type RenderResult } from '@testing-library/react';
import { routeTree } from 'src/routeTree.gen';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from 'features';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'context';
import { dataApi, detailsApi } from 'services';
import { ErrorBoundary } from 'components';

type Options = {
  route?: string;
};

export const createTestStore = (): EnhancedStore => {
  return configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
      [dataApi.reducerPath]: dataApi.reducer,
      [detailsApi.reducerPath]: detailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dataApi.middleware, detailsApi.middleware),
  });
};

export const renderWithRouter = async (
  options: Options = {},
): Promise<RenderResult> => {
  const store = createTestStore();
  const { route = '/' } = options;

  const testRouter = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [route],
    }),
  });

  await testRouter.load();

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={testRouter} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>,
  );
};
