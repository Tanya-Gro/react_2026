import { http, HttpResponse } from 'msw';
import { detail, people } from './';

export const handlers = [
  http.get('https://swapi.py4e.com/api/people/', () => {
    return HttpResponse.json(people);
  }),
  http.get('https://akabab.github.io/starwars-api/api/id/1.json', () => {
    return HttpResponse.json(detail);
  }),
];
