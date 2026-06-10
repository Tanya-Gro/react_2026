import { useEffect, useReducer, type JSX } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'routes';
import { getID, isFetchError } from 'helpers';
import { CARDS_PER_PAGE, type Card } from 'app';
import type { DataType, FetchError, RootState } from 'app';
import { Loader } from './Loader';
import { Pagination } from './Pagination';
import { getData } from 'api';
import { CharactersRow } from './CharactersRow';
import { TABLE_HEADERS } from './constants';

type CharactersState = {
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
  isLoading: boolean;
  countPages: number;
};

type CharactersAction =
  | { type: 'start_loading' }
  | { type: 'fetch_success'; payload: { results: Card[]; count: number } }
  | { type: 'fetch_failed'; payload: string };

const reducer = (
  state: CharactersState,
  action: CharactersAction,
): CharactersState => {
  switch (action.type) {
    case 'start_loading': {
      return { ...state, isLoading: true, hasError: false, errorMessage: '' };
    }
    case 'fetch_success': {
      return {
        ...state,
        isLoading: false,
        cards: action.payload.results,
        hasError: false,
        countPages: Math.max(
          1,
          Math.ceil(action.payload.count / CARDS_PER_PAGE),
        ),
      };
    }
    case 'fetch_failed': {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload,
        cards: [],
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  hasError: false,
  errorMessage: '',
  cards: [],
  isLoading: false,
  countPages: 1,
};

export const CharactersTable = (): JSX.Element => {
  const { search = '', page = 1 } = Route.useSearch();

  const [state, dispatchReducer] = useReducer(reducer, initialState);

  const { cards, hasError, isLoading, errorMessage, countPages } = state;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      dispatchReducer({
        type: 'start_loading',
      });

      try {
        const data: DataType | FetchError = await getData(
          search,
          page,
          controller.signal,
        );

        if (isFetchError(data)) {
          dispatchReducer({
            type: 'fetch_failed',
            payload: data.message,
          });
        } else {
          dispatchReducer({
            type: 'fetch_success',
            payload: { results: data.results, count: data.count },
          });
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        dispatchReducer({
          type: 'fetch_failed',
          payload: String(error),
        });
      }
    };

    fetchData();

    return (): void => {
      controller.abort();
    };
  }, [search, page]);

  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.items,
  );

  if (hasError) {
    return <p className="flex-1">Error: {errorMessage}</p>;
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
