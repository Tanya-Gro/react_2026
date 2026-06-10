import type { FetchError, DataType, Details } from 'app';

export const isFetchError = (
  data: DataType | FetchError | Details,
): data is FetchError => {
  return 'hasError' in data;
};
