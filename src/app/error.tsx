'use client';

import { ErrorBoundary } from 'components';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
const Error = ({ error, reset }: ErrorProps) => {
  return <ErrorBoundary error={error} reset={reset} />;
};

export default Error;
