import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { router } from 'core';
import { renderWithRouter } from './test-utils/renderWithRouter';

describe('NotFound Component', () => {
  it('renders 404 message and a navigation button', async () => {
    await renderWithRouter({ route: '/some-invalid-route' });

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(
      screen.getByText("This is not the page you're looking for...")
    ).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /back to base/i });
    expect(button).toBeInTheDocument();
  });

  it('navigates to the home page when the button is clicked', async () => {
    const user = userEvent.setup();

    const navigateSpy = vi.spyOn(router, 'navigate');

    await renderWithRouter({ route: '/some-invalid-route' });

    const button = screen.getByRole('button', { name: /back to base/i });

    await user.click(button);

    expect(navigateSpy).toHaveBeenCalledWith({
      to: '/',
    });

    navigateSpy.mockRestore();
  });
});
