import type { Card } from 'app';
import type { StoredCards } from 'features';
import { getID } from 'helpers';

type CharactersTableProps = {
  cards: Card[];
  shownCardId: number | undefined;
  selectedCards: StoredCards;
  handleToggleShown: (id: string, isShown: boolean) => void;
  handleSelect: (id: string, card: Card) => void;
};

type CharactersRowProps = {
  card: Card;
  shownCardId: number | undefined;
  selectedCards: StoredCards;
  onToggleShown: (id: string, isSelected: boolean) => void;
  onSelect: (id: string, card: Card) => void;
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
  shownCardId,
  selectedCards,
  handleToggleShown,
  handleSelect,
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
            selectedCards={selectedCards}
            shownCardId={shownCardId}
            onToggleShown={handleToggleShown}
            onSelect={handleSelect}
          />
        ))}
      </tbody>
    </table>
  );
};

const CharactersRow = ({
  card,
  shownCardId,
  selectedCards,
  onToggleShown,
  onSelect,
}: CharactersRowProps): React.JSX.Element => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTableRowElement>,
    id: string,
    isSelected: boolean,
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onToggleShown(id, isSelected);
    } else if (e.code === 'Space') {
      e.preventDefault();
      onSelect(id, card);
    }
  };

  const id = getID(card.url);
  const isShown = String(shownCardId) === id;
  const isSelected = id in selectedCards;

  return (
    <tr
      role="button"
      tabIndex={0}
      onClick={() => onToggleShown(id, isShown)}
      onKeyDown={(e) => handleKeyDown(e, id, isShown)}
      className={`
        border-b border-mist-200 py-3 px-4 transition-colors outline-none
        hover:bg-mist-200 focus-visible:bg-mist-200
        ${isSelected ? 'bg-mist-200' : ''}
      `}
    >
      <td className="p-2 w-5">
        <input
          aria-label={`Select ${card.name}`}
          type="checkbox"
          checked={isSelected}
          readOnly
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id, card);
          }}
          className="h-4.5 w-4.5 cursor-pointer"
        />
      </td>

      {TABLE_HEADERS.map((row) => (
        <td
          key={`${id}-${row.key}`}
          className={`${row.className} py-2 text-mist-600 truncate cursor-pointer`}
        >
          {card[row.key] ?? '-'}
        </td>
      ))}
    </tr>
  );
};
