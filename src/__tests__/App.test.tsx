import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('App', () => {
  it('renders error button and handles click', async () => {
    const user = userEvent.setup();

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<App />);

    const button = screen.getByRole('button', {
      name: /throw error/i,
    });

    expect(button).toBeInTheDocument();

    try {
      await user.click(button);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    consoleSpy.mockRestore();
  });
});
