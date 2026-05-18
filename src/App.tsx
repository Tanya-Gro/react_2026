import { useEffect, useReducer } from 'react';
import { SearchArea, ResultsArea, Loader } from './components';
import { getData } from './api/';
import { isFetchError } from './helpers';
import { useLocalStorage } from './hooks';
import {
  CARDS_PER_PAGE,
  LS_KEY,
  type Card,
  type DataType,
  type FetchError,
} from './app/';
import { useNavigate } from '@tanstack/react-router';
import { Route } from './routes';

type AppState = {
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
  isLoading: boolean;
  shouldThrow: boolean;
  countPages: number;
};

type AppAction =
  | { type: 'start_loading' }
  | { type: 'fetch_success'; payload: { results: Card[]; count: number } }
  | { type: 'fetch_failed'; payload: string }
  | { type: 'throw_error' };

type StoredState = {
  query: string;
};

function reducer(state: AppState, action: AppAction): AppState {
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
    default:
      return state;
  }
}

export const App = (): React.JSX.Element => {
  const navigate = useNavigate({ from: '/' });
  const { search = '', page = 1 } = Route.useSearch();

  const [lsState, setLsStore] = useLocalStorage<StoredState>(LS_KEY, {
    query: '',
  });

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
    if (!search && lsState.query) {
      navigate({
        to: '/',
        search: {
          search: lsState.query,
          page: 1,
        },
        replace: true,
      });
    }
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      dispatch({
        type: 'start_loading',
      });

      const data: DataType | FetchError = await getData(search, page);

      if (isFetchError(data)) {
        dispatch({
          type: 'fetch_failed',
          payload: data.message,
        });
      } else {
        dispatch({
          type: 'fetch_success',
          payload: { results: data.results, count: data.count },
        });
      }
    };

    fetchData();
  }, [search, page]);

  useEffect(() => {
    setLsStore({ query: search });
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

  const handlePageChange = (newPage: number): void => {
    navigate({
      to: '/',
      search: {
        search: search,
        page: newPage,
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
    <>
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
            <ResultsArea
              cards={cards}
              currentPage={page}
              countPages={countPages}
              onPageChange={handlePageChange}
            />
          )}
          <div className="p-4 flex justify-end bg-mist-50 border-t-2 border-t-mist-300">
            <button
              name="throw-error-button"
              onClick={handleErrorButtonClick}
              className="bg-mauve-300 hover:bg-mauve-400 cursor-pointer rounded h-10 w-30 border border-mist-500"
            >
              Throw Error
            </button>
          </div>
        </>
      )}
    </>
  );
};
