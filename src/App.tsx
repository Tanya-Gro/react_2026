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
};

export class App extends Component<object, AppState> {
  state = {
    searchQuery: localStorage.getItem(LS_KEY) || '',
    hasError: false,
    errorMessage: '',
    cards: [],
    isLoading: false,
  };

  handleSearchQueryChange = (searchQuery: string): void => {
    this.setState({ searchQuery });
    localStorage.setItem(LS_KEY, searchQuery);
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
    const { cards, hasError, errorMessage, isLoading } = this.state;

    return (
      <>
        <SearchArea
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={this.handleSearchQueryChange}
        />
        {hasError ? (
          <p>Error: {errorMessage}</p>
        ) : isLoading ? (
          <Loader />
        ) : (
          <ResultsArea cards={cards} />
        )}
      </>
    );
  }
}
