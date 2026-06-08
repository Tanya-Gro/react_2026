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

  it('does not close when clicking inside the modal content', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ModalOverlay onClose={onClose}>
        <button type="button">Inside Button</button>
      </ModalOverlay>,
    );

    const insideButton = screen.getByRole('button', { name: /inside button/i });
    await user.click(insideButton);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when text selection starts inside and ends on overlay', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { container } = render(
      <ModalOverlay onClose={onClose}>
        <input type="text" data-testid="modal-input" defaultValue="Some text" />
      </ModalOverlay>,
    );

    const overlay = container.firstChild as HTMLElement;
    const input = screen.getByTestId('modal-input');

    await user.pointer([
      { target: input, keys: '[MouseLeftDown]' },
      { target: overlay },
      { keys: '[MouseLeftUp]' },
    ]);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape key press', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ModalOverlay onClose={onClose}>
        <p>Modal content</p>
      </ModalOverlay>,
    );

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus inside the modal when pressing Tab', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ModalOverlay onClose={onClose}>
        <input data-testid="input-1" />
        <input data-testid="input-2" />
      </ModalOverlay>,
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    const firstInput = screen.getByTestId('input-1');
    const secondInput = screen.getByTestId('input-2');

    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(firstInput).toHaveFocus();

    await user.tab();
    expect(secondInput).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(secondInput).toHaveFocus();
  });
});
