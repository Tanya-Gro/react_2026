import { useNavigate } from '@tanstack/react-router';
import type { Card } from 'app';
import { Route } from 'routes';
import { getID } from 'helpers';
import { Detail, Pagination } from 'components';

type DataProps = {
  cards: Card[];
  currentPage: number;
  countPages: number;
  onPageChange: (page: number) => void;
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

export const ResultsArea = ({
  cards,
  currentPage,
  countPages,
  onPageChange,
}: DataProps): React.JSX.Element => {
  const navigate = useNavigate({ from: '/' });
  const { details, search, page } = Route.useSearch();

  if (cards.length === 0) {
    return (
      <div className="flex-1 p-8 text-center text-mist-500 italic">
        No results found. Try adjusting your search.
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 flex-1 overflow-hidden">
      <section className="flex flex-col gap-2 bg-mist-100 flex-1 overflow-hidden">
        <div className="grid grid-cols-6 text-left border-b border-mist-400 py-5 px-4 font-bold text-mist-700 pl-13">
          {TABLE_HEADERS.map((header) => (
            <span key={header.key} className={header.className || ''}>
              {header.label}
            </span>
          ))}
        </div>

        <div className="flex flex-col overflow-y-auto">
          {cards.map((card) => {
            const id = getID(card.url);
            const isSelected = details === id;

            const handleSelect = (): void => {
              navigate({
                to: '/',
                search: {
                  search,
                  page,
                  details: isSelected ? undefined : id,
                },
              });
            };

            return (
              <button
                key={id}
                type="button"
                onClick={handleSelect}
                className={`
          grid cursor-pointer grid-cols-[40px_repeat(6,1fr)]
          border-b border-mist-200 py-3 text-left transition-colors
          hover:bg-mist-200
          ${isSelected ? 'bg-mist-200' : ''}
        `}
              >
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleSelect}
                    className="h-4 w-4 cursor-pointer"
                  />
                </div>

                {TABLE_HEADERS.map((row) => (
                  <span
                    key={`${id}-${row.key}`}
                    className={`px-4 text-mist-600 ${row.className || ''}`}
                  >
                    {card[row.key]}
                  </span>
                ))}
              </button>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          countPages={countPages}
          onPageChange={onPageChange}
        />
      </section>
      <Detail />
    </div>
  );
};
