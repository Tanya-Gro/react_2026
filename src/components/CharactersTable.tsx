import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'routes';
import { getID } from 'helpers';
import { CARDS_PER_PAGE } from 'app/constants';
import type { RootState } from 'app';
import { Loader } from './Loader';
import { Pagination } from './Pagination';

import { CharactersRow } from './CharactersRow';
import { TABLE_HEADERS } from './constants';
import { useGetDataQuery } from 'services';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit/react';

export const CharactersTable = (): JSX.Element => {
  const { search = '', page = 1 } = Route.useSearch();

  const { data, error, isLoading, isFetching } = useGetDataQuery({
    search,
    page,
  });

  const countPages = data
    ? Math.max(1, Math.ceil(data.count / CARDS_PER_PAGE))
    : 1;

  const cards = data?.results ?? [];

  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.items,
  );

  if (error) {
    return <ShowError err={error} />;
  }

  if (isLoading || isFetching) {
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
              const id = getID(card.url);
              return (
                <CharactersRow
                  key={id}
                  id={id}
                  card={card}
                  isSelected={id in selectedCards}
                />
              );
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

const ShowError = ({ err }: ShowErrorProps): React.JSX.Element => {
  return (
    <p role="alert">
      Error:
      {'status' in err ? String(err.status) : (err.message ?? 'Unknown error')}
    </p>
  );
};
