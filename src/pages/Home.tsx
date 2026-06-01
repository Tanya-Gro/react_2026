import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { SearchArea, ResultsArea, Loader, ActionArea } from 'components';
import { useLocalStorage } from 'hooks';
import { CARDS_PER_PAGE, LS_KEY } from 'app/constants';
import { Route } from 'routes';
import { dataApi, detailsApi, useGetDataQuery } from 'services';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit/react';

type PageChangeHandler = (data: number) => void;

export const Home = (): React.JSX.Element => {
  const navigate = useNavigate({ from: '/' });

  const { search = '', page = 1 } = Route.useSearch();

  const [, setLsStore] = useLocalStorage<string>(LS_KEY, search);

  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching } = useGetDataQuery({
    search,
    page,
  });

  const [shouldThrow, setShouldThrow] = useState(false);

  const countPages = data
    ? Math.max(1, Math.ceil(data.count / CARDS_PER_PAGE))
    : 1;

  const cards = data?.results ?? [];

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

  const handleRefresh = (): void => {
    dispatch(dataApi.util.invalidateTags(['Characters']));
    dispatch(detailsApi.util.invalidateTags(['Details']));
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
          <ActionArea
            onThrowError={handleErrorButtonClick}
            onRefresh={handleRefresh}
          />
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
    <p role="alert">
      Error:
      {'status' in err ? String(err.status) : (err.message ?? 'Unknown error')}
    </p>
  );
};
