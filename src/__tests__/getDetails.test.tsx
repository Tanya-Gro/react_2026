import { getDetails } from 'api';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { detail } from 'mocks';

describe('getDetails', () => {
  it('returns fetch error from catch block', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));
    const result = await getDetails('1');
    expect(result).toEqual({
      hasError: true,
      message: 'Error: Network Error',
    });
  });

  it('returns data successfully when response is ok', async () => {
    const result = await getDetails('1');

    expect(result).toEqual(detail);
  });

  it('returns error object when response is not ok (e.g., 404)', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    server.use(
      http.get('https://akabab.github.io/starwars-api/api/id/1.json', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const result = await getDetails('1');

    expect(consoleSpy).toHaveBeenCalledWith('HTTP error! Status: 404');

    expect(result).toEqual({
      hasError: true,
      message: '404',
    });
  });
});
