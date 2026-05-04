import { Component, type ReactNode } from 'react';

type SearchFormProps = {
  searchQuery: string;
  onSearchQueryChange: (searchQuery: string) => void;
};

type SearchFormState = {
  localQuery: string;
};

export class SearchArea extends Component<SearchFormProps, SearchFormState> {
  state = {
    localQuery: this.props.searchQuery,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ localQuery: e.target.value });
  };

  handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.onSearchQueryChange(this.state.localQuery.trim());
  };

  render(): ReactNode {
    return (
      <form
        onSubmit={this.handleFormSubmit}
        className="flex gap-2 bg-mist-50 p-4 border-b-2 border-b-mist-300"
      >
        <input
          type="text"
          placeholder="Search..."
          value={this.state.localQuery}
          className="px-2 rounded flex-1 border border-mist-200 focus:outline-none focus:ring-2 focus:ring-mist-300"
          onChange={this.handleInputChange}
        />
        <button
          type="submit"
          className="bg-mist-300 hover:bg-mist-400 cursor-pointer rounded h-8 w-30 border border-mist-500"
        >
          Search
        </button>
      </form>
    );
  }
}
