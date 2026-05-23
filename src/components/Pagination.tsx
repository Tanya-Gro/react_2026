type PaginationProps = {
  currentPage: number;
  countPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  countPages,
  onPageChange,
}: PaginationProps): React.JSX.Element => {
  const prevPage = (): void => {
    if (currentPage === 1) {
      return;
    }
    onPageChange(currentPage - 1);
  };

  const nextPage = (): void => {
    if (currentPage < countPages) {
      onPageChange(currentPage + 1);
    }
  };

  const BUTTON_CLASSES =
    'material-symbols-outlined cursor-pointer hover:text-amber-900 hover:underline disabled:text-mist-200 disabled:no-underline disabled:cursor-auto';

  return (
    <section className="flex items-center content-center place-content-center h-10 mb-2 mt-auto gap-3">
      <button
        type="button"
        disabled={currentPage === 1}
        className={BUTTON_CLASSES}
        onClick={prevPage}
      >
        <span aria-hidden="true">arrow_back</span>
        <span className="sr-only">Previous page</span>
      </button>

      <output className="">{`Page ${currentPage} of ${countPages}`}</output>

      <button
        type="button"
        disabled={currentPage === countPages}
        className={BUTTON_CLASSES}
        onClick={nextPage}
      >
        <span aria-hidden="true">arrow_forward</span>
        <span className="sr-only">Next page</span>
      </button>
    </section>
  );
};
