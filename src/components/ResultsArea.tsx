import { useNavigate } from '@tanstack/react-router';
import { Route } from 'routes';
import type { Card } from 'app';
import { Detail, Pagination } from 'components';
import { CharactersTable } from './CharactersTable';

type DataProps = {
  cards: Card[];
  currentPage: number;
  countPages: number;
  onPageChange: (page: number) => void;
};

export const ResultsArea: (data: DataProps) => React.JSX.Element = ({
  cards,
  currentPage,
  countPages,
  onPageChange,
}: DataProps) => {
  const navigate = useNavigate({ from: '/' });
  const { details, search, page } = Route.useSearch();

  if (cards.length === 0) {
    return (
      <div className="flex-1 p-8 text-center text-mist-500 italic">
        No results found. Try adjusting your search.
      </div>
    );
  }

  const handleToggleSelect = (id: string, isSelected: boolean): void => {
    navigate({
      to: '/',
      search: {
        search,
        page,
        details: isSelected ? undefined : Number(id),
      },
    });
  };

  return (
    <section className="flex flex-row gap-2 flex-1 overflow-hidden">
      <div className="flex flex-col flex-1 bg-mist-100 overflow-hidden">
        <div className="overflow-y-auto overflow-x-auto">
          <CharactersTable
            cards={cards}
            selectedCardId={details}
            onToggleSelect={handleToggleSelect}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          countPages={countPages}
          onPageChange={onPageChange}
        />
      </div>
      <Detail />
    </section>
  );
};
