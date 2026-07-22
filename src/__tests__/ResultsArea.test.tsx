import { fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from 'mocks';
import { renderWithRouter } from './test-utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('ResultsArea & CharactersTable Integration', () => {
  it('should render empty state message when no cards are provided', async () => {
    server.use(
      http.get('*/people*', () => {
        return HttpResponse.json({ results: [], count: 0 });
      }),
    );

    await renderWithRouter({ route: '/' });

    expect(await screen.findByText(/No results found/i)).toBeInTheDocument();
  });

  it('should update URL params and show detail sidebar on row click', async () => {
    server.use(
      http.get('*/people*', () => {
        return HttpResponse.json({
          results: [
            {
              url: 'https://swapi.dev',
              name: 'Luke Skywalker',
              gender: 'male',
              height: '172',
              mass: '77',
              hair_color: 'blond',
            },
          ],
          count: 1,
        });
      }),
      http.get('*/1.json', () => {
        return HttpResponse.json({ name: 'Luke Skywalker' });
      }),
    );

    await renderWithRouter({ route: '/?details=1' });

    await waitFor(() => {
      expect(
        screen.getByRole('complementary', { name: /character details/i }),
      ).toBeInTheDocument();
    });

    expect(
      await screen.findByRole('heading', { name: 'Luke Skywalker', level: 2 }),
    ).toBeInTheDocument();
  });

  it('should handle keyboard navigation Enter on table rows', async () => {
    const user = userEvent.setup();
    server.use(
      http.get('*/people*', () => {
        return HttpResponse.json({
          results: [
            {
              url: 'https://swapi.dev',
              name: 'Luke Skywalker',
              gender: 'male',
              height: '172',
              mass: '77',
              hair_color: 'blond',
            },
          ],
          count: 1,
        });
      }),
    );

    await renderWithRouter({ route: '/' });

    const row = await screen.findByRole('button', { name: /Luke Skywalker/i });
    expect(row).toBeInTheDocument();

    row.focus();
    await user.keyboard('{Enter}');

    expect(row).toHaveFocus();
  });

  it('should handle keyboard navigation Space on table rows', async () => {
    server.use(
      http.get('*/people*', () => {
        return HttpResponse.json({
          results: [
            {
              url: 'https://swapi.dev',
              name: 'Luke Skywalker',
              gender: 'male',
              height: '172',
              mass: '77',
              hair_color: 'blond',
            },
          ],
          count: 1,
        });
      }),
    );

    await renderWithRouter({ route: '/' });

    const row = await screen.findByRole('button', { name: /Luke Skywalker/i });
    expect(row).toBeInTheDocument();

    const checkbox = await screen.findByRole('checkbox', {
      name: /select luke skywalker/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    row.focus();
    expect(row).toHaveFocus();
    fireEvent.keyDown(row, { key: ' ', code: 'Space' });

    expect(checkbox).toBeChecked();
  });

  it('should select character when checkbox is clicked', async () => {
    const user = userEvent.setup();
    server.use(
      http.get('*/people*', () => {
        return HttpResponse.json({
          results: [
            {
              url: 'https://swapi.dev',
              name: 'Luke Skywalker',
              gender: 'male',
              height: '172',
              mass: '77',
              hair_color: 'blond',
            },
          ],
          count: 1,
        });
      }),
    );

    await renderWithRouter({ route: '/' });

    const checkbox = await screen.findByRole('checkbox', {
      name: /select luke skywalker/i,
    });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });
});
