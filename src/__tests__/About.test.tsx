import { screen } from '@testing-library/react';
import { renderWithRouter } from './test-utils/renderWithRouter';

describe('About Component', () => {
  it('navigates to the About page', async () => {
    await renderWithRouter({ route: '/about' });

    expect(
      await screen.findByRole('link', { name: /Rolling Scopes School/i }),
    ).toBeInTheDocument();
  });
});
