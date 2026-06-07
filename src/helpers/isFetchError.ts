import type { FetchError, DataType, Details } from 'app';

export const isFetchError = (
  data: DataType | FetchError | Details
): data is FetchError => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'hasError' in data &&
    data.hasError === true &&
    'message' in data
  );
};
