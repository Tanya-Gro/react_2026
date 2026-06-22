'use client';

import { type JSX, useTransition } from 'react';
import { toggleCard } from 'features';
import type { Card } from 'app/types';
import type { RootState } from 'app/store';
import { getID } from 'helpers';
import { TABLE_HEADERS } from './constants';
import { useAppDispatch, useAppSelector } from 'app/store'; // Свои хуки
import { useRouter } from 'i18n/navigation'; // Умный роутер из next-intl

type CharactersRowProps = {
  card: Card;
  search: string;
  page: string;
};

export const CharactersRow = ({
  card,
  search,
  page,
}: CharactersRowProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const selectedCards = useAppSelector(
    (state: RootState) => state.selectedCards.items,
  );

  const id = getID(card.url);
  const isSelected = id in selectedCards;

  const toggleSelect = (e: React.MouseEvent): void => {
    e.stopPropagation();
    dispatch(toggleCard({ id, card }));
  };

  const handleRowClick = () => {
    startTransition(() => {
      const query: Record<string, string> = { page };
      if (search) {
        query.search = search;
      }
      query.details = id;

      router.push({ pathname: '/', query });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRowClick();
    } else if (e.code === 'Space') {
      e.preventDefault();
      dispatch(toggleCard({ id, card }));
    }
  };

  return (
    <tr
      role="button"
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      data-loading={isPending}
      className="hover:bg-mist-200 cursor-pointer transition-colors data-[loading=true]:opacity-60"
    >
      <td className="p-2 w-5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
          onClick={toggleSelect}
          className="cursor-pointer"
        />
      </td>

      {TABLE_HEADERS.map((header) => {
        const value = card[header.key as keyof Card];
        return (
          <td key={String(header.key)} className={header.className}>
            {typeof value === 'string' || typeof value === 'number'
              ? String(value)
              : '-'}
          </td>
        );
      })}
    </tr>
  );
};
