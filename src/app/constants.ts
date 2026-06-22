import type { Url } from './types';

export const LINKS: Url = {
  characters:
    process.env.NEXT_PUBLIC_API_URL || 'https://swapi.py4e.com/api/people/',
  details:
    process.env.NEXT_PUBLIC_DETAILS_API_URL ||
    'https://akabab.github.io/starwars-api/api/id/',
  RSS: 'https://rs.school/react/',
  GitHub: 'https://github.com/Tanya-Gro',
};

export const CARDS_PER_PAGE = 10;
