import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DataArgs, DataType } from 'app/types';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  tagTypes: ['Characters'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://swapi.py4e.com/api/',
  }),
  endpoints: (builder) => ({
    getData: builder.query<DataType, DataArgs>({
      query: ({ search, page }) => ({
        url: 'people/',
        params: {
          search: search || undefined,
          page: page || undefined,
        },
      }),
      providesTags: (_result, _error, arg) => [
        {
          type: 'Characters',
          id: `search:${arg.search || ''}, page:${arg.page || '1'}`,
        },
      ],
    }),
  }),
});

export const { useGetDataQuery } = dataApi;
