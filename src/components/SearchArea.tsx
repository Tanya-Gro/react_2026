'use client';

import { useRef } from 'react';
import { searchCharacters } from 'app/actions/characters';
import { useLocale, useTranslations } from 'next-intl';
import { SearchButton } from './SearchButton';

type SearchAreaProps = {
  initialSearch: string;
};

export const SearchArea = ({ initialSearch }: SearchAreaProps) => {
  const t = useTranslations('SEARCH_AREA');
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      key={locale}
      action={searchCharacters}
      className="flex gap-2 bg-mist-50 p-4 border-b-2 border-b-mist-300"
    >
      <label htmlFor="search-input" className="self-center sr-only">
        {t('label')}
      </label>
      <input
        ref={inputRef}
        id="search-input"
        type="search"
        name="search"
        placeholder={t('placeholder')}
        defaultValue={initialSearch}
        className="px-2 rounded flex-1 border border-mist-200 focus:outline-none focus:ring-2 focus:ring-mist-300"
      />
      <SearchButton
        buttonText={t('button')}
        pendingText={t('button_pending')}
      />
    </form>
  );
};
