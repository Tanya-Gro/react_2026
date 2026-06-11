import type { SubmitEvent, JSX } from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Route } from 'routes';
import { LS_KEY } from 'app/constants';
import { useLocalStorage } from 'hooks';

export const SearchArea = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate({ from: '/' });

  const { search = '' } = Route.useSearch();
  const [lsSearch, setLsSearch] = useLocalStorage<string>(LS_KEY, search);

  useEffect(() => {
    if (search !== lsSearch) {
      setLsSearch(search);
    }
  }, [search, setLsSearch]);

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const value = inputRef.current?.value.trim() ?? '';
    if (value !== search) {
      setLsSearch(value);
      navigate({
        to: '/',
        search: {
          search: value,
          page: 1,
        },
      });
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
        key={search}
        ref={inputRef}
        id="search-input"
        type="search"
        placeholder="Search..."
        defaultValue={search || ''}
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
