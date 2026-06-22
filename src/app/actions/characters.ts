'use server';

import { redirect } from 'i18n/navigation';
import { getLocale } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

export async function searchCharacters(formData: FormData) {
  const search = formData.get('search')?.toString() || '';
  const locale = await getLocale();

  redirect({
    href: {
      pathname: '/',
      query: search ? { search, page: '1' } : { page: '1' },
    },
    locale,
  });
}

export async function changePage(formData: FormData) {
  const page = formData.get('page')?.toString() || '1';
  const search = formData.get('search')?.toString() || '';
  const locale = await getLocale();

  redirect({
    href: {
      pathname: '/',
      query: search ? { search, page } : { page },
    },
    locale,
  });
}

export async function selectCharacter(formData: FormData) {
  const id = formData.get('id') as string;
  const search = formData.get('search') as string;
  const page = formData.get('page') as string;
  const locale = await getLocale();

  const query: Record<string, string> = {};
  if (id) {
    query.details = id;
  }
  if (search) {
    query.search = search;
  }
  if (page) {
    query.page = page;
  }

  redirect({
    href: {
      pathname: '/',
      query: search ? { search, page } : { page },
    },
    locale,
  });
}

export async function refreshData() {
  revalidatePath('/[locale]', 'page');
}
