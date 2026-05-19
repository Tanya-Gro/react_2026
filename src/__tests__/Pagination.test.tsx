import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from 'components/Pagination';

const props = {
  currentPage: 2,
  countPages: 6,
};

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();
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
      screen.getByRole('button', { name: 'arrow_back' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'arrow_forward' })
    ).toBeInTheDocument();
  });

  it('calls onPageChange with next page number when forward button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={props.currentPage}
        countPages={props.countPages}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: 'arrow_forward' });
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(props.currentPage + 1);
  });

  it('calls onPageChange with prev page number when back button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={props.currentPage}
        countPages={props.countPages}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'arrow_back' });
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

    const prevButton = screen.getByRole('button', { name: 'arrow_back' });
    const nextButton = screen.getByRole('button', { name: 'arrow_forward' });

    await userEvent.click(prevButton);
    await userEvent.click(nextButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
