import { type JSX } from 'react';
import { getTranslations } from 'next-intl/server';
import { LINKS } from 'app/constants';
import type { Locale } from '@/i18n/config';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

const AboutPage = async ({ params }: AboutPageProps): Promise<JSX.Element> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ABOUT_PAGE' });
  return (
    <main className="flex flex-1 flex-col bg-mist-50 text-mist-800">
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="mb-6 bg-linear-to-r from-transparent via-mist-700 to-transparent bg-clip-text text-5xl font-extrabold tracking-wide text-transparent md:text-7xl">
          {t('title')}
        </h1>

        <p className="max-w-4xl text-lg leading-8 text-mist-700 md:text-2xl">
          {t('description_title')}{' '}
          <strong className="font-bold text-mist-900">
            {t('description_author')}
          </strong>{' '}
          {t('description_during')}{' '}
          <a
            href={LINKS.RSS}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline decoration-mauve-400 underline-offset-4 transition hover:text-mauve-600"
          >
            {t('description_school')}
          </a>{' '}
          {t('description_course')}
        </p>

        <p className="mt-6 max-w-3xl text-base italic leading-7 text-mist-600 md:text-xl">
          {t('mission')}
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
