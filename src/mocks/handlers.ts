import { http, HttpResponse } from 'msw';
import people from './data/people.json';

export const handlers = [
  http.get('https://swapi.py4e.com/api/people/', () => {
    return HttpResponse.json(people);
  }),
];
