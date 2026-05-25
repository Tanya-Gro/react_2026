import { getData } from 'api';
import type { FetchError, DataType } from 'app';
import type { Mock } from 'vitest';

describe('getData', () => {
  const searchQuery: string = 'Luke';

  it('returns fetch error from catch block', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    const result: DataType | FetchError = await getData('', 1);

    expect(result).toEqual({
      hasError: true,
      message: 'Error: Network Error',
    });
  });

  it('adds search query to url', async () => {
    const fetchMock: Mock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ results: [] })));

    await getData(searchQuery, 1);

    const [[calledUrl]] = fetchMock.mock.calls;
    const url: URL = new URL(String(calledUrl));

    expect(url.searchParams.get('search')).toBe(searchQuery);
  });

  it('does not add search param when query is empty', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ results: [] })));

    await getData('', 1);

    const [[calledUrl]] = fetchMock.mock.calls;
    const url = new URL(String(calledUrl));

    expect(url.searchParams.has('search')).toBe(false);
  });

  it('returns timeout error object when request times out', async () => {
    vi.stubEnv('DEV', true);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const timeoutError = new DOMException(
      'The operation timed out.',
      'TimeoutError'
    );

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(timeoutError);

    const result = await getData(searchQuery, 1);

    expect(result).toEqual({
      hasError: true,
      message: 'Your request timed out. Please try again.',
    });

    expect(consoleSpy).toHaveBeenCalledWith('Fetch crashed:', timeoutError);

    consoleSpy.mockRestore();
    vi.unstubAllEnvs();
  });
});
