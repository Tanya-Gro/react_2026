import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { server } from 'mocks';
import { LS_KEY } from 'app';
import { renderWithRouter } from './test-utils/renderWithRouter';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders error button and handles click', async () => {
    const user = userEvent.setup();

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await renderWithRouter();

    const button = await screen.findByRole('button', {
      name: /throw error/i,
    });

    expect(button).toBeInTheDocument();

    await user.click(button);

    consoleSpy.mockRestore();
  });

  it('renders fetched characters', async () => {
    await renderWithRouter();

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  it('shows error message', async () => {
    server.use(
      http.get('https://swapi.py4e.com/api/people/', () => {
        return HttpResponse.json({ detail: 'Server error' }, { status: 500 });
      })
    );

    await renderWithRouter();

    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });

  it('updates localStorage when search query changes', async () => {
    const user = userEvent.setup();

    await renderWithRouter();

    const input = screen.getByPlaceholderText(/search/i);

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.clear(input);
    await user.type(input, 'Luke');
    await user.click(button);

    const storedData = localStorage.getItem(LS_KEY) || '';

    expect(storedData).toBe(JSON.stringify('Luke'));
  });

  it('does not update localStorage when query is unchanged', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LS_KEY, JSON.stringify('Luke'));

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    await renderWithRouter({
      route: '/?search=Luke&page=1',
    });

    const input = screen.getByPlaceholderText(/search/i);

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    setItemSpy.mockClear();

    await user.clear(input);
    await user.type(input, 'Luke');
    await user.click(button);

    expect(setItemSpy).not.toHaveBeenCalledWith(
      LS_KEY,
      expect.stringContaining('Luke')
    );
  });
});
