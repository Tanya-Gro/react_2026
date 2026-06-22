import { getCharacterDetails } from 'lib/getCharacterDetails';

import { getCharacters } from 'lib/getCharacters';
import { SearchArea } from 'components/SearchArea';
import { ResultsArea } from 'components/ResultsArea';
import { ActionArea } from 'components/ActionArea';
import type { Locale } from 'i18n/config';
import { getTranslations } from 'next-intl/server';

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ search?: string; page?: string; details?: string }>;
};

export default async function HomePage(props: HomePageProps) {
  const params = await props.searchParams;
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'HOME_PAGE' });

  const search = params.search ?? '';
  const page = params.page ?? '1';
  const detailsId = params.details ?? null;

  const initialData = await getCharacters({ search, page });

  return (
    <section className="flex flex-col flex-1 overflow-hidden">
      <h1 className="text-4xl font-bold text-center p-6 text-mist-700 bg-mist-50 border-b-2 border-b-mist-300">
        {t('title')}
      </h1>

      <SearchArea initialSearch={search} />

      <ResultsArea
        initialData={initialData}
        detailsId={detailsId}
        locale={locale}
      />

      <ActionArea search={search} page={page} detailsId={detailsId} />
    </section>
  );
}

export async function generateMetadata({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const detailsId = params.details;

  if (detailsId) {
    try {
      const character = await getCharacterDetails(detailsId);
      return { title: `${character.name} - React App 2026` };
    } catch {
      return { title: 'Character Details - React App 2026' };
    }
  }

  return { title: 'React App 2026' };
}
