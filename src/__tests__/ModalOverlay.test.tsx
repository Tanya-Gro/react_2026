import { render, screen } from '@testing-library/react';
import { ModalOverlay } from 'components';
import userEvent from '@testing-library/user-event';

describe('ModalOverlay', () => {
  const originalRAF = globalThis.requestAnimationFrame;
  const originalTimeout = globalThis.setTimeout;

  beforeEach(() => {
    globalThis.requestAnimationFrame = vi.fn().mockImplementation((cb) => {
      cb();
      return 1;
    });

    globalThis.setTimeout = vi.fn().mockImplementation((cb) => {
      cb();
      return 1;
    }) as unknown as typeof globalThis.setTimeout;
  });

  afterEach(() => {
    globalThis.requestAnimationFrame = originalRAF;
    globalThis.setTimeout = originalTimeout;
    vi.clearAllMocks();
  });

  it('renders children and closes on overlay click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { container } = render(
      <ModalOverlay onClose={onClose}>
        <p>Modal content</p>
      </ModalOverlay>,
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();

    const overlay = container.firstChild as HTMLElement;

    await user.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on close button click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ModalOverlay onClose={onClose}>
        <p>Modal content</p>
      </ModalOverlay>,
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
