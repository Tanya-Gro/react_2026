import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DataType } from 'app';
import { LINKS } from 'app/constants';
import { CACHE_TTL, FETCH_TIMEOUT_MS } from './constants';

type DataArgs = {
  search: string;
  page: number;
};

export const dataApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: LINKS.characters,
    timeout: FETCH_TIMEOUT_MS,
  }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getData: builder.query<DataType, DataArgs>({
      query: ({ search, page }) => ({
        url: '',
        params: {
          ...(search && { search }),
          page,
        },
      }),
      providesTags: (_result, _error, arg) => [
        { type: 'Characters', id: `search:${arg.search}, page:${arg.page}` },
      ],
    }),
  }),
  keepUnusedDataFor: CACHE_TTL,
});

export const { useGetDataQuery } = dataApi;
