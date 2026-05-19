import { RouterProvider, createMemoryHistory } from '@tanstack/react-router';
import { render, type RenderResult } from '@testing-library/react';
import { router } from 'core';

type Options = {
  route?: string;
};

export async function renderWithRouter(
  options: Options = {}
): Promise<RenderResult> {
  const { route = '/' } = options;

  router.history = createMemoryHistory({
    initialEntries: [route],
  });

  await router.load();

  return render(<RouterProvider router={router} />);
}
