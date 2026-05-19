import { type Details, type FetchError, LINKS } from 'core';

export async function getDetails(id: string): Promise<Details | FetchError> {
  try {
    const response = await fetch(`${LINKS.details}${id}.json`);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return { hasError: true, message: `${response.status}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return { hasError: true, message: String(error) };
  }
}
