import type { Card } from 'app';
import { Detail, Pagination } from 'components';
import { CharactersTable } from './CharactersTable';

type DataProps = {
  cards: Card[];
  countPages: number;
};

export const ResultsArea = ({ cards, countPages }: DataProps) => {
  if (cards.length === 0) {
    return (
      <div className="flex-1 p-8 text-center text-mist-500 italic">
        No results found. Try adjusting your search.
      </div>
    );
  }

  return (
    <section className="flex flex-row gap-2 flex-1 overflow-hidden">
      <div className="flex flex-col flex-1 bg-mist-100 overflow-hidden">
        <div className="overflow-y-auto overflow-x-auto">
          <CharactersTable cards={cards} />
        </div>
        <Pagination countPages={countPages} />
      </div>
      <Detail />
    </section>
  );
};
