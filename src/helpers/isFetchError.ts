import type { FetchError, DataType } from '../app/';

export function isFetchError(data: DataType | FetchError): data is FetchError {
  return 'message' in data;
}