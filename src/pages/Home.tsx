import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { SearchArea, ResultsArea, Loader, ActionArea } from 'components';
import { useLocalStorage } from 'hooks';
import { CARDS_PER_PAGE, LS_KEY } from 'app';
import { Route } from 'routes';
import { useGetDataQuery } from 'services';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit/react';

type PageChangeHandler = (data: number) => void;

export const Home = (): React.JSX.Element => {
  const navigate = useNavigate({ from: '/' });
  const { search = '', page = 1 } = Route.useSearch();
  const [, setLsStore] = useLocalStorage<string>(LS_KEY, search);
  const { data, error, isLoading, isFetching } = useGetDataQuery({
    search,
    page,
  });
  const countPages = data
    ? Math.max(1, Math.ceil(data.count / CARDS_PER_PAGE))
    : 1;
  const cards = data?.results ?? [];
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    setLsStore(search);
  }, [search, setLsStore]);

  const handleSearchQueryChange = (newSearchQuery: string): void => {
    navigate({
      to: '/',
      search: {
        search: newSearchQuery,
        page: 1,
      },
    });
  };

  const handlePageChange: PageChangeHandler = (newPage) => {
    navigate({
      to: '/',
      search: {
        search,
        page: newPage,
        details: undefined,
      },
    });
  };

  const handleErrorButtonClick = (): void => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('This is a test error.');
  }

  return (
    <section className="flex flex-col flex-1 px-4 overflow-hidden">
      <h1 className="text-4xl font-bold text-center p-6 text-mist-700 bg-mist-50 border-b-2 border-b-mist-300">
        Star Wars Characters
      </h1>
      <SearchArea
        searchQuery={search}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {error ? (
        <ShowError err={error} />
      ) : (
        <>
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <ResultsArea
              cards={cards}
              currentPage={page}
              countPages={countPages}
              onPageChange={handlePageChange}
            />
          )}
          <ActionArea onThrowError={handleErrorButtonClick} />
        </>
      )}
    </section>
  );
};

type ShowErrorProps = {
  err: FetchBaseQueryError | SerializedError;
};

const ShowError = ({ err }: ShowErrorProps): React.JSX.Element => {
  return (
    <p>
      Error:
      {'status' in err ? String(err.status) : (err.message ?? 'Unknown error')}
    </p>
  );
};
