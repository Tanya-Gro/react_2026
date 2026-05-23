import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './test-utils/renderWithRouter';

describe('NotFound Component', () => {
  it('renders 404 message and a navigation button', async () => {
    await renderWithRouter({ route: '/some-invalid-route' });

    expect(await screen.findByText('404 - Not Found')).toBeInTheDocument();
    expect(
      await screen.findByText("This is not the page you're looking for...")
    ).toBeInTheDocument();

    const button = await screen.findByRole('button', { name: /back to base/i });
    expect(button).toBeInTheDocument();
  });

  it('navigates to the home page when the button is clicked', async () => {
    const user = userEvent.setup();

    await renderWithRouter({ route: '/some-invalid-route' });

    const button = await screen.findByRole('button', { name: /back to base/i });

    await user.click(button);

    expect(window.location.pathname).toBe('/');
  });
});
