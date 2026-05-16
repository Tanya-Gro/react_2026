import type { ReactNode } from 'react';
import type { Card } from '../app/';
import { getID } from '../helpers';

type DataProps = {
  cards: Card[];
};

type TableHeader = {
  label: string;
  key: keyof Card;
  className?: string;
};

const TABLE_HEADERS: TableHeader[] = [
  { label: 'Name', key: 'name', className: 'col-span-2' },
  { label: 'Gender', key: 'gender' },
  { label: 'Height', key: 'height' },
  { label: 'Mass', key: 'mass' },
  { label: 'Hair Color', key: 'hair_color' },
];

export const ResultsArea = ({ cards }: DataProps): ReactNode => {
  if (cards.length === 0) {
    return (
      <div className="flex-1 p-8 text-center text-mist-500 italic">
        No results found. Try adjusting your search.
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-2 p-4 bg-mist-100 flex-1 overflow-auto">
      <div className="grid grid-cols-6 text-left border-b border-mist-400 py-5 font-bold text-mist-700">
        {TABLE_HEADERS.map((header) => (
          <span key={header.key} className={header.className || ''}>
            {header.label}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        {cards.map((card) => {
          const id = getID(card.url);
          return (
            <article
              key={id}
              className="grid grid-cols-6 text-left border-b border-mist-200 pt-3 pb-4 hover:bg-mist-200 transition-colors"
            >
              {TABLE_HEADERS.map((row) => (
                <span
                  className={`text-mist-600 ${row.className || ''}`}
                  key={`${id}-${row.key}`}
                >
                  {card[row.key]}
                </span>
              ))}
            </article>
          );
        })}
      </div>
    </section>
  );
};
