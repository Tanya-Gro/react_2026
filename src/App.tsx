import { useEffect, useReducer } from 'react';
import { SearchArea, ResultsArea, Loader } from './components';
import { getData } from './api/';
import { isFetchError } from './helpers';
import { LS_KEY, type Card, type DataType, type FetchError } from './app/';

type AppState = {
  searchQuery: string;
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
  isLoading: boolean;
  shouldThrow: boolean;
};

type AppAction =
  | { type: 'change_search_query'; payload: string }
  | { type: 'start_loading' }
  | { type: 'fetch_success'; payload: Card[] }
  | { type: 'fetch_failed'; payload: string }
  | { type: 'throw_error' };

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'change_search_query': {
      return { ...state, searchQuery: action.payload };
    }
    case 'start_loading': {
      return { ...state, isLoading: true, hasError: false, errorMessage: '' };
    }
    case 'fetch_success': {
      return {
        ...state,
        isLoading: false,
        cards: action.payload,
        hasError: false,
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
  const [state, dispatch] = useReducer(reducer, {
    searchQuery: localStorage.getItem(LS_KEY) ?? '',
    hasError: false,
    errorMessage: '',
    cards: [],
    isLoading: false,
    shouldThrow: false,
  });

  const { cards, hasError, errorMessage, isLoading, shouldThrow, searchQuery } =
    state;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      dispatch({
        type: 'start_loading',
      });

      const data: DataType | FetchError = await getData(searchQuery);

      if (isFetchError(data)) {
        dispatch({
          type: 'fetch_failed',
          payload: data.message,
        });
      } else {
        dispatch({
          type: 'fetch_success',
          payload: data.results,
        });
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchQueryChange = (newSearchQuery: string): void => {
    if (newSearchQuery !== searchQuery) {
      localStorage.setItem(LS_KEY, newSearchQuery);
      dispatch({
        type: 'change_search_query',
        payload: newSearchQuery,
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
          {isLoading ? <Loader /> : <ResultsArea cards={cards} />}
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
