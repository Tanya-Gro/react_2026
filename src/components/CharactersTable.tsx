import type { Card } from 'app';
import { getID } from 'helpers';

type CharactersTableProps = {
  cards: Card[];
  selectedCardId: number | undefined;
  onToggleSelect: (id: string, isSelected: boolean) => void;
};

type CharactersRowProps = {
  card: Card;
  selectedCardId: number | undefined;
  onToggleSelect: (id: string, isSelected: boolean) => void;
};

type TableHeader = {
  label: string;
  key: keyof Card;
  className: string;
};

const TABLE_HEADERS: readonly TableHeader[] = [
  { label: 'Name', key: 'name', className: 'p-3.5 w-2/6' },
  { label: 'Gender', key: 'gender', className: 'p-3.5 w-1/6' },
  { label: 'Height', key: 'height', className: 'p-3.5 w-1/6' },
  { label: 'Mass', key: 'mass', className: 'p-3.5 w-1/6' },
  { label: 'Hair Color', key: 'hair_color', className: 'p-3.5 w-1/6' },
];

export const CharactersTable = ({
  cards,
  selectedCardId,
  onToggleSelect,
}: CharactersTableProps): React.JSX.Element => {
  return (
    <table
      aria-label="Star Wars characters"
      className="text-left overflow-x-auto"
    >
      <caption className="sr-only">List of Star Wars characters</caption>
      <thead className="sticky top-0 z-10 border-b font-bold border-mist-400 text-mist-700 bg-mist-200">
        <tr>
          <th aria-hidden="true"></th>
          {TABLE_HEADERS.map((header) => (
            <th key={header.key} className={header.className}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {cards.map((card) => (
          <CharactersRow
            key={card.url}
            card={card}
            selectedCardId={selectedCardId}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </tbody>
    </table>
  );
};

const CharactersRow = ({
  card,
  selectedCardId,
  onToggleSelect,
}: CharactersRowProps): React.JSX.Element => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTableRowElement>,
    id: string,
    isSelected: boolean
  ): void => {
    if (e.key === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      onToggleSelect(id, isSelected);
    }
  };

  const id = getID(card.url);
  const isSelected = String(selectedCardId) === id;

  return (
    <tr
      role="button"
      tabIndex={0}
      onClick={() => onToggleSelect(id, isSelected)}
      onKeyDown={(e) => handleKeyDown(e, id, isSelected)}
      className={`
        border-b border-mist-200 py-3 px-4 transition-colors outline-none
        hover:bg-mist-200 focus-visible:bg-mist-200
        ${isSelected ? 'bg-mist-200' : ''}
      `}
    >
      <td className="p-2 w-5">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          tabIndex={-1}
          className="h-4.5 w-4.5 cursor-pointer"
        />
      </td>

      {TABLE_HEADERS.map((row) => (
        <td
          key={`${id}-${row.key}`}
          className={`${row.className} py-2 text-mist-600 truncate`}
        >
          {card[row.key] ?? '-'}
        </td>
      ))}
    </tr>
  );
};
