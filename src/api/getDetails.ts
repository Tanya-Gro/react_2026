import { type Details, type FetchError, LINKS, FETCH_TIMEOUT_MS } from 'app';

export async function getDetails(id: string): Promise<Details | FetchError> {
  try {
    const response = await fetch(`${LINKS.details}${id}.json`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { hasError: true, message: `Server error: ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Fetch crashed:', error);
    }

    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return {
        hasError: true,
        message: `Your request timed out. Please try again.`,
      };
    }

    return { hasError: true, message: String(error) };
  }
}
