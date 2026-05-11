import { Component, type ReactNode } from 'react';
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

export class App extends Component<object, AppState> {
  state = {
    searchQuery: localStorage.getItem(LS_KEY) ?? '',
    hasError: false,
    errorMessage: '',
    cards: [],
    isLoading: false,
    shouldThrow: false,
  };

  handleSearchQueryChange = (searchQuery: string): void => {
    if (searchQuery === this.state.searchQuery) return;
    this.setState({ searchQuery });
    localStorage.setItem(LS_KEY, searchQuery);
  };

  handleErrorButtonClick = (): void => {
    this.setState({ shouldThrow: true, errorMessage: 'This is a test error.' });
  };

  fetchData = async (): Promise<void> => {
    this.setState({ isLoading: true, hasError: false, errorMessage: '' });

    const data: DataType | FetchError = await getData(this.state.searchQuery);

    if (!isFetchError(data)) {
      this.setState({
        hasError: false,
        errorMessage: '',
        cards: data.results,
        isLoading: false,
      });
    } else {
      this.setState({
        hasError: true,
        errorMessage: data.message,
        isLoading: false,
      });
    }
  };

  async componentDidMount(): Promise<void> {
    this.fetchData();
  }

  componentDidUpdate(_: object, prevState: AppState): void {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchData();
    }
  }

  render(): ReactNode {
    const { cards, hasError, errorMessage, isLoading, shouldThrow } =
      this.state;

    if (shouldThrow) {
      throw new Error(errorMessage);
    }

    return (
      <>
        <h1 className="text-4xl font-bold text-center p-6 text-mist-700 bg-mist-50 border-b-2 border-b-mist-300">
          Star Wars Characters
        </h1>
        <SearchArea
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={this.handleSearchQueryChange}
        />
        {hasError ? (
          <p className="flex-1">Error: {errorMessage}</p>
        ) : (
          <>
            {isLoading ? <Loader /> : <ResultsArea cards={cards} />}
            <div className="p-4 flex justify-end bg-mist-50 border-t-2 border-t-mist-300">
              <button
                name="throw-error-button"
                onClick={this.handleErrorButtonClick}
                className="bg-mauve-300 hover:bg-mauve-400 cursor-pointer rounded h-10 w-30 border border-mist-500"
              >
                Throw Error
              </button>
            </div>
          </>
        )}
      </>
    );
  }
}
