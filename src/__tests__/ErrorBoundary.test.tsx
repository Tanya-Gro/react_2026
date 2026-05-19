import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from 'components/ErrorBoundary';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  function TestComponent({
    shouldThrow,
  }: {
    shouldThrow: boolean;
  }): React.JSX.Element | null {
    if (shouldThrow) {
      throw new Error('Woops....');
    }

    return <p>Content loaded</p>;
  }

  it('renders fallback UI on error', () => {
    render(
      <ErrorBoundary>
        <TestComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    expect(screen.getByText(/try dismiss/i)).toBeInTheDocument();
  });

  it('dismisses error fallback after button click', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <ErrorBoundary>
        <TestComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    const dismissButton = screen.getByRole('button', {
      name: /dismiss/i,
    });

    await user.click(dismissButton);

    rerender(
      <ErrorBoundary>
        <TestComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();

    expect(screen.getByText(/content loaded/i)).toBeInTheDocument();
  });
});
