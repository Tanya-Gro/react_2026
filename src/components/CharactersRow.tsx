import { type JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { toggleCard } from 'features';
import { Route } from 'routes';
import type { Card, RootState } from 'app';
import { TABLE_HEADERS } from './constants';
import { getID } from 'helpers';

type CharactersRowProps = {
  card: Card;
};

export const CharactersRow = ({ card }: CharactersRowProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: '/' });
  const { details, search = '', page = 1 } = Route.useSearch();

  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.items,
  );

  const id = getID(card.url);
  const isShown = String(details) === id;
  const isSelected = id in selectedCards;

  const toggleSelect = (): void => {
    {
      dispatch(toggleCard({ id, card }));
    }
  };

  const toggleShown = (): void => {
    void navigate({
      to: '/',
      search: {
        search,
        page,
        details: isShown ? undefined : Number(id),
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toggleShown();
    } else if (e.code === 'Space') {
      e.preventDefault();
      toggleSelect();
    }
  };

  return (
    <tr
      role="button"
      tabIndex={0}
      onClick={toggleShown}
      onKeyDown={handleKeyDown}
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
            toggleSelect();
          }}
          className="h-4.5 w-4.5 cursor-pointer"
        />
      </td>

      {TABLE_HEADERS.map((row) => (
        <td
          key={`${id}-${row.key}`}
          className={`${row.className} py-2 text-mist-600 truncate cursor-pointer`}
        >
          {card[row.key]}
        </td>
      ))}
    </tr>
  );
};
