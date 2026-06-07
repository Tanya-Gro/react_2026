import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';
import { Route } from 'routes';

type PaginationProps = {
  countPages: number;
};

export const Pagination: (data: PaginationProps) => React.JSX.Element = ({
  countPages,
}: PaginationProps) => {
  const navigate: UseNavigateResult<string> = useNavigate({ from: '/' });

  const { search = '', page = 1 } = Route.useSearch();

  const onPageChange = (newPage: number): void => {
    navigate({
      to: '/',
      search: {
        search: search,
        page: newPage,
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
    'material-symbols-outlined cursor-pointer hover:text-amber-900 hover:underline disabled:text-mist-200 disabled:no-underline disabled:cursor-auto';

  return (
    <section className="flex items-center content-center place-content-center h-10 mb-2 mt-auto gap-3">
      <button
        type="button"
        disabled={page === 1}
        className={BUTTON_CLASSES}
        onClick={prevPage}
      >
        <span aria-hidden="true">arrow_back</span>
        <span className="sr-only">Previous page</span>
      </button>

      <output className="">{`Page ${page} of ${countPages}`}</output>

      <button
        type="button"
        disabled={page === countPages}
        className={BUTTON_CLASSES}
        onClick={nextPage}
      >
        <span aria-hidden="true">arrow_forward</span>
        <span className="sr-only">Next page</span>
      </button>
    </section>
  );
};
