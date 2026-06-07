import type { SubmitEvent, JSX } from 'react';
import { useRef } from 'react';

type SearchFormProps = {
  searchQuery: string;
  onSearchQueryChange: (searchQuery: string) => void;
};

export const SearchArea = ({
  searchQuery,
  onSearchQueryChange,
}: SearchFormProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const value = inputRef.current?.value.trim() ?? '';
    if (value !== searchQuery) {
      onSearchQueryChange(value);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex gap-2 bg-mist-50 p-4 border-b-2 border-b-mist-300"
    >
      <label htmlFor="search-input" className="self-center sr-only">
        Search characters:
      </label>
      <input
        key={searchQuery}
        ref={inputRef}
        id="search-input"
        type="search"
        placeholder="Search..."
        defaultValue={searchQuery}
        className="px-2 rounded flex-1 border border-mist-200 focus:outline-none focus:ring-2 focus:ring-mist-300"
      />
      <button
        type="submit"
        className="bg-mist-300 hover:bg-mist-400 cursor-pointer rounded h-8 w-30 border border-mist-500"
      >
        Search
      </button>
    </form>
  );
};
