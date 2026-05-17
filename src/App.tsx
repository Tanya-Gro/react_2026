import { useEffect, useReducer } from 'react';
import { SearchArea, ResultsArea, Loader } from './components';
import { getData } from './api/';
import { isFetchError } from './helpers';
import {
  CARDS_PER_PAGE,
  LS_KEY,
  type Card,
  type DataType,
  type FetchError,
} from './app/';

type AppState = {
  searchQuery: string;
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
  isLoading: boolean;
  shouldThrow: boolean;
  currentPage: number;
  countPages: number;
};

type AppAction =
  | { type: 'change_search_query'; payload: string }
  | { type: 'start_loading' }
  | { type: 'fetch_success'; payload: { results: Card[]; count: number } }
  | { type: 'fetch_failed'; payload: string }
  | { type: 'list_page'; payload: number }
  | { type: 'throw_error' };

type StoredState = {
  query: string;
  page: number;
  countP: number;
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'change_search_query': {
      return { ...state, searchQuery: action.payload, currentPage: 1 };
    }
    case 'start_loading': {
      return { ...state, isLoading: true, hasError: false, errorMessage: '' };
    }
    case 'fetch_success': {
      return {
        ...state,
        isLoading: false,
        cards: action.payload.results,
        hasError: false,
        countPages: Math.ceil(action.payload.count / CARDS_PER_PAGE),
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
    case 'list_page': {
      return {
        ...state,
        currentPage: action.payload,
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
  function getStoredState(): StoredState {
    const initStor = {
      query: '',
      page: 1,
      countP: 1,
    };
    try {
      const storedData = localStorage.getItem(LS_KEY);
      if (!storedData) return initStor;
      return JSON.parse(storedData);
    } catch {
      return initStor;
    }
  }
  const {
    query: storedQuery,
    page: storedPage,
    countP: storedCountPages,
  } = getStoredState();

  const [state, dispatch] = useReducer(reducer, {
    searchQuery: storedQuery,
    hasError: false,
    errorMessage: '',
    cards: [],
    isLoading: false,
    shouldThrow: false,
    currentPage: storedPage,
    countPages: storedCountPages,
  });

  const {
    cards,
    hasError,
    errorMessage,
    isLoading,
    shouldThrow,
    searchQuery,
    currentPage,
    countPages,
  } = state;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      dispatch({
        type: 'start_loading',
      });

      const data: DataType | FetchError = await getData(
        searchQuery,
        currentPage
      );

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
  }, [searchQuery, currentPage]);

  useEffect(() => {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        query: searchQuery,
        page: currentPage,
        countP: countPages,
      })
    );
  }, [searchQuery, currentPage, countPages]);

  const handleSearchQueryChange = (newSearchQuery: string): void => {
    if (newSearchQuery !== searchQuery) {
      dispatch({
        type: 'change_search_query',
        payload: newSearchQuery,
      });
    }
  };

  const handlePageChange = (newPage: number): void => {
    if (newPage !== currentPage) {
      dispatch({
        type: 'list_page',
        payload: newPage,
      });
    }
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
        searchQuery={state.searchQuery}
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
              currentPage={currentPage}
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
