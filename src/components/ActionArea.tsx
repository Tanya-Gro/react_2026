'use client';

import { useState, useTransition, type JSX } from 'react';
import { Flyout } from './Flyout';
import { useDispatch } from 'react-redux';
import { dataApi, detailsApi } from 'services';
import { refreshData } from 'app/actions/characters';
import { useTranslations } from 'next-intl';

type ActionAreaProps = {
  search: string;
  page: string;
  detailsId: string | null;
};

export const ActionArea = ({
  search,
  page,
  detailsId,
}: ActionAreaProps): JSX.Element => {
  const [hasError, setHasError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('ACTION_AREA');

  const dispatch = useDispatch();

  const handleRefreshButtonClick = (): void => {
    dispatch(
      dataApi.util.invalidateTags([
        { type: 'Characters', id: `search:${search}, page:${page}` },
      ]),
    );
    if (detailsId) {
      dispatch(
        detailsApi.util.invalidateTags([{ type: 'Details', id: detailsId }]),
      );
    }
    startTransition(async () => {
      await refreshData();
    });
  };

  if (hasError) {
    throw new Error(t('error_message'));
  }

  return (
    <div className="p-4 flex justify-end bg-mist-50 border-t-2 border-t-mist-300 gap-x-4">
      <Flyout />
      <button
        name="refresh-button"
        disabled={isPending}
        onClick={handleRefreshButtonClick}
        className="bg-mist-300 hover:bg-mauve-300 cursor-pointer rounded h-10 w-30 border border-mist-500"
      >
        {isPending ? t('refresh_pending') : t('refresh')}
      </button>
      <button
        name="throw-error-button"
        onClick={() => setHasError(true)}
        className="bg-mist-300 hover:bg-mauve-300 cursor-pointer rounded h-10 w-30 border border-mist-500"
      >
        {t('throw_error')}
      </button>
    </div>
  );
};
