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

type Options = {
  route?: string;
};

const createTestStore = (): EnhancedStore => {
  return configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
    },
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
        <RouterProvider router={testRouter} />
      </ThemeProvider>
    </Provider>,
  );
};
