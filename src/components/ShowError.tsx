import type { JSX } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type ShowErrorProps = {
  err: FetchBaseQueryError | SerializedError;
};

const ERROR_MESSAGES: Record<string, string> = {
  FETCH_ERROR:
    'Failed to connect to the server. Please check your internet connection.',
  TIMEOUT_ERROR: 'The request timed out. Please try again later.',
  PARSING_ERROR: 'Received an invalid response from the server.',
};

export const ShowError = ({ err }: ShowErrorProps): JSX.Element => {
  let displayMessage = 'Unknown error';

  if ('status' in err) {
    const statusStr = String(err.status);
    displayMessage = ERROR_MESSAGES[statusStr] ?? `HTTP Error ${statusStr}`;
  } else if (err.message) {
    displayMessage = err.message;
  }

  return <p role="alert">{`Error: ${displayMessage}`}</p>;
};
