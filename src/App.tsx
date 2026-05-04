import { Component, type ReactNode } from 'react';
import { SearchArea, ResultsArea } from './components';
import { getData } from './api/';
import { isFetchError } from './helpers';
import { LS_KEY, type Card, type DataType, type FetchError } from './app/';

type AppState = {
  searchQuery: string;
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
};

export class App extends Component<object, AppState> {
  state = {
    searchQuery: localStorage.getItem(LS_KEY) || '',
    hasError: false,
    errorMessage: '',
    cards: [],
  };

  handleSearchQueryChange = (searchQuery: string): void => {
    this.setState({ searchQuery });
    localStorage.setItem(LS_KEY, searchQuery);
  };

  async componentDidMount(): Promise<void> {
    const data: DataType | FetchError = await getData(this.state.searchQuery);

    if (!isFetchError(data)) {
      this.setState({
        cards: data.results,
      });
    } else {
      this.setState({
        hasError: true,
        errorMessage: data.message,
      });
    }
  }

  componentDidUpdate(_: object, prevState: AppState): void {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.componentDidMount();
    }
  }

  render(): ReactNode {
    const { cards, hasError, errorMessage } = this.state;
    return (
      <>
        <SearchArea
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={this.handleSearchQueryChange}
        />
        {hasError ? (
          <p>Error: {errorMessage}</p>
        ) : (
          <ResultsArea cards={cards} />
        )}
      </>
    );
  }
}
