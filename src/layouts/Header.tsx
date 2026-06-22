import type { JSX } from 'react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from 'components';
import { getTranslations } from 'next-intl/server';

type HeaderProps = {
  locale: string;
};

export const Header = async ({ locale }: HeaderProps): Promise<JSX.Element> => {
  const t = await getTranslations({ locale, namespace: 'NAVIGATION' });
  return (
    <header className="flex items-center justify-between p-4 border-b-2 border-b-mist-300">
      <nav className="flex gap-x-8 text-xl text-mist-700">
        <Link href="/" className="[&.active]:font-bold [&.active]:underline">
          {t('home')}
        </Link>
        <Link
          href="/about"
          className="[&.active]:font-bold [&.active]:underline"
        >
          {t('about')}
        </Link>
      </nav>
      <div className="flex justify-end gap-x-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
};
