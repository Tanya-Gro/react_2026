import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Card } from 'app/types';

export const detailsApi = createApi({
  reducerPath: 'detailsApi',
  tagTypes: ['Details'],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      'https://akabab.github.io/starwars-api/api/',
  }),
  endpoints: (builder) => ({
    getDetails: builder.query<Card, string>({
      query: (id) => `id/${id}.json/`,
      providesTags: (_result, _error, id) => [{ type: 'Details', id }],
    }),
  }),
});

export const { useGetDetailsQuery } = detailsApi;
