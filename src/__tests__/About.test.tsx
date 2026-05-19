import { screen } from '@testing-library/react';
import { router } from 'core';
import { renderWithRouter } from './test-utils/renderWithRouter';

describe('About Component', () => {
  it('navigates to the About page', async () => {
    const navigateSpy = vi.spyOn(router, 'navigate');

    await renderWithRouter({ route: '/about' });

    expect(
      screen.getByRole('link', { name: /Rolling Scopes School/i })
    ).toBeInTheDocument();

    navigateSpy.mockRestore();
  });
});
