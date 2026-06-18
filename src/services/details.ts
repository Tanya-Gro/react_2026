import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Details } from 'app';
import { LINKS } from 'app/constants';
import { CACHE_TTL, FETCH_TIMEOUT_MS } from './constants';

export const detailsApi = createApi({
  reducerPath: 'detailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: LINKS.details,
    timeout: FETCH_TIMEOUT_MS,
  }),
  tagTypes: ['Details'],
  endpoints: (builder) => ({
    getDetails: builder.query<Details, number>({
      query: (id) => ({
        url: `${id}.json`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Details', id }],
    }),
  }),
  keepUnusedDataFor: CACHE_TTL,
});

export const { useGetDetailsQuery } = detailsApi;
