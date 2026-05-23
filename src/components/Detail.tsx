import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { getDetails } from 'api';
import { isFetchError } from 'helpers';
import { Loader } from 'components';
import { Route } from 'routes';
import type { Details } from 'app';

type DetailFieldProps = {
  label: string;
  value?: string | number | string[] | null;
};

function DetailField({
  label,
  value,
}: DetailFieldProps): React.JSX.Element | null {
  if (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return null;
  }

  return (
    <p className="text-[1rem] text-mist-700 w-full flex justify-between border-b border-gray-400 border-dashed">
      <strong>{label}:</strong>{' '}
      {Array.isArray(value) ? value.join(', ') : value}
    </p>
  );
}

export const Detail = (): React.JSX.Element | null => {
  const navigate = useNavigate({ from: '/' });

  const { details, page, search } = Route.useSearch();

  const [isLoading, setIsLoading] = useState(false);

  const [cardDescription, setCardDescription] = useState<Details | null>(null);

  useEffect(() => {
    if (!details) {
      return;
    }

    const fetchDetails = async (): Promise<void> => {
      setIsLoading(true);

      setCardDescription(null);

      const data = await getDetails(details);

      if (!isFetchError(data)) {
        setCardDescription(data);
      }

      setIsLoading(false);
    };

    fetchDetails();
  }, [details]);

  if (!details) {
    return null;
  }

  if (isLoading) {
    return (
      <aside className="w-80 bg-mist-50 p-6 shadow-lg">
        <Loader />
      </aside>
    );
  }

  const CloseButton = (): React.JSX.Element => {
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
    return (
      <button
        type="button"
        onClick={handleClose}
        className="rounded border border-mist-400 bg-mist-200 px-3 py-1 transition hover:bg-mist-400"
      >
        ✕
      </button>
    );
  };

  if (!cardDescription) {
    return (
      <aside className="w-80 bg-mist-50 p-6 shadow-lg">
        <p className="mb-6 text-xl text-mist-700">Description not found 😭</p>
        {CloseButton()}
      </aside>
    );
  }

  return (
    <aside className="flex flex-col w-80 top-4 max-h-dvh bg-mist-50 p-2 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <div className="p-2.5 flex items-start justify-between gap-4 border-b border-mist-400 my-0.5">
        <h2 className="text-2xl font-bold text-mist-800">
          {cardDescription.name}
        </h2>
        {CloseButton()}
      </div>

      <div className="flex flex-col gap-2 px-2 items-center overflow-y-auto">
        <img
          src={cardDescription.image}
          alt={cardDescription.name}
          className="w-60"
        />

        <DetailField label="Height" value={cardDescription.height} />

        <DetailField label="Mass" value={cardDescription.mass} />

        <DetailField label="Gender" value={cardDescription.gender} />

        <DetailField label="Species" value={cardDescription.species} />

        <DetailField label="Skin Color" value={cardDescription.skinColor} />

        <DetailField label="Eye Color" value={cardDescription.eyeColor} />

        <DetailField label="Hair Color" value={cardDescription.hairColor} />

        <DetailField label="Homeworld" value={cardDescription.homeworld} />

        <DetailField
          label="Affiliations"
          value={cardDescription.affiliations}
        />

        <DetailField
          label="Former Affiliations"
          value={cardDescription.formerAffiliations}
        />

        <DetailField label="Masters" value={cardDescription.masters} />

        <DetailField label="Apprentices" value={cardDescription.apprentices} />

        <DetailField label="Equipment" value={cardDescription.equipment} />

        <a
          href={cardDescription.wiki}
          target="_blank"
          rel="noreferrer"
          className="mt-4 text-lg font-medium text-mauve-700 underline-offset-4 transition hover:underline"
        >
          More on Wookieepedia
        </a>
      </div>
    </aside>
  );
};
