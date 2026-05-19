import { getData } from 'api';

describe('getData', () => {
  it('returns fetch error from catch block', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    const result = await getData('', 1);

    expect(result).toEqual({
      hasError: true,
      message: 'Error: Network Error',
    });
  });

  it('adds search query to url', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ results: [] })));

    const searchQuery = 'Luke';
    await getData(searchQuery, 1);

    const [[calledUrl]] = fetchMock.mock.calls;
    const url = new URL(String(calledUrl));

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
});
