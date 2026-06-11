import { useState, type JSX } from 'react';
import { Flyout } from './Flyout';
import { useDispatch } from 'react-redux';
import { dataApi, detailsApi } from 'services';

export const ActionArea = (): JSX.Element => {
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();

  const handleRefreshButtonClick = (): void => {
    dispatch(dataApi.util.invalidateTags(['Characters']));
    dispatch(detailsApi.util.invalidateTags(['Details']));
  };

  if (hasError) {
    throw new Error('This is a test error.');
  }

  const handleErrorButtonClick = (): void => {
    setHasError(true);
  };

  return (
    <div className="p-4 flex justify-end bg-mist-50 border-t-2 border-t-mist-300 gap-x-4">
      <Flyout />
      <button
        name="refresh-button"
        onClick={handleRefreshButtonClick}
        className="bg-mist-300 hover:bg-mauve-300 cursor-pointer rounded h-10 w-30 border border-mist-500"
      >
        Refresh
      </button>
      <button
        name="throw-error-button"
        onClick={handleErrorButtonClick}
        className="bg-mist-300 hover:bg-mauve-300 cursor-pointer rounded h-10 w-30 border border-mist-500"
      >
        Throw Error
      </button>
    </div>
  );
};
