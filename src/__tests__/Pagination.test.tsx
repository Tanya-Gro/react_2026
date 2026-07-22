import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type UserEvent } from '@testing-library/user-event';
import { Pagination } from 'components/Pagination';
import type { Mock } from 'vitest';

const navigateMock: Mock = vi.fn();

const mockSearchState = {
  search: '',
  page: 2,
};

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('routes', () => ({
  Route: {
    useSearch: () => mockSearchState,
  },
}));

const COUNT_PAGES = 6;

describe('Pagination', () => {
  beforeEach(() => {
    navigateMock.mockClear();

    mockSearchState.search = '';
    mockSearchState.page = 2;
  });

  it('renders correctly and shows current page info', () => {
    render(<Pagination countPages={COUNT_PAGES} />);

    expect(
      screen.getByText(
        `Page ${mockSearchState.page.toString()} of ${COUNT_PAGES.toString()}`,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /previous page/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next page/i }),
    ).toBeInTheDocument();
  });

  it('calls onPageChange with next page number when forward button is clicked', async () => {
    const user: UserEvent = userEvent.setup();

    render(<Pagination countPages={COUNT_PAGES} />);

    const nextButton: HTMLButtonElement = screen.getByRole('button', {
      name: /next page/i,
    });
    await user.click(nextButton);

    expect(navigateMock).toHaveBeenCalledWith({
      to: '/',
      search: {
        search: '',
        page: mockSearchState.page + 1,
      },
    });
  });

  it('calls onPageChange with prev page number when back button is clicked', async () => {
    const user: UserEvent = userEvent.setup();

    render(<Pagination countPages={COUNT_PAGES} />);

    const prevButton: HTMLButtonElement = screen.getByRole('button', {
      name: /previous page/i,
    });
    await user.click(prevButton);

    expect(navigateMock).toHaveBeenCalledWith({
      to: '/',
      search: {
        search: '',
        page: mockSearchState.page - 1,
      },
    });
  });

  it('does not call onPageChange if buttons are disabled or conditions are met edge-case', async () => {
    const user = userEvent.setup();

    mockSearchState.page = 1;

    render(<Pagination countPages={1} />);

    const prevButton: HTMLButtonElement = screen.getByRole('button', {
      name: /previous page/i,
    });
    const nextButton: HTMLButtonElement = screen.getByRole('button', {
      name: /next page/i,
    });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();

    await user.click(prevButton);
    await user.click(nextButton);

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
