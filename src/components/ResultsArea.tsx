import { useNavigate } from '@tanstack/react-router';
import { Route } from 'routes';
import type { Card } from 'app';
import { Detail, Pagination } from 'components';
import { CharactersTable } from './CharactersTable';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCard } from 'features';
import type { RootState } from 'app';

type DataProps = {
  cards: Card[];
  countPages: number;
};

export const ResultsArea = ({
  cards,
  countPages,
}: DataProps) => {
  const navigate = useNavigate({ from: '/' });
  const { details, search, page } = Route.useSearch();
  const dispatch = useDispatch();

  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.items,
  );

  if (cards.length === 0) {
    return (
      <div className="flex-1 p-8 text-center text-mist-500 italic">
        No results found. Try adjusting your search.
      </div>
    );
  }

  const handleToggleShown = (id: string, isShown: boolean): void => {
    navigate({
      to: '/',
      search: {
        search,
        page,
        details: isShown ? undefined : Number(id),
      },
    });
  };

  const handleSelect = (id: string, card: Card): void => {
    dispatch(toggleCard({ id, card }));
  };

  return (
    <section className="flex flex-row gap-2 flex-1 overflow-hidden">
      <div className="flex flex-col flex-1 bg-mist-100 overflow-hidden">
        <div className="overflow-y-auto overflow-x-auto">
          <CharactersTable
            cards={cards}
            shownCardId={details}
            selectedCards={selectedCards}
            handleToggleShown={handleToggleShown}
            handleSelect={handleSelect}
          />
        </div>
        <Pagination countPages={countPages} />
      </div>
      <Detail />
    </section>
  );
};
