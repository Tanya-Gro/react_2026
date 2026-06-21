'use client';

import { type JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import { CARDS_PER_PAGE } from 'app/constants';
import { Loader } from './Loader';
import { Pagination } from './Pagination';

import { CharactersRow } from './CharactersRow';
import { TABLE_HEADERS } from './constants';
import { useGetDataQuery } from 'services';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit/react';
import type { Card } from 'app/types';

type CharactersTableProps = { cards: Card[] };

export const CharactersTable = ({
  cards,
}: CharactersTableProps): JSX.Element => {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';

  const { data, error, isLoading } = useGetDataQuery({
    search,
    page,
  });

  const countPages = data
    ? Math.max(1, Math.ceil(data.count / CARDS_PER_PAGE))
    : 1;

  // const cards = data?.results ?? [];

  if (error) {
    return <ShowError err={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col flex-1 bg-mist-100 overflow-hidden">
      <table
        aria-label="Star Wars characters"
        className="text-left overflow-y-auto overflow-x-auto"
      >
        <caption className="sr-only">List of Star Wars characters</caption>
        <thead className="sticky top-0 z-10 border-b font-bold border-mist-400 text-mist-700 bg-mist-200">
          <tr>
            <th aria-hidden="true"></th>
            {TABLE_HEADERS.map((header) => (
              <th key={header.key} className={header.className}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {cards.length ? (
            cards.map((card) => {
              return <CharactersRow key={card.url} card={card} />;
            })
          ) : (
            <tr>
              <td
                colSpan={TABLE_HEADERS.length + 1}
                className="p-8 text-center text-mist-500 italic"
              >
                No results found. Try adjusting your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination countPages={countPages} />
    </div>
  );
};

type ShowErrorProps = {
  err: FetchBaseQueryError | SerializedError;
};

const ERROR_MESSAGES: Record<string, string> = {
  FETCH_ERROR:
    'Failed to connect to the server. Please check your internet connection.',
  TIMEOUT_ERROR: 'The request timed out. Please try again later.',
  PARSING_ERROR: 'Received an invalid response from the server.',
};

const ShowError = ({ err }: ShowErrorProps): JSX.Element => {
  let displayMessage = 'Unknown error';

  if ('status' in err) {
    const statusStr = String(err.status);
    displayMessage = ERROR_MESSAGES[statusStr] ?? `HTTP Error ${statusStr}`;
  } else if (err.message) {
    displayMessage = err.message;
  }

  return <p role="alert">{`Error: ${displayMessage}`}</p>;
};
