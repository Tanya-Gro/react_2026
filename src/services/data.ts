import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DataType } from 'app';
import { LINKS } from 'app';

type DataArgs = {
  search: string;
  page: number;
};

export const dataApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: LINKS.characters }),
  endpoints: (builder) => ({
    getData: builder.query<DataType, DataArgs>({
      query: ({ search, page }) => ({
        url: '',
        params: {
          ...(search && { search }),
          page,
        },
        keepUnusedDataFor: 60,
      }),
    }),
  }),
});

export const { useGetDataQuery } = dataApi;
