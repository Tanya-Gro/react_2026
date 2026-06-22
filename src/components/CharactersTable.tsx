import { type JSX } from 'react';
import { CARDS_PER_PAGE } from 'app/constants';
import { Pagination } from './Pagination';
import { CharactersRow } from './CharactersRow';
import { TABLE_HEADERS } from './constants';
import type { DataType } from 'app/types';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';

type CharactersTableProps = { data: DataType; locale: Locale };

export const CharactersTable = async ({
  data,
  locale,
}: CharactersTableProps): Promise<JSX.Element> => {
  const t = await getTranslations({ locale, namespace: 'TABLE_HEADERS' });
  const countPages = data
    ? Math.max(1, Math.ceil(data.count / CARDS_PER_PAGE))
    : 1;
  const displayCards = data.results;

  return (
    <div className="flex flex-col flex-1 bg-mist-100 overflow-hidden">
      <table
        aria-label="Star Wars characters"
        className="text-left overflow-y-auto overflow-x-auto w-full"
      >
        <caption className="sr-only">List of Star Wars characters</caption>
        <thead className="sticky top-0 z-10 border-b font-bold border-mist-400 text-mist-700 bg-mist-200">
          <tr>
            <th aria-hidden="true" className="p-2 w-5"></th>
            {TABLE_HEADERS.map(({ key, className }) => (
              <th key={String(key)} className={className}>
                {t(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayCards && displayCards.length ? (
            displayCards.map((card) => (
              <CharactersRow key={card.url} card={card} search="" page="1" />
            ))
          ) : (
            <tr>
              <td
                colSpan={TABLE_HEADERS.length + 1}
                className="p-8 text-center text-mist-500 italic"
              >
                No results found or API Error.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination countPages={countPages} />
    </div>
  );
};
