'use client';

import { type JSX, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/config';

export const LanguageToggle = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    if (nextLocale !== currentLocale) {
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });
    }
  };

  return (
    <select
      value={currentLocale}
      disabled={isPending}
      onChange={handleLocaleChange}
      className="h-10 w-14 cursor-pointer items-center justify-center rounded-lg border border-mist-400 bg-sky-100 transition-colors hover:bg-mist-200 dark:border-mist-700 dark:bg-teal-950 dark:hover:bg-mist-800 disabled:opacity-50 pl-1"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
