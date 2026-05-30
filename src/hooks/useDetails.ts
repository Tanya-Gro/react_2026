import { useEffect, useState } from 'react';
import type { Details, FetchError } from 'app';
import { getDetails } from 'api';
import { isFetchError } from 'helpers';

type UseDetailResult = [Details | null, boolean];

export const useDetails = (id: string | undefined): UseDetailResult => {
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let ignore = false;

    const fetchDetails = async (): Promise<void> => {
      setIsLoading(true);
      setDetails(null);

      try {
        const data: FetchError | Details = await getDetails(id);

        if (!ignore && !isFetchError(data)) {
          setDetails(data);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();

    return (): void => {
      ignore = true;
    };
  }, [id]);

  return [details, isLoading];
};
