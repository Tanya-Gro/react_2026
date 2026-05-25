import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { Pagination } from 'components/Pagination';
import type { Mock } from 'vitest';

const props: Record<string, number> = {
  currentPage: 2,
  countPages: 6,
};

describe('Pagination', () => {
  const mockOnPageChange: Mock = vi.fn();
  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders correctly and shows current page info', () => {
    render(
      <Pagination
        currentPage={props.currentPage}
        countPages={props.countPages}
        onPageChange={mockOnPageChange}
      />
    );

    expect(
      screen.getByText(`Page ${props.currentPage} of ${props.countPages}`)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /previous page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next page/i })
    ).toBeInTheDocument();
  });

  it('calls onPageChange with next page number when forward button is clicked', async () => {
    const user: UserEvent = userEvent.setup();

    render(
      <Pagination
        currentPage={props.currentPage}
        countPages={props.countPages}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton: HTMLButtonElement = screen.getByRole('button', {
      name: /next page/i,
    });
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(props.currentPage + 1);
  });

  it('calls onPageChange with prev page number when back button is clicked', async () => {
    const user: UserEvent = userEvent.setup();

    render(
      <Pagination
        currentPage={props.currentPage}
        countPages={props.countPages}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton: HTMLButtonElement = screen.getByRole('button', {
      name: /previous page/i,
    });
    await user.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(props.currentPage - 1);
  });

  it('does not call onPageChange if buttons are disabled or conditions are met edge-case', async () => {
    render(
      <Pagination
        currentPage={1}
        countPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton: HTMLButtonElement = screen.getByRole('button', {
      name: /previous page/i,
    });
    const nextButton: HTMLButtonElement = screen.getByRole('button', {
      name: /next page/i,
    });

    await userEvent.click(prevButton);
    await userEvent.click(nextButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
