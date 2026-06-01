import { act, screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { people, server } from 'mocks';
import { LS_KEY } from 'app/constants';
import { renderWithRouter } from './test-utils/renderWithRouter';
import type { Mock } from 'vitest';

describe('Home', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders error button and handles click', async () => {
    const user: UserEvent = userEvent.setup();

    await renderWithRouter();

    const button: HTMLButtonElement = await screen.findByRole('button', {
      name: /throw error/i,
    });

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  it('renders fetched characters', async () => {
    await renderWithRouter();

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  it('shows error message', async () => {
    server.use(
      http.get('https://swapi.py4e.com/api/people/', () => {
        return HttpResponse.json({ detail: 'Server error' }, { status: 500 });
      }),
    );

    await renderWithRouter();

    expect(await screen.findByText(/Error:500/i)).toBeInTheDocument();
  });

  it('updates localStorage when search query changes', async () => {
    const user: UserEvent = userEvent.setup();

    await act(async () => {
      await renderWithRouter();
    });

    const input: HTMLInputElement = screen.getByPlaceholderText(/search/i);
    const button: HTMLButtonElement = screen.getByRole('button', {
      name: /search/i,
    });

    await user.clear(input);
    await user.type(input, 'Luke');

    await act(async () => {
      await user.click(button);
    });

    await waitFor(() => {
      expect(localStorage.getItem(LS_KEY)).toBe(JSON.stringify('Luke'));
    });
  });

  it('does not update localStorage when query is unchanged', async () => {
    const user: UserEvent = userEvent.setup();

    localStorage.setItem(LS_KEY, JSON.stringify('Luke'));

    const setItemSpy: Mock = vi.spyOn(Storage.prototype, 'setItem');

    await renderWithRouter({
      route: '/?search=Luke&page=1',
    });

    const input: HTMLInputElement = screen.getByPlaceholderText(/search/i);

    const button: HTMLButtonElement = screen.getByRole('button', {
      name: /search/i,
    });

    setItemSpy.mockClear();

    await user.clear(input);
    await user.type(input, 'Luke');
    await user.click(button);

    expect(setItemSpy).not.toHaveBeenCalledWith(
      LS_KEY,
      expect.stringContaining('Luke'),
    );
  });
  it('shows loader while data is loading', async () => {
    server.use(
      http.get('https://swapi.py4e.com/api/people/', async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        return HttpResponse.json(people);
      }),
    );

    await renderWithRouter();

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
  });
});
