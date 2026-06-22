import { LINKS } from 'app/constants';
import type { Details } from 'app/types';

export const getCharacterDetails = async (id: string): Promise<Details> => {
  const response = await fetch(`${LINKS.details}${id}.json`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch character details for ID: ${id}`);
  }

  return response.json();
};
