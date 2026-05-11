import { LINKS } from '../app/';
import type { DataType, FetchError } from '../app/';

export async function getData(
  searchQuery: string
): Promise<DataType | FetchError> {
  try {
    const url = new URL(LINKS.characters);
    if (searchQuery) url.searchParams.set('search', searchQuery);

    const response = await fetch(url);

    if (!response.ok) {
      return { hasError: true, message: `${response.status}` };
    }

    const data: DataType = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: String(error) };
  }
}
