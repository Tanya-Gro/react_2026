import type { JSX } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Route } from 'routes';
import { Loader } from 'components';
import { DetailField } from './DetailField';
import type { Details } from 'app';
import { useGetDetailsQuery } from 'services';

type DetailFieldConfig = { title: string; key: keyof Details };

const DETAIL_FIELDS: readonly DetailFieldConfig[] = [
  { title: 'Height', key: 'height' },
  { title: 'Mass', key: 'mass' },
  { title: 'Gender', key: 'gender' },
  { title: 'Species', key: 'species' },
  { title: 'Skin Color', key: 'skinColor' },
  { title: 'Eye Color', key: 'eyeColor' },
  { title: 'Hair Color', key: 'hairColor' },
  { title: 'Homeworld', key: 'homeworld' },
  { title: 'Affiliations', key: 'affiliations' },
  { title: 'Former Affiliations', key: 'formerAffiliations' },
  { title: 'Masters', key: 'masters' },
  { title: 'Apprentices', key: 'apprentices' },
  { title: 'Equipment', key: 'equipment' },
];

export const Detail = (): JSX.Element | null => {
  const navigate = useNavigate({ from: '/' });

  const { details, page, search } = Route.useSearch();

  const { data, error, isFetching } = useGetDetailsQuery(details ?? 0, {
    skip: !details,
  });

  if (!details) {
    return null;
  }

  const handleClose = (): void => {
    navigate({
      to: '/',
      search: {
        search,
        page,
        details: undefined,
      },
    });
  };

  if (!data || error) {
    return (
      <aside
        aria-label="Character details"
        className="flex flex-col w-80 max-h-dvh bg-mist-50 p-2 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]"
      >
        <CloseButton onClose={handleClose} />
        <p className="mt-10 text-xl text-mist-700">
          {data
            ? 'Failed to load character details.'
            : 'Oops. Description not found...'}
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Character details"
      className="flex flex-col w-80 max-h-dvh bg-mist-50 p-2 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]"
    >
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div className="p-2.5 flex items-start justify-between gap-4 border-b border-mist-400 my-0.5">
            <h2 className="text-2xl font-bold text-mist-800">{data.name}</h2>
            <CloseButton onClose={handleClose} />
          </div>

          <div className="flex flex-col gap-2 px-2 items-center overflow-y-auto">
            <img src={data.image} alt={data.name} className="w-60" />

            {DETAIL_FIELDS.map(({ title, key }) => (
              <DetailField label={title} value={data[key]} key={key} />
            ))}

            <a
              href={data.wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-lg font-medium text-mauve-700 underline-offset-4 transition hover:underline"
            >
              More on Wookieepedia
            </a>
          </div>
        </>
      )}
    </aside>
  );
};

type CloseButtonProps = {
  onClose: () => void;
};

const CloseButton = ({ onClose }: CloseButtonProps): React.JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClose}
      className="rounded border border-mist-400 bg-mist-200 px-2 transition hover:bg-mist-400 ml-auto"
    >
      <span aria-hidden="true" className="text-3xl">
        &times;
      </span>
      <span className="sr-only">Close details</span>
    </button>
  );
};
