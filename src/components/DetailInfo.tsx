import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';
import type { Details } from 'app';

type DetailFieldProps = {
  label: string;
  value?: string | number | string[] | null;
};

type DetailInfoProps = {
  card: Details | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  onClose: () => void;
};

type CloseButtonProps = {
  onClose: () => void;
};

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

export const DetailInfo = ({
  card,
  error,
  onClose,
}: DetailInfoProps): React.JSX.Element => {
  if (!card || error) {
    return (
      <>
        <CloseButton onClose={onClose} />
        <p className="mt-10 text-xl text-mist-700">
          {card
            ? 'Failed to load character details.'
            : 'Oops. Description not found...'}
        </p>
      </>
    );
  }

  return (
    <>
      <div className="p-2.5 flex items-start justify-between gap-4 border-b border-mist-400 my-0.5">
        <h2 className="text-2xl font-bold text-mist-800">{card.name}</h2>
        <CloseButton onClose={onClose} />
      </div>

      <div className="flex flex-col gap-2 px-2 items-center overflow-y-auto">
        <img src={card.image} alt={card.name} className="w-60" />

        {DETAIL_FIELDS.map(({ title, key }) => (
          <DetailField label={title} value={card[key]} key={key} />
        ))}

        <a
          href={card.wiki}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-lg font-medium text-mauve-700 underline-offset-4 transition hover:underline"
        >
          More on Wookieepedia
        </a>
      </div>
    </>
  );
};

const DetailField = ({
  label,
  value,
}: DetailFieldProps): React.JSX.Element | null => {
  if ((!value && value !== 0) || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  return (
    <p className="text-[1rem] text-mist-700 w-full flex justify-between border-b border-gray-400 border-dashed">
      <strong>{label}:</strong>{' '}
      {Array.isArray(value) ? value.join(', ') : value}
    </p>
  );
};

const CloseButton = ({ onClose }: CloseButtonProps): React.JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClose}
      className="material-symbols-outlined rounded border border-mist-400 bg-mist-200 px-2 py-1 transition hover:bg-mist-400 ml-auto"
    >
      <span aria-hidden="true">close</span>
      <span className="sr-only">Close details</span>
    </button>
  );
};
