import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { server } from '../mocks/server';
import { HttpResponse, http } from 'msw';
import { LS_KEY } from '../app/';

describe('App', () => {
  const testStor = {
    query: 'Luke',
    page: 1,
    countP: 9,
  };

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

  it('renders fetched characters', async () => {
    render(<App />);

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  it('shows error message', async () => {
    server.use(
      http.get('https://swapi.py4e.com/api/people/', () => {
        return HttpResponse.json({ message: 'Error: ' }, { status: 500 });
      })
    );

    render(<App />);

    expect(await screen.findByText(/error:/i)).toBeInTheDocument();
  });

  it('updates localStorage when search query changes', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.type(input, 'Luke');
    await user.click(button);

    const storedData = JSON.parse(localStorage.getItem(LS_KEY) || '{}');

    expect(storedData.query).toBe('Luke');
    expect(storedData.page).toBe(1);
  });

  it('does not update localStorage when query is unchanged', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LS_KEY, JSON.stringify(testStor));

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.clear(input);
    await user.type(input, 'Luke');
    await user.click(button);

    expect(setItemSpy).not.toHaveBeenCalledWith(LS_KEY, testStor);
  });
});
