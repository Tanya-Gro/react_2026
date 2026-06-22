import { type JSX } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { DetailField } from './DetailField';
import { getCharacterDetails } from 'lib/getCharacterDetails';
import type { Details } from 'app/types';
import type { Locale } from '@/i18n/config';

type DetailFieldConfig = {
  titleKey: string;
  key: keyof Details;
};

type DetailProps = {
  id: string;
  locale: Locale;
};

const ASIDE_CLASSES =
  'flex flex-col w-80 max-h-dvh bg-mist-50 p-2 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]';

const DETAIL_FIELDS: readonly DetailFieldConfig[] = [
  { titleKey: 'fields.height', key: 'height' },
  { titleKey: 'fields.mass', key: 'mass' },
  { titleKey: 'fields.gender', key: 'gender' },
  { titleKey: 'fields.species', key: 'species' },
  { titleKey: 'fields.skinColor', key: 'skinColor' },
  { titleKey: 'fields.eyeColor', key: 'eyeColor' },
  { titleKey: 'fields.hairColor', key: 'hairColor' },
  { titleKey: 'fields.homeworld', key: 'homeworld' },
  { titleKey: 'fields.affiliations', key: 'affiliations' },
  { titleKey: 'fields.formerAffiliations', key: 'formerAffiliations' },
  { titleKey: 'fields.masters', key: 'masters' },
  { titleKey: 'fields.apprentices', key: 'apprentices' },
  { titleKey: 'fields.equipment', key: 'equipment' },
];

export const Detail = async ({
  id,
  locale,
}: DetailProps): Promise<JSX.Element | null> => {
  const t = await getTranslations({ locale, namespace: 'DETAILS' });

  try {
    const data = await getCharacterDetails(id);

    return (
      <aside aria-label={t('aria_label')} className={ASIDE_CLASSES}>
        <div className="p-2.5 flex items-start justify-between gap-4 border-b border-mist-400 my-0.5">
          <h2 className="text-2xl font-bold text-mist-800">{data.name}</h2>
        </div>

        <div className="flex flex-col gap-2 px-2 items-center overflow-y-auto">
          {data.image && (
            <div className="relative w-60 h-80 min-h-80 shrink-0 overflow-hidden rounded-lg border border-mist-200 my-3">
              <Image
                src={data.image}
                alt={data.name}
                fill
                sizes="280px"
                priority
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {DETAIL_FIELDS.map(({ titleKey, key }) => (
            <DetailField key={key} label={t(titleKey)} value={data[key]} />
          ))}
        </div>
      </aside>
    );
  } catch {
    return (
      <aside aria-label={t('aria_label')} className={ASIDE_CLASSES}>
        <p className="mt-10 text-xl text-mist-700 text-center">{t('failed')}</p>
      </aside>
    );
  }
};
