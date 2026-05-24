import { createFileRoute } from '@tanstack/react-router';
import { Home } from 'pages';

type SearchParams = {
  search?: string;
  page?: number;
  details?: string;
};

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    search: typeof search.search === 'string' ? search.search : '',
    page: Number(search.page) > 0 ? Math.trunc(Number(search.page)) : 1,
    details: typeof search.details === 'string' ? search.details : undefined,
  }),
  component: Home,
});
