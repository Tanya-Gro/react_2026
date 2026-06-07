import { useEffect, useReducer, type JSX } from 'react';
import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';
import { SearchArea, ResultsArea, Loader, ActionArea } from 'components';
import { getData } from 'api';
import { isFetchError } from 'helpers';
import { useLocalStorage } from 'hooks';
import type { Card, DataType, FetchError } from 'app';
import { CARDS_PER_PAGE, LS_KEY } from 'app';
import { Route } from 'routes';

type HomeState = {
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
  isLoading: boolean;
  shouldThrow: boolean;
  countPages: number;
};

type HomeAction =
  | { type: 'start_loading' }
  | { type: 'fetch_success'; payload: { results: Card[]; count: number } }
  | { type: 'fetch_failed'; payload: string }
  | { type: 'throw_error' };

const reducer = (state: HomeState, action: HomeAction): HomeState => {
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
          Math.ceil(action.payload.count / CARDS_PER_PAGE)
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
    case 'throw_error': {
      return {
        ...state,
        shouldThrow: true,
        errorMessage: 'This is a test error.',
      };
    }
    default: {
      return state;
    }
  }
};

export const Home = (): JSX.Element => {
  const navigate: UseNavigateResult<string> = useNavigate({ from: '/' });
  const { search = '', page = 1 } = Route.useSearch();

  const [, setLsStore] = useLocalStorage<string>(LS_KEY, search);

  const initialState = {
    hasError: false,
    errorMessage: '',
    cards: [],
    isLoading: false,
    shouldThrow: false,
    countPages: 1,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cards, hasError, errorMessage, isLoading, shouldThrow, countPages } =
    state;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      dispatch({
        type: 'start_loading',
      });

      try {
        const data: DataType | FetchError = await getData(
          search,
          page,
          controller.signal
        );

        if (!isFetchError(data)) {
          dispatch({
            type: 'fetch_success',
            payload: { results: data.results, count: data.count },
          });
        } else {
          dispatch({
            type: 'fetch_failed',
            payload: data.message,
          });
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        dispatch({
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

  useEffect(() => {
    setLsStore(search);
  }, [search, setLsStore]);

  const handleSearchQueryChange = (newSearchQuery: string): void => {
    navigate({
      to: '/',
      search: {
        search: newSearchQuery,
        page: 1,
      },
    });
  };

  const handleErrorButtonClick = (): void => {
    dispatch({
      type: 'throw_error',
    });
  };

  if (shouldThrow) {
    throw new Error(errorMessage);
  }

  return (
    <section className="flex flex-col flex-1 px-4 overflow-hidden">
      <h1 className="text-4xl font-bold text-center p-6 text-mist-700 bg-mist-50 border-b-2 border-b-mist-300">
        Star Wars Characters
      </h1>
      <SearchArea
        searchQuery={search}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {hasError ? (
        <p className="flex-1">Error: {errorMessage}</p>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <ResultsArea cards={cards} countPages={countPages} />
          )}
          <ActionArea onThrowError={handleErrorButtonClick} />
        </>
      )}
    </section>
  );
};
