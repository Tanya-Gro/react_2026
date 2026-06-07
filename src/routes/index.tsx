import { createFileRoute } from '@tanstack/react-router';
import { Home } from 'pages';

type SearchParams = {
  search?: string;
  page?: number;
  details?: number;
};

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    search: typeof search.search === 'string' ? search.search : '',
    page: Number(search.page) > 0 ? Math.trunc(Number(search.page)) : 1,
    details:
      typeof search.details === 'number'
        ? Math.max(Math.trunc(search.details), 1)
        : undefined,
  }),
  component: Home,
});
