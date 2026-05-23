import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router';
import { render, type RenderResult } from '@testing-library/react';
import { routeTree } from 'src/routeTree.gen';

type Options = {
  route?: string;
};

export async function renderWithRouter(
  options: Options = {}
): Promise<RenderResult> {
  const { route = '/' } = options;

  const testRouter = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [route],
    }),
  });

  await testRouter.load();

  return render(<RouterProvider router={testRouter} />);
}
