import { Component, type ReactNode } from 'react';
import { SearchArea, ResultsArea } from './components';
import { getData } from './api/';
import { isFetchError } from './helpers';
import type { Card, DataType, FetchError } from './app/';

type AppState = {
  searchQuery: string;
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
};

export class App extends Component<object, AppState> {
  state = {
    searchQuery: '',
    hasError: false,
    errorMessage: '',
    cards: [],
  };

  async componentDidMount(): Promise<void> {
    const data: DataType | FetchError = await getData('');

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

  render(): ReactNode {
    const { cards, hasError, errorMessage } = this.state;
    return (
      <>
        <SearchArea />
        {hasError ? (
          <p>Error: {errorMessage}</p>
        ) : (
          <ResultsArea cards={cards} />
        )}
      </>
    );
  }
}
