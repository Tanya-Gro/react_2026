import { LINKS } from 'app/constants';
import type { DataType } from 'app/types';

type Params = {
  search?: string;
  page?: string;
};

export const getCharacters = async ({
  search = '',
  page = '1',
}: Params): Promise<DataType> => {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }
  params.set('page', page);

  const baseUrl = LINKS.characters.endsWith('/')
    ? LINKS.characters
    : `${LINKS.characters}/`;
  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch characters. Status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error(
      'Server returned HTML instead of JSON. Check your ENDPOINT URL!',
    );
  }

  return response.json();
};
