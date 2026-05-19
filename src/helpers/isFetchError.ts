import type { FetchError, DataType, Details } from 'core';

export function isFetchError(
  data: DataType | FetchError | Details
): data is FetchError {
  return 'message' in data;
}
