import { getDetails } from 'api';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { detail } from 'mocks';

describe('getDetails', () => {
  it('returns fetch error from catch block', async () => {
    vi.stubEnv('DEV', true);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    const result = await getDetails('1');

    expect(result).toEqual({
      hasError: true,
      message: 'Error: Network Error',
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Fetch crashed:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
    vi.unstubAllEnvs();
  });

  it('returns data successfully when response is ok', async () => {
    const result = await getDetails('1');
    expect(result).toEqual(detail);
  });

  it('returns error object when response is not ok (e.g., 404)', async () => {
    server.use(
      http.get('https://akabab.github.io/starwars-api/api/id/1.json', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const result = await getDetails('1');

    expect(result).toEqual({
      hasError: true,
      message: 'Server error: 404',
    });
  });

  it('returns timeout error object when request times out', async () => {
    vi.stubEnv('DEV', true);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const timeoutError = new DOMException(
      'The operation timed out.',
      'TimeoutError'
    );

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(timeoutError);

    const result = await getDetails('1');

    expect(result).toEqual({
      hasError: true,
      message: 'Your request timed out. Please try again.',
    });

    expect(consoleSpy).toHaveBeenCalledWith('Fetch crashed:', timeoutError);

    consoleSpy.mockRestore();
    vi.unstubAllEnvs();
  });
});
