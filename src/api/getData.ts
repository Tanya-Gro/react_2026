import { type DataType, type FetchError, LINKS, FETCH_TIMEOUT_MS } from 'app';

export async function getData(
  searchQuery: string,
  currentPage: number
): Promise<DataType | FetchError> {
  try {
    const url = new URL(LINKS.characters);
    if (searchQuery) url.searchParams.set('search', searchQuery);
    if (Number.isInteger(currentPage) && currentPage >= 1)
      url.searchParams.set('page', currentPage.toString());

    const response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { hasError: true, message: `Server error: ${response.status}` };
    }

    return await response.json();
  } catch (error: unknown) {
    if (import.meta.env.DEV) {
      console.error('Fetch crashed:', error);
    }

    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return {
        hasError: true,
        message: 'Your request timed out. Please try again.',
      };
    }
    return { hasError: true, message: String(error) };
  }
}
