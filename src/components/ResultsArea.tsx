import { Suspense, type JSX } from 'react';
import { Detail, Loader } from 'components';
import { CharactersTable } from './CharactersTable';
import type { DataType } from 'app/types';
import type { Locale } from '@/i18n/config';

type ResultsAreaProps = {
  initialData: DataType;
  detailsId: string | null;
  locale: Locale;
};

export const ResultsArea = ({
  initialData,
  detailsId,
  locale,
}: ResultsAreaProps): JSX.Element => {
  return (
    <section className="flex flex-row gap-2 flex-1 overflow-hidden">
      <CharactersTable data={initialData} locale={locale} />
      {detailsId ? (
        <Suspense
          fallback={
            <aside
              aria-label="Character details"
              className="flex flex-col w-80 max-h-dvh bg-mist-50 p-2 justify-center items-center shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]"
            >
              <Loader />
            </aside>
          }
        >
          <Detail id={detailsId} locale={locale} />
        </Suspense>
      ) : null}
    </section>
  );
};
