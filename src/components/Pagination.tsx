'use client';

import { changePage } from 'app/actions/characters';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type PaginationProps = {
  countPages: number;
};

const SubmitButton = ({
  direction,
  disabled,
}: {
  direction: '◄' | '►';
  disabled: boolean;
}) => {
  const { pending } = useFormStatus();
  const t = useTranslations('PAGINATION');

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="text-mist-700 text-2xl cursor-pointer hover:text-amber-900 hover:underline disabled:text-mist-200 disabled:no-underline disabled:cursor-auto opacity-100 data-[pending=true]:opacity-50 transition-opacity"
      data-pending={pending}
    >
      <span aria-hidden="true">{direction}</span>
      <span className="sr-only">
        {direction === '◄' ? t('previous') : t('next')}
      </span>
    </button>
  );
};

export const Pagination = ({ countPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const t = useTranslations('PAGINATION');

  const currentPage = Number(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';

  return (
    <section className="flex items-center content-center place-content-center h-10 mb-2 mt-auto gap-3 select-none">
      <form action={changePage}>
        <input type="hidden" name="search" value={search} />
        <input type="hidden" name="page" value={String(currentPage - 1)} />
        <SubmitButton direction="◄" disabled={currentPage === 1} />
      </form>

      <output className="text-mist-800 font-medium">
        {`${t('page')} ${currentPage} ${t('of')} ${countPages}`}
      </output>

      <form action={changePage}>
        <input type="hidden" name="search" value={search} />
        <input type="hidden" name="page" value={String(currentPage + 1)} />
        <SubmitButton direction="►" disabled={currentPage === countPages} />
      </form>
    </section>
  );
};
