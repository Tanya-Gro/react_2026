import { useState } from 'react';

type SearchFormProps = {
  searchQuery: string;
  onSearchQueryChange: (searchQuery: string) => void;
};

export const SearchArea = ({
  searchQuery,
  onSearchQueryChange,
}: SearchFormProps): React.JSX.Element => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalQuery(e.target.value);
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearchQueryChange(localQuery.trim());
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex gap-2 bg-mist-50 p-4 border-b-2 border-b-mist-300"
    >
      <input
        type="text"
        placeholder="Search..."
        value={localQuery}
        className="px-2 rounded flex-1 border border-mist-200 focus:outline-none focus:ring-2 focus:ring-mist-300"
        onChange={handleInputChange}
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
