import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from 'mocks';
import { renderWithRouter } from './test-utils/renderWithRouter';

describe('Detail Component - Querying Behavior', () => {
  const TIMEOUT_MS = 500;
  const INTERVAL_SERVER_ERROR = 500;
  it('should render Loader when query is loading', async () => {
    server.use(
      http.get('*/1.json', async () => {
        await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));
        return HttpResponse.json({ name: 'Luke Skywalker' });
      }),
    );

    await renderWithRouter({ route: '/?details=1' });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render error UI when query fails', async () => {
    server.use(
      http.get('*/1.json', () => {
        return new HttpResponse(null, { status: INTERVAL_SERVER_ERROR });
      }),
    );

    await renderWithRouter({ route: '/?details=1' });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('should read from cache on repeated route navigation without initiating new network requests', async () => {
    let requestCount = 0;

    server.use(
      http.get('*/42.json', () => {
        requestCount += 1;
        return HttpResponse.json({ name: 'Luke Skywalker' });
      }),
    );

    const { unmount } = await renderWithRouter({ route: '/?details=42' });

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    expect(requestCount).toBe(1);

    unmount();

    await renderWithRouter({ route: '/?details=42' });

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    expect(requestCount).toBe(2);
  });
});
