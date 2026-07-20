import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';
import { Route } from 'routes';

type PaginationProps = {
  countPages: number;
};

export const Pagination: (data: PaginationProps) => React.JSX.Element = ({
  countPages,
}: PaginationProps) => {
  const navigate: UseNavigateResult<string> = useNavigate({ from: '/' });

  const { details, search = '', page = 1 } = Route.useSearch();

  const onPageChange = (newPage: number): void => {
    void navigate({
      to: '/',
      search: {
        search: search,
        page: newPage,
        details: details,
      },
    });
  };

  const prevPage = (): void => {
    if (page === 1) {
      return;
    }
    onPageChange(page - 1);
  };

  const nextPage = (): void => {
    if (page < countPages) {
      onPageChange(page + 1);
    }
  };

  const BUTTON_CLASSES =
    'text-mist-700 text-2xl cursor-pointer hover:text-amber-900 hover:underline disabled:text-mist-200 disabled:no-underline disabled:cursor-auto';

  return (
    <section className="flex items-center content-center place-content-center h-10 mb-2 mt-auto gap-3">
      <button
        type="button"
        disabled={page === 1}
        onClick={prevPage}
        className={BUTTON_CLASSES}
      >
        <span aria-hidden="true">&#9668;</span>
        <span className="sr-only">Previous page</span>
      </button>

      <output>{`Page ${page.toString()} of ${countPages.toString()}`}</output>

      <button
        type="button"
        disabled={page === countPages}
        onClick={nextPage}
        className={BUTTON_CLASSES}
      >
        <span aria-hidden="true">&#9658;</span>
        <span className="sr-only">Next page</span>
      </button>
    </section>
  );
};
