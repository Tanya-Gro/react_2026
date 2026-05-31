import { http, type HttpHandler, HttpResponse } from 'msw';
import { detail, people } from './';

export const handlers: HttpHandler[] = [
  http.get('https://swapi.py4e.com/api/people/', () => {
    return HttpResponse.json(people);
  }),
  http.get('https://akabab.github.io/starwars-api/api', ({ params }) => {
    const { id } = params;
    if (id === '1') {
      return HttpResponse.json(detail);
    }

    return new HttpResponse(null, {
      status: 404,
      statusText: 'Character Not Found',
    });
  }),
];
